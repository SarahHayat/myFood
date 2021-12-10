import React from 'react';
import {Navigator, TabNavigator} from './src/navigations/router';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
