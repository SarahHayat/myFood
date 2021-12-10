import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import OldInscription from './oldInscription';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {Inscription} from './Inscription';
import {SignIn} from './SignIn';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SignIn />
      </View>
    </SafeAreaView>
  );
};

export default Home;
