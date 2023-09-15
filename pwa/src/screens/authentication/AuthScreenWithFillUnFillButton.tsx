//@ts-nocheck
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BaseAuthScreenPropsType,
  AuthScreenWithFillButtonPropsType,
  AuthScreenWithFillUnFillButtonPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import CustomButton from '../../components/CustomButton';
import BaseAuthScreen from './BaseAuthScreen';

const AuthScreenWithFillUnFillButton = (
  props: BaseAuthScreenPropsType &
    AuthScreenWithFillButtonPropsType &
    AuthScreenWithFillUnFillButtonPropsType,
) => {
  return (
    <BaseAuthScreen
      render_card_under={
        <>
          <View style={styles.spacer} />
          {props?.render_card_under}
          <CustomButton
            fill
            title={props?.fill_button_title}
            container_style={styles.fillButton}
            onPress={props?.on_fill_button_press}
          />
          <CustomButton
            title={props?.un_fill_button_title}
            container_style={styles.unFillButton}
            onPress={props?.on_un_fill_button_press}
          />
        </>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  fillButton: {
    marginTop: Assets.size.vertical_1,
  },
  unFillButton: {
    marginTop: Assets.size.vertical_2,
    marginBottom: Assets.size.vertical_1,
  },
  spacer: {
    flex: 1,
  },
});

export default AuthScreenWithFillUnFillButton;
