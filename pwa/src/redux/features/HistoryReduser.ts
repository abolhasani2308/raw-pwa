//@ts-nocheck
import {createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  withdraw_histories: [],
  charge_histories: [],
  transfer_histories: [],
  all_histories: [],
};

export const historyReducer = createReducer(INITIAL_STATE, {
  ['SET_WITHDRAW_HISTORIES'](state, action) {
    return {
      ...state,
      withdraw_histories: action?.payload,
    };
  },
  ['SET_CHARGE_HISTORIES'](state, action) {
    return {
      ...state,
      charge_histories: action?.payload,
    };
  },
  ['SET_TRANSFER_HISTORIES'](state, action) {
    return {
      ...state,
      transfer_histories: action?.payload,
    };
  },
  ['SET_ALL_HISTORIES'](state, action) {
    return {
      ...state,
      all_histories: action?.payload,
    };
  },
});
