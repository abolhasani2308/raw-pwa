//@ts-nocheck
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from './features';

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});
