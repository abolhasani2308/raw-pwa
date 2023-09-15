//@ts-nocheck
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BaseAuthScreenPropsType,
  AuthScreenWithFillButtonPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import CustomButton from '../../components/CustomButton';
import BaseAuthScreen from './BaseAuthScreen';

const AuthScreenWithFillButton = (
  props: BaseAuthScreenPropsType & AuthScreenWithFillButtonPropsType,
) => {
  return (
    <BaseAuthScreen
      {...props}
      render_card_under={
        <>
          <View style={styles.spacer} />
          {props?.render_card_under}
          <CustomButton
            fill
            title={props?.fill_button_title}
            container_style={styles.button}
            onPress={props?.on_fill_button_press}
          />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  spacer: {
    flex: 1,
  },
  button: {
    marginBottom: Assets.size.vertical_1,
    marginTop: Assets.size.vertical_1,
  },
});

export default AuthScreenWithFillButton;
