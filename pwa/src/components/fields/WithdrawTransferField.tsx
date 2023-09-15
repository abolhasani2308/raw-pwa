//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BaseFieldPropsType,
  ChargeFieldPropsType,
  LabeledFieldPropsType,
  ValidFieldPropsType,
  WithdrawTransferFieldPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';
import {fa} from '../../i18n/fa-IR';
import Label from '../Label';
import ChargeField from './ChargeField';

const WithdrawTransferField = (
  props: BaseFieldPropsType &
    ValidFieldPropsType &
    LabeledFieldPropsType &
    ChargeFieldPropsType &
    WithdrawTransferFieldPropsType,
) => (
  <ChargeField
    {...props}
    render_header={
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.maximumAmountContainer}
          activeOpacity={Assets.size.active_opacity}
          onPress={props?.onMaximumAmountPress}>
          <Text style={styles.maximumAmountText}>
            {fa.screens.charge.maximum_amount}
          </Text>
        </TouchableOpacity>
        <Label label={props.label} color={Colors.alt_bg} />
      </View>
    }
    render_left={<Text style={styles.left}>{fa.screens.charge.rial}</Text>}
    label_color={Colors.alt_bg}
  />
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
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  maximumAmountContainer: {
    paddingBottom: Assets.size.vertical_5,
    paddingHorizontal: Assets.size.horizontal_2,
  },
  maximumAmountText: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h6,
    color: Colors.dark_blue,
  },
  left: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h6,
    color: Colors.text_1,
  },
});

export default WithdrawTransferField;
