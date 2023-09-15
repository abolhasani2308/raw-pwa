//@ts-nocheck
import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {CustomListPickerPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {customResponsiveHeight} from '../utils/CustomResponsive';

const CustomListPicker = (props: CustomListPickerPropsType) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.background} onTouchStart={props.onRequestClose} />
      <View style={styles.modal}>
        <View style={styles.container}>
          <FlatList
            data={props?.list}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={Assets.size.active_opacity}
                  onPress={() => {
                    props.onConfirmPress(item);
                  }}
                  style={[
                    styles.buttonContainer,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      marginBottom:
                        index === props?.list?.length - 1
                          ? Assets.size.vertical_1
                          : 0,
                    },
                  ]}>
                  <Text style={styles.text}>{item?.number}</Text>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: Assets.size.vertical_1,
  },
  background: {
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    position: 'absolute',
    backgroundColor: Colors.black,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    opacity: Assets.size.modal_background_opacity,
  },
  modal: {
    width: responsiveScreenWidth(100),
    backgroundColor: Colors.bg,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 2 * Assets.size.border_1,
    borderTopRightRadius: 2 * Assets.size.border_1,
    maxHeight: customResponsiveHeight(40),
  },
  container: {
    marginTop: Assets.size.vertical_1,
    flexDirection: 'row',
    marginHorizontal: Assets.size.horizontal_2,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h6,
    color: Colors.text_1,
    marginVertical: Assets.size.vertical_3,
    textAlign: 'center',
  },
  separator: {
    height: Assets.size.line,
    backgroundColor: Colors.primary,
  },
});

export default CustomListPicker;
