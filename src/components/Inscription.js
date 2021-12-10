import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useState} from 'react';
import {getSignIn, registerUser} from '../firebase/userFirebase';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {styles} from '../styles/inscription';

const Inscription = () => {
  const navigation = useNavigation();

  const user = useSelector(s => s.auth.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const register = useCallback(async () => {
    let values = {email: email, password: password};
    const user = await registerUser(values);
    dispatch({type: 'update', values: user});
  }, [email, password]);

  // const signIn = useCallback(async () => {
  //   await getSignIn();
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.title}>Inscription</Text>
      <View style={styles.container}>
        <Text style={styles.text}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} />
        <Text style={styles.text}>Password</Text>
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={async () => {
            await register();
            navigation.navigate('connexion');
          }}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
export {Inscription};
