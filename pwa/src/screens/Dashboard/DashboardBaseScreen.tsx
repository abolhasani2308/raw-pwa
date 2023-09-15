//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DashboardBaseScreenPropsType} from '../../Types';
import Assets from '../../assets/Assets';
import ActivityLog from '../../components/ActivityLog';
import DashboardCard from '../../components/DashboardCard';
import Empty from '../../components/Empty';
import {Colors} from '../../configs/Colors';
import {useApi} from '../../providers/ApiProvider';
import {customResponsiveHeight} from '../../utils/CustomResponsive';
import ScreenWrapper from '../ScreenWrapper';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useHistory} from '../../redux/selectors/HistorySelector';
import {
  setAllHistory,
  setChargeHistory,
  setTransferHistory,
  setWithdrawHistory,
} from '../../redux/actions/HistoryActions';

const DashboardBaseScreen = (props: DashboardBaseScreenPropsType) => {
  const {api} = useApi();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {
    withdraw_histories,
    charge_histories,
    transfer_histories,
    all_histories,
  } = useHistory();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  var list =
    props?.screen_type === 'WITHDRAW'
      ? withdraw_histories
      : props?.screen_type === 'CHARGE'
      ? charge_histories
      : props?.screen_type === 'TRANSFER'
      ? transfer_histories
      : props?.screen_type === ''
      ? all_histories
      : [];

  useEffect(() => {
    if (isFocused) {
      if (list?.length === 0) {
        loadResource();
      }
    }
  }, [isFocused]);

  const loadResource = () => {
    api
      ?.transactionsIndex({type: props?.screen_type, page: 1})
      .then(res => {
        if (props?.screen_type === 'WITHDRAW') {
          setWithdrawHistory()(dispatch, res?.data);
        } else if (props?.screen_type === 'CHARGE') {
          setChargeHistory()(dispatch, res?.data);
        } else if (props?.screen_type === 'TRANSFER') {
          setTransferHistory()(dispatch, res?.data);
        } else if (props?.screen_type === '') {
          setAllHistory()(dispatch, res?.data);
        }
        setTotalPages(res?.meta?.last_page);
        rotateStop();
      })
      .catch(() => {
        rotateStop();
      });
  };

  const nextPage = () => {
    api?.transactionsIndex({type: props?.screen_type, page: page}).then(res => {
      if (props?.screen_type === 'WITHDRAW') {
        setWithdrawHistory()(dispatch, withdraw_histories.concat(res?.data));
      } else if (props?.screen_type === 'CHARGE') {
        setChargeHistory()(dispatch, charge_histories.concat(res?.data));
      } else if (props?.screen_type === 'TRANSFER') {
        setTransferHistory()(dispatch, transfer_histories.concat(res?.data));
      } else if (props?.screen_type === '') {
        setAllHistory()(dispatch, all_histories.concat(res?.data));
      }
    });
  };

  const handleAutoPagination = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let paddingToBottom = customResponsiveHeight(1);
    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
    if (
      e.nativeEvent.contentOffset.y >=
      e.nativeEvent.contentSize.height - paddingToBottom
    ) {
      if (list?.length !== 0) {
        if (Number(page) < Number(totalPages)) {
          nextPage();
          setPage(prev => prev + 1);
        }
      }
    }
  };

  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const rotateAnimation = Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  );
  const rotateStart = () => {
    rotateAnimation.start();
  };

  const rotateStop = () => {
    rotateAnimation.stop();
    spinValue.setValue(0);
  };

  return (
    <ScreenWrapper navigation={props.navigation}>
      <FlatList
        data={list}
        ListHeaderComponent={
          <>
            <DashboardCard children={props?.render_card_inside} />
            <View style={styles.refreshAndTitle}>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={() => {
                  rotateStart();
                  loadResource();
                }}
                activeOpacity={Assets.size.active_opacity}>
                <Animated.View style={{transform: [{rotate: spin}]}}>
                  <Assets.svg.refresh
                    width={Assets.size.icon_1}
                    height={Assets.size.icon_1}
                  />
                </Animated.View>
              </TouchableOpacity>
              <Text style={styles.recent}>{props?.list_title}</Text>
            </View>
          </>
        }
        renderItem={({item, index}) => {
          return (
            <ActivityLog
              group_type={item?.group_type}
              type={item?.type}
              ago={item?.ago}
              amount_formatted={item?.amount_formatted}
              from_title={item?.from_title}
              to_title={item?.to_title}
              key={index}
            />
          );
        }}
        keyExtractor={(_, index) => String(index)}
        ListEmptyComponent={() => {
          return <Empty />;
        }}
        keyboardShouldPersistTaps="handled"
        onScroll={handleAutoPagination}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  recent: {
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h5,
    color: Colors.text_3,
    marginHorizontal: Assets.size.horizontal_3,
    marginVertical: Assets.size.vertical_2,
  },
  refreshButton: {
    paddingVertical: Assets.size.vertical_3,
    paddingHorizontal: Assets.size.horizontal_3,
  },
  refreshAndTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DashboardBaseScreen;
