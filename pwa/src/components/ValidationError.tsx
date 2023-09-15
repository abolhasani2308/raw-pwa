//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ValidationErrorPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {
  customResponsiveFont,
  customResponsiveHeight,
  customResponsiveWidth,
} from '../utils/CustomResponsive';

const ValidationError = (props: ValidationErrorPropsType) => {
  return (
    <View style={[styles.errorWrapper, props.container_style]}>
      <Text style={styles.errorText}>{props.error}</Text>
      <Assets.svg.circle_x_filled
        height={customResponsiveFont(2)}
        width={customResponsiveFont(2)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: Assets.size.horizontal_2,
    marginTop: customResponsiveHeight(0.8),
  },
  errorText: {
    color: Colors.danger,
    fontSize: Assets.font.sub_1,
    fontFamily: Assets.font.light,
    marginRight: customResponsiveWidth(1),
  },
});

export default ValidationError;
