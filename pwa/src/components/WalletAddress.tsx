//@ts-nocheck
import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import {WalletAddressPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {fa} from '../i18n/fa-IR';
import {showModal} from '../redux/actions/ModalActions';
import {customResponsiveHeight} from '../utils/CustomResponsive';
import {useWallet} from '../redux/selectors/WalletSelector';

const WalletAddress = (props: WalletAddressPropsType) => {
  const dispatch = useDispatch();

  const {wallet_id} = useWallet();
  return (
    <TouchableOpacity
      style={[styles.container, props.container_style]}
      onPress={() => {
        Clipboard.setString(wallet_id);
        dispatch(
          showModal({
            id: 'Toast',
            modalProps: {
              message: fa.root.copied,
            },
          }),
        );
      }}
      activeOpacity={Assets.size.active_opacity}>
      <Assets.svg.copy height={Assets.size.icon_1} width={Assets.size.icon_1} />
      <Text style={styles.text} numberOfLines={1}>
        {wallet_id}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white_opacity,
    borderRadius: responsiveScreenWidth(100),
    flexDirection: 'row',
    paddingLeft: Assets.size.horizontal_3,
    paddingRight: Assets.size.horizontal_3 + Assets.size.icon_1,
    alignItems: 'center',
    minHeight: customResponsiveHeight(6),
  },
  text: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: Assets.size.horizontal_3,
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h6,
    color: Colors.alt_bg,
    marginTop: Assets.size.fix_input,
  },
});

export default WalletAddress;
