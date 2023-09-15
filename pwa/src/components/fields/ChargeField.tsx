//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {
  BaseFieldPropsType,
  LabeledFieldPropsType,
  ChargeFieldPropsType,
  ValidFieldPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';
import {fa} from '../../i18n/fa-IR';
import LabeledField from './LabeledField';

const ChargeField = React.forwardRef(
  (
    props: BaseFieldPropsType &
      ValidFieldPropsType &
      LabeledFieldPropsType &
      ChargeFieldPropsType,
    ref,
  ) => (
    <LabeledField
      {...props}
      render_input={
        <TextInput
          style={styles.textInput}
          placeholderTextColor={Colors.text_3}
          {...props}
        />
      }
      render_left={<Text style={styles.left}>{fa.screens.charge.rial}</Text>}
      label_color={Colors.alt_bg}
      ref={ref}
    />
  ),
);

const styles = StyleSheet.create({
  textInput: {
    height: Assets.size.input_2,
    flex: 1,
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    color: Colors.text_1,
    textAlignVertical: 'center',
    textAlign: 'left',
    marginHorizontal: Assets.size.horizontal_4,
    marginBottom: -Assets.size.fix_input,
  },
  left: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h6,
    color: Colors.text_1,
    marginLeft: Assets.size.horizontal_4,
  },
});

export default ChargeField;
