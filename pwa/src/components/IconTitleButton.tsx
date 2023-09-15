//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IconTitleButtonPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';

const IconTitleButton = (props: IconTitleButtonPropsType) => {
  return (
    <TouchableOpacity
      style={[
        {
          height: props?.size,
          width: props?.size,
        },
        styles.container,
        props.container_style,
      ]}
      activeOpacity={Assets.size.active_opacity}
      {...props}>
      {!!props?.icon && (
        <props.icon height={Assets.size.icon_1} width={Assets.size.icon_1} />
      )}
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black_opacity_2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Assets.size.border_2,
  },
  title: {
    fontFamily: Assets.font.medium,
    fontSize: Assets.font.sub_1,
    color: Colors.white,
    marginTop: Assets.size.vertical_3,
  },
});

export default IconTitleButton;
