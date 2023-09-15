//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {HorizontalIconTitleButtonPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';

const HorizontalIconTitleButton = (
  props: HorizontalIconTitleButtonPropsType,
) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.container_style]}
      activeOpacity={Assets.size.active_opacity}
      {...props}>
      <Text style={styles.title}>{props.title}</Text>
      {!!props?.icon && (
        <props.icon height={Assets.size.icon_1} width={Assets.size.icon_1} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Assets.size.border_2,
    flexDirection: 'row',
    alignSelf: 'center',
    height: Assets.size.button_1,
    paddingHorizontal: Assets.size.horizontal_3,
    flex: 1,
    elevation: Assets.size.elevation_1,
  },
  title: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h6,
    color: Colors.bg,
    marginRight: Assets.size.horizontal_4,
  },
});

export default HorizontalIconTitleButton;
