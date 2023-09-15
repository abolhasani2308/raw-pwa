//@ts-nocheck
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import Header from '../components/Header';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
import CreateWalletScreen from '../screens/CreateWalletScreen';
import ShowQRCodeScreen from '../screens/ShowQRCodeScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/authentication/LoginScreen';
import OTPScreen from '../screens/authentication/OTPScreen';
import PINCodeConfirmScreen from '../screens/authentication/PINCodeConfirmScreen';
import PINCodeScreen from '../screens/authentication/PINCodeScreen';
import PersonalInfoScreen from '../screens/authentication/PersonalInfoScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import TabScreen from './navigation_core/TabScreen';
import {RootStackParamList, Screens} from './types/RootStackTypes';
import {SupportURL} from '../configs/SupportAddresses';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.SplashScreen}
      screenOptions={{
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardShadowEnabled: true,
      }}>
      <Stack.Screen
        name={Screens.RegisterScreen}
        component={RegisterScreen}
        options={{
          header: () => <Header url={SupportURL.total} />,
        }}
      />
      <Stack.Screen
        name={Screens.LoginScreen}
        component={LoginScreen}
        options={{
          header: () => <Header url={SupportURL.total} />,
        }}
      />
      <Stack.Screen
        name={Screens.SplashScreen}
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screens.OTPScreen}
        component={OTPScreen}
        options={{
          header: () => <Header url={SupportURL.total} />,
        }}
      />
      <Stack.Screen
        name={Screens.PINCodeScreen}
        component={PINCodeScreen}
        options={{
          header: () => <Header url={SupportURL.total} />,
        }}
      />
      <Stack.Screen
        name={Screens.PINCodeConfirmScreen}
        component={PINCodeConfirmScreen}
        options={{
          header: () => <Header url={SupportURL.total} />,
        }}
      />
      <Stack.Screen
        name={Screens.PersonalInfoScreen}
        component={PersonalInfoScreen}
        options={{
          header: () => <Header url={SupportURL.total} />,
        }}
      />
      <Stack.Screen
        name={Screens.CreateWalletScreen}
        component={CreateWalletScreen}
        options={{
          header: () => <Header url={SupportURL.total} />,
        }}
      />
      <Stack.Screen
        name={Screens.TabScreen}
        component={TabScreen}
        options={{
          header: () => <Header url={SupportURL.total} />,
        }}
      />
      <Stack.Screen
        name={Screens.ShowQRCodeScreen}
        component={ShowQRCodeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screens.BarcodeScannerScreen}
        component={BarcodeScannerScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
