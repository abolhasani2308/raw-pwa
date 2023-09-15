//@ts-nocheck
import NetInfo from '@react-native-community/netinfo';
import {showModal} from '../redux/actions/ModalActions';
import {fa} from '../i18n/fa-IR';
import {NetworkCheckerPropsType} from '../Types';

const NetworkChecker = (props: NetworkCheckerPropsType) => {
  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      props.onConnected();
    } else {
      props.onDisConnected();
    }
  });
};

export const netAlert = showModal({
  id: 'AlertBox',
  modalProps: {
    message: fa.root.check_your_internet_status,
  },
});

export default NetworkChecker;
