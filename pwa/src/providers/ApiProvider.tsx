//@ts-nocheck
import {CommonActions} from '@react-navigation/native';
import {AxiosInstance, AxiosResponse} from 'axios';
import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions, network} from '../app.config';
import {fa} from '../i18n/fa-IR';
import {init, logout401} from '../redux/actions/AuthActions';
import {showModal} from '../redux/actions/ModalActions';
import {Screens} from '../rout/types/RootStackTypes';
import {createApi} from '../services/api/ApiFactory';
import {createAxios} from '../services/api/AxiosFactory';
export interface ContextType {
  api?: ReturnType<typeof createApi>;
  axios?: AxiosInstance;
}

const ApiContext = React.createContext<ContextType>({});

export const ApiProvider = (props: PropsWithChildren<any>) => {
  const [value, setValue] = useState<ContextType>(useContext(ApiContext));

  const {isLoading, isLogin, userToken} = useSelector(
    (state: any) => state.auth,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      const axios = createAxios(userToken);
      axios.defaults.timeout = network.timeout;
      setValue({
        api: createApi(axios),
        axios,
      });
    }
  }, [isLoading, isLogin, userToken]);

  useEffect(() => {
    value.axios?.interceptors.response.use(undefined, async error => {
      const res: AxiosResponse = error.response;
      setTimeout(() => {
        if (res === undefined) {
          dispatch(
            showModal({
              id: 'AlertBox',
              modalProps: {
                message: fa.client_error.no_response_received_from_the_server,
              },
            }),
          );
        }
      }, network.timeout);
      const status = res?.status;
      if (status !== 200) {
        let message = res.data.message;
        dispatch(
          showModal({
            id: 'AlertBox',
            modalProps: {
              message: message || fa.server_errors[500],
            },
          }),
        );
      }
      throw error;
    });
  }, [dispatch, value.axios]);

  useEffect(() => {
    value.axios?.interceptors.response.use(undefined, async error => {
      const status = error.response?.status;
      if (status === 401) {
        await logout401()(dispatch);
        const navigation = props.navigationRef.current;
        navigation?.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: Screens.RegisterScreen}],
          }),
        );
      }
      throw error;
    });
  }, [dispatch, props.navigationRef, value.axios]);

  useEffect(() => {
    value.axios?.interceptors.response.use(undefined, async error => {
      let action = error.response?.data?.action;
      const navigation = props.navigationRef.current;

      if (!!action) {
        switch (action) {
          // case actions.register_requierd:
          //   navigation?.dispatch(
          //     CommonActions.reset({
          //       index: 1,
          //       routes: [{name: Screens.PersonalInfoScreen}],
          //     }),
          //   );
          //   break;
          case actions.not_match_mobile_and_national_code:
            navigation?.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: Screens.RegisterScreen}],
              }),
            );
            break;

          default:
            break;
        }

        dispatch(
          showModal({
            id: 'AlertBox',
            modalProps: {
              message: error.response?.data?.message,
            },
          }),
        );
      }
    });
  }, [dispatch, props.navigationRef, value.axios]);

  return value ? (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  ) : null;
};

export const useApi = () => useContext(ApiContext);
