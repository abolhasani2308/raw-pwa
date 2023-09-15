//@ts-nocheck
import React, {useImperativeHandle, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {PasswordPadPropsType} from '../Types';
import Assets from '../assets/Assets';
import CardTitle from '../components/CardTitle';
import Keyboard from '../components/Keyboard';
import {Colors} from '../configs/Colors';
import ValidationError from './ValidationError';

const PasswordPad = React.forwardRef((props: PasswordPadPropsType, ref) => {
  const indicatorRef = useRef([]);

  const indicatorScaler = (index: number) => {
    indicatorRef.current[index].transitionTo({
      transform: [
        {
          scale: 1.5,
        },
      ],
    });
    setTimeout(() => {
      indicatorRef.current[index].transitionTo({
        transform: [
          {
            scale: 1,
          },
        ],
      });
    }, 1);
  };
  const viewRef = useRef(null);
  const shake = () => {
    viewRef.current?.animate('shake');
  };

  const errorAnimation = () => {
    shake();
  };

  useImperativeHandle(ref, () => ({
    errorAnimation,
  }));

  const cyrcles = [1, 2, 3, 4, 5, 6];

  return (
    <View style={props.container_style}>
      <CardTitle title={props.pad_title} container_style={styles.screenTitle} />
      <Animatable.View ref={viewRef} useNativeDriver style={styles.indicators}>
        {cyrcles.map((_, index) => {
          return (
            <Animatable.View
              duration={700}
              useNativeDriver
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    props.pin_state === 'error'
                      ? Colors.danger
                      : props.pin_state === 'success'
                      ? Colors.success
                      : props.pin?.length >= index + 1
                      ? Colors.secondary
                      : Colors.text_3,
                },
              ]}
              ref={ref => (indicatorRef.current[index] = ref)}
            />
          );
        })}
      </Animatable.View>
      {props.error_visible && (
        <ValidationError
          container_style={styles.validationError}
          error={props.validation_message}
        />
      )}
      <Keyboard
        container_style={[
          !props.error_visible && {
            marginTop: 1.5 * Assets.size.vertical_1,
          },
        ]}
        onKeyPress={key => {
          if (key !== 'backspace' && key !== 'fingerprint') {
            if (props.pin?.length < 6) {
              indicatorScaler(props.pin?.length);
            }
          }
          props.onKeyPress(key);
        }}
        fingerprint_button={props.fingerprint_button}
        value={props.pin}
        status={props.pin_state}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  screenTitle: {
    alignSelf: 'center',
    marginBottom: Assets.size.vertical_2,
  },
  hintText: {
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    color: Colors.primary,
    textAlign: 'center',
    marginHorizontal: Assets.size.horizontal_1,
    marginBottom: Assets.size.vertical_1,
  },
  indicators: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  indicator: {
    width: Assets.size.indicator_1,
    height: Assets.size.indicator_1,
    borderRadius: Assets.size.indicator_1,
    marginHorizontal: Assets.size.horizontal_4,
  },
  validationError: {
    alignSelf: 'center',
    minHeight: 1.5 * Assets.size.vertical_1,
    marginTop: 0,
  },
});

export default PasswordPad;
