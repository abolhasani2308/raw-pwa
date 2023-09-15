//@ts-nocheck
import {BackHandler} from 'react-native';

export const DisableBackhandler = () => {
  const backAction = () => {
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return () => backHandler.remove();
};
