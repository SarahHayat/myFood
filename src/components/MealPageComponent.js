import React, {useEffect, useState} from 'react';
import {FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight} from 'react-native';

import {getMeal} from '../api/meal/meal';
import {useNavigation} from '@react-navigation/native';
import IngredientComponent from "./IngredientComponent";
import '../../global';
import Ionicons from "react-native-vector-icons/Ionicons";

const MealPageComponent = props => {
  const {route} = props;
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
    },
    mealThumbnail: {
      width: 300,
      height: 300,
    },
      flagImage: {
        height: 54,
          width: 80,
      },
  });

  const [meal, setMeal] = useState({});

  const loadMeal = async () => {
    setMeal(await getMeal(route.params.id));
  };

  useEffect(() => {
    loadMeal();
  }, [route.params.id]);

  return (
    <SafeAreaView style={styles.screen}>
      <Text>{meal.name} | {meal.category}</Text>
        <Text>{meal.origin}</Text>
        <Image source={{
    uri: API_FLAG_URL + API_FLAG_CONVERT[`${meal.origin}`] + API_FLAG_IMAGE_EXTENSION
}}
        style={styles.flagImage}/>
      <Image
        style={styles.mealThumbnail}
        source={{
          uri: meal.imageUrl,
        }}
      />

      <FlatList
          numColumns={5}
          style={{
              flex: 1,
              flexDirection: 'row'
          }}
        data={meal.ingredients}
        renderItem={({item, index}) => {
            return <IngredientComponent name={item} ref={index}/>;
        }}
      />

      <ScrollView style={styles.instructionsView}>
          <Text style={styles.instructions}>{meal.instructions}</Text>
      </ScrollView>

        <TouchableHighlight onPress={() => Linking.openURL(meal.youtubeUrl)}>
            <Ionicons name="logo-youtube" color='red' size={75} />
        </TouchableHighlight>
    </SafeAreaView>
  );
};

export default MealPageComponent;
