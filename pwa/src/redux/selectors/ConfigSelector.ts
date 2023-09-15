//@ts-nocheck
import {useSelector} from 'react-redux';
import {RootState} from '../features';

export function useConfig() {
  return useSelector((state: RootState) => state.config);
}
