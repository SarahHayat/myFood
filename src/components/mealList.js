import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import BackHandler from 'react-native/Libraries/Utilities/BackHandler';
import {signOut} from '../firebase/signIn';
import {useNavigation} from '@react-navigation/native';

const MealList = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Meal List!</Text>
      <Button
        title={'got to detail meal'}
        onPress={() => {
          navigation.navigate('mealDetail', {id: 52773});
        }}
      />
    </View>
  );
};

export default MealList;
