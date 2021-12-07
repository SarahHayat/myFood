import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import Inscription from './inscription';
import {isSignedIn} from '../firebase/signIn';
import {useNavigation} from '@react-navigation/native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';

const Home = () => {
  const navigation = useNavigation();
  console.log('dans home');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>test</Text>
        <Inscription />
        <Button
          title="Go to Meal List"
          onPress={() => navigation.navigate('mealList', {id: 52772})}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
