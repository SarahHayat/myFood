import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Button,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {styles} from '../styles/signInStyles';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {initGoogle} from '../firebase/google';

const Inscription = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    initGoogle();
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (!user) {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <Image
          source={require('../assets/google.png')}
          style={{width: 100, height: 100, alignSelf: 'center'}}
        />
        <TouchableHighlight
          style={styles.touchable}
          onPress={onGoogleButtonPress}>
          <Text style={styles.button}>Continuer avec Google</Text>
        </TouchableHighlight>
      </View>
    );
  }

  if (initializing) {
    return null;
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View>
      <TouchableOpacity onPress={navigation.navigate('mealList')} />
    </View>
  );
};

export default Inscription;
