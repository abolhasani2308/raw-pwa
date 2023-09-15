//@ts-nocheck
import React from 'react';
import {BackHandler, SafeAreaView, StyleSheet} from 'react-native';
import {ScreenWrapperPropsType} from '../Types';
import HideLoading from '../common/HideLoading';
import {Colors} from '../configs/Colors';
import DeepLink from '../rout/DeepLink';
import {useDispatch} from 'react-redux';
import {showModal} from '../redux/actions/ModalActions';
import {fa} from '../i18n/fa-IR';
import {setAllHistory, setChargeHistory} from '../redux/actions/HistoryActions';
import {useApi} from '../providers/ApiProvider';
import {useFocusEffect} from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app';

const ScreenWrapper = (props: ScreenWrapperPropsType) => {
  const dispatch = useDispatch();
  HideLoading();
  const {api} = useApi();
  const loadResource = () => {
    api?.transactionsIndex({type: 'CHARGE', page: 1}).then(res => {
      setChargeHistory()(dispatch, res?.data);
    });
    api?.transactionsIndex({type: '', page: 1}).then(res => {
      setAllHistory()(dispatch, res?.data);
    });
  };

  // const errorMessage = () => {
  //   dispatch(
  //     showModal({
  //       id: 'AlertBox',
  //       modalProps: {
  //         message: fa.client_error.transaction_failed,
  //       },
  //     }),
  //   );
  // };
  // const unknownMessage = () => {
  //   dispatch(
  //     showModal({
  //       id: 'AlertBox',
  //       modalProps: {
  //         message: fa.client_error.uncertain_transaction,
  //       },
  //     }),
  //   );
  // };
  // const successMessage = () => {
  //   dispatch(
  //     showModal({
  //       id: 'Toast',
  //       modalProps: {
  //         message: fa.server_message.successful_transaction,
  //       },
  //     }),
  //   );
  // };

  DeepLink({
    navigation: props?.navigation,
    callback: loadResource,
    // errorMessage: errorMessage,
    // unknownMessage: unknownMessage,
    // successMessage: successMessage,
  });

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (props?.navigation.canGoBack()) {
          props?.navigation.goBack();
          return true;
        } else {
          dispatch(
            showModal({
              id: 'Native',
              modalProps: {
                title: fa.root.exit,
                message: fa.root.would_you_like_to_exit,
                onConfirmPress: () => {
                  RNExitApp.exitApp();
                },
                onCancelPress: () => {},
                confirmTitle: fa.root.yes,
                cancelTitle: fa.root.no,
              },
            }),
          );
          return true;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [dispatch, props?.navigation]),
  );

  return (
    <SafeAreaView style={[styles.areaContainer, props.screen_style]}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
});

export default ScreenWrapper;
