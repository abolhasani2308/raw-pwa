//@ts-nocheck
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {CardTitlePropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';

const CardTitle = (props: CardTitlePropsType) => {
  return (
    <Text style={[styles.title, props.container_style]}>{props.title}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.secondary,
    fontSize: Assets.font.h3,
    fontFamily: Assets.font.bold,
    marginTop: 2 * Assets.size.vertical_2,
  },
});

export default CardTitle;
