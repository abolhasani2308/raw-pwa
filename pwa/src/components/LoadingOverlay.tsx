//@ts-nocheck
import React, {useEffect} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {fa} from '../i18n/fa-IR';
import {customResponsiveHeight} from '../utils/CustomResponsive';

const LoadingOverlay = () => {
  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const rotateAnimation = Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 600,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  );
  const rotateStart = () => {
    rotateAnimation.start();
  };
  useEffect(() => {
    rotateStart();
  }, []);

  return (
    <View style={styles.screen} pointerEvents="box-only">
      <View style={styles.background} />
      <Assets.svg.parsian_bank_logo_2
        height={(51.01 / 47.74) * customResponsiveHeight(10)}
        width={customResponsiveHeight(10)}
        style={styles.logo}
      />
      <Animated.View style={[styles.anime, {transform: [{rotate: spin}]}]}>
        <Assets.svg.circle
          height={customResponsiveHeight(22)}
          width={customResponsiveHeight(22)}
        />
      </Animated.View>
      <Text style={styles.loadingText}>{fa.root.processing_request}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    opacity: 0.9,
  },
  logo: {
    position: 'absolute',
  },
  anime: {
    position: 'absolute',
  },
  loadingText: {
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    color: Colors.alt_bg,
    marginTop:
      (51.01 / 47.74) * customResponsiveHeight(10) + customResponsiveHeight(22),
  },
});

export default LoadingOverlay;
