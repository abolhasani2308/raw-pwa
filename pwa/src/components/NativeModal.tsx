//@ts-nocheck
import React, {useEffect} from 'react';
import {
  BackHandler,
  NativeEventSubscription,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {hideModal} from '../redux/actions/ModalActions';
import {NativeModalPropsType} from '../Types';

const SmallButton = (props?: {
  is_positive?: boolean;
  title?: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingRight: props?.is_positive
            ? Assets.size.horizontal_1
            : Assets.size.horizontal_3,
          paddingLeft: props?.is_positive
            ? Assets.size.horizontal_3
            : Assets.size.horizontal_1,
        },
      ]}
      activeOpacity={Assets.size.active_opacity}
      {...props}>
      <Text
        style={[
          styles.buttonText,
          {
            color: props?.is_positive ? Colors.success : Colors.danger,
          },
        ]}>
        {props?.title}
      </Text>
    </TouchableOpacity>
  );
};

const NativeModal = (props: NativeModalPropsType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let handler: NativeEventSubscription | undefined;
    handler = BackHandler.addEventListener('hardwareBackPress', () => {
      dispatch(hideModal());
      return true;
    });
    return handler?.remove;
  }, [props.onRequestClose]);

  return (
    <SafeAreaView style={styles.screen} pointerEvents="box-none">
      <View style={styles.background} />
      <View style={styles.modal}>
        <Text style={styles.modalTitle}>{props?.title}</Text>
        <Text style={styles.message}>{props?.message}</Text>
        <View style={styles.buttonsWrapper}>
          {props?.cancelTitle && (
            <SmallButton
              title={props?.cancelTitle}
              onPress={() => {
                props.onRequestClose();
                props.onCancelPress();
              }}
            />
          )}
          {props?.confirmTitle && (
            <SmallButton
              title={props?.confirmTitle}
              is_positive
              onPress={() => {
                props.onRequestClose();
                props.onConfirmPress();
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.black,
    opacity: Assets.size.modal_background_opacity,
  },
  modal: {
    maxHeight: Assets.size.modal_max_height,
    backgroundColor: Colors.bg,
    width: Assets.size.modal_width,
    borderRadius: Assets.size.border_2,
    paddingTop: Assets.size.vertical_1,
  },
  modalTitle: {
    fontFamily: Assets.font.medium,
    fontSize: Assets.font.h3,
    color: Colors.black,
    marginBottom: Assets.size.vertical_3,
    marginHorizontal: Assets.size.horizontal_1,
  },
  message: {
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h5,
    color: Colors.text_3,
    marginHorizontal: Assets.size.horizontal_1,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    marginTop: Assets.size.vertical_1,
    justifyContent: 'flex-end',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Assets.size.vertical_2,
  },
  buttonText: {
    fontFamily: Assets.font.medium,
    fontSize: Assets.font.h6,
    textAlign: 'center',
  },
});

export default NativeModal;
