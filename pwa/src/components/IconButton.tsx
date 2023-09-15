//@ts-nocheck
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {IconButtonPropsType} from '../Types';
import Assets from '../assets/Assets';

const IconButton = (props: IconButtonPropsType) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.container_style]}
      activeOpacity={Assets.size.active_opacity}
      {...props}>
      {!!props.icon && (
        <props.icon width={Assets.size.icon_1} height={Assets.size.icon_1} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;
