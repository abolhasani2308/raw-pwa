//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AmountButtonPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {staticNumberFormatter} from '../utils/NumberFormatter';

const AmountButton = (props: AmountButtonPropsType) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: props?.size,
        },
        styles.container,
        props.container_style,
      ]}
      activeOpacity={Assets.size.active_opacity}
      {...props}>
      <Text style={styles.amount}>{staticNumberFormatter(props?.amount)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Assets.size.border_2,
    borderWidth: Assets.size.line,
    borderColor: Colors.alt_bg,
    paddingVertical: Assets.size.vertical_4,
  },
  amount: {
    fontFamily: Assets.font.medium,
    fontSize: Assets.font.sub_1,
    color: Colors.white,
  },
});

export default AmountButton;
