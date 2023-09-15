//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {PINCodeScreenHintPropsType, PINCodeScreenPropsType} from '../../Types';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';
import {fa} from '../../i18n/fa-IR';
import {Screens} from '../../rout/types/RootStackTypes';
import PasswordPadScreen from './PasswordPadScreen';
import {useIsFocused} from '@react-navigation/native';

const Hint = (props: PINCodeScreenHintPropsType) => {
  return <Text style={styles.hintText}>{props.message}</Text>;
};

const PINCodeScreen = (props: PINCodeScreenPropsType) => {
  const [pin, setPin] = useState('');
  const [pinState, setPinState] = useState('normal'); // 'normal' | 'error' | 'success'
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setPin('');
    }
  }, [isFocused]);

  useEffect(() => {
    if (pin?.length === 6) {
      setTimeout(() => {
        props?.navigation.navigate(Screens.PINCodeConfirmScreen, {
          pin_code: pin,
          national_code: props?.route?.params?.national_code,
          mobile: props?.route?.params?.mobile,
          token: props?.route?.params?.token,
          user: props?.route?.params?.user,
        });
      }, 100);
    }
  }, [
    pin,
    props?.navigation,
    props?.route?.params?.mobile,
    props?.route?.params?.national_code,
    props?.route?.params?.token,
    props?.route?.params?.user,
  ]);

  return (
    <PasswordPadScreen
      navigation={props.navigation}
      pad_title={fa.screens.pin_code.password}
      pin={pin}
      onKeyPress={key => {
        if (key === 'backspace') {
          setPin(prev => prev.replace(/.$/, ''));
        } else {
          if (pin?.length < 6) {
            setPin(prev => `${prev}${key}`);
          }
        }
      }}
      fingerprint_button={false}
      pin_state={pinState}>
      <Hint
        message={
          fa.screens.pin_code
            .in_order_to_secure_and_perform_financial_processes_entering_a_password_is_required
        }
      />
    </PasswordPadScreen>
  );
};

const styles = StyleSheet.create({
  hintText: {
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    color: Colors.primary,
    textAlign: 'center',
    marginHorizontal: Assets.size.horizontal_1,
    marginBottom: Assets.size.vertical_1,
  },
});

export default PINCodeScreen;
