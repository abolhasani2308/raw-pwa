//@ts-nocheck
import {useEffect} from 'react';
import {Linking} from 'react-native';
import {DeepLinkPropsType} from '../Types';
import {Screens} from './types/RootStackTypes';

const DeepLink = (props: DeepLinkPropsType) => {
  useEffect(() => {
    Linking.getInitialURL().then((event: any) => {
      const route = event?.url?.replace(/.*?:\/\//g, '');
      const routeName = route?.split('?')?.[0];
      const queryString = route?.split('?')?.[1];

      const status = queryString?.split('status=')?.[1]?.split('&')?.[0];

      // if (routeName === 'payment') {
      //   props.navigation.navigate(Screens.LoginScreen, {
      //     payment_status: status,
      //   });
      //   props?.callback();
      //   // if (status === 'success') {
      //   //   props?.successMessage();
      //   // } else if (status === 'error') {
      //   //   props?.errorMessage();
      //   // } else if (status === 'unknown') {
      //   //   props?.unknownMessage();
      //   // }
      // }
      if (route?.inclouds('openparsiancbdcapp')) {
        props.navigation.navigate(Screens.LoginScreen, {
          payment_status: 'unknown',
        });
        props?.callback();
      }
    });
    Linking.addEventListener('url', handleOpenURL);

    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, [props.navigation]);

  const handleOpenURL = async (event: any) => {
    const route = event?.url?.replace(/.*?:\/\//g, '');
    const routeName = route?.split('?')?.[0];
    const queryString = route?.split('?')?.[1];

    // let url = new URL(event?.url);
    // const urlParams = new URLSearchParams(url?.search);
    // const status = urlParams.get('status');

    const status = queryString?.split('status=')?.[1]?.split('&')?.[0];

    // if (routeName === 'payment') {
    //   props.navigation.navigate(Screens.LoginScreen, {
    //     payment_status: status,
    //   });
    //   props?.callback();
    //   // if (status === 'success') {
    //   //   props?.successMessage();
    //   // } else if (status === 'error') {
    //   //   props?.errorMessage();
    //   // } else if (status === 'unknown') {
    //   //   props?.unknownMessage();
    //   // }
    // }
    if (route?.inclouds('openparsiancbdcapp')) {
      props.navigation.navigate(Screens.LoginScreen, {
        payment_status: 'unknown',
      });
      props?.callback();
    }
  };
};
export default DeepLink;
