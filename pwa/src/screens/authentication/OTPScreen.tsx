//@ts-nocheck
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {
  AuthScreenWithFillButtonPropsType,
  AuthScreenWithFillUnFillButtonPropsType,
  BaseAuthScreenPropsType,
  OTPScreenDescriptionPropsType,
} from '../../Types';
import {actions} from '../../app.config';
import Assets from '../../assets/Assets';
import ValidationError from '../../components/ValidationError';
import {Colors} from '../../configs/Colors';
import {fa} from '../../i18n/fa-IR';
import {useApi} from '../../providers/ApiProvider';
import {login} from '../../redux/actions/AuthActions';
import {hideModal, showModal} from '../../redux/actions/ModalActions';
import {setUserInfo} from '../../redux/actions/UserActions';
import {setWallet} from '../../redux/actions/WalletActions';
import {useAuth} from '../../redux/selectors/AuthSelector';
import {useConfig} from '../../redux/selectors/ConfigSelector';
import {useWallet} from '../../redux/selectors/WalletSelector';
import {Screens} from '../../rout/types/RootStackTypes';
import {DataSigner} from '../../services/DataSigner';
import NetworkChecker, {netAlert} from '../../services/NetworkChecker';
import {
  LoginBodyType,
  LoginResponseType,
  OTPCreateBodyType,
  OTPUpdateBodyType,
  OTPUpdateResponseType,
  RegisterResponseType,
  bankOTPUpdateBodyType,
  bankOTPUpdateResponseType,
  getUserWalletBodyType,
  getUserWalletResponseType,
} from '../../services/api/ServerTypes';
import {customResponsiveWidth} from '../../utils/CustomResponsive';
import {saveUserInfo} from '../../utils/SecureInfo';
import AuthScreenWithFillUnFillButton from './AuthScreenWithFillUnFillButton';

const Description = (props: OTPScreenDescriptionPropsType) => {
  return (
    <View style={styles.description}>
      <Text style={styles.descriptionText}>
        {fa.screens.otp.activation_code_number}{' '}
        <Text style={styles.descriptionBoldText}>{props?.mobile_number} </Text>
        {fa.screens.otp.sent_enter_the_received_code_here}
      </Text>
    </View>
  );
};

const CustomTimer = React.forwardRef(
  (props: {onResendPress: () => void; expire_time?: string}, ref) => {
    const [count, setCount] = useState(props?.expire_time ?? 119); // seconds
    const [minute, setMinute] = useState('00');
    const [second, setSecond] = useState('00');
    const [isResendVisible, setIsResendVisible] = useState(false);

    function secondsToTime(secs: number) {
      var divisor_for_minutes = secs % (60 * 60);
      var minutes = Math.floor(divisor_for_minutes / 60);
      var divisor_for_seconds = divisor_for_minutes % 60;
      var seconds = Math.ceil(divisor_for_seconds);
      return {
        m: minutes,
        s: seconds,
      };
    }

    useEffect(() => {
      if (count >= 0) {
        const secondsLeft = setInterval(() => {
          setCount(c => c - 1);
          let timeLeftVar = secondsToTime(count);
          setMinute(timeLeftVar.m);
          setSecond(timeLeftVar.s);
        }, 1000);
        return () => clearInterval(secondsLeft);
      } else {
        setTimeout(() => {
          setIsResendVisible(true);
        }, 1000);
      }
    }, [count]);

    const timerReset = () => {
      setCount(props?.expire_time ?? 119);
      setTimeout(() => {
        setIsResendVisible(false);
      }, 1000);
    };

    useImperativeHandle(ref, () => ({
      timerReset,
    }));

    if (isResendVisible) {
      return (
        <TouchableOpacity
          activeOpacity={Assets.size.active_opacity}
          onPress={() => {
            props.onResendPress();
          }}>
          <Text style={styles.timerText}>
            {fa.screens.otp.resend_the_activation_code}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <Text style={styles.timerText}>
          {minute < 9 ? '0' + minute : minute}:
          {second < 9 ? '0' + second : second}
        </Text>
      );
    }
  },
);

const OTPScreen = (
  props: BaseAuthScreenPropsType &
    AuthScreenWithFillButtonPropsType &
    AuthScreenWithFillUnFillButtonPropsType,
) => {
  const {api} = useApi();
  const {sign_required} = useConfig();
  const dispatch = useDispatch();
  const {passkey, privateKey, certificate} = useAuth();
  const {wallet_id} = useWallet();
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const timerRef = useRef();

  const onLoginPress = () => {
    if (value?.length < 6) {
      setValidationEnabled(true);
    } else {
      NetworkChecker({
        onConnected: () => {
          if (props?.route?.params?.otp_type === 'PERSONAL') {
            otpMutaion.mutate({
              mobile: props?.route?.params?.mobile,
              national_code: props?.route?.params?.national_code,
              otp: value,
            });
          } else if (props?.route?.params?.otp_type === 'BANK') {
            bankOtpMutaion.mutate({
              username: props?.route?.params?.username,
              otp: value,
            });
          }
        },
        onDisConnected: () => {
          dispatch(netAlert);
        },
      });
    }
  };

  const registerMutaion = useMutation({
    mutationFn: async (body: OTPCreateBodyType) => {
      dispatch(showModal({id: 'Loading'}));
      return api?.otpCreate(body);
    },
    onSuccess: (data: RegisterResponseType) => {
      timerRef.current.timerReset();
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

  const onResendPress = () => {
    NetworkChecker({
      onConnected: () => {
        registerMutaion.mutate({
          national_code: props?.route?.params?.national_code,
          mobile: props?.route?.params?.mobile,
        });
      },
      onDisConnected: () => {
        dispatch(netAlert);
      },
    });
  };
  //personal
  const otpMutaion = useMutation({
    mutationFn: async (body: OTPUpdateBodyType) => {
      dispatch(showModal({id: 'Loading'}));
      return api?.otpUpdate(body);
    },
    onSuccess: async (data: OTPUpdateResponseType) => {
      loginOparation(data);
    },
  });
  //bank
  const bankOtpMutaion = useMutation({
    mutationFn: async (body: bankOTPUpdateBodyType) => {
      dispatch(showModal({id: 'Loading'}));
      return api?.bankOtpUpdate(body);
    },
    onSuccess: (data: bankOTPUpdateResponseType) => {
      loginOparation(data);
    },
  });

  const getUserWalletMutaion = useMutation({
    mutationFn: async (body: getUserWalletBodyType) => {
      return api?.getUserWallet(body);
    },
    onSuccess: (data: getUserWalletResponseType) => {
      setWallet()(dispatch, data);
      if (data?.has_wallet) {
        if (data?.wallet?.state === 'NORMAL') {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: Screens.TabScreen}],
            }),
          );
        } else {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: Screens.CreateWalletScreen,
                  params: {
                    national_code: props?.route?.params?.national_code,
                    mobile: props?.route?.params?.mobile,
                  },
                },
              ],
            }),
          );
        }
      } else {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: Screens.CreateWalletScreen,
                params: {
                  national_code: props?.route?.params?.national_code,
                  mobile: props?.route?.params?.mobile,
                },
              },
            ],
          }),
        );
      }
    },
  });

  const loginOparation = async (data: LoginResponseType) => {
    if (data?.action) {
      if (data?.action === actions.register_requierd) {
        dispatch(hideModal());
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: Screens.PersonalInfoScreen,
                params: {
                  national_code: props?.route?.params?.national_code,
                  mobile: props?.route?.params?.mobile,
                },
              },
            ],
          }),
        );
      }
    } else {
      if (passkey && !props?.route?.params?.is_forgot_password) {
        await login(data?.token)(dispatch);
        await saveUserInfo(data?.user);
        await setUserInfo()(dispatch, data?.user);
        setTimeout(async () => {
          if (sign_required) {
            if (privateKey) {
              let _data = {
                tokenSymbol: 'IRDR',
                walletID: wallet_id,
              };
              DataSigner(data, certificate).then(signData => {
                getUserWalletMutaion.mutate({
                  data: signData?.data,
                  sign: signData?.sign,
                  certificate: signData?.certificate,
                });
              });
            } else {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    {
                      name: Screens.CreateWalletScreen,
                      params: {
                        national_code: data?.user?.national_code,
                        mobile: props?.route?.params?.mobile,
                      },
                    },
                  ],
                }),
              );
            }
          } else {
            getUserWalletMutaion.mutate({});
          }
        }, 500);
      } else {
        dispatch(hideModal());
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: Screens.PINCodeScreen,
                params: {
                  national_code: data?.user?.national_code,
                  mobile: props?.route?.params?.mobile,
                  token: data?.token,
                  user: data?.user,
                },
              },
            ],
          }),
        );
      }
    }
  };

  const [validationEnabled, setValidationEnabled] = useState(false);

  return (
    <AuthScreenWithFillUnFillButton
      screen_title={fa.screens.otp.activation_code}
      fill_button_title={fa.screens.otp.login}
      on_fill_button_press={onLoginPress}
      un_fill_button_title={fa.screens.otp.modify_phone_number}
      on_un_fill_button_press={() => {
        props?.navigation.goBack();
      }}
      render_card_inside={
        <>
          <Description mobile_number={props?.route?.params?.mobile ?? '--'} />
          <CodeField
            ref={ref}
            {...codeFieldProps}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => {
              return (
                <Text
                  key={index}
                  style={[
                    styles.cell,
                    {
                      backgroundColor:
                        symbol?.length === 0 ? Colors.gray : Colors.bg,
                      borderColor:
                        validationEnabled && value?.length < 6
                          ? Colors.danger
                          : Colors.border_color,
                    },
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol === '' ? isFocused ? <Cursor /> : '-' : symbol}
                </Text>
              );
            }}
            onSubmitEditing={onLoginPress}
          />
          <View
            style={{
              minHeight: 3 * Assets.size.vertical_1,
            }}>
            {validationEnabled && value?.length < 6 && (
              <ValidationError
                error={fa.validations.enter_the_activation_code}
                container_style={{
                  marginTop: Assets.size.vertical_5,
                }}
              />
            )}
          </View>
          <CustomTimer
            ref={timerRef}
            expire_time={props?.route?.params?.expire_time}
            onResendPress={onResendPress}
          />
        </>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  description: {
    flexDirection: 'row',
    marginTop: 1.5 * Assets.size.vertical_1,
    marginBottom: Assets.size.vertical_3,
    marginHorizontal: Assets.size.horizontal_2,
  },
  descriptionText: {
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    color: Colors.text_2,
    textAlign: 'center',
  },
  descriptionBoldText: {
    fontFamily: Assets.font.bold,
  },
  timerText: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h5,
    color: Colors.primary,
    marginHorizontal: Assets.size.horizontal_1,
    marginVertical: Assets.size.vertical_2,
  },
  codeFieldRoot: {
    marginHorizontal: Assets.size.horizontal_2,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  cell: {
    width:
      (customResponsiveWidth(100) -
        (4 * Assets.size.horizontal_2 + 5 * Assets.size.horizontal_4)) /
      6,
    height:
      (customResponsiveWidth(100) -
        (4 * Assets.size.horizontal_2 + 5 * Assets.size.horizontal_4)) /
      6,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h6,
    elevation: Assets.size.elevation_1,
    borderRadius: Assets.size.border_2,
    borderWidth: Assets.size.line,
    color: Colors.text_2,
  },
});

export default OTPScreen;
