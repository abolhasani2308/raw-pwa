//@ts-nocheck
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';
import BackgroundTimer from 'react-native-background-timer';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {customResponsiveHeight} from '../utils/CustomResponsive';
import IconButton from './IconButton';

const Toast = (props: {
  success: boolean;
  message: string;
  onRequestClose: () => any;
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const show = useRef(
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
  ).current;

  const hide = useRef(
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
  ).current;

  useEffect(() => {
    show.start();
    const id = BackgroundTimer.setTimeout(
      () => hide.start(() => props.onRequestClose()),
      3000,
    );
    return () => BackgroundTimer.clearTimeout(id);
  }, []);

  return (
    <SafeAreaView style={styles.screen} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            backgroundColor: Colors.success,
          },
        ]}>
        <View style={styles.pipeAndButtonWrapper}>
          <IconButton
            icon={Assets.svg.close_1}
            container_style={styles.closeButton}
            onPress={props.onRequestClose}
          />
          <View style={styles.pipeline} />
        </View>
        <View style={styles.messageWrapper}>
          <Text style={styles.message}>{props.message}</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  container: {
    width: responsiveScreenWidth(100),
    minHeight: Assets.size.header_large,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
  },
  message: {
    color: Colors.alt_bg,
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h6,
    marginVertical: Assets.size.vertical_3,
  },
  closeButton: {
    paddingRight: Assets.size.horizontal_4,
    paddingLeft: Assets.size.horizontal_3,
    height: Assets.size.header_large,
  },
  pipeline: {
    width: Assets.size.line,
    backgroundColor: Colors.alt_bg,
    height: Assets.size.header_large - customResponsiveHeight(5),
    opacity: 0.5,
  },
  messageWrapper: {
    flex: 1,
    marginHorizontal: Assets.size.horizontal_3,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  pipeAndButtonWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    height: Assets.size.header_large,
  },
});

export default Toast;
