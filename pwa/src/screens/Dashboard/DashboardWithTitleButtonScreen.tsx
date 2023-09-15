//@ts-nocheck
import React from 'react';
import {
  DashboardBaseScreenPropsType,
  DashboardSectionedScreenPropsType,
  DashboardWithTitleButtonScreenPropsType,
} from '../../Types';
import DashboardSectionedScreen from './DashboardSectionedScreen';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../configs/Colors';
import Assets from '../../assets/Assets';
import CustomButton from '../../components/CustomButton';
import {customResponsiveHeight} from '../../utils/CustomResponsive';

const DashboardWithTitleButtonScreen = (
  props: DashboardBaseScreenPropsType &
    DashboardSectionedScreenPropsType &
    DashboardWithTitleButtonScreenPropsType,
) => {
  return (
    <DashboardSectionedScreen
      render_card_inside_1={
        <View
          style={{
            height: customResponsiveHeight(8),
            marginTop: Assets.size.first_item_position_2,
            marginBottom: Assets.size.vertical_2,
          }}>
          <Text style={styles.screenTitle}>{props?.screen_title}</Text>
        </View>
      }
      render_card_inside_5={
        <CustomButton
          fill
          title={props?.button_title}
          container_style={styles.button}
          secondary
          onPress={props?.onButtonPress}
        />
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h5,
    color: Colors.alt_bg,
    alignSelf: 'center',
  },
  button: {
    marginHorizontal: Assets.size.horizontal_1,
    marginBottom: Assets.size.vertical_1,
  },
});

export default DashboardWithTitleButtonScreen;
