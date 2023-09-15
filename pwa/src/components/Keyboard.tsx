//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardButtonPropsType, KeyboardPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';

const Button = (props: KeyboardButtonPropsType) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      activeOpacity={Assets.size.active_opacity}
      disabled={
        (props.item.key === 'fingerprint' && !props.fingerprint_button) ||
        (props.item.key === 'backspace' && props.backspace_disabled)
      }
      {...props}>
      {props.item?.icon ? (
        props.item.key === 'fingerprint' &&
        !props.fingerprint_button ? null : props.item.key === 'backspace' &&
          props.backspace_disabled ? (
          <Assets.svg.backspace_2 height={1.4 * Assets.size.icon_1} />
        ) : (
          <props.item.icon height={1.4 * Assets.size.icon_1} />
        )
      ) : (
        <Text style={styles.buttonText}>{props.item?.key}</Text>
      )}
    </TouchableOpacity>
  );
};

const Keyboard = (props: KeyboardPropsType) => {
  const rows = [
    [
      {
        key: '1',
        value: 1,
        icon: null,
      },
      {
        key: '2',
        value: 2,
        icon: null,
      },
      {
        key: '3',
        value: 3,
        icon: null,
      },
    ],
    [
      {
        key: '4',
        value: 4,
        icon: null,
      },
      {
        key: '5',
        value: 5,
        icon: null,
      },
      {
        key: '6',
        value: 6,
        icon: null,
      },
    ],
    [
      {
        key: '7',
        value: 7,
        icon: null,
      },
      {
        key: '8',
        value: 8,
        icon: null,
      },
      {
        key: '9',
        value: 9,
        icon: null,
      },
    ],
    [
      {
        key: 'fingerprint',
        value: 'fingerprint',
        icon: Assets.svg.fingerprint_2,
      },
      {
        key: '0',
        value: 0,
        icon: null,
      },
      {
        key: 'backspace',
        value: 'backspace',
        icon: Assets.svg.backspace_1,
      },
    ],
  ];
  return (
    <View style={props.container_style}>
      {rows.map((item, index) => {
        return (
          <View style={styles.column} key={index}>
            {item.map((_item, _index) => {
              return (
                <Button
                  item={_item}
                  key={_index}
                  onPress={() => {
                    props.onKeyPress(_item.key);
                  }}
                  fingerprint_button={props.fingerprint_button}
                  backspace_disabled={
                    props.value?.length === 0 || props.status === 'success'
                  }
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Assets.size.horizontal_3,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h1,
    color: Colors.primary,
    marginVertical: Assets.size.vertical_4,
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Assets.size.horizontal_3,
  },
});

export default Keyboard;
