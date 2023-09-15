//@ts-nocheck
import {useSelector} from 'react-redux';
import {RootState} from '../features';

export function useWallet() {
  return useSelector((state: RootState) => state.wallet);
}
