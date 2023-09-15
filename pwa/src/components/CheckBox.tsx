//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {customResponsiveHeight} from '../utils/CustomResponsive';
import {CheckBoxPropsType} from '../Types';

const CheckBox = (props: CheckBoxPropsType) => {
  return (
    <TouchableOpacity
      activeOpacity={Assets.size.active_opacity}
      style={styles.wrapper}
      onPress={props?.onCheck}
      disabled={!props?.is_enable}>
      <Text
        style={[
          styles.title,
          {
            color: props?.is_enable ? Colors.text_1 : Colors.text_3,
          },
        ]}>
        {props?.title}
      </Text>
      <View
        style={[
          styles.outer,
          {borderColor: props?.is_enable ? Colors.primary : Colors.text_3},
        ]}>
        {props?.is_checked && (
          <View
            style={[
              styles.inner,
              {
                backgroundColor: props?.is_enable
                  ? Colors.primary
                  : Colors.text_3,
              },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: Assets.size.horizontal_2,
    paddingVertical: Assets.size.vertical_4,
  },
  title: {
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h6,
    marginRight: Assets.size.horizontal_4,
  },
  outer: {
    height: customResponsiveHeight(3.4),
    width: customResponsiveHeight(3.4),
    borderWidth: customResponsiveHeight(0.4),
    borderRadius: customResponsiveHeight(3.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    height: customResponsiveHeight(1.8),
    width: customResponsiveHeight(1.8),
    borderRadius: customResponsiveHeight(1.8),
  },
});

export default CheckBox;
