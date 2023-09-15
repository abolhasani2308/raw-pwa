//@ts-nocheck
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {hideModal} from '../redux/actions/ModalActions';

const HideLoading = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(hideModal());
    });
    return unsubscribe;
  }, [dispatch, navigation]);
};
export default HideLoading;
