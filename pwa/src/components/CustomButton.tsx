//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CustomButtonPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';

const CustomButton = (props: CustomButtonPropsType) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: props.fill
            ? props.secondary
              ? Colors.secondary
              : Colors.primary
            : 'transparent',
          elevation: props.fill ? Assets.size.elevation_1 : 0,
          borderWidth: props.text_only ? 0 : props.fill ? 0 : Assets.size.line,
          borderColor: Colors.text_3,
        },
        props.container_style,
      ]}
      activeOpacity={Assets.size.active_opacity}
      {...props}>
      <Text
        style={[
          styles.title,
          {
            color: props.text_only
              ? Colors.text_2
              : props.fill
              ? Colors.bg
              : Colors.text_3,
          },
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Assets.size.button_1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Assets.size.horizontal_2,
    borderRadius: Assets.size.border_2,
  },
  title: {
    fontFamily: Assets.font.medium,
    fontSize: Assets.font.h6,
  },
});

export default CustomButton;
