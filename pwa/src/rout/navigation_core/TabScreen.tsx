//@ts-nocheck
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {TabBarPropsType, TabScreenPropsType} from '../../Types';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';
import {fa} from '../../i18n/fa-IR';
import HomeScreen from '../../screens/Dashboard/HomeScreen';
import ProfileScreen from '../../screens/Dashboard/ProfileScreen';
import TransferScreen from '../../screens/Dashboard/TransferScreen';
import WithdrawScreen from '../../screens/Dashboard/WithdrawScreen';
import {TabParamList, Tabs} from '../types/TabNavigation';
import TabBar from './TabBar';
import HideLoading from '../../common/HideLoading';
import ChargeScreen from '../../screens/Dashboard/ChargeScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabScreen = (props: TabScreenPropsType) => {
  const renderTabBar = useCallback(
    (props: JSX.IntrinsicAttributes & TabBarPropsType & BottomTabBarProps) => (
      <TabBar containerStyle={styles.tabsWrapper} {...props} />
    ),
    [],
  );
  HideLoading();
  return (
    <SafeAreaView style={styles.areaContainer}>
      <Tab.Navigator
        tabBar={renderTabBar}
        initialRouteName={
          props?.route?.params?.payment_status ? Tabs.Charge : Tabs.Home
        }
        backBehavior="initialRoute">
        <Tab.Screen
          name={Tabs.Profile}
          component={ProfileScreen}
          options={{
            title: fa.root.profile,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={Tabs.Transfer}
          component={TransferScreen}
          options={{
            title: fa.root.transfer,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={Tabs.Home}
          component={HomeScreen}
          options={{
            title: fa.root.home,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={Tabs.Withdrawal}
          component={WithdrawScreen}
          options={{
            title: fa.root.withdrawal,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={Tabs.Charge}
          component={ChargeScreen}
          options={{
            title: fa.root.charge,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabsWrapper: {
    height: Assets.size.bottom_tab,
    flexDirection: 'row',
    backgroundColor: Colors.bg,
    elevation: Assets.size.elevation_2,
  },
  areaContainer: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
});

export default TabScreen;
