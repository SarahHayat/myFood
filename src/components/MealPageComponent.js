import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {getMeal} from '../api/meal/meal';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [favorite, setfavorite] = useState([]);
  const [nameIcon, setNameIcon] = useState('heart-o');

  const loadMeal = async () => {
    setMeal(await getMeal(route.params.id));
  };

  useEffect(() => {
    loadMeal();
  });

  function defineFavorite() {
    let copy = favorite;
    let copyIcon = nameIcon;
    if (copy.includes(route.params.id)) {
      for (var i = 0; i < copy.length; i++) {
        if (copy[i] === route.params.id) {
          copy.splice(i, 1);
          copyIcon = 'heart-o';
        }
      }
    } else {
      copy.push(route.params.id);
      copyIcon = 'heart';
    }
    setfavorite(copy);
    setNameIcon(copyIcon);
    console.log(copy);
  }

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
      <TouchableOpacity onPress={defineFavorite}>
        <Icon name={nameIcon} size={30} color="#900" />
      </TouchableOpacity>
      <Text>Ingredients</Text>
      <FlatList
        data={meal.ingredients}
        renderItem={({item, index}) => {
          return <Text ref={index}>{item}</Text>;
        }}
      />
      <Text>{meal.instructions}</Text>
      <Icon name={nameIcon} size={30} color="'black" />
      <Text>Youtube video: {meal.youtubeUrl}</Text>
    </SafeAreaView>
  );
};

export default MealPageComponent;
