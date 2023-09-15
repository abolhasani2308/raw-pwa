//@ts-nocheck
import {Dispatch} from 'redux';
import {UserInfoType} from '../../services/api/ServerTypes';
import {readUserInfo} from '../../utils/SecureInfo';

export const getUserInfo = () => async (dispatch: Dispatch) => {
  readUserInfo
    .then((data: UserInfoType) => {
      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const setUserInfo =
  () => async (dispatch: Dispatch, data: UserInfoType) => {
    console.log('Set user info successfully', data);
    dispatch({
      type: 'SET_USER',
      payload: data,
    });
  };
