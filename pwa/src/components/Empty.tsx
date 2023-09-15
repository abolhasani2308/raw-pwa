//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {EmptyPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {fa} from '../i18n/fa-IR';
import {customResponsiveHeight} from '../utils/CustomResponsive';

const Empty = (props: EmptyPropsType) => {
  return (
    <View style={[styles.container, props?.container_style]}>
      <Assets.svg.arrows
        height={customResponsiveHeight(14)}
        width={customResponsiveHeight(14)}
      />
      <Text style={styles.message}>
        {props?.message || fa.screens.dashboard_active.you_have_no_transactions}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2 * Assets.size.vertical_1 - Assets.size.vertical_2,
    paddingBottom: 2 * Assets.size.vertical_1,
  },
  message: {
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h5,
    color: Colors.gray_2,
  },
});

export default Empty;
