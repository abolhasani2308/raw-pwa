//@ts-nocheck
import React from 'react';
import {Linking, PermissionsAndroid, StyleSheet, View} from 'react-native';
import {HomeScreenPropsType} from '../../Types';
import Assets from '../../assets/Assets';
import IconTitleButton from '../../components/IconTitleButton';
import WalletAddress from '../../components/WalletAddress';
import {fa} from '../../i18n/fa-IR';
import {Screens} from '../../rout/types/RootStackTypes';
import {
  customResponsiveHeight,
  customResponsiveWidth,
} from '../../utils/CustomResponsive';
import DashboardWithTitleButtonScreen from './DashboardWithTitleButtonScreen';
import Balance from '../../components/Balance';
import {Tabs} from '../../rout/types/TabNavigation';
import {useDispatch} from 'react-redux';
import {showModal} from '../../redux/actions/ModalActions';

const HomeScreen = (props: HomeScreenPropsType) => {
  const dispatch = useDispatch();

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

  const buttons = [
    {
      title: fa.screens.dashboard_active.deposit,
      icon: Assets.svg.deposit,
      action: () => {
        props?.navigation.navigate(Screens.ShowQRCodeScreen);
      },
    },
    {
      title: fa.screens.dashboard_active.scan,
      icon: Assets.svg.scan,
      action: getCameraPermition,
    },
    {
      title: fa.screens.dashboard_active.charge,
      icon: Assets.svg.cash_3,
      action: () => {
        props.navigation.navigate(Tabs.Charge);
      },
    },
  ];


  return (
    <DashboardWithTitleButtonScreen
      screen_type={''}
      render_card_inside_5={null}
      list_title={fa.screens.dashboard_active.recent_activities}
      render_card_inside_1={
        <WalletAddress container_style={styles.walletAddress} />
      }
      render_card_inside_2={
        <Balance
          container_style={styles.balance}
          onEmptyPress={() => {
            props?.navigation.navigate(Tabs.Charge);
          }}
        />
      }
      render_card_inside_3={
        <View style={styles.buttons}>
          {buttons.map((item, index) => {
            return (
              <IconTitleButton
                icon={item?.icon}
                title={item?.title}
                key={index}
                size={
                  (customResponsiveWidth(100) - 2 * Assets.size.horizontal_5) /
                    3 -
                  Assets.size.horizontal_4
                }
                onPress={item?.action}
              />
            );
          })}
        </View>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  walletAddress: {
    marginTop: Assets.size.first_item_position_2,
    marginHorizontal: Assets.size.horizontal_5,
    marginBottom: Assets.size.vertical_2,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Assets.size.vertical_2,
    marginHorizontal: Assets.size.horizontal_5,
  },
  balance: {
    marginHorizontal: Assets.size.horizontal_5,
    marginTop: customResponsiveHeight(2),
  },
});

export default HomeScreen;
