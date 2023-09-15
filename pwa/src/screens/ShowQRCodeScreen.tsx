//@ts-nocheck
import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {ScrollView, Share, StyleSheet, Text, View} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import {
  ShowQRCodeScreenAddressPropsType,
  ShowQRCodeScreenPropsType,
  ShowQRCodeScreenScreenTitlePropsType,
} from '../Types';
import Assets from '../assets/Assets';
import HorizontalIconTitleButton from '../components/HorizontalIconTitleButton';
import IconButton from '../components/IconButton';
import {Colors} from '../configs/Colors';
import {fa} from '../i18n/fa-IR';
import {showModal} from '../redux/actions/ModalActions';
import ScreenWrapper from './ScreenWrapper';
import {customResponsiveHeight} from '../utils/CustomResponsive';
import {SvgXml} from 'react-native-svg';
import {useWallet} from '../redux/selectors/WalletSelector';

const ScreenTitle = (props: ShowQRCodeScreenScreenTitlePropsType) => {
  return <Text style={styles.title}>{props?.title}</Text>;
};

const Address = (props: ShowQRCodeScreenAddressPropsType) => {
  return (
    <View style={styles.addressContainer}>
      <Text style={styles.addressText}>{props?.address}</Text>
    </View>
  );
};

const ShowQRCodeScreen = (props: ShowQRCodeScreenPropsType) => {
  const dispatch = useDispatch();
  const {wallet_id, qr_code} = useWallet();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: wallet_id,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ScreenWrapper
      screen_style={styles.areaContainer}
      navigation={props.navigation}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}>
        <IconButton
          icon={Assets.svg.close_1}
          container_style={styles.backButton}
          onPress={() => {
            props?.navigation.goBack();
          }}
        />
        <ScreenTitle
          title={fa.screens.show_qr_code.the_unique_barcode_of_your_wallet}
        />
        <SvgXml
          xml={qr_code}
          height={9 * Assets.size.icon_1}
          width={9 * Assets.size.icon_1}
          style={styles.barcode}
        />
        <Address address={wallet_id} />
        <View style={styles.buttons}>
          <HorizontalIconTitleButton
            title={fa.screens.show_qr_code.copy_of_the_address}
            icon={Assets.svg.copy}
            container_style={{
              marginRight: Assets.size.horizontal_3,
            }}
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
          />
          <HorizontalIconTitleButton
            title={fa.screens.show_qr_code.share}
            icon={Assets.svg.share}
            onPress={onShare}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    backgroundColor: Colors.primary,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: Assets.size.horizontal_3,
    height: Assets.size.header_large,
  },
  title: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h6,
    color: Colors.alt_bg,
    alignSelf: 'center',
    marginTop: 1.4 * Assets.size.vertical_1,
  },
  barcode: {
    alignSelf: 'center',
    marginVertical: 1.4 * Assets.size.vertical_1,
  },
  addressContainer: {
    backgroundColor: Colors.white_opacity,
    borderRadius: responsiveScreenWidth(100),
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: customResponsiveHeight(6),
    alignSelf: 'center',
    justifyContent: 'center',
    width: responsiveScreenWidth(100) - 2 * Assets.size.horizontal_1,
  },
  addressText: {
    marginHorizontal: Assets.size.horizontal_3,
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h6,
    color: Colors.alt_bg,
    textAlign: 'center',
    marginTop: Assets.size.fix_input,
  },
  buttons: {
    flexDirection: 'row',
    width: responsiveScreenWidth(100) - 2 * Assets.size.horizontal_1,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: Assets.size.vertical_2,
  },
});

export default ShowQRCodeScreen;
