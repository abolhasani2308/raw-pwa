//@ts-nocheck
import React from 'react';
import {
  BaseFieldPropsType,
  LabeledFieldPropsType,
  ValidFieldPropsType,
} from '../../Types';
import Label from '../Label';
import ValidField from './ValidField';

const LabeledField = (
  props: BaseFieldPropsType & ValidFieldPropsType & LabeledFieldPropsType,
) => (
  <ValidField
    render_header={<Label label={props?.label} color={props?.label_color} />}
    {...props}
  />
);

export default LabeledField;
