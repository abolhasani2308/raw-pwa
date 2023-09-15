//@ts-nocheck
import React, {useImperativeHandle, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {
  BaseFieldPropsType,
  LabeledFieldPropsType,
  SelectableFieldPropsType,
  ValidFieldPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';
import {customResponsiveHeight} from '../../utils/CustomResponsive';
import CustomListPicker from '../CustomListPicker';
import LabeledField from './LabeledField';

const SelectableField = React.forwardRef(
  (
    props: BaseFieldPropsType &
      ValidFieldPropsType &
      LabeledFieldPropsType &
      SelectableFieldPropsType,
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
      <LabeledField
        {...props}
        render_input={
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                set_modal_visible(true);
              }}
              activeOpacity={1}>
              <Assets.svg.arrow
                height={customResponsiveHeight(2.2)}
                width={customResponsiveHeight(2.2)}
                style={styles.left}
              />
              <TextInput
                style={styles.textInput}
                placeholderTextColor={Colors.text_3}
                editable={false}
                {...props}
              />
            </TouchableOpacity>
            <CustomListPicker
              list={props?.list}
              visible={modal_visible}
              onConfirmPress={selectedItem => {
                set_modal_visible(false);
                props.onSelect(selectedItem);
              }}
              onRequestClose={() => {
                set_modal_visible(false);
              }}
            />
          </>
        }
        label_color={Colors.alt_bg}
        ref={ref}
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
    textAlign: 'left',
    marginHorizontal: Assets.size.horizontal_4,
    marginBottom: -Assets.size.fix_input,
  },
  left: {
    marginLeft: Assets.size.horizontal_3,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SelectableField;
