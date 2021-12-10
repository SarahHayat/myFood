import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import {getMeal} from '../api/meal/meal';
import {useNavigation} from '@react-navigation/native';
import IngredientComponent from './IngredientComponent';
import '../../global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

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
  const [isFavorite, setIsFavorite] = useState();
  const [toAdd, setToAdd] = useState();
  // const [nameIcon, setNameIcon] = useState('heart-o');
  const favorites = useSelector(s => s.favorite.favorite);

  console.log('fav', favorites);
  console.log('is favorite', isFavorite);

  const dispatch = useDispatch();

  const loadMeal = async () => {
    setMeal(await getMeal(route.params.id));
  };

  function test() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    console.log('dans le use memo');
    console.log('to add ', toAdd);
    console.log(favorites.some(o => toAdd === o));
    if (favorites.some(o => toAdd === o.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
    console.log('is favorite after ', isFavorite);
  }

  useEffect(() => {
    loadMeal();
  }, [route.params.id]);

  // const setIfFav = () => {
  //   let copy = [...favorites];
  //   console.log('copy ', copy);
  //   console.log(
  //     'favorites.includes(route.params.id)',
  //     copy.includes(route.params.id),
  //   );
  //   console.log('favorite lenght ', copy.length);
  //   if (copy.length === 0) {
  //     setIsFavorite(true);
  //   } else {
  //     if (copy.includes(route.params.id)) {
  //       console.log('oui ya dans le tab');
  //       // setIsFavorite(false);
  //     } else {
  //       console.log('non ya pas');
  //       // setIsFavorite(true);
  //     }
  //   }
  // };

  const addToFav = useCallback(() => {
    console.log('add');
    dispatch({type: 'add', value: route.params.id});
    // setToAdd(route.params.id);
    // test();
    // setIfFav();
  }, [route.params.id]);

  const removeToFav = useCallback(() => {
    console.log('remove');
    dispatch({type: 'remove', value: route.params.id});
    // setToAdd('');
    // test();
    // setIfFav();
  }, [route.params.id]);

  // function defineFavorite() {
  //   let copy = favorite;
  //   let copyIcon = nameIcon;
  //   if (copy.includes(route.params.id)) {
  //     for (var i = 0; i < copy.length; i++) {
  //       if (copy[i] === route.params.id) {
  //         copy.splice(i, 1);
  //         copyIcon = 'heart-outline';
  //       }
  //     }
  //   } else {
  //     copy.push(route.params.id);
  //     copyIcon = 'heart';
  //   }
  //   setfavorite(copy);
  //   setNameIcon(copyIcon);
  //   console.log(copy);
  // }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text>
          {meal.name} | {meal.category}
        </Text>
        <Text>{meal.origin}</Text>
        <Image
          source={{
            uri:
              // eslint-disable-next-line no-undef
              API_FLAG_URL +
              // eslint-disable-next-line no-undef
              API_FLAG_CONVERT[`${meal.origin}`] +
              // eslint-disable-next-line no-undef
              API_FLAG_IMAGE_EXTENSION,
          }}
          style={styles.flagImage}
        />
        <Image
          style={styles.mealThumbnail}
          source={{
            uri: meal.imageUrl,
          }}
        />
        {favorites.includes(route.params.id) ? (
          <TouchableOpacity
            onPress={() => {
              removeToFav();
            }}>
            <Ionicons name="heart" size={30} color="#900" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              addToFav();
            }}>
            <Ionicons name="heart-outline" size={30} color="#900" />
          </TouchableOpacity>
        )}

        <FlatList
          numColumns={5}
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
          data={meal.ingredients}
          renderItem={({item, index}) => {
            return <IngredientComponent name={item} ref={index} />;
          }}
        />

        <Text style={styles.instructions}>{meal.instructions}</Text>
        <TouchableHighlight onPress={() => Linking.openURL(meal.youtubeUrl)}>
          <Ionicons name="logo-youtube" color="red" size={75} />
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

export default MealPageComponent;
