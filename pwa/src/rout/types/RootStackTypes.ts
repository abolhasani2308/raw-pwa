//@ts-nocheck
import {StackNavigationProp} from '@react-navigation/stack';
import {UserInfoType} from '../../services/api/ServerTypes';

export enum Screens {
  SplashScreen = 'SplashScreen',
  RegisterScreen = 'RegisterScreen',
  LoginScreen = 'LoginScreen',
  OTPScreen = 'OTPScreen',
  PINCodeScreen = 'PINCodeScreen',
  PINCodeConfirmScreen = 'PINCodeConfirmScreen',
  PersonalInfoScreen = 'PersonalInfoScreen',
  CreateWalletScreen = 'CreateWalletScreen',
  TabScreen = 'TabScreen',
  ShowQRCodeScreen = 'ShowQRCodeScreen',
  BarcodeScannerScreen = 'BarcodeScannerScreen',
}

export type RootStackParamList = {
  SplashScreen: undefined;
  RegisterScreen: {
    is_forgot_password?: boolean;
  };
  LoginScreen: {
    payment_status?: 'success' | 'error' | 'unknown';
  };
  OTPScreen: {
    mobile?: string;
    national_code?: string;
    is_forgot_password?: boolean;
    expire_time?: string;
    username?: string;
    otp_type?: 'PERSONAL' | 'BANK';
  };
  PINCodeScreen: {
    mobile?: string;
    national_code?: string;
    token?: string;
    user?: UserInfoType;
  };
  PINCodeConfirmScreen: {
    pin_code?: string;
    mobile?: string;
    national_code?: string;
    token?: string;
    user?: UserInfoType;
  };
  PersonalInfoScreen: {
    mobile?: string;
    national_code?: string;
  };
  CreateWalletScreen: undefined;
  TabScreen: {
    status: string;
    tracking_code: string;
    initial_tab: string;
  };
  ShowQRCodeScreen: undefined;
  BarcodeScannerScreen: undefined;
};

export type RootStackNavigationProps<T extends Screens> = StackNavigationProp<
  RootStackParamList,
  T
>;
