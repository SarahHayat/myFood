import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const signIn = async () => {
  try {
    console.log('HEEEERE');
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('user info = ', userInfo);
    this.setState({userInfo});
  } catch (error) {
    console.log('error ', error.code);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      console.log('error');
      // some other error happened
    }
  }
};

const isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  this.setState({isLoginScreenPresented: !isSignedIn});
};

const getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  this.setState({currentUser});
};

const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    this.setState({user: null}); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};
export {signIn, isSignedIn, getCurrentUser, signOut};
