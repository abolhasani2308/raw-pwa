//@ts-nocheck
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityLogPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {fa} from '../i18n/fa-IR';

const ActivityLog = (props: ActivityLogPropsType) => {
  return (
    <View style={[styles.container, props?.container_style]}>
      <View style={styles.infoWrapper}>
        <View style={styles.topRow}>
          <Text style={[styles.sub1Andtext3, styles.time]}>
            {props?.ago ?? '--'}
          </Text>
          <Text style={[styles.sub1Andtext3, styles.typeOrPort]}>
            {props?.type ?? '--'}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.of_toAndPort}>
            <Text style={[styles.sub1Andtext3, styles.ofTo]}>
              {' '}
              {props?.group_type === 'in'
                ? fa.screens.dashboard_active.of
                : fa.screens.dashboard_active.to}
            </Text>
            <Text style={[styles.sub1Andtext3, styles.typeOrPort]}>
              {props?.group_type === 'in'
                ? props?.from_title
                : props?.to_title ?? '--'}
            </Text>
          </View>
          <Text style={styles.amount}>{props?.amount_formatted ?? '--'}</Text>
        </View>
      </View>
      <View style={styles.icon}>
        {props?.group_type === 'in' ? (
          <Assets.svg.arrow_down
            height={Assets.size.icon_3}
            width={Assets.size.icon_3}
          />
        ) : (
          <Assets.svg.arrow_up
            height={Assets.size.icon_3}
            width={Assets.size.icon_3}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Assets.size.horizontal_3,
    marginBottom: Assets.size.vertical_2,
    alignItems: 'center',
  },
  infoWrapper: {
    flex: 1,
    marginRight: Assets.size.horizontal_4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Assets.size.vertical_4,
    alignItems: 'center',
  },
  sub1Andtext3: {
    fontSize: Assets.font.sub_1,
    color: Colors.text_3,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontFamily: Assets.font.light,
  },
  typeOrPort: {
    fontFamily: Assets.font.bold,
  },
  ofTo: {
    fontFamily: Assets.font.regular,
  },
  amount: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h6,
    color: Colors.secondary,
  },
  of_toAndPort: {
    flexDirection: 'row',
  },
  icon: {
    height: Assets.size.circle_1,
    width: Assets.size.circle_1,
    backgroundColor: Colors.black_2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Assets.size.circle_1,
    elevation: Assets.size.elevation_2,
  },
});

export default ActivityLog;
