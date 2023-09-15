//@ts-nocheck
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import Package from '../../../package.json';
import {ProfileScreenCustomerNumberPropsType} from '../../Types';
import Assets from '../../assets/Assets';
import CustomButton from '../../components/CustomButton';
import AuthField from '../../components/fields/AuthField';
import DateField from '../../components/fields/DateField';
import {Colors} from '../../configs/Colors';
import {fa} from '../../i18n/fa-IR';
import {useApi} from '../../providers/ApiProvider';
import {logout} from '../../redux/actions/AuthActions';
import {hideModal, showModal} from '../../redux/actions/ModalActions';
import {useUser} from '../../redux/selectors/UserSelector';
import {Screens} from '../../rout/types/RootStackTypes';
import {logoutResponseType} from '../../services/api/ServerTypes';
import {customResponsiveHeight} from '../../utils/CustomResponsive';
import BaseAuthScreen from '../authentication/BaseAuthScreen';
import {getUserInfo, setUserInfo} from '../../redux/actions/UserActions';
import {
  setAllHistory,
  setChargeHistory,
  setTransferHistory,
  setWithdrawHistory,
} from '../../redux/actions/HistoryActions';
import {setWallet} from '../../redux/actions/WalletActions';

const CustomerNumber = (props: ProfileScreenCustomerNumberPropsType) => {
  return (
    <View style={styles.customerWrapper}>
      <Text style={styles.customerTitle}>{props?.customer_number}</Text>
      <Text style={styles.customerNumber}>
        {fa.screens.profile.customer_number}:
      </Text>
    </View>
  );
};

const unknownUser = {
  name: '',
  last_name: '',
  email: '',
  mobile: '',
  national_code: '',
  father_name: '',
  customer_number: '',
  is_parsian: false,
  avatar_url: '',
};
const unknownWallet = {
  has_wallet: false,
  wallet_id: '',
  amount: 0,
  state: '',
  type: '',
  qr_code: '',
};

const ProfileScreen = props => {
  const {
    customer_number,
    father_name,
    last_name,
    mobile,
    name,
    birthday,
    avatar_url,
  } = useUser();

  const dispatch = useDispatch();
  const {api} = useApi();

  const logoutMutaion = useMutation({
    mutationFn: async () => {
      return api?.logout();
    },
    onSuccess: async (data: logoutResponseType) => {
      await logout()(dispatch);
      dispatch(hideModal());
      setUserInfo()(dispatch, unknownUser);
      setWithdrawHistory()(dispatch, []);
      setChargeHistory()(dispatch, []);
      setTransferHistory()(dispatch, []);
      setAllHistory()(dispatch, []);
      setWallet()(dispatch, unknownWallet);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: Screens.RegisterScreen}],
        }),
      );
    },
  });

  return (
    <BaseAuthScreen
      screen_title={fa.screens.profile.profile}
      render_card_inside={
        <>
          {avatar_url && (
            <Image
              style={styles.photo}
              source={{
                uri: avatar_url,
              }}
              resizeMode={'cover'}
            />
          )}
          <CustomerNumber customer_number={customer_number ?? '--'} />
          <AuthField
            label={fa.screens.profile.name}
            placeholder={
              fa.placeholder.according_to_the_national_card_information
            }
            icon={Assets.svg.user}
            textAlign={'right'}
            container_style={styles.nextInputs}
            editable={false}
            value={name ?? '--'}
          />
          <AuthField
            label={fa.screens.profile.last_name}
            placeholder={
              fa.placeholder.according_to_the_national_card_information
            }
            icon={Assets.svg.user}
            textAlign={'right'}
            container_style={styles.nextInputs}
            editable={false}
            value={last_name ?? '--'}
          />
          <AuthField
            label={fa.screens.profile.father_s_name}
            placeholder={
              fa.placeholder.according_to_the_national_card_information
            }
            icon={Assets.svg.father}
            textAlign={'right'}
            container_style={styles.nextInputs}
            editable={false}
            value={father_name ?? '--'}
          />
          <DateField
            label={fa.screens.profile.date_of_birth}
            placeholder={fa.placeholder.date_of_birth}
            icon={Assets.svg.birthday}
            textAlign={'right'}
            container_style={styles.nextInputs}
            editable={false}
            value={birthday ?? '--'}
            disabled={true}
          />
          <AuthField
            label={fa.screens.profile.mobile_phone_number}
            placeholder={fa.placeholder.mobile_phone_number}
            icon={Assets.svg.device_mobile}
            textAlign={'left'}
            container_style={styles.lastInput}
            editable={false}
            value={mobile ?? '--'}
          />
        </>
      }
      render_card_under={
        <>
          <CustomButton
            fill
            title={fa.screens.profile.sign_out_of_the_user_account}
            container_style={styles.button}
            onPress={() => {
              dispatch(
                showModal({
                  id: 'Native',
                  modalProps: {
                    title: fa.screens.profile.logout,
                    message:
                      fa.screens.profile.do_you_want_to_log_out_of_your_account,
                    onConfirmPress: () => {
                      dispatch(showModal({id: 'Loading'}));
                      logoutMutaion.mutate();
                    },
                    onCancelPress: () => {},
                    confirmTitle: fa.screens.profile.confirm,
                    cancelTitle: fa.screens.profile.cancel,
                  },
                }),
              );
            }}
          />
          <Text style={styles.versionText}>
            {fa.screens.profile.version}: {Package?.version}
          </Text>
          <View style={styles.spacer} />
        </>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  customerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginHorizontal: Assets.size.horizontal_2,
    marginTop: Assets.size.vertical_1,
  },
  customerTitle: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h5,
    color: Colors.secondary,
  },
  customerNumber: {
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h5,
    color: Colors.text_3,
  },
  firstInput: {
    marginTop: 1.5 * Assets.size.vertical_1,
  },
  nextInputs: {
    marginTop: Assets.size.vertical_2,
  },
  lastInput: {
    marginTop: Assets.size.vertical_2,
    marginBottom: Assets.size.vertical_1,
  },
  versionText: {
    fontFamily: Assets.font.light,
    fontSize: Assets.font.sub_1,
    color: Colors.text_3,
    marginVertical: Assets.size.vertical_1,
    alignSelf: 'center',
  },
  spacer: {
    flex: 1,
  },
  photo: {
    height: customResponsiveHeight(20),
    width: customResponsiveHeight(20),
    borderRadius: customResponsiveHeight(20),
    marginTop: Assets.size.vertical_1,
    backgroundColor: Colors.background,
  },
  button: {
    marginTop: Assets.size.vertical_1,
  },
});

export default ProfileScreen;
