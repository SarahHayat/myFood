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
  VirtualizedList,
} from 'react-native';

import {getMeal} from '../api/meal/meal';
import {useNavigation} from '@react-navigation/native';
import IngredientComponent from './IngredientComponent';
import '../../global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

const MealPageComponent = props => {
  // const navigation = useNavigation();
  const {route, navigation} = props;
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
      height: 44,
      width: 72,
      marginRight: 25,
    },
  });

  const [meal, setMeal] = useState({});
  const [isFavorite, setIsFavorite] = useState();
  const favorites = useSelector(s => s.favorite.favorite);

  console.log('fav', favorites);
  console.log('is favorite', isFavorite);

  const dispatch = useDispatch();

  const loadMeal = async () => {
    setMeal(await getMeal(route.params.data.id));
  };

  useEffect(() => {
    console.log(route.params.data);
    if (route.params.data.isCustomMeal) {
      setMeal(route.params.data.mealData);
    } else {
      loadMeal();
    }
  }, [route.params.data]);

  const addToFav = useCallback(() => {
    console.log('add');
    dispatch({type: 'add', value: route.params.data.id});
  }, [route.params.data.id]);

  const removeToFav = useCallback(() => {
    console.log('remove');
    dispatch({type: 'remove', value: route.params.data.id});
  }, [route.params.data.id]);

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              marginTop: 10,
            }}>
            {route.params.data.isCustomMeal ? (
              <></>
            ) : (
              <Image
                source={{
                  uri:
                    API_FLAG_URL +
                    API_FLAG_CONVERT[`${meal.origin}`] +
                    API_FLAG_IMAGE_EXTENSION,
                }}
                style={styles.flagImage}
              />
            )}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 5,
              }}>
              <Text style={{textAlign: 'center', color: 'black', fontSize: 18}}>
                {meal.name} | {meal.category}
              </Text>
              <Text style={{textAlign: 'center', color: 'black'}}>
                {meal.origin}
              </Text>
            </View>
            <View style={{marginLeft: 25}}>
              {favorites.includes(route.params.data.id) ? (
                <TouchableOpacity
                  onPress={() => {
                    removeToFav();
                  }}
                  style={{alignItems: 'center'}}>
                  <Ionicons name="heart" size={45} color="#900" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    addToFav();
                  }}
                  style={{alignItems: 'center'}}>
                  <Ionicons name="heart-outline" size={45} color="#900" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
            {route.params.data.isCustomMeal ? (
              <></>
            ) : (
              <Image
                style={styles.mealThumbnail}
                source={{
                  uri: meal.imageUrl,
                }}
              />
            )}
          </View>
        </View>
      )}
      numColumns={4}
      style={{
        flex: 1,
      }}
      data={meal.ingredients}
      renderItem={({item, index}) => {
        return <IngredientComponent name={item} index={index} />;
      }}
      ListFooterComponent={() => (
        <View style={{marginTop: 5}}>
          <Text style={{color: 'black', textAlign: 'center', marginTop: 10}}>
            {meal.instructions}
          </Text>
          {route.params.data.isCustomMeal ? (
            <></>
          ) : (
            <TouchableHighlight
              onPress={() => Linking.openURL(meal.youtubeUrl)}
              style={{alignItems: 'center'}}>
              <Ionicons name="logo-youtube" color="red" size={75} />
            </TouchableHighlight>
          )}
        </View>
      )}
    />
  );
};

export default MealPageComponent;
