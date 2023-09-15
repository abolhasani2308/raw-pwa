//@ts-nocheck
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import uuid from 'react-native-uuid';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {
  DashboardBaseScreenPropsType,
  DashboardSectionedScreenPropsType,
  DashboardWithTitleButtonScreenPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {
  useSheba,
  useShebaSelect,
  useWithdraw,
} from '../../common/hooks/Validations';
import Balance from '../../components/Balance';
import SelectableField from '../../components/fields/SelectableField';
import ShebaField from '../../components/fields/ShebaField';
import WithdrawTransferField from '../../components/fields/WithdrawTransferField';
import {fa} from '../../i18n/fa-IR';
import {useApi} from '../../providers/ApiProvider';
import {
  setAllHistory,
  setWithdrawHistory,
} from '../../redux/actions/HistoryActions';
import {showModal} from '../../redux/actions/ModalActions';
import {useConfig} from '../../redux/selectors/ConfigSelector';
import {useHistory} from '../../redux/selectors/HistorySelector';
import {useUser} from '../../redux/selectors/UserSelector';
import {useWallet} from '../../redux/selectors/WalletSelector';
import {Tabs} from '../../rout/types/TabNavigation';
import {DataSigner} from '../../services/DataSigner';
import NetworkChecker, {netAlert} from '../../services/NetworkChecker';
import {
  walletCreateResponseType,
  withdrawStoreBodyType,
} from '../../services/api/ServerTypes';
import {
  inputNumberFormateSetter,
  inputNumberFormatter,
} from '../../utils/NumberFormatter';
import DashboardWithTitleButtonScreen from './DashboardWithTitleButtonScreen';
import {useAuth} from '../../redux/selectors/AuthSelector';

const WithdrawScreen = (
  props: JSX.IntrinsicAttributes &
    DashboardBaseScreenPropsType &
    DashboardSectionedScreenPropsType &
    DashboardWithTitleButtonScreenPropsType,
) => {
  const dispatch = useDispatch();
  const {api} = useApi();
  const queryClient = useQueryClient();
  const isFocused = useIsFocused();
  const {last_name, name} = useUser();
  const {withdraw_histories, all_histories} = useHistory();
  const refShebaInput = useRef(null);
  const refShebaSelectInput = useRef(null);
  const refBalance = useRef(null);
  const {amount, wallet_id} = useWallet();
  const {is_parsian} = useUser();
  const [validationEnabled, setValidationEnabled] = useState(false);
  const [bank_name, set_bank_name] = useState('');
  const {bank_wallet_id, sign_required} = useConfig();
  const {certificate} = useAuth();
  const {
    value: withdraw,
    setValue: setWithdraw,
    result: withdrawValidation,
    checkError: checkErrorWithdraw,
  } = useWithdraw(!validationEnabled);
  const {
    value: sheba,
    setValue: setSheba,
    result: shebaValidation,
    checkError: checkErrorSheba,
  } = useSheba(!validationEnabled);
  const {
    value: shebaSelect,
    setValue: setShebaSelect,
    result: shebaSelectValidation,
    checkError: checkErrorShebaSelect,
  } = useShebaSelect(!validationEnabled);

  const account_numbers = useQuery(['withdrawCreate'], async () => {
    return api?.withdrawCreate().then(res => {
      return res.data;
    });
  });

  useEffect(() => {
    if (isFocused) {
      queryClient.invalidateQueries('withdrawCreate');
    }
  }, [isFocused, queryClient]);

  const withdrawStoreMutaion = useMutation({
    mutationFn: async (body: withdrawStoreBodyType) => {
      return api?.withdrawStore(body);
    },
    onSuccess: (data: walletCreateResponseType) => {
      dispatch(
        showModal({
          id: 'Toast',
          modalProps: {
            message: data?.message,
          },
        }),
      );
      setWithdraw('');
      setSheba('');
      setShebaSelect('');
      setValidationEnabled(false);
      refBalance?.current?.updateAmount();
      setWithdrawHistory()(
        dispatch,
        [data?.transaction].concat(withdraw_histories),
      );
      setAllHistory()(dispatch, [data?.transaction].concat(all_histories));
    },
  });

  const onWithdrawPress = () => {
    if (
      checkErrorWithdraw() ||
      (is_parsian ? checkErrorShebaSelect() : checkErrorSheba())
    ) {
      setValidationEnabled(true);
    } else {
      dispatch(
        showModal({
          id: 'Confirm',
          modalProps: {
            title: fa.screens.withdraw.confirm_withdrawal_from_the_wallet,
            first_key: fa.screens.withdraw.the_amount_of,
            first_value: withdraw,
            second_key: fa.screens.withdraw.to_account,
            second_value: `${fa.screens.withdraw.bank} ${bank_name}`,
            third_key: fa.screens.withdraw.name_of_account_holder,
            third_value: `${name} ${last_name}`,
            onConfirmPress: () => {
              NetworkChecker({
                onConnected: () => {
                  dispatch(showModal({id: 'Loading'}));
                  if (sign_required) {
                    //----------withdraw_data
                    let withdraw_uuid = uuid.v4();
                    let withdraw_data = {
                      tokenSymbol: 'IRDR',
                      senderID: wallet_id,
                      receiverID: bank_wallet_id,
                      amount: withdraw,
                      trxRef: `"${withdraw_uuid}"`,
                    };
                    //----------refund_data
                    let refund_uuid = uuid.v4();
                    let refund_data = {
                      walletID: wallet_id,
                      trxRefSrc: withdraw_uuid,
                      trxRef: `"${refund_uuid}"`,
                      amount: withdraw,
                    };

                    DataSigner(withdraw_data, certificate).then(
                      withdraw_signData => {
                        DataSigner(refund_data, certificate).then(
                          refund_signData => {
                            withdrawStoreMutaion.mutate({
                              amount: String(withdraw),
                              deposit_number: is_parsian ? shebaSelect : sheba,
                              description: '',
                              withdraw_data: withdraw_signData?.data,
                              withdraw_sign: withdraw_signData?.sign,
                              refund_data: refund_signData?.data,
                              refund_sign: refund_signData?.sign,
                              certificate: withdraw_signData?.certificate,
                            });
                          },
                        );
                      },
                    );
                  } else {
                    withdrawStoreMutaion.mutate({
                      amount: String(withdraw),
                      deposit_number: is_parsian ? shebaSelect : sheba,
                      description: '',
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
    }
  };

  return (
    <DashboardWithTitleButtonScreen
      screen_type={'WITHDRAW'}
      screen_title={fa.screens.withdraw.withdraw}
      list_title={fa.screens.withdraw.history}
      button_title={fa.screens.withdraw.withdraw_from_the_wallet}
      onButtonPress={onWithdrawPress}
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
          label={fa.screens.withdraw.withdrawal_amount}
          container_style={styles.withdrawField}
          keyboardType="number-pad"
          state={validationEnabled && checkErrorWithdraw() ? 'error' : 'normal'}
          value={inputNumberFormatter(withdraw)}
          onChangeText={value => {
            inputNumberFormateSetter(value, NewValue => setWithdraw(NewValue));
          }}
          error={withdrawValidation.error}
          onSubmitEditing={() => {
            if (is_parsian) {
              refShebaSelectInput?.current?.focusPicker();
            } else {
              refShebaInput.current.focus();
            }
          }}
          returnKeyType="next"
          onMaximumAmountPress={() => {
            setWithdraw(String(amount));
          }}
        />
      }
      render_card_inside_4={
        is_parsian ? (
          <SelectableField
            ref={refShebaSelectInput}
            list={account_numbers?.data}
            label={fa.screens.withdraw.select_the_destination_account}
            container_style={styles.shebaField}
            placeholder={fa.placeholder.bank_account}
            state={
              validationEnabled && checkErrorShebaSelect() ? 'error' : 'normal'
            }
            value={shebaSelect}
            onSelect={selectedItem => {
              setShebaSelect(selectedItem?.number);
              set_bank_name(selectedItem?.banke_name);
            }}
            error={shebaSelectValidation.error}
            textAlign={'left'}
          />
        ) : (
          <ShebaField
            ref={refShebaInput}
            label={fa.screens.withdraw.destination_sheba_number}
            container_style={styles.shebaField}
            placeholder={fa.placeholder.sheba}
            state={validationEnabled && checkErrorSheba() ? 'error' : 'normal'}
            value={sheba}
            onChangeText={setSheba}
            error={shebaValidation.error}
            onSubmitEditing={onWithdrawPress}
            returnKeyType="done"
          />
        )
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  withdrawField: {
    marginHorizontal: Assets.size.horizontal_4,
    marginTop: Assets.size.vertical_2,
  },
  shebaField: {
    marginHorizontal: Assets.size.horizontal_4,
    marginTop: Assets.size.vertical_2,
    marginBottom: Assets.size.vertical_1,
  },
  balance: {
    marginHorizontal: Assets.size.horizontal_5,
  },
});

export default WithdrawScreen;
