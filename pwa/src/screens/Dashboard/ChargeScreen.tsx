//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import uuid from 'react-native-uuid';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {
  DashboardBaseScreenPropsType,
  DashboardSectionedScreenPropsType,
  DashboardWithTitleButtonScreenPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {useAccountSelect, useCharge} from '../../common/hooks/Validations';
import AmountButton from '../../components/AmountButton';
import Balance from '../../components/Balance';
import ChargeField from '../../components/fields/ChargeField';
import SelectableField from '../../components/fields/SelectableField';
import {fa} from '../../i18n/fa-IR';
import {useApi} from '../../providers/ApiProvider';
import {
  setAllHistory,
  setChargeHistory,
} from '../../redux/actions/HistoryActions';
import {showModal} from '../../redux/actions/ModalActions';
import {useHistory} from '../../redux/selectors/HistorySelector';
import {useUser} from '../../redux/selectors/UserSelector';
import NetworkChecker, {netAlert} from '../../services/NetworkChecker';
import {
  chargeCreateResponseType,
  chargeStoreBodyType,
} from '../../services/api/ServerTypes';
import {customResponsiveWidth} from '../../utils/CustomResponsive';
import {
  inputNumberFormateSetter,
  inputNumberFormatter,
} from '../../utils/NumberFormatter';
import DashboardWithTitleButtonScreen from './DashboardWithTitleButtonScreen';
import {useWallet} from '../../redux/selectors/WalletSelector';
import {useIsFocused} from '@react-navigation/native';
import {useConfig} from '../../redux/selectors/ConfigSelector';
import {useAuth} from '../../redux/selectors/AuthSelector';

const buttons = [
  '2000000',
  '1000000',
  '500000',
  '100000000',
  '10000000',
  '5000000',
];

const ChargeScreen = (
  props: JSX.IntrinsicAttributes &
    DashboardBaseScreenPropsType &
    DashboardSectionedScreenPropsType &
    DashboardWithTitleButtonScreenPropsType,
) => {
  const dispatch = useDispatch();
  const refChargeInput = useRef(null);
  const refAccountSelectInput = useRef(null);
  const refBalance = useRef(null);
  const {is_parsian} = useUser();
  const {charge_histories, all_histories} = useHistory();
  const {api} = useApi();
  const {wallet_id} = useWallet();
  const queryClient = useQueryClient();
  const isFocused = useIsFocused();
  const {bank_wallet_id, sign_required} = useConfig();
  const {certificate} = useAuth();

  const [validationEnabled, setValidationEnabled] = useState(false);

  const account_numbers = useQuery(['chargeCreate'], async () => {
    return api?.chargeCreate().then(res => {
      return res.data;
    });
  });

  useEffect(() => {
    if (isFocused) {
      queryClient.invalidateQueries('chargeCreate');
    }
  }, [isFocused, queryClient]);

  const {
    value: charge,
    setValue: setCharge,
    result: chargeValidation,
    checkError: checkErrorCharge,
  } = useCharge(!validationEnabled);

  const {
    value: accountSelect,
    setValue: setAccountSelect,
    result: accountSelectValidation,
    checkError: checkErrorAccountSelect,
  } = useAccountSelect(!validationEnabled);

  const chargeStoreMutaion = useMutation({
    mutationFn: async (body: chargeStoreBodyType) => {
      return api?.chargeStore(body);
    },
    onSuccess: (data: chargeCreateResponseType) => {
      dispatch(
        showModal({
          id: 'Toast',
          modalProps: {
            message: data?.message,
          },
        }),
      );
      setCharge('');
      setAccountSelect('');
      setValidationEnabled(false);
      refBalance?.current?.updateAmount();
      setChargeHistory()(
        dispatch,
        [data?.transaction].concat(charge_histories),
      );
      setAllHistory()(dispatch, [data?.transaction].concat(all_histories));
    },
  });

  const onPaymentPress = () => {
    if (checkErrorCharge() || (is_parsian && checkErrorAccountSelect())) {
      setValidationEnabled(true);
    } else {
      dispatch(
        showModal({
          id: 'Confirm',
          modalProps: {
            title: fa.screens.charge.wallet_charge_confirmation,
            first_key:
              fa.screens.charge
                .are_you_sure_about_charging_your_account_with_the_following_amount,
            first_value: charge,
            onConfirmPress: () => {
              NetworkChecker({
                onConnected: async () => {
                  dispatch(showModal({id: 'Loading'}));
                  chargeStoreMutaion.mutate({
                    amount: String(charge),
                    deposit_number: is_parsian ? accountSelect : '',
                  });
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
      screen_type={'CHARGE'}
      screen_title={fa.screens.charge.recharge_wallet}
      list_title={fa.screens.charge.history}
      button_title={fa.screens.charge.online_payment}
      onButtonPress={onPaymentPress}
      render_card_inside_2={
        <>
          <ChargeField
            ref={refChargeInput}
            label={fa.screens.charge.charge_amount}
            container_style={styles.chargeField}
            keyboardType="number-pad"
            state={validationEnabled && checkErrorCharge() ? 'error' : 'normal'}
            value={inputNumberFormatter(charge)}
            onChangeText={value => {
              inputNumberFormateSetter(value, NewValue => setCharge(NewValue));
            }}
            error={chargeValidation.error}
            onSubmitEditing={() => {
              if (is_parsian) {
                refAccountSelectInput?.current?.focusPicker();
              } else {
                onPaymentPress();
              }
            }}
            returnKeyType={is_parsian ? 'next' : 'done'}
          />
          <View style={styles.hidden}>
            <Balance ref={refBalance} />
          </View>
        </>
      }
      render_card_inside_3={
        is_parsian && (
          <SelectableField
            list={account_numbers?.data}
            ref={refAccountSelectInput}
            label={fa.screens.charge.account_selection}
            placeholder={fa.placeholder.bank_account}
            container_style={styles.accountField}
            state={
              validationEnabled && checkErrorAccountSelect()
                ? 'error'
                : 'normal'
            }
            value={accountSelect}
            onSelect={selectedItem => {
              setAccountSelect(selectedItem?.number);
            }}
            error={accountSelectValidation.error}
            textAlign={'left'}
          />
        )
      }
      render_card_inside_4={
        <FlatList
          style={styles.buttons}
          data={buttons}
          renderItem={({item, index}) => {
            return (
              <AmountButton
                // eslint-disable-next-line react-native/no-inline-styles
                container_style={{
                  marginLeft:
                    index === 0
                      ? 0
                      : index === 3
                      ? 0
                      : Assets.size.horizontal_4,
                  marginTop: index > 2 ? Assets.size.vertical_3 : 0,
                }}
                onPress={() => {
                  setCharge(item);
                }}
                amount={item}
                key={index}
                size={
                  (customResponsiveWidth(100) -
                    2 * Assets.size.horizontal_1 -
                    2 * Assets.size.horizontal_4) /
                  3
                }
              />
            );
          }}
          numColumns={3}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
        />
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: Assets.size.vertical_2,
    marginBottom: Assets.size.vertical_2,
    marginHorizontal: Assets.size.horizontal_1,
  },
  chargeField: {
    marginHorizontal: Assets.size.horizontal_4,
  },
  accountField: {
    marginHorizontal: Assets.size.horizontal_4,
    marginTop: Assets.size.vertical_2,
  },
  hidden: {
    height: 0,
    width: 0,
    opacity: 0,
  },
});

export default ChargeScreen;
