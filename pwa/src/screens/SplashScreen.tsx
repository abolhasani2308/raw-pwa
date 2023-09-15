//@ts-nocheck
import {CommonActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SplashScreenPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {customResponsiveHeight} from '../utils/CustomResponsive';
import ScreenWrapper from './ScreenWrapper';
import {useAuth} from '../redux/selectors/AuthSelector';
import {Screens} from '../rout/types/RootStackTypes';
import {getWalletId} from '../redux/actions/WalletActions';
import {useDispatch} from 'react-redux';
import {useMutation} from 'react-query';
import {useApi} from '../providers/ApiProvider';
import {splashResponseType} from '../services/api/ServerTypes';
import {setBankWalletId, setSignRequired} from '../redux/actions/ConfigActions';
import NetworkChecker from '../services/NetworkChecker';
import {showModal} from '../redux/actions/ModalActions';
import {fa} from '../i18n/fa-IR';
import RNExitApp from 'react-native-exit-app';
import {readCertificate} from '../utils/SecureInfo';
import {setCertificate} from '../redux/actions/AuthActions';

const SplashScreen = (props: SplashScreenPropsType) => {
  const {isLoading, isLogin, passkey} = useAuth();
  const dispatch = useDispatch();
  const {api} = useApi();

  useEffect(() => {
    setTimeout(() => {
      if (!isLoading) {
        getWalletId()(dispatch);
        readCertificate.then(certificate => {
          setCertificate()(dispatch, certificate);
        });
        NetworkChecker({
          onConnected: () => {
            splashMutaion.mutate();
          },
          onDisConnected: () => {
            dispatch(
              showModal({
                id: 'Native',
                modalProps: {
                  title: fa.server_errors.default,
                  message:
                    fa.root
                      .check_your_internet_status_internet_connection_is_required_to_enter_the_software,
                  onConfirmPress: () => {
                    RNExitApp.exitApp();
                  },
                  confirmTitle: fa.root.confirm,
                },
              }),
            );
          },
        });
      }
    }, 1000);
  }, [dispatch, isLoading, isLogin, passkey, props.navigation]);

  const splashMutaion = useMutation({
    mutationFn: async () => {
      return api?.splash();
    },
    onSuccess: (data: splashResponseType) => {
      setSignRequired()(dispatch, data?.sign_required);
      setBankWalletId()(dispatch, data?.bank_wallet_id);
      if (isLogin && passkey) {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: Screens.LoginScreen}],
          }),
        );
      } else {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: Screens.RegisterScreen}],
          }),
        );
      }
    },
    onError: () => {
      dispatch(
        showModal({
          id: 'Native',
          modalProps: {
            title: fa.server_errors.default,
            message:
              fa.root
                .due_to_the_inability_to_communicate_with_the_server_it_is_not_possible_to_use_the_software,
            onConfirmPress: () => {
              RNExitApp.exitApp();
            },
            confirmTitle: fa.root.confirm,
          },
        }),
      );
    },
  });

  return (
    <ScreenWrapper
      navigation={props.navigation}
      screen_style={styles.areaContainer}>
      <Assets.svg.parsian_bank_logo_1 height={customResponsiveHeight(28)} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
