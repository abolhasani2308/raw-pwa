//@ts-nocheck
import {createReducer} from '@reduxjs/toolkit';

const ID_INITIAL_STATE = {
  id: '',
  modalProps: {},
};

export const modalReducer = createReducer(ID_INITIAL_STATE, {
  ['MODAL__SET_ID'](state, {payload}) {
    return payload;
  },
});
