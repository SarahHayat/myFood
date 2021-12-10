import {GoogleSignin} from '@react-native-google-signin/google-signin';

const initGoogle = () => {
  GoogleSignin.configure({
    webClientId:
      '662670245506-3pnrplfo5jcua13qubqd6jpv33ob680e.apps.googleusercontent.com',
    offlineAccess: true,
  });
};

export {initGoogle};
