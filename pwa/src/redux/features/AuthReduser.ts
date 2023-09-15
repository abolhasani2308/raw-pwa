//@ts-nocheck
import {createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLogin: false,
  isLoading: true,
  userToken: '',
  passkey: false,
  fingerprint: false,
  privateKey: false,
  certificate: '',
};

export const authReducer = createReducer(INITIAL_STATE, {
  ['LOGIN'](state, action) {
    return {
      ...state,
      isLogin: true,
      isLoading: false,
      userToken: action.payload,
    };
  },
  ['LOGOUT401'](state) {
    return {
      ...state,
      isLogin: false,
      isLoading: false,
      userToken: '',
    };
  },
  ['LOGOUT'](state) {
    return {
      ...state,
      isLogin: false,
      isLoading: false,
      userToken: '',
      passkey: false,
      fingerprint: false,
      privateKey: false,
      certificate: '',
    };
  },
  ['SET_FINGER'](state) {
    return {...state, fingerprint: true};
  },
  ['REMOVE_FINGER'](state) {
    return {...state, fingerprint: false};
  },
  ['SET_PASSKEY'](state) {
    return {...state, passkey: true};
  },
  ['REMOVE_PASSKEY'](state) {
    return {...state, passkey: false};
  },
  ['SET_PRIVATEKEY'](state) {
    return {...state, privateKey: true};
  },
  ['REMOVE_PRIVATEKEY'](state) {
    return {...state, privateKey: false};
  },
  ['SET_CERTIFICATE'](state, action) {
    return {...state, certificate: action?.payload};
  },
  ['REMOVE_CERTIFICATE'](state) {
    return {...state, certificate: ''};
  },
});
