//@ts-nocheck
import {createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  has_wallet: false,
  wallet_id: '',
  amount: 0,
  state: '',
  type: '',
  qr_code: '',
};

export const walletReducer = createReducer(INITIAL_STATE, {
  ['SET_WALLET'](state, action) {
    return {
      ...state,
      has_wallet: action?.payload?.wallet?.has_wallet,
      wallet_id: action?.payload?.wallet?.wallet_id,
      amount: action?.payload?.wallet?.amount,
      state: action?.payload?.wallet?.state,
      type: action?.payload?.wallet?.type,
      qr_code: action?.payload?.wallet?.qr_code,
    };
  },
  ['CREATE_WALLET'](state, action) {
    return {
      ...state,
      wallet_id: action?.payload?.wallet_id,
      amount: action?.payload?.amount,
      state: action?.payload?.state,
      type: action?.payload?.type,
      qr_code: action?.payload?.qr_code,
    };
  },
  ['GET_WALLET_ID'](state, action) {
    return {
      ...state,
      wallet_id: action?.payload,
    };
  },
  ['SET_WALLET_ID'](state, action) {
    return {
      ...state,
      wallet_id: action?.payload,
    };
  },
});
