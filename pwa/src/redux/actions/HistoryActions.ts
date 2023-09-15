//@ts-nocheck
import {Dispatch} from 'redux';
import {transactionsIndexResponseType} from '../../services/api/ServerTypes';

export const setWithdrawHistory =
  () => async (dispatch: Dispatch, data: transactionsIndexResponseType[]) => {
    try {
      dispatch({
        type: 'SET_WITHDRAW_HISTORIES',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const setChargeHistory =
  () => async (dispatch: Dispatch, data: transactionsIndexResponseType[]) => {
    try {
      dispatch({
        type: 'SET_CHARGE_HISTORIES',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const setTransferHistory =
  () => async (dispatch: Dispatch, data: transactionsIndexResponseType[]) => {
    try {
      dispatch({
        type: 'SET_TRANSFER_HISTORIES',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const setAllHistory =
  () => async (dispatch: Dispatch, data: transactionsIndexResponseType[]) => {
    try {
      dispatch({
        type: 'SET_ALL_HISTORIES',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
