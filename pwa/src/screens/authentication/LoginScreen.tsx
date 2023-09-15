//@ts-nocheck
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {
  AuthScreenWithFillButtonPropsType,
  BaseAuthScreenPropsType,
  LoginScreenUnderlineButtonPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {usePassword} from '../../common/hooks/Validations';
import CustomButton from '../../components/CustomButton';
import AuthField from '../../components/fields/AuthField';
import {Colors} from '../../configs/Colors';
import {fa} from '../../i18n/fa-IR';
import {useApi} from '../../providers/ApiProvider';
import {showModal} from '../../redux/actions/ModalActions';
import {setWallet} from '../../redux/actions/WalletActions';
import {useAuth} from '../../redux/selectors/AuthSelector';
import {Screens} from '../../rout/types/RootStackTypes';
import NetworkChecker, {netAlert} from '../../services/NetworkChecker';
import {
  getUserWalletBodyType,
  getUserWalletResponseType,
} from '../../services/api/ServerTypes';
import {readUsernamePassword} from '../../utils/SecureInfo';
import AuthScreenWithFillButton from './AuthScreenWithFillButton';
import {getUserInfo} from '../../redux/actions/UserActions';
import {useWallet} from '../../redux/selectors/WalletSelector';
import {useConfig} from '../../redux/selectors/ConfigSelector';
import {DataSigner} from '../../services/DataSigner';

const UnderlineButton = (props: LoginScreenUnderlineButtonPropsType) => {
  return (
    <TouchableOpacity
      style={styles.underlineButtonContainer}
      activeOpacity={Assets.size.active_opacity}
      {...props}>
      <Text style={styles.underlineButtonText}>{props.message}</Text>
    </TouchableOpacity>
  );
};

const LoginScreen = (
  props: BaseAuthScreenPropsType & AuthScreenWithFillButtonPropsType,
) => {
  const {api} = useApi();
  const {sign_required} = useConfig();
  const dispatch = useDispatch();
  const {fingerprint, privateKey, certificate} = useAuth();
  const {wallet_id} = useWallet();
  const [validationEnabled, setValidationEnabled] = useState(false);
  const [is_finger_available, set_is_finger_available] = useState(false);

  const {
    value: password,
    setValue: setPassword,
    result: passwordValidation,
    checkError: checkErrorPassword,
  } = usePassword(!validationEnabled);

  const onLoginPress = () => {
    if (checkErrorPassword()) {
      setValidationEnabled(true);
    } else {
      dispatch(showModal({id: 'Loading'}));
      readUsernamePassword
        .then((info: {username: string; password: string}) => {
          if (password === info?.password) {
            NetworkChecker({
              onConnected: async () => {
                if (sign_required) {
                  if (privateKey) {
                    let data = {
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
                    getUserInfo()(dispatch);
                    props.navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{name: Screens.CreateWalletScreen}],
                      }),
                    );
                  }
                } else {
                  getUserWalletMutaion.mutate({});
                }
              },
              onDisConnected: () => {
                dispatch(netAlert);
              },
            });
          } else {
            dispatch(
              showModal({
                id: 'AlertBox',
                modalProps: {
                  message: fa.client_error.the_password_entered_is_not_correct,
                },
              }),
            );
          }
        })
        .catch(() => {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: Screens.RegisterScreen}],
            }),
          );
        });
    }
  };

  const getUserWalletMutaion = useMutation({
    mutationFn: async (body: getUserWalletBodyType) => {
      return api?.getUserWallet(body);
    },
    onSuccess: (data: getUserWalletResponseType) => {
      setWallet()(dispatch, data);
      getUserInfo()(dispatch);
      if (data?.has_wallet) {
        if (data?.wallet?.state === 'NORMAL') {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: Screens.TabScreen,
                  params: {
                    payment_status: props?.route?.params?.payment_status,
                  },
                },
              ],
            }),
          );
        } else {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: Screens.CreateWalletScreen}],
            }),
          );
        }
      } else {
        getUserInfo()(dispatch);
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: Screens.CreateWalletScreen}],
          }),
        );
      }
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    if (fingerprint) {
      rnBiometrics.isSensorAvailable().then(biometryType => {
        if (
          biometryType?.available &&
          biometryType?.biometryType === BiometryTypes.Biometrics
        ) {
          set_is_finger_available(true);
        }
      });
    }
  }, [fingerprint, rnBiometrics]);

  return (
    <AuthScreenWithFillButton
      screen_title={fa.screens.login.user_login}
      fill_button_title={fa.screens.login.new_user_registration}
      on_fill_button_press={() => {
        props.navigation.navigate(Screens.RegisterScreen);
      }}
      render_card_inside={
        <>
          <AuthField
            label={fa.screens.login.password}
            container_style={styles.passwordInput}
            textAlign={'right'}
            secureTextEntry={true}
            keyboardType="number-pad"
            state={
              validationEnabled && checkErrorPassword() ? 'error' : 'normal'
            }
            value={password}
            onChangeText={setPassword}
            error={passwordValidation.error}
            onSubmitEditing={onLoginPress}
            returnKeyType="done"
          />
          <UnderlineButton
            message={fa.screens.login.password_recovery}
            onPress={() => {
              props.navigation.navigate(Screens.RegisterScreen, {
                is_forgot_password: true,
              });
            }}
          />
          <CustomButton
            fill
            title={fa.screens.login.login}
            container_style={styles.loginButton}
            secondary
            onPress={onLoginPress}
          />
        </>
      }
      render_card_under={
        <>
          {is_finger_available && (
            <TouchableOpacity
              style={styles.fingerprintArea}
              activeOpacity={Assets.size.active_opacity}
              onPress={() => {
                rnBiometrics
                  .simplePrompt({
                    promptMessage: fa.screens.login.biometric_login,
                    cancelButtonText: fa.screens.login.cancel,
                  })
                  .then(resultObject => {
                    const {success} = resultObject;
                    if (success) {
                      dispatch(showModal({id: 'Loading'}));
                      NetworkChecker({
                        onConnected: async () => {
                          if (sign_required) {
                            if (privateKey) {
                              let data = {
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
                              getUserInfo()(dispatch);
                              props.navigation.dispatch(
                                CommonActions.reset({
                                  index: 1,
                                  routes: [{name: Screens.CreateWalletScreen}],
                                }),
                              );
                            }
                          } else {
                            getUserWalletMutaion.mutate({});
                          }
                        },
                        onDisConnected: () => {
                          dispatch(netAlert);
                        },
                      });
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }}>
              <Assets.svg.fingerprint_1
                height={2.5 * Assets.size.icon_1}
                width={2.5 * Assets.size.icon_1}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.question}>
            {fa.screens.login.dont_have_an_account}
          </Text>
        </>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  underlineButtonText: {
    color: Colors.primary,
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    textDecorationLine: 'underline',
  },
  underlineButtonContainer: {
    alignSelf: 'flex-end',
    paddingHorizontal: Assets.size.horizontal_2,
    paddingTop: Assets.size.vertical_4,
    paddingBottom: Assets.size.vertical_2,
  },
  passwordInput: {
    marginTop: Assets.size.vertical_2,
  },
  loginButton: {
    marginBottom: Assets.size.vertical_1,
    marginTop: Assets.size.vertical_4,
    alignSelf: 'stretch',
  },
  fingerprintArea: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: Assets.size.horizontal_1,
    paddingVertical: Assets.size.vertical_1,
    marginVertical: Assets.size.vertical_3,
  },
  question: {
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h6,
    color: Colors.text_2,
    alignSelf: 'center',
    marginBottom: -Assets.size.vertical_3,
  },
});

export default LoginScreen;
