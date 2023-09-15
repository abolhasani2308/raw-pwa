//@ts-nocheck
import {createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  name: '',
  last_name: '',
  email: '',
  mobile: '',
  national_code: '',
  father_name: '',
  customer_number: '',
  is_parsian: false,
  birthday: '',
  avatar_url: '',
};

export const userReducer = createReducer(INITIAL_STATE, {
  ['GET_USER'](state, action) {
    return {
      ...state,
      name: action?.payload?.name,
      last_name: action?.payload?.last_name,
      email: action?.payload?.email,
      mobile: action?.payload?.mobile,
      national_code: action?.payload?.national_code,
      father_name: action?.payload?.father_name,
      customer_number: action?.payload?.customer_number,
      is_parsian: action?.payload?.is_parsian,
      birthday: action?.payload?.birthday,
      avatar_url: action?.payload?.avatar_url,
    };
  },
  ['SET_USER'](state, action) {
    return {
      ...state,
      name: action?.payload?.name,
      last_name: action?.payload?.last_name,
      email: action?.payload?.email,
      mobile: action?.payload?.mobile,
      national_code: action?.payload?.national_code,
      father_name: action?.payload?.father_name,
      customer_number: action?.payload?.customer_number,
      is_parsian: action?.payload?.is_parsian,
      birthday: action?.payload?.birthday,
      avatar_url: action?.payload?.avatar_url,
    };
  },
});
