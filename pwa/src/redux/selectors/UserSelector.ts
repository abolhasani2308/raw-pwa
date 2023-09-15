//@ts-nocheck
import {useSelector} from 'react-redux';
import {RootState} from '../features';

export function useUser() {
  return useSelector((state: RootState) => state.user);
}
