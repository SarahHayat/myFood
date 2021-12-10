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

    if (!props.isCustomMeal) {
        ingredientImageUrl = API_MEAL_INGREDIENT_IMAGE_URL + props.name.replace(/\s/g, '%20') + API_MEAL_INGREDIENT_IMAGE_EXTENSION;
    }

    return (
        <View key={props.index} style={IngredientComponentStyle.styles.ingredientView}>
            <Text>{props.name}</Text>
            {
                props.isCustomMeal ? (
                    <></>
                ): (
                    <Image source={{
                        uri: ingredientImageUrl
                    }}
                           style={IngredientComponentStyle.styles.ingredientImage}/>
                )
            }
        </View>
    );
};

export default IngredientComponent;
