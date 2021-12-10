import React, {useCallback, useEffect, useState} from 'react';

import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../styles/myReceipeHomeMade';
import {useNavigation} from '@react-navigation/native';

const MyReceipeHomeMade = () => {
  const receipe = useSelector(s => s.receipe.newReceipe);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log('rceipe = ', receipe);

  return (
    <SafeAreaView>
      <Text style={styles.title}>Mes recettes</Text>
      <FlatList
        data={receipe}
        renderItem={({item, index}) => {
          return (
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('mealDetail', {
                  data: {isCustomMeal: true, mealData: item},
                });
              }}>
              <View key={index} style={styles.container}>
                {item.imageUrl ? (
                  <Image
                    source={{
                      uri: item.imageUrl,
                    }}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require('../assets/noImage.png')}
                    style={styles.image}
                  />
                )}
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableHighlight>
          );
        }}
      />
    </SafeAreaView>
  );
};
export default MyReceipeHomeMade;
