//@ts-nocheck
import {useSelector} from 'react-redux';
import {RootState} from '../features';

export function useAuth() {
  return useSelector((state: RootState) => state.auth);
}
