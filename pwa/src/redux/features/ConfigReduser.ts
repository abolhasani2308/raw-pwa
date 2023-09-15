//@ts-nocheck
import {createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  sign_required: true,
  bank_wallet_id: '',
};

export const configReducer = createReducer(INITIAL_STATE, {
  ['SET_SIGN_REQUIRED'](state, action) {
    return {
      ...state,
      sign_required: action?.payload,
    };
  },
  ['SET_BANK_WALLET_ID'](state, action) {
    return {
      ...state,
      bank_wallet_id: action?.payload,
    };
  },
});
