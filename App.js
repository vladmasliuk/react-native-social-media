import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native';

// proxy
axios.defaults.baseURL = 'https://us-central1-react-social-a3a4f.cloudfunctions.net/api';

// Navigation
import DrawerNavigator from './routes/DrawerNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <DrawerNavigator/>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}