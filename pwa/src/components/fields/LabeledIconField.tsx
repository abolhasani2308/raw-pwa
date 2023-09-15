//@ts-nocheck
import React from 'react';
import {
  BaseFieldPropsType,
  LabeledFieldPropsType,
  LabeledIconFieldPropsType,
  ValidFieldPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import LabeledField from './LabeledField';
import {StyleSheet} from 'react-native';

const LabeledIconField = (
  props: BaseFieldPropsType &
    ValidFieldPropsType &
    LabeledFieldPropsType &
    LabeledIconFieldPropsType,
) => (
  <LabeledField
    {...props}
    render_right={
      props.icon && (
        <props.icon
          height={Assets.size.icon_1}
          width={Assets.size.icon_1}
          style={styles.icon}
        />
      )
    }
  />
);

const styles = StyleSheet.create({
  icon: {
    marginRight: Assets.size.horizontal_4,
  },
});

export default LabeledIconField;
