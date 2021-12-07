import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import Inscription from './inscription';
import {isSignedIn} from '../firebase/signIn';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Inscription navigation={navigation} />
      <Button
        title="Go to Meal List"
        onPress={() => navigation.navigate('mealList')}
      />
    </View>
  );
};

export default Home;
