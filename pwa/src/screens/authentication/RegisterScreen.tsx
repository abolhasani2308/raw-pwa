//@ts-nocheck
import React, {useRef, useState} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {
  AuthScreenWithFillButtonPropsType,
  BaseAuthScreenPropsType,
  RegisterScreenHintPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {
  useBankPassword,
  useBankUsername,
  useNationalCode,
  usePhoneNumber,
} from '../../common/hooks/Validations';
import CheckBox from '../../components/CheckBox';
import AuthField from '../../components/fields/AuthField';
import {Colors} from '../../configs/Colors';
import {fa} from '../../i18n/fa-IR';
import {useApi} from '../../providers/ApiProvider';
import {showModal} from '../../redux/actions/ModalActions';
import {Screens} from '../../rout/types/RootStackTypes';
import NetworkChecker, {netAlert} from '../../services/NetworkChecker';
import {
  OTPCreateBodyType,
  OTPCreateResponseType,
  bankOTPCreateBodyType,
  bankOTPCreateResponseType,
} from '../../services/api/ServerTypes';
import AuthScreenWithFillButton from './AuthScreenWithFillButton';

const Hint = (props: RegisterScreenHintPropsType) => {
  return <Text style={[styles.hint, props?.text_style]}>{props.message}</Text>;
};

const TouchableHint = (props: RegisterScreenHintPropsType) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 0.4 * Assets.size.vertical_1,
      }}
      activeOpacity={Assets.size.active_opacity}
      onPress={props?.onPress}>
      <Hint
        text_style={{
          textDecorationLine: 'underline',
          marginTop: Assets.size.vertical_1,
        }}
        message={props.message}
      />
    </TouchableOpacity>
  );
};

const methods = [
  {
    title: fa.screens.register.personal_information,
    type: 'PERSONAL',
    enable: true,
  },
  {
    title: fa.screens.register.bank_parsian_account_information,
    type: 'BANK',
    enable: true,
  },
  {
    title: fa.screens.register.legal_information,
    type: 'LEGAL',
    enable: false,
  },
];

const RegisterScreen = (
  props: BaseAuthScreenPropsType & AuthScreenWithFillButtonPropsType,
) => {
  const {api} = useApi();
  const dispatch = useDispatch();
  const [validationEnabled, setValidationEnabled] = useState(false);
  // personal
  const refNationalCodeInput = useRef(null);
  const refPhoneNumberInput = useRef(null);
  const {
    value: nationalCode,
    setValue: setNationalCode,
    result: nationalCodeValidation,
    checkError: checkErrorNationalCode,
  } = useNationalCode(!validationEnabled);
  const {
    value: phoneNumber,
    setValue: setPhoneNumber,
    result: phoneNumberValidation,
    checkError: checkErrorPhoneNumber,
  } = usePhoneNumber(!validationEnabled);
  // bank
  const refBankUsernameInput = useRef(null);
  const refBankPasswordInput = useRef(null);
  const {
    value: bankUsername,
    setValue: setBankUsername,
    result: bankUsernameValidation,
    checkError: checkErrorBankUsername,
  } = useBankUsername(!validationEnabled);
  const {
    value: bankPassword,
    setValue: setBankPassword,
    result: bankPasswordValidation,
    checkError: checkErrorBankPassword,
  } = useBankPassword(!validationEnabled);

  const otpMutaion = useMutation({
    mutationFn: async (body: OTPCreateBodyType) => {
      dispatch(showModal({id: 'Loading'}));
      return api?.otpCreate(body);
    },
    onSuccess: (data: OTPCreateResponseType) => {
      props?.navigation.navigate(Screens.OTPScreen, {
        mobile: phoneNumber,
        national_code: nationalCode,
        is_forgot_password: props?.route?.params?.is_forgot_password,
        expire_time: data?.expire_time,
        otp_type: 'PERSONAL',
      });
      dispatch(
        showModal({
          id: 'Toast',
          modalProps: {
            message: data?.message,
          },
        }),
      );
    },
  });

  const onRegisterPress = () => {
    if (checkErrorNationalCode() || checkErrorPhoneNumber()) {
      setValidationEnabled(true);
    } else {
      NetworkChecker({
        onConnected: () => {
          otpMutaion.mutate({
            national_code: nationalCode,
            mobile: phoneNumber,
          });
        },
        onDisConnected: () => {
          dispatch(netAlert);
        },
      });
    }
  };

  const bankOtpMutaion = useMutation({
    mutationFn: async (body: bankOTPCreateBodyType) => {
      dispatch(showModal({id: 'Loading'}));
      return api?.bankOtpCreate(body);
    },
    onSuccess: (data: bankOTPCreateResponseType) => {
      props?.navigation.navigate(Screens.OTPScreen, {
        mobile: data?.receiver,
        username: bankUsername,
        is_forgot_password: props?.route?.params?.is_forgot_password,
        expire_time: data?.expire_time,
        otp_type: 'BANK',
      });
      dispatch(
        showModal({
          id: 'Toast',
          modalProps: {
            message: data?.message,
          },
        }),
      );
    },
  });

  const onBankRegisterPress = () => {
    if (checkErrorBankUsername() || checkErrorBankPassword()) {
      setValidationEnabled(true);
    } else {
      NetworkChecker({
        onConnected: () => {
          bankOtpMutaion.mutate({
            username: bankUsername,
            password: bankPassword,
          });
        },
        onDisConnected: () => {
          dispatch(netAlert);
        },
      });
    }
  };

  const [method, set_method] = useState('PERSONAL');

  return (
    <AuthScreenWithFillButton
      screen_title={fa.screens.register.register}
      fill_button_title={fa.screens.register.send_activation_code}
      on_fill_button_press={
        method === 'PERSONAL' ? onRegisterPress : onBankRegisterPress
      }
      render_card_inside={
        <>
          <Hint message={fa.screens.register.select_an_authentication_method} />
          {methods.map(item => {
            return (
              <CheckBox
                title={item?.title}
                is_checked={item?.type === method}
                onCheck={() => {
                  set_method(item?.type);
                }}
                is_enable={item?.enable}
              />
            );
          })}
          {method === 'PERSONAL' && (
            <>
              <AuthField
                ref={refNationalCodeInput}
                label={fa.screens.register.national_code}
                placeholder={fa.placeholder.national_code}
                icon={Assets.svg.user}
                keyboardType="number-pad"
                container_style={styles.nationalCodeInput}
                textAlign={'left'}
                state={
                  validationEnabled && checkErrorNationalCode()
                    ? 'error'
                    : 'normal'
                }
                value={nationalCode}
                onChangeText={setNationalCode}
                error={nationalCodeValidation.error}
                maxLength={10}
                onSubmitEditing={() => {
                  refPhoneNumberInput.current.focus();
                }}
                returnKeyType="next"
              />
              <AuthField
                ref={refPhoneNumberInput}
                label={fa.screens.register.mobile_phone_number}
                placeholder={fa.placeholder.mobile_phone_number}
                icon={Assets.svg.device_mobile}
                keyboardType="number-pad"
                container_style={styles.mobileInput}
                textAlign={'left'}
                state={
                  validationEnabled && checkErrorPhoneNumber()
                    ? 'error'
                    : 'normal'
                }
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                error={phoneNumberValidation.error}
                maxLength={11}
                returnKeyType="done"
                onSubmitEditing={onRegisterPress}
              />
            </>
          )}
          {method === 'BANK' && (
            <>
              <AuthField
                ref={refBankUsernameInput}
                label={fa.screens.register.username}
                placeholder={fa.placeholder.username}
                icon={Assets.svg.user}
                container_style={styles.nationalCodeInput}
                textAlign={'left'}
                state={
                  validationEnabled && checkErrorBankUsername()
                    ? 'error'
                    : 'normal'
                }
                value={bankUsername}
                onChangeText={setBankUsername}
                error={bankUsernameValidation.error}
                onSubmitEditing={() => {
                  refBankPasswordInput.current.focus();
                }}
                returnKeyType="next"
              />
              <AuthField
                ref={refBankPasswordInput}
                label={fa.screens.register.password}
                placeholder={fa.placeholder.password}
                icon={Assets.svg.password}
                container_style={styles.mobileInput}
                textAlign={'left'}
                state={
                  validationEnabled && checkErrorBankPassword()
                    ? 'error'
                    : 'normal'
                }
                value={bankPassword}
                onChangeText={setBankPassword}
                error={bankPasswordValidation.error}
                returnKeyType="done"
                onSubmitEditing={onBankRegisterPress}
                secureTextEntry={true}
              />
            </>
          )}
          {method === 'PERSONAL' ? (
            <Hint
              message={
                fa.screens.register
                  .please_note_that_the_entered_national_code_must_belong_to_the_owner_of_the_mobile_phone_number
              }
            />
          ) : (
            <TouchableHint
              message={
                fa.screens.register.forgotten_or_registered_with_the_bank
              }
              text_style={styles.touchableHint}
              onPress={() => {
                Linking?.openURL('https://ipbhome.parsian-bank.ir/services/ac');
              }}
            />
          )}
        </>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  hint: {
    color: Colors.primary,
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    textAlign: 'center',
    marginBottom: Assets.size.vertical_1,
    marginHorizontal: Assets.size.horizontal_2,
    marginTop: 1.4 * Assets.size.vertical_1,
  },
  nationalCodeInput: {
    marginTop: Assets.size.vertical_1,
  },
  mobileInput: {
    marginTop: Assets.size.vertical_2,
  },
  touchableHint: {
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
