//@ts-nocheck
export enum Tabs {
  Profile = 'Profile',
  Transfer = 'Transfer',
  Home = 'Home',
  Withdrawal = 'Withdrawal',
  Charge = 'Charge',
}

export type TabParamList = {
  Profile: undefined;
  Transfer: {
    wallet_address?: string;
  };
  Home: undefined;
  Withdrawal: undefined;
  Charge: undefined;
};
