//@ts-nocheck
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomCardPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';

const CustomCard = (props: CustomCardPropsType) => {
  return (
    <View style={[styles.container, props.container_style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    alignSelf: 'stretch',
    marginHorizontal: Assets.size.horizontal_2,
    borderRadius: Assets.size.border_2,
    elevation: Assets.size.elevation_1,
    alignItems: 'center',
  },
});

export default CustomCard;
