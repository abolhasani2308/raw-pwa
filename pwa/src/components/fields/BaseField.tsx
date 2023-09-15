//@ts-nocheck
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BaseFieldPropsType} from '../../Types';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';

const BaseField = (props: BaseFieldPropsType) => {
  return (
    <View style={[styles.container, props.container_style]}>
      {props?.render_header}
      <View
        style={[
          styles.textInputArea,
          {
            borderColor:
              props?.state === 'error' ? Colors.danger : Colors.border_color,
          },
        ]}>
        {props?.render_left}
        {props?.render_input}
        {props?.render_right}
      </View>
      {props?.render_footer}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  textInputArea: {
    flexDirection: 'row',
    height: Assets.size.input_2,
    borderWidth: Assets.size.line,
    borderRadius: Assets.size.border_2,
    elevation: Assets.size.elevation_1,
    alignItems: 'center',
    marginHorizontal: Assets.size.horizontal_2,
    backgroundColor: Colors.bg,
  },
});

export default BaseField;
