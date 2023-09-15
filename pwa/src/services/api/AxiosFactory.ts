//@ts-nocheck
import axios from 'axios';
import {errorLogger, requestLogger, responseLogger} from 'axios-logger';

import {network} from '../../app.config';
import DeviceInfo from 'react-native-device-info';

export const createAxios = (userToken?: string) => {
  let user_agent = DeviceInfo.getUserAgentSync();
  const instance = axios.create({
    baseURL: network.baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken ?? ''}`,
      'User-Agent': user_agent,
    },
  });
  const {request, response} = instance.interceptors;
  if (__DEV__) {
    request.use(requestLogger, errorLogger);
    response.use(responseLogger, errorLogger);
  }
  return instance;
};
