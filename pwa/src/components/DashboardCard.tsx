//@ts-nocheck
import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {DashboardCardPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';

const DashboardCard = (props: DashboardCardPropsType) => {
  return (
    <LinearGradient
      style={[styles.container, props.container_style]}
      colors={[Colors.black, Colors.primary]}>
      {props.children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderBottomRightRadius: Assets.size.border_4,
    borderBottomLeftRadius: Assets.size.border_4,
  },
});

export default DashboardCard;
