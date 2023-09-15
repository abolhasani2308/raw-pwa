//@ts-nocheck
import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {HeaderPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {SupportPhoneNumber} from '../configs/SupportAddresses';
import {
  customResponsiveHeight,
  customResponsiveWidth,
} from '../utils/CustomResponsive';
import IconButton from './IconButton';

const Header = (props: HeaderPropsType) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon={Assets.svg.help}
        container_style={styles.help}
        onPress={() => {
          Linking.openURL(props?.url);
        }}
      />
      <IconButton
        icon={Assets.svg.call}
        container_style={styles.call}
        onPress={() => {
          Linking.openURL(`tel:${SupportPhoneNumber.total}`);
        }}
      />
      <View style={styles.spacer} />
      <Assets.svg.parsian_bank_logo_1
        width={
          (150 / 180.54) *
          (Assets.size.header_large - customResponsiveHeight(3))
        }
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Assets.size.header_large,
    width: responsiveScreenWidth(100),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.header,
    zIndex: 2,
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: Assets.size.border_4,
    borderBottomRightRadius: Assets.size.border_4,
  },
  help: {
    height: Assets.size.header_large,
    paddingLeft: Assets.size.horizontal_2 - customResponsiveWidth(2),
    paddingRight: customResponsiveWidth(2),
  },
  call: {
    height: Assets.size.header_large,
    paddingLeft: customResponsiveWidth(2),
    paddingRight: customResponsiveWidth(4),
  },
  spacer: {
    flex: 1,
  },
  logo: {
    marginRight: Assets.size.horizontal_2 - customResponsiveWidth(2),
  },
  svg: {
    marginTop: -responsiveHeight(0.4),
  },
});

export default Header;
