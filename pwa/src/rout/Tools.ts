//@ts-nocheck
import {NavigationContainerRef} from '@react-navigation/native';
import React from 'react';
import {Screens} from './types/RootStackTypes';
import {Tabs} from './types/TabNavigation';

export function isAuthorized(name: Screens | Tabs | string) {
  return (
    name === Tabs.Charge ||
    name === Tabs.Home ||
    name === Tabs.Profile ||
    name === Tabs.Transfer ||
    name === Tabs.Withdrawal ||
    name === Screens.ShowQRCodeScreen ||
    name === Screens.TabScreen ||
    name === Screens.BarcodeScannerScreen
  );
}

export const navigationRef = React.createRef<NavigationContainerRef<any>>();
