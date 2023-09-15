//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {Linking, PermissionsAndroid, StyleSheet} from 'react-native';
import Assets from '../../assets/Assets';
import WalletField from '../../components/fields/WalletField';
import WithdrawTransferField from '../../components/fields/WithdrawTransferField';
import {fa} from '../../i18n/fa-IR';
import DashboardWithTitleButtonScreen from './DashboardWithTitleButtonScreen';
import {showModal} from '../../redux/actions/ModalActions';
import {useDispatch} from 'react-redux';
import {useTransfer, useWalletAddress} from '../../common/hooks/Validations';
import Balance from '../../components/Balance';
import {
  DashboardBaseScreenPropsType,
  DashboardSectionedScreenPropsType,
  DashboardWithTitleButtonScreenPropsType,
} from '../../Types';
import {Screens} from '../../rout/types/RootStackTypes';
import {useIsFocused} from '@react-navigation/native';
import {Tabs} from '../../rout/types/TabNavigation';
import {useWallet} from '../../redux/selectors/WalletSelector';
import {useApi} from '../../providers/ApiProvider';
import {useHistory} from '../../redux/selectors/HistorySelector';
import {useMutation} from 'react-query';
import {
  getTransferInfoBodyType,
  transferBodyType,
  transferResponseType,
} from '../../services/api/ServerTypes';
import {
  setAllHistory,
  setTransferHistory,
} from '../../redux/actions/HistoryActions';
import NetworkChecker, {netAlert} from '../../services/NetworkChecker';
import {
  inputNumberFormateSetter,
  inputNumberFormatter,
} from '../../utils/NumberFormatter';
import uuid from 'react-native-uuid';
import {useConfig} from '../../redux/selectors/ConfigSelector';
import {DataSigner} from '../../services/DataSigner';
import {useAuth} from '../../redux/selectors/AuthSelector';

const TransferScreen = (
  props: JSX.IntrinsicAttributes &
    DashboardBaseScreenPropsType &
    DashboardSectionedScreenPropsType &
    DashboardWithTitleButtonScreenPropsType,
) => {
  const dispatch = useDispatch();
  const refWalletAddressInput = useRef(null);
  const {api} = useApi();
  const {sign_required} = useConfig();
  const {transfer_histories, all_histories} = useHistory();
  const refBalance = useRef(null);
  const isFocused = useIsFocused();
  const {amount, wallet_id} = useWallet();
  const [validationEnabled, setValidationEnabled] = useState(false);
  const [transferInfo, setTransferInfo] = useState([]);
  const {certificate} = useAuth();
  const {
    value: transfer,
    setValue: setTransfer,
    result: transferValidation,
    checkError: checkErrorTransfer,
  } = useTransfer(!validationEnabled);
  const {
    value: walletAddress,
    setValue: setWalletAddress,
    result: walletAddressValidation,
    checkError: checkErrorWalletAddress,
  } = useWalletAddress(!validationEnabled);

  const transferMutaion = useMutation({
    mutationFn: async (body: transferBodyType) => {
      return api?.transfer(body);
    },
    onSuccess: (data: transferResponseType) => {
      dispatch(
        showModal({
          id: 'Toast',
          modalProps: {
            message: data?.message,
          },
        }),
      );
      setTransfer('');
      setWalletAddress('');
      setValidationEnabled(false);
      refBalance?.current?.updateAmount();
      setTransferHistory()(
        dispatch,
        [data?.transaction].concat(transfer_histories),
      );
      setAllHistory()(dispatch, [data?.transaction].concat(all_histories));
    },
  });

  const getTransferInfoMutaion = useMutation({
    mutationFn: async (body: getTransferInfoBodyType) => {
      return api?.getTransferInfo(body);
    },
    onSuccess: (data: transferResponseType) => {
      setTransferInfo(data);
      setTimeout(() => {
        dispatch(
          showModal({
            id: 'Confirm',
            modalProps: {
              title: fa.screens.transfer.confirm_the_transfer_from_the_wallet,
              first_key: fa.screens.transfer.the_amount_of,
              first_value: transfer,
              informations: transferInfo,
              onConfirmPress: () => {
                NetworkChecker({
                  onConnected: async () => {
                    if (sign_required) {
                      let _uuid = uuid.v4();
                      let data = {
                        tokenSymbol: 'IRDR',
                        senderID: wallet_id,
                        receiverID: walletAddress,
                        amount: transfer,
                        trxRef: `"${_uuid}"`,
                      };

                      DataSigner(data, certificate).then(signData => {
                        transferMutaion.mutate({
                          amount: transfer,
                          wallet_id: walletAddress,
                          data: signData?.data,
                          sign: signData?.sign,
                          certificate: signData?.certificate,
                        });
                      });
                    } else {
                      transferMutaion.mutate({
                        amount: transfer,
                        wallet_id: walletAddress,
                      });
                    }
                  },
                  onDisConnected: () => {
                    dispatch(netAlert);
                  },
                });
              },
            },
          }),
        );
      }, 0);
    },
  });

  const onTransferPress = () => {
    if (checkErrorTransfer() || checkErrorWalletAddress()) {
      setValidationEnabled(true);
    } else {
      dispatch(showModal({id: 'Loading'}));
      NetworkChecker({
        onConnected: () => {
          getTransferInfoMutaion.mutate({
            wallet_id: walletAddress,
          });
        },
        onDisConnected: () => {
          dispatch(netAlert);
        },
      });
    }
  };

  const getCameraPermition = () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
      result => {
        if (result) {
          //go next page
          props?.navigation.navigate(Screens.BarcodeScannerScreen);
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          ).then(_result => {
            if (_result === PermissionsAndroid.RESULTS.GRANTED) {
              //go next page
              props?.navigation.navigate(Screens.BarcodeScannerScreen);
            } else if (_result === PermissionsAndroid.RESULTS.DENIED) {
              //retry
              dispatch(
                showModal({
                  id: 'AlertBox',
                  modalProps: {
                    message:
                      fa.client_error
                        .permission_to_access_the_camera_was_not_approved,
                  },
                }),
              );
            } else if (_result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
              //settings
              dispatch(
                showModal({
                  id: 'Native',
                  modalProps: {
                    title: fa.screens.scanner.Inaccessibility,
                    message:
                      fa.screens.scanner
                        .the_ability_to_request_permission_to_access_the_camera_is_blocked_confirm_the_permission_to_access_the_camera_from_the_device_settings,
                    onConfirmPress: () => {
                      Linking.openSettings();
                    },
                    onCancelPress: () => {},
                    confirmTitle: fa.screens.scanner.settings,
                    cancelTitle: fa.screens.scanner.cancel,
                  },
                }),
              );
            }
          });
        }
      },
    );
  };

  useEffect(() => {
    if (isFocused) {
      if (props?.route?.params?.wallet_address) {
        setWalletAddress(props?.route?.params?.wallet_address);
      }
    }
  }, [isFocused, props?.route?.params?.wallet_address, setWalletAddress]);

  return (
    <DashboardWithTitleButtonScreen
      screen_type={'TRANSFER'}
      screen_title={fa.screens.transfer.transfer}
      list_title={fa.screens.transfer.history}
      button_title={fa.screens.transfer.transfer_to_wallet}
      onButtonPress={onTransferPress}
      render_card_inside_2={
        <Balance
          ref={refBalance}
          container_style={styles.balance}
          onEmptyPress={() => {
            props?.navigation.navigate(Tabs.Charge);
          }}
        />
      }
      render_card_inside_3={
        <WithdrawTransferField
          label={fa.screens.transfer.transfer_amount}
          container_style={styles.transferAmountField}
          keyboardType="number-pad"
          state={validationEnabled && checkErrorTransfer() ? 'error' : 'normal'}
          value={inputNumberFormatter(transfer)}
          onChangeText={value => {
            inputNumberFormateSetter(value, NewValue => setTransfer(NewValue));
          }}
          error={transferValidation.error}
          onSubmitEditing={() => {
            refWalletAddressInput.current.focus();
          }}
          returnKeyType="next"
          onMaximumAmountPress={() => {
            setTransfer(String(amount));
          }}
        />
      }
      render_card_inside_4={
        <WalletField
          ref={refWalletAddressInput}
          label={fa.screens.transfer.destination_wallet_address}
          container_style={styles.walletField}
          placeholder={fa.placeholder.wallet_address}
          state={
            validationEnabled && checkErrorWalletAddress() ? 'error' : 'normal'
          }
          value={walletAddress}
          onChangeText={setWalletAddress}
          error={walletAddressValidation.error}
          onSubmitEditing={onTransferPress}
          returnKeyType="done"
          onScanPress={getCameraPermition}
        />
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  transferAmountField: {
    marginHorizontal: Assets.size.horizontal_4,
    marginTop: Assets.size.vertical_2,
  },
  walletField: {
    marginHorizontal: Assets.size.horizontal_4,
    marginTop: Assets.size.vertical_2,
    marginBottom: Assets.size.vertical_1,
  },
  balance: {
    marginHorizontal: Assets.size.horizontal_5,
  },
});

export default TransferScreen;
