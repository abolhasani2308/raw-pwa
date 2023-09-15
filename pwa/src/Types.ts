import {FC} from 'react';
import {
  Falsy,
  RecursiveArray,
  RegisteredStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {RootStackParamList} from './rout/types/RootStackTypes';
import {StackNavigationProp} from '@react-navigation/stack';

export interface BaseFieldPropsType {
  render_input: JSX.Element;
  render_left: JSX.Element;
  render_right: JSX.Element;
  render_footer: JSX.Element;
  render_header: JSX.Element;
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
  state?: 'error' | 'normal';
}

export interface ValidFieldPropsType {
  error?: string;
}

export interface LabeledFieldPropsType {
  label?: string;
  label_color?: colorType;
}

export interface LabeledIconFieldPropsType {
  icon?: FC<SvgProps>;
}

export interface AuthFieldPropsType {
  textAlign?: 'auto' | 'center' | 'justify' | 'left' | 'right';
}

export interface DateFieldPropsType {
  onSelectDate(
    d: string | number,
    m: string | number,
    y: string | number,
  ): unknown;
  disabled?: boolean;
}

export interface ChargeFieldPropsType {}
export interface SelectableFieldPropsType {
  onSelect: (selectedItem: string) => void;
  list?: string[];
}

export interface WithdrawTransferFieldPropsType {
  onMaximumAmountPress?: () => void;
}

export interface ShebaFieldPropsType {}

export interface WalletFieldPropsType {
  onScanPress: () => void;
  onScanQRCode: () => void;
}

export type colorType =
  | `rgb(${number}, ${number}, ${number})`
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `#${string}`;

export interface DashboardBaseScreenPropsType {
  list_data?: {
    group_type: 'out' | 'in';
    type: string;
    amount: number;
    amount_formatted: string;
    ago: string;
    from: string;
    from_title: string;
    to: string;
    to_title: string;
  }[];
  render_card_inside?: JSX.Element;
  list_title?: string;
  navigation: StackNavigationProp<RootStackParamList>;
  screen_type: 'WITHDRAW' | 'CHARGE' | 'TRANSFER' | '';
}

export interface DashboardSectionedScreenPropsType {
  render_card_inside_1: JSX.Element;
  render_card_inside_2: JSX.Element;
  render_card_inside_3: JSX.Element;
  render_card_inside_4: JSX.Element;
  render_card_inside_5: JSX.Element;
}
export interface DashboardWithTitleButtonScreenPropsType {
  screen_title?: string;
  balance?: string;
  on_balance_refresh?: () => void;
  button_title?: string;
  onButtonPress?: () => void;
}

export interface BaseAuthScreenPropsType {
  navigation: StackNavigationProp<RootStackParamList>;
  route?: {
    params: {
      mobile: string;
      national_code: string;
      is_forgot_password?: boolean;
      payment_status?: 'success' | 'error' | 'unknown';
      expire_time?: string;
    };
  };
  render_card_inside?: JSX.Element;
  render_card_under?: JSX.Element;
  screen_title?: string;
}
export interface AuthScreenWithFillButtonPropsType {
  fill_button_title?: string;
  on_fill_button_press?: () => void;
}
export interface AuthScreenWithFillUnFillButtonPropsType {
  un_fill_button_title?: string;
  on_un_fill_button_press?: () => void;
}

export interface ActivityLogPropsType {
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
  port?: string;
  group_type: 'out' | 'in';
  type: string;
  amount: number;
  amount_formatted: string;
  ago: string;
  from: string;
  from_title: string;
  to: string;
  to_title: string;
}

export interface AmountButtonPropsType {
  amount?: string;
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
  size?: number;
}

export interface BalancePropsType {
  onEmptyPress: () => void;
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
}
export interface CardTitlePropsType {
  title?: string;
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
}

export interface CustomButtonPropsType {
  fill?: boolean;
  title?: string;
  secondary?: boolean;
  text_only?: boolean;
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
}

export interface CustomCardPropsType {
  children?: JSX.Element | JSX.Element[];
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
}

export interface CustomDatePickerPropsType {
  onConfirmPress: (
    day: string | number,
    month: string | number,
    year: string | number,
  ) => void;
  visible?: boolean;
  onRequestClose?: () => void;
  value: string;
  initial_value?: {
    day: string | number;
    month: string | number;
    year: string | number;
  };
}
export interface CustomListPickerPropsType {
  onConfirmPress: () => void;
  visible?: boolean;
  onRequestClose?: () => void;
  value: string;
  list?: string[];
}

export interface DashboardCardPropsType {
  children?: JSX.Element | JSX.Element[];
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
}

export interface EmptyPropsType {
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
  message?: string;
}

export interface HorizontalIconTitleButtonPropsType {
  icon?: FC<SvgProps>;
  title?: string;
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
}

export interface IconButtonPropsType {
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
  icon?: FC<SvgProps>;
}

export interface IconTitleButtonPropsType {
  icon?: FC<SvgProps>;
  title?: string;
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
  size?: number;
}

export interface KeyboardPropsType {
  status?: 'success' | 'error' | 'normal';
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
  onKeyPress?: (key: string | number) => void;
  fingerprint_button?: boolean;
  value: string;
}

export interface KeyboardButtonPropsType {
  item: {
    key: string;
    value: number | null;
    icon: React.FC<SvgProps> | null;
  };
  onPress?: () => {};
  fingerprint_button?: boolean;
  backspace_disabled?: boolean;
}

export interface LabelPropsType {
  label?: string;
  color?: colorType;
}

export interface PasswordPadPropsType {
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
  pad_title?: string;
  pin_state: 'normal' | 'error' | 'success' | string;
  pin: string;
  onKeyPress: (key: string | number) => void;
  fingerprint_button?: boolean;
  validation_message?: string;
  error_visible?: boolean;
}

export interface ValidationErrorPropsType {
  error?: string;
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
}

export interface WalletAddressPropsType {
  address?: string;
  container_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
}

export interface NormalButtonPropsType {
  label: string;
  icon: FC<SvgProps>;
  focuse_icon: FC<SvgProps>;
  isFocused: boolean;
}

export interface TabBarPropsType {
  containerStyle?: ViewStyle;
}

export interface ShowQRCodeScreenPropsType {
  navigation: StackNavigationProp<RootStackParamList>;
}

export interface ShowQRCodeScreenAddressPropsType {
  address?: string;
}

export interface ShowQRCodeScreenScreenTitlePropsType {
  title?: string;
}

export interface SplashScreenPropsType {
  navigation: StackNavigationProp<RootStackParamList>;
}

export interface LoginScreenUnderlineButtonPropsType {
  message?: string;
}

export interface OTPScreenDescriptionPropsType {
  mobile_number?: string;
}

export interface PINCodeConfirmScreenPropsType {
  route: any;
  navigation: StackNavigationProp<RootStackParamList>;
}
export interface PasswordPadScreenPropsType {
  rout_name: String | undefined;
  route: any;
  screen_type: 'lock' | 'define' | 'confirm';
  navigation: StackNavigationProp<RootStackParamList>;
  children?: JSX.Element | JSX.Element[];
}
export interface PINCodeScreenPropsType {
  route: any;
  navigation: StackNavigationProp<RootStackParamList>;
}

export interface PINCodeScreenHintPropsType {
  message?: string;
}

export interface RegisterScreenHintPropsType {
  message?: string;
  text_style?: TextStyle;
  onPress?: () => void;
}

export interface CreateWalletScreenPropsType {
  navigation: StackNavigationProp<RootStackParamList>;
}
export interface ScreenWrapperPropsType {
  navigation: StackNavigationProp<RootStackParamList>;
  rout_name?: String;
  children?: JSX.Element | JSX.Element[];
  screen_style?:
    | ViewStyle
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>>
    | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
}
export interface BigButtonCreateWalletScreenPropsType {}

export interface HomeScreenPropsType {
  navigation: StackNavigationProp<RootStackParamList>;
}

export interface ProfileScreenCustomerNumberPropsType {
  customer_number: string;
}
export interface BarcodeScannerScreenPropsType {
  navigation: StackNavigationProp<RootStackParamList>;
}
export interface NetworkCheckerPropsType {
  onConnected: () => void;
  onDisConnected: () => void;
}
export interface NativeModalPropsType {
  onRequestClose: () => any;
  title?: string;
  message?: string;
  onConfirmPress?: () => void;
  onCancelPress?: () => void;
  confirmTitle?: string;
  cancelTitle?: string;
}
export interface HeaderPropsType {
  url: string;
}

export interface DeepLinkPropsType {
  navigation: StackNavigationProp<RootStackParamList>;
  callback: () => void;
  successMessage?: () => void;
  errorMessage?: () => void;
  unknownMessage?: () => void;
}

export interface TabScreenPropsType {
  navigation: StackNavigationProp<RootStackParamList>;
  route?: {
    params: {
      payment_status?: 'success' | 'error' | 'unknown';
    };
  };
}
export interface CheckBoxPropsType {
  title: string;
  is_checked: boolean;
  is_enable: boolean;
}
