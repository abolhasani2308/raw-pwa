//@ts-nocheck
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import 'react-native-reanimated';
import {BarcodeScannerScreenPropsType} from '../Types';
import Assets from '../assets/Assets';
import IconButton from '../components/IconButton';
import {Colors} from '../configs/Colors';
import {Tabs} from '../rout/types/TabNavigation';
import {
  customResponsiveHeight,
  customResponsiveWidth,
} from '../utils/CustomResponsive';
import ScreenWrapper from './ScreenWrapper';

const BarcodeScannerScreen = (props: BarcodeScannerScreenPropsType) => {
  const [flash, set_flash] = useState(false);

  return (
    <ScreenWrapper
      screen_style={styles.areaContainer}
      navigation={props.navigation}>
      <RNCamera
        style={styles.cameraFrame}
        captureAudio={false}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        onBarCodeRead={res => {
          props?.navigation.navigate(Tabs.Transfer, {
            wallet_address: res?.data,
          });
        }}
      />
      <IconButton
        icon={Assets.svg.close_2}
        container_style={[styles.button, styles.close]}
        onPress={() => {
          props?.navigation.goBack();
        }}
      />
      <IconButton
        icon={Assets.svg.flash}
        container_style={[styles.button, styles.flash]}
        onPress={() => {
          set_flash(!flash);
        }}
      />
      <View style={styles.frame} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraFrame: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    position: 'absolute',
    top: 0,
    paddingHorizontal: Assets.size.horizontal_3,
    height: Assets.size.header_large,
  },
  close: {
    left: 0,
  },
  flash: {
    right: 0,
  },
  frame: {
    height: customResponsiveHeight(50),
    width: customResponsiveWidth(68),
    borderWidth: 2 * Assets.size.line,
    borderColor: Colors.black,
  },
});

export default BarcodeScannerScreen;
