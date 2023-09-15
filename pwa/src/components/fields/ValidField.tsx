//@ts-nocheck
import React from 'react';
import {BaseFieldPropsType, ValidFieldPropsType} from '../../Types';
import BaseField from './BaseField';
import ValidationError from '../ValidationError';

const ValidField = (props: BaseFieldPropsType & ValidFieldPropsType) => (
  <BaseField
    {...props}
    render_footer={
      props?.state === 'error' && <ValidationError error={props.error} />
    }
  />
);

export default ValidField;
