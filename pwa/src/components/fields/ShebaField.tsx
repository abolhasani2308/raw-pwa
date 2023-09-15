//@ts-nocheck
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {
  BaseFieldPropsType,
  LabeledFieldPropsType,
  ShebaFieldPropsType,
  ValidFieldPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';
import LabeledField from './LabeledField';

const ShebaField = React.forwardRef(
  (
    props: BaseFieldPropsType &
      ValidFieldPropsType &
      LabeledFieldPropsType &
      ShebaFieldPropsType,
    ref,
  ) => (
    <LabeledField
      {...props}
      render_input={
        <TextInput
          ref={ref}
          style={styles.textInput}
          placeholderTextColor={Colors.text_3}
          maxLength={26}
          {...props}
        />
      }
      label_color={Colors.alt_bg}
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
});

export default ShebaField;
