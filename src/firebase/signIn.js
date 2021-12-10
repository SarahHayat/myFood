import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({userInfo});
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
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
