import {combineReducers, createStore} from 'redux';
import authReducer from './authReducer';
import receipeReducer from './receipeReducer';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  receipe: persistReducer(persistConfig, receipeReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
