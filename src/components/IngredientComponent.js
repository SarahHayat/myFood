import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import IngredientComponentStyle from '../styles/IngredientComponentStyle';
import axios from 'axios';

const IngredientComponent = props => {
  let ingredientImageUrl = '';

  let titleIngredient = '';

  if (!props.isCustomMeal) {
    titleIngredient = props.name;
    ingredientImageUrl =
      // eslint-disable-next-line no-undef
      API_MEAL_INGREDIENT_IMAGE_URL +
      props.name.replace(/\s/g, '%20') +
      // eslint-disable-next-line no-undef
      API_MEAL_INGREDIENT_IMAGE_EXTENSION;
  } else {
    titleIngredient = props.name.title;
  }

  return (
    <View
      key={props.index}
      style={IngredientComponentStyle.styles.ingredientView}>
      <Text style={{color: 'black'}}>{titleIngredient}</Text>

      {props.isCustomMeal ? (
        <></>
      ) : (
        <Image
          source={{
            uri: ingredientImageUrl,
          }}
          style={IngredientComponentStyle.styles.ingredientImage}
        />
      )}
    </View>
  );
};

export default IngredientComponent;
