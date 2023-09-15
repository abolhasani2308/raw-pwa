//@ts-nocheck
import {Dispatch} from 'redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as Keychain from 'react-native-keychain';

const AUTH_TOKEN = '_AUTH_TOKEN';
const FINGERPRINT = '_FINGERPRINT';
const PASSKEY = '_PASSKEY';
const PRIVATEKEY = '_PRIVATEKEY';
const CERTIFICATE = '_CERTIFICATE';

export const init = () => async (dispatch: Dispatch) => {
  try {
    const token = await EncryptedStorage.getItem(AUTH_TOKEN);
    const fingerprint = await EncryptedStorage.getItem(FINGERPRINT);
    const passkey = await EncryptedStorage.getItem(PASSKEY);
    const privateKey = await EncryptedStorage.getItem(PRIVATEKEY);
    if (token) {
      if (passkey) {
        if (passkey === 'ACTIVE') {
          dispatch({
            type: 'SET_PASSKEY',
          });
          if (fingerprint) {
            if (fingerprint === 'ACTIVE') {
              dispatch({
                type: 'SET_FINGER',
              });
            }
          }
          if (privateKey) {
            if (privateKey === 'ACTIVE') {
              dispatch({
                type: 'SET_PRIVATEKEY',
              });
            }
          }
        }
      }
      dispatch({
        type: 'LOGIN',
        payload: token,
      });
    } else {
      dispatch({
        type: 'LOGOUT',
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'LOGOUT',
    });
  }
};

export const login = (token?: string) => async (dispatch: Dispatch) => {
  try {
    await EncryptedStorage.setItem(AUTH_TOKEN, token ?? '');
    dispatch({
      type: 'LOGIN',
      payload: token,
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout401 = () => async (dispatch: Dispatch) => {
  try {
    await EncryptedStorage.removeItem(AUTH_TOKEN);
    dispatch({
      type: 'LOGOUT401',
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await EncryptedStorage.clear();
    await Keychain.resetGenericPassword();
    dispatch({
      type: 'LOGOUT',
    });
  } catch (error) {
    console.error(error);
  }
};

export const setFingerPrint = () => async (dispatch: Dispatch) => {
  try {
    await EncryptedStorage.setItem(FINGERPRINT, 'ACTIVE');
    dispatch({
      type: 'SET_FINGER',
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeFingerPrint = () => async (dispatch: Dispatch) => {
  try {
    await EncryptedStorage.removeItem(FINGERPRINT);
    dispatch({
      type: 'REMOVE_FINGER',
    });
  } catch (error) {
    console.error(error);
  }
};

export const setPasskey = () => async (dispatch: Dispatch) => {
  try {
    await EncryptedStorage.setItem(PASSKEY, 'ACTIVE');
    dispatch({
      type: 'SET_PASSKEY',
    });
  } catch (error) {
    console.error(error);
  }
};

export const removePasskey = () => async (dispatch: Dispatch) => {
  try {
    await EncryptedStorage.removeItem(PASSKEY);
    dispatch({
      type: 'REMOVE_PASSKEY',
    });
  } catch (error) {
    console.error(error);
  }
};

export const setPrivateKey = () => async (dispatch: Dispatch) => {
  try {
    await EncryptedStorage.setItem(PRIVATEKEY, 'ACTIVE');
    dispatch({
      type: 'SET_PRIVATEKEY',
    });
  } catch (error) {
    console.error(error);
  }
};

export const removePrivateKey = () => async (dispatch: Dispatch) => {
  try {
    await EncryptedStorage.removeItem(PRIVATEKEY);
    dispatch({
      type: 'REMOVE_PRIVATEKEY',
    });
  } catch (error) {
    console.error(error);
  }
};

export const setCertificate =
  () => async (dispatch: Dispatch, certificate: string) => {
    try {
      await EncryptedStorage.setItem(CERTIFICATE, certificate);
      dispatch({
        type: 'SET_CERTIFICATE',
        payload: certificate,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const removeCertificate = () => async (dispatch: Dispatch) => {
  try {
    await EncryptedStorage.removeItem(CERTIFICATE);
    dispatch({
      type: 'REMOVE_CERTIFICATE',
    });
  } catch (error) {
    console.error(error);
  }
};
