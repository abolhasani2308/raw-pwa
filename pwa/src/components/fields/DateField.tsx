//@ts-nocheck
import React, {useImperativeHandle, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {
  BaseFieldPropsType,
  DateFieldPropsType,
  LabeledFieldPropsType,
  LabeledIconFieldPropsType,
  ValidFieldPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';
import CustomDatePicker from '../CustomDatePicker';
import LabeledIconField from './LabeledIconField';

const DateField = React.forwardRef(
  (
    props: BaseFieldPropsType &
      ValidFieldPropsType &
      LabeledFieldPropsType &
      LabeledIconFieldPropsType &
      DateFieldPropsType,
    ref,
  ) => {
    const [modal_visible, set_modal_visible] = useState(false);

    const focusPicker = () => {
      set_modal_visible(true);
    };

    useImperativeHandle(ref, () => ({
      focusPicker,
    }));

    return (
      <LabeledIconField
        {...props}
        render_input={
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                set_modal_visible(true);
              }}
              activeOpacity={1}
              disabled={props?.disabled}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={Colors.text_3}
                editable={false}
                {...props}
              />
            </TouchableOpacity>
            <CustomDatePicker
              visible={modal_visible}
              onConfirmPress={(d, m, y) => {
                set_modal_visible(false);
                props.onSelectDate(d, m, y);
              }}
              onRequestClose={() => {
                set_modal_visible(false);
              }}
              initial_value={{
                year: props?.value?.split('/')?.[0],
                month: props?.value?.split('/')?.[1],
                day: props?.value?.split('/')?.[2],
              }}
            />
          </>
        }
        label_color={Colors.text_2}
      />
    );
  },
);

const styles = StyleSheet.create({
  textInput: {
    height: Assets.size.input_2,
    flex: 1,
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    color: Colors.text_1,
    textAlignVertical: 'center',
    textAlign: 'right',
    marginLeft: Assets.size.horizontal_4,
    marginBottom: -Assets.size.fix_input,
  },
  button: {
    flex: 1,
  },
});

export default DateField;
