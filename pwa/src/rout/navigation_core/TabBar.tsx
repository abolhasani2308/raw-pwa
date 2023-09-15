//@ts-nocheck
import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Assets from '../../assets/Assets';
import {Colors} from '../../configs/Colors';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Tabs} from '../types/TabNavigation';
import {SvgProps} from 'react-native-svg';
import {customResponsiveHeight} from '../../utils/CustomResponsive';
import {NormalButtonPropsType, TabBarPropsType} from '../../Types';

const NormalButton = (props: NormalButtonPropsType) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.normalContainer}
      {...props}>
      {props.isFocused ? <props.focuse_icon /> : <props.icon />}
      <Text
        style={[
          styles.normalText,
          {
            fontFamily: props.isFocused
              ? Assets.font.bold
              : Assets.font.regular,
            color: props.isFocused ? Colors.primary : Colors.text_2,
          },
        ]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

const MiddleButton = (props: NormalButtonPropsType) => {
  let icon_size = Assets.size.icon_1 + customResponsiveHeight(1);
  return (
    <View style={styles.middleWrapper}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.middleContainer,
          {
            backgroundColor: props.isFocused ? Colors.primary : Colors.text_3,
          },
        ]}
        {...props}>
        <props.icon height={icon_size} width={icon_size} />
      </TouchableOpacity>
    </View>
  );
};

function TabBar(props: TabBarPropsType & BottomTabBarProps) {
  const {state, descriptors, navigation} = props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions?.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={props.containerStyle}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route?.key];
        const label = options?.title ?? route?.name;
        const isFocused = state?.index === index;
        let icon: FC<SvgProps>;
        switch (route.name) {
          case Tabs.Profile:
            icon = Assets.svg.profile_2;
            break;
          case Tabs.Transfer:
            icon = Assets.svg.transform_2;
            break;
          case Tabs.Home:
            icon = Assets.svg.home;
            break;
          case Tabs.Withdrawal:
            icon = Assets.svg.step_out_2;
            break;
          case Tabs.Charge:
            icon = Assets.svg.cash_2;
            break;

          default:
            icon = Assets.svg.profile_2;
            break;
        }
        let focuse_icon: FC<SvgProps>;
        switch (route.name) {
          case Tabs.Profile:
            focuse_icon = Assets.svg.profile_1;
            break;
          case Tabs.Transfer:
            focuse_icon = Assets.svg.transform_1;
            break;
          case Tabs.Home:
            focuse_icon = Assets.svg.home;
            break;
          case Tabs.Withdrawal:
            focuse_icon = Assets.svg.step_out_1;
            break;
          case Tabs.Charge:
            focuse_icon = Assets.svg.cash_1;
            break;

          default:
            focuse_icon = Assets.svg.profile_1;
            break;
        }
        if (route.name === Tabs.Home) {
          return (
            <MiddleButton
              label={label}
              isFocused={isFocused}
              icon={icon}
              focuse_icon={focuse_icon}
              key={route.name}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        } else {
          return (
            <NormalButton
              label={label}
              isFocused={isFocused}
              icon={icon}
              focuse_icon={focuse_icon}
              key={route.name}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  normalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Assets.size.vertical_5,
  },
  normalText: {
    fontSize: Assets.font.sub_1,
    marginTop: Assets.size.vertical_4,
  },
  middleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  middleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Assets.size.vertical_5,
    height: Assets.size.bottom_tab,
    width: Assets.size.bottom_tab,
    borderRadius: Assets.size.bottom_tab,
    position: 'absolute',
    bottom: Assets.size.vertical_3,
    elevation: Assets.size.elevation_2,
  },
});

export default React.memo(TabBar);
