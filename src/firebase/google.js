import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const initGoogle = () => {
  GoogleSignin.configure({
    webClientId:
      '662670245506-69saqj2m2e4q9jbb4erd2onundg5c0ep.apps.googleusercontent.com',
    offlineAccess: true,
  });
};

export {initGoogle};
