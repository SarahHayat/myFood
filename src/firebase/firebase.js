import '@firebase/auth';
// import {firebase} from '@react-native-firebase/auth';
import firebase from 'firebase/compat';

export const firebaseConfig = {
  apiKey: 'AIzaSyBk9B9Nza-_lwV-5R_PypOWtbmv7ELVQb0',
  authDomain: 'myfood-914bd.firebaseapp.com',
  projectId: 'myfood-914bd',
  storageBucket: 'myfood-914bd.appspot.com',
  messagingSenderId: '662670245506',
  appId: '1:662670245506:web:d01840604d0487faf27e9b',
  measurementId: '${config.measurementId}',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
