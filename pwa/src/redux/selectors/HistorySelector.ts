//@ts-nocheck
import {useSelector} from 'react-redux';
import {RootState} from '../features';

export function useHistory() {
  return useSelector((state: RootState) => state.history);
}
