import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {styles} from '../styles/signInStyles';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {initGoogle} from '../firebase/google';
import {useNavigation} from '@react-navigation/native';

const OldInscription = () => {
  const navigation = useNavigation();

  const user = useSelector(s => s.auth.user);
  const dispatch = useDispatch();

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    initGoogle();
    return auth().onAuthStateChanged(onAuthStateChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onAuthStateChanged(user) {
    // setUser(user);
    // TODO : Changer la valeur de user quand le sign sera réglé
    dispatch({type: 'update', value: 'user'});
    if (initializing) {
      setInitializing(false);
    }
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }

  if (!user) {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <Image
          source={require('../assets/google.png')}
          style={{width: 100, height: 100, alignSelf: 'center'}}
        />
        <TouchableHighlight
          style={styles.touchable}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }>
          <Text style={styles.button}>Continuer avec Google</Text>
        </TouchableHighlight>
      </View>
    );
  }

  if (initializing) {
    return null;
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('mealList');
        }}
      />
      <Text>Clic</Text>
    </View>
  );
};

export default OldInscription;
