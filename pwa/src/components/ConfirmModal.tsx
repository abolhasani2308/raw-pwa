//@ts-nocheck
import React, {useEffect} from 'react';
import {
  BackHandler,
  NativeEventSubscription,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {fa} from '../i18n/fa-IR';
import {hideModal} from '../redux/actions/ModalActions';
import {customResponsiveWidth} from '../utils/CustomResponsive';
import {staticNumberFormatter} from '../utils/NumberFormatter';

const Key = (props?: {title?: string}) => {
  return <Text style={styles.key}>{props?.title}</Text>;
};

const Value = (props?: {title?: string}) => {
  return <Text style={styles.value}>{props?.title}</Text>;
};

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
          backgroundColor: props?.is_positive ? Colors.success : Colors.bg,
          borderWidth: props?.is_positive ? 0 : Assets.size.line,
          marginRight: props?.is_positive ? customResponsiveWidth(3) : 0,
          marginLeft: props?.is_positive ? 0 : customResponsiveWidth(3),
        },
      ]}
      activeOpacity={Assets.size.active_opacity}
      {...props}>
      <Text
        style={[
          styles.buttonText,
          {
            color: props?.is_positive ? Colors.bg : Colors.danger,
          },
        ]}>
        {props?.title}
      </Text>
    </TouchableOpacity>
  );
};

const KeyValueList = (props?: {
  data: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <FlatList
      style={styles.list}
      data={props?.data}
      renderItem={({item}) => {
        return (
          <>
            <Key title={item?.key} />
            <Value title={item?.value} />
          </>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const ConfirmModal = (props: {
  onRequestClose: () => any;
  title?: string;
  first_key?: string;
  first_value?: string;
  second_key?: string;
  second_value?: string;
  third_key?: string;
  third_value?: string;
  onConfirmPress?: () => void;
  onCancelPress?: () => void;
}) => {
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
        <Key title={props?.first_key} />
        <Text style={styles.firstValueLight}>
          <Text style={styles.firstValueBold}>
            {staticNumberFormatter(props?.first_value) || '--'}
          </Text>{' '}
          {fa.screens.withdraw.rial}
        </Text>
        {!!props?.second_key && <Key title={props.second_key} />}
        {!!props?.second_value && <Value title={props.second_value} />}
        {!!props?.third_key && <Key title={props.third_key} />}
        {!!props?.third_value && <Value title={props.third_value} />}
        {!!props?.informations && <KeyValueList data={props?.informations} />}
        <View style={styles.buttonsWrapper}>
          <SmallButton
            title={fa.screens.withdraw.confirmation}
            is_positive
            onPress={() => {
              props.onRequestClose();
              props.onConfirmPress();
            }}
          />
          <SmallButton
            title={fa.screens.withdraw.cancel_the_operation}
            onPress={() => {
              props.onRequestClose();
              props?.onCancelPress;
            }}
          />
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
    alignItems: 'center',
    paddingVertical: Assets.size.vertical_1,
    paddingHorizontal: Assets.size.horizontal_3,
  },
  modalTitle: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h5,
    color: Colors.secondary,
    marginBottom: Assets.size.vertical_3,
    textAlign: 'center',
  },
  key: {
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    color: Colors.text_2,
    marginTop: Assets.size.vertical_4,
    textAlign: 'center',
  },
  value: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h6,
    color: Colors.text_2,
    marginTop: Assets.size.vertical_4,
    textAlign: 'center',
  },
  firstValueLight: {
    fontFamily: Assets.font.light,
    fontSize: Assets.font.h6,
    color: Colors.text_2,
    marginTop: Assets.size.vertical_4,
    textAlign: 'center',
  },
  firstValueBold: {
    fontFamily: Assets.font.bold,
    fontSize: 1.1 * Assets.font.h1,
    color: Colors.text_2,
    textAlign: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    marginTop: Assets.size.vertical_1,
  },
  button: {
    flex: 1,
    height: Assets.size.button_1,
    borderRadius: Assets.size.border_2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.danger,
    elevation: Assets.size.elevation_1,
  },
  buttonText: {
    fontFamily: Assets.font.medium,
    fontSize: Assets.font.h6,
    textAlign: 'center',
  },
  list: {
    alignSelf: 'stretch',
  },
});

export default ConfirmModal;
