//@ts-nocheck
import {Dispatch} from 'redux';

export const setSignRequired =
  () => async (dispatch: Dispatch, data: boolean) => {
    try {
      dispatch({
        type: 'SET_SIGN_REQUIRED',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const setBankWalletId =
  () => async (dispatch: Dispatch, data: string) => {
    try {
      dispatch({
        type: 'SET_BANK_WALLET_ID',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
