//@ts-nocheck
import {Dispatch} from 'redux';
import {getUserWalletResponseType} from '../../services/api/ServerTypes';
import EncryptedStorage from 'react-native-encrypted-storage';

const WALLETID = '_WALLET_ID';

export const setWallet =
  () => async (dispatch: Dispatch, data: getUserWalletResponseType) => {
    try {
      dispatch({
        type: 'SET_WALLET',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getWalletId = () => async (dispatch: Dispatch) => {
  const wallet_id = await EncryptedStorage.getItem(WALLETID);
  try {
    dispatch({
      type: 'GET_WALLET_ID',
      payload: wallet_id,
    });
  } catch (error) {
    console.error(error);
  }
};

export const setWalletId = () => async (dispatch: Dispatch, data: string) => {
  await EncryptedStorage.setItem(WALLETID, String(data));
  try {
    dispatch({
      type: 'SET_WALLET_ID',
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const createWallet =
  () => async (dispatch: Dispatch, data: getUserWalletResponseType) => {
    try {
      dispatch({
        type: 'CREATE_WALLET',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
