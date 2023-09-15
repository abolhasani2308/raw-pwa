//@ts-nocheck
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {hideModal} from '../redux/actions/ModalActions';
import {store} from '../redux/Store';
import AlertBox from './AlertBox';
import LoadingOverlay from './LoadingOverlay';
import ConfirmModal from './ConfirmModal';
import Toast from './Toast';
import NativeModal from './NativeModal';

const Modals = {
  AlertBox: AlertBox,
  Loading: LoadingOverlay,
  Toast: Toast,
  Confirm: ConfirmModal,
  Native: NativeModal,
};

export interface RootModalProps {
  id: keyof typeof Modals;
  modalProps: {};
}

const RootModal = (props: RootModalProps) => {
  const {id, modalProps} = props;
  const ModalView = useMemo(() => Modals[id] as any, [id]);
  return (
    <View style={StyleSheet.absoluteFill}>
      {ModalView && (
        <ModalView
          {...modalProps}
          onRequestClose={() => store.dispatch(hideModal())}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    id: state.modal.id,
    modalProps: state.modal.modalProps,
  };
};

export default connect(mapStateToProps)(RootModal);
