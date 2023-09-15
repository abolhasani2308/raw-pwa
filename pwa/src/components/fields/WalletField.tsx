//@ts-nocheck
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {
  BaseFieldPropsType,
  LabeledFieldPropsType,
  ValidFieldPropsType,
  WalletFieldPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';
import LabeledField from './LabeledField';
import IconButton from './../IconButton';

const WalletField = React.forwardRef(
  (
    props: BaseFieldPropsType &
      ValidFieldPropsType &
      LabeledFieldPropsType &
      WalletFieldPropsType,
    ref,
  ) => (
    <LabeledField
      {...props}
      render_input={
        <TextInput
          ref={ref}
          style={styles.textInput}
          placeholderTextColor={Colors.text_3}
          {...props}
        />
      }
      label_color={Colors.alt_bg}
      render_right={
        <IconButton
          container_style={styles.icon}
          icon={Assets.svg.scanner}
          onPress={props?.onScanPress}
        />
      }
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
    marginLeft: Assets.size.horizontal_4,
    marginBottom: -Assets.size.fix_input,
  },
  icon: {
    paddingHorizontal: Assets.size.horizontal_4,
  },
});

export default WalletField;
