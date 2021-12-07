import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, Text} from 'react-native';

import {getMeal} from '../../api/meal/meal';
import {useNavigation} from '@react-navigation/native';

const MealPageComponent = props => {
  // const navigation = useNavigation();
  const {route, navigation} = props;
  const styles = StyleSheet.create({
    screen: {
      flex: 10,
      alignItems: 'center',
    },
    mealThumbnail: {
      width: 300,
      height: 300,
    },
  });

  const [meal, setMeal] = useState({});

  const loadMeal = async () => {
    setMeal(await getMeal(route.params.id));
  };

  useEffect(() => {
    loadMeal();
  });

  return (
    <SafeAreaView style={styles.screen}>
      <Text>{meal.name}</Text>
      <Text>
        {meal.origin} | {meal.category}
      </Text>
      <Image
        style={styles.mealThumbnail}
        source={{
          uri: meal.imageUrl,
        }}
      />

      <Text>Ingredients</Text>
      <FlatList
        data={meal.ingredients}
        renderItem={({item, index}) => {
          return <Text ref={index}>{item}</Text>;
        }}
      />
      <Text>{meal.instructions}</Text>

      <Text>Youtube video: {meal.youtubeUrl}</Text>
    </SafeAreaView>
  );
};

export default MealPageComponent;
