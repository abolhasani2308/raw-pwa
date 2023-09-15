//@ts-nocheck
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {LabelPropsType} from '../Types';
import Assets from '../assets/Assets';

const Label = (props: LabelPropsType) => {
  return (
    <Text
      style={[
        styles.labelText,
        {
          color: props?.color,
        },
      ]}>
      {props?.label}
    </Text>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: Assets.font.h6,
    fontFamily: Assets.font.regular,
    marginBottom: Assets.size.vertical_5,
    marginRight: Assets.size.horizontal_2,
  },
});

export default Label;
