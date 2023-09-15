//@ts-nocheck
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import RootModal from '../components/RootModal';
import {Colors} from '../configs/Colors';
import {ModalProvider} from '../providers/ModalProvider';
import {store} from '../redux/Store';
import Router from './Router';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ApiProvider} from '../providers/ApiProvider';

const queryClient = new QueryClient();

const App = () => {
  const navigationRef = React.useRef(null);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ApiProvider navigationRef={navigationRef}>
          <ModalProvider>
            <NavigationContainer ref={navigationRef}>
              <StatusBar
                barStyle={'light-content'}
                backgroundColor={Colors.primary}
              />
              <Router />
            </NavigationContainer>
          </ModalProvider>
          <RootModal />
        </ApiProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
