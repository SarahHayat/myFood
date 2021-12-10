import React, {useCallback, useEffect, useState} from 'react';

import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../styles/myReceipeHomeMade';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyReceipeHomeMade = () => {
  const receipe = useSelector(s => s.receipe.newReceipe);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const removeReceipe = useCallback(
    id => {
      dispatch({type: 'deleteReceipe', id: id});
    },
    [dispatch],
  );

  return (
    <SafeAreaView>
      <Text style={styles.title}>Mes recettes</Text>
      <FlatList
        data={receipe}
        renderItem={({item, index}) => {
          return (
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
              <TouchableHighlight
                style={styles.name}
                onPress={() => {
                  navigation.navigate('mealDetail', {
                    data: {isCustomMeal: true, mealData: item},
                  });
                }}>
                <Text>{item.name}</Text>
              </TouchableHighlight>
              <TouchableOpacity
                onPress={() => {
                  removeReceipe(item.id);
                }}>
                <View style={styles.icon}>
                  <Ionicons name="close-circle-outline" color="red" size={40} />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
export default MyReceipeHomeMade;
