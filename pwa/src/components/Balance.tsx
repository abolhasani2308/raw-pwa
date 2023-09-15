//@ts-nocheck
import {BlurView} from '@react-native-community/blur';
import React, {useImperativeHandle, useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {BalancePropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {fa} from '../i18n/fa-IR';
import {useApi} from '../providers/ApiProvider';
import {showModal} from '../redux/actions/ModalActions';
import {setWallet} from '../redux/actions/WalletActions';
import {useWallet} from '../redux/selectors/WalletSelector';
import {
  getUserWalletBodyType,
  getUserWalletResponseType,
} from '../services/api/ServerTypes';
import {staticNumberFormatter} from '../utils/NumberFormatter';
import NetworkChecker, {netAlert} from '../services/NetworkChecker';
import {useConfig} from '../redux/selectors/ConfigSelector';
import {DataSigner} from '../services/DataSigner';
import {useAuth} from '../redux/selectors/AuthSelector';

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
const Balance = React.forwardRef((props: BalancePropsType, ref) => {
  const dispatch = useDispatch();
  const {amount, wallet_id} = useWallet();
  const {api} = useApi();
  const {certificate} = useAuth();
  const [secure, set_secure] = useState(true);
  const {sign_required} = useConfig();

  const updateAmount = () => {
    NetworkChecker({
      onConnected: async () => {
        if (sign_required) {
          let data = {
            tokenSymbol: 'IRDR',
            walletID: wallet_id,
          };
          DataSigner(data, certificate).then(signData => {
            getUserWalletMutaion.mutate({
              data: signData?.data,
              sign: signData?.sign,
              certificate: signData?.certificate,
            });
          });
        } else {
          getUserWalletMutaion.mutate({});
        }
      },
      onDisConnected: () => {
        rotateStop();
        dispatch(netAlert);
      },
    });
  };

  useImperativeHandle(ref, () => ({
    updateAmount,
  }));

  const getUserWalletMutaion = useMutation({
    mutationFn: async (body: getUserWalletBodyType) => {
      return api?.getUserWallet(body);
    },
    onSuccess: (data: getUserWalletResponseType) => {
      setWallet()(dispatch, data);
      rotateStop();
    },
    onError: (error: string) => {
      rotateStop();
      dispatch(
        showModal({
          id: 'AlertBox',
          modalProps: {
            message: error || fa.server_errors.default,
          },
        }),
      );
    },
  });

  return (
    <View style={[styles.container, props.container_style]}>
      <View style={styles.refreshAndTextWrapper}>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => {
            rotateStart();
            updateAmount();
          }}
          activeOpacity={Assets.size.active_opacity}>
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <Assets.svg.refresh
              width={Assets.size.icon_1}
              height={Assets.size.icon_1}
            />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.yourWalletText}>
          {fa.screens.dashboard_active.your_wallet_balance}
        </Text>
      </View>
      <View style={styles.secureContainer}>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => {
            set_secure(!secure);
          }}
          activeOpacity={Assets.size.active_opacity}>
          {secure ? (
            <Assets.svg.secure
              width={Assets.size.icon_1}
              height={Assets.size.icon_1}
            />
          ) : (
            <Assets.svg.un_secure
              width={Assets.size.icon_1}
              height={Assets.size.icon_1}
            />
          )}
        </TouchableOpacity>
        {secure ? (
          <Text style={styles.amountText}>
            ***
            <Text style={styles.rialText}>
              {fa.screens.dashboard_active.rial}
            </Text>
          </Text>
        ) : (
          <Text style={styles.amountText}>
            {staticNumberFormatter(amount) || staticNumberFormatter(0)}{' '}
            <Text style={styles.rialText}>
              {fa.screens.dashboard_active.rial}
            </Text>
          </Text>
        )}
      </View>
      {!amount && (
        <BlurView
          style={styles.blurView}
          blurType="dark"
          blurAmount={3}
          reducedTransparencyFallbackColor={Colors.black_opacity_1}>
          <TouchableOpacity
            style={styles.rechargeButton}
            activeOpacity={Assets.size.active_opacity}
            onPress={props.onEmptyPress}>
            <Text style={styles.rechargeText}>
              {fa.screens.dashboard_active.recharge_wallet}
            </Text>
          </TouchableOpacity>
        </BlurView>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: Assets.size.border_1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Assets.size.vertical_3,
  },
  refreshAndTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    paddingVertical: Assets.size.vertical_3,
    paddingHorizontal: Assets.size.horizontal_3,
  },
  yourWalletText: {
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h6,
    color: Colors.alt_bg,
  },
  amountText: {
    fontFamily: Assets.font.bold,
    fontSize: 1.28 * Assets.font.h1,
    color: Colors.alt_bg,
  },
  rialText: {
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    color: Colors.alt_bg,
    marginBottom: Assets.size.vertical_3,
    marginRight: Assets.size.horizontal_3,
  },
  amountAndRialWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  rechargeButton: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rechargeText: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h5,
    color: Colors.alt_bg,
  },
  secureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Balance;
