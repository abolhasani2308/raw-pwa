//@ts-nocheck
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PasswordPadScreenPropsType} from '../../Types';
import Assets from '../../assets/Assets';
import PasswordPad from '../../components/PasswordPad';
import ScreenWrapper from '../ScreenWrapper';

const PasswordPadScreen = React.forwardRef(
  (props: PasswordPadScreenPropsType, ref) => {
    return (
      <ScreenWrapper navigation={props.navigation} rout_name={props?.rout_name}>
        <View style={styles.topSpacer} />
        <PasswordPad ref={ref} {...props} />
        <View style={styles.bottomSpacer}>{props.children}</View>
      </ScreenWrapper>
    );
  },
);

const styles = StyleSheet.create({
  topSpacer: {
    flex: 1,
  },
  bottomSpacer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Assets.size.vertical_2,
  },
});

export default PasswordPadScreen;
