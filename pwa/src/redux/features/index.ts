//@ts-nocheck
import {combineReducers} from '@reduxjs/toolkit';
import {modalReducer} from './ModalReducer';
import {authReducer} from './AuthReduser';
import {walletReducer} from './WalletReduser';
import {userReducer} from './UserReduser';
import {historyReducer} from './HistoryReduser';
import {configReducer} from './ConfigReduser';

export const rootReducer = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  wallet: walletReducer,
  user: userReducer,
  history: historyReducer,
  config: configReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
