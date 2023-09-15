//@ts-nocheck
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {
  AuthFieldPropsType,
  BaseFieldPropsType,
  LabeledFieldPropsType,
  LabeledIconFieldPropsType,
  ValidFieldPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';
import LabeledIconField from './LabeledIconField';

const AuthField = React.forwardRef(
  (
    props: BaseFieldPropsType &
      ValidFieldPropsType &
      LabeledFieldPropsType &
      LabeledIconFieldPropsType &
      AuthFieldPropsType,
    ref: any,
  ) => {
    return (
      <LabeledIconField
        {...props}
        render_input={
          <TextInput
            ref={ref}
            style={[
              styles.textInput,
              {
                textAlign: props.textAlign,
              },
            ]}
            placeholderTextColor={Colors.text_3}
            {...props}
          />
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
    marginHorizontal: Assets.size.horizontal_4,
    marginBottom: -Assets.size.fix_input,
  },
});

export default AuthField;
