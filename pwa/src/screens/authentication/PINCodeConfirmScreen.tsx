//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {PINCodeConfirmScreenPropsType} from '../../Types';
import CustomButton from '../../components/CustomButton';
import {fa} from '../../i18n/fa-IR';
import {
  login,
  removeFingerPrint,
  setFingerPrint,
  setPasskey,
} from '../../redux/actions/AuthActions';
import {hideModal, showModal} from '../../redux/actions/ModalActions';
import {saveUserInfo, saveUsernamePassword} from '../../utils/SecureInfo';
import PasswordPadScreen from './PasswordPadScreen';
import {useApi} from '../../providers/ApiProvider';
import {useMutation} from 'react-query';
import {CommonActions} from '@react-navigation/native';
import {Screens} from '../../rout/types/RootStackTypes';
import NetworkChecker, {netAlert} from '../../services/NetworkChecker';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {
  getUserWalletBodyType,
  getUserWalletResponseType,
} from '../../services/api/ServerTypes';
import {setWallet} from '../../redux/actions/WalletActions';
import {getUserInfo, setUserInfo} from '../../redux/actions/UserActions';
import {useAuth} from '../../redux/selectors/AuthSelector';
import {useWallet} from '../../redux/selectors/WalletSelector';
import {useConfig} from '../../redux/selectors/ConfigSelector';
import {DataSigner} from '../../services/DataSigner';

const PINCodeConfirmScreen = (props: PINCodeConfirmScreenPropsType) => {
  const dispatch = useDispatch();
  const {api} = useApi();
  const {sign_required} = useConfig();
  const {privateKey, certificate} = useAuth();
  const passwordPadRef = useRef();
  const {wallet_id} = useWallet();
  const [pin, setPin] = useState('');
  const [pinState, setPinState] = useState('normal'); // 'normal' | 'error' | 'success'
  const [error_visible, set_error_visible] = useState(false);
  const [is_finger_available, set_is_finger_available] = useState(false);

  useEffect(() => {
    removeFingerPrint()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    let prev_pin = props?.route?.params?.pin_code;
    if (pin?.length === 6) {
      if (pin === prev_pin) {
        setTimeout(() => {
          setPinState('success');
        }, 200);
      } else {
        setTimeout(() => {
          setPinState('error');
          set_error_visible(true);
          passwordPadRef.current.errorAnimation();
        }, 200);
        setTimeout(() => {
          setPin('');
          setPinState('normal');
        }, 1000);
      }
    }
  }, [
    dispatch,
    pin,
    props.navigation,
    props?.route?.params?.mobile,
    props?.route?.params?.national_code,
    props?.route?.params?.pin_code,
  ]);

  useEffect(() => {
    if (error_visible) {
      setTimeout(() => {
        set_error_visible(false);
      }, 3000);
    }
  }, [error_visible]);

  const getUserWalletMutaion = useMutation({
    mutationFn: async (body: getUserWalletBodyType) => {
      dispatch(showModal({id: 'Loading'}));
      return api?.getUserWallet(body);
    },
    onSuccess: (data: getUserWalletResponseType) => {
      dispatch(hideModal());
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

  const onComplitPress = async () => {
    let national_code = props?.route?.params?.national_code;
    let mobile = props?.route?.params?.mobile;
    let token = props?.route?.params?.token;
    let user = props?.route?.params?.user;
    saveUsernamePassword(`${national_code}-${mobile}`, pin);
    setPasskey()(dispatch);
    await login(token)(dispatch);
    await saveUserInfo(user);
    await setUserInfo()(dispatch, user);
    setTimeout(() => {
      NetworkChecker({
        onConnected: async () => {
          if (sign_required) {
            if (privateKey) {
              let _data = {
                tokenSymbol: 'IRDR',
                walletID: wallet_id,
              };
              DataSigner(_data, certificate).then(signData => {
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
                        national_code: props?.route?.params?.national_code,
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
        },
        onDisConnected: () => {
          dispatch(netAlert);
        },
      });
    }, 500);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rnBiometrics = new ReactNativeBiometrics();
  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(biometryType => {
      if (
        biometryType?.available &&
        biometryType?.biometryType === BiometryTypes.Biometrics
      ) {
        set_is_finger_available(true);
      }
    });
  }, [rnBiometrics]);

  return (
    <PasswordPadScreen
      navigation={props.navigation}
      ref={passwordPadRef}
      pad_title={fa.screens.pin_code.repeat_the_password}
      pin={pin}
      onKeyPress={key => {
        if (key === 'backspace') {
          setPinState('normal');
          setPin(prev => prev.replace(/.$/, ''));
        } else if (key === 'fingerprint') {
          dispatch(
            showModal({
              id: 'Native',
              modalProps: {
                title: fa.screens.pin_code.fingerprint_activation,
                message:
                  fa.screens.pin_code
                    .in_order_to_increase_information_security_it_is_recommended_to_enable_fingerprint_login,
                onConfirmPress: () => {
                  rnBiometrics
                    .simplePrompt({
                      promptMessage: fa.screens.pin_code.enable_biometric_login,
                      cancelButtonText: fa.screens.pin_code.cancel,
                    })
                    .then(resultObject => {
                      const {success} = resultObject;
                      if (success) {
                        setFingerPrint()(dispatch);
                        onComplitPress();
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                },
                onCancelPress: () => {},
                confirmTitle: fa.screens.pin_code.confirmation,
                cancelTitle: fa.screens.pin_code.rejection,
              },
            }),
          );
        } else {
          if (pin?.length < 6) {
            setPin(prev => `${prev}${key}`);
          }
        }
      }}
      fingerprint_button={is_finger_available && pinState === 'success'}
      pin_state={pinState}
      validation_message={
        fa.validations.repeat_password_does_not_match_password
      }
      error_visible={error_visible}>
      {pinState === 'success' ? (
        <CustomButton
          fill
          title={fa.screens.pin_code.complete_registration}
          onPress={onComplitPress}
        />
      ) : (
        <CustomButton
          title={fa.screens.pin_code.comeback}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      )}
    </PasswordPadScreen>
  );
};

export default PINCodeConfirmScreen;
