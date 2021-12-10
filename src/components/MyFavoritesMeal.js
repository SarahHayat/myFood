import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMeal} from '../api/meal/meal';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {styles} from '../styles/myFavoriteMeal';

const MyFavoritesMeal = props => {
  const {route, navigation} = props;
  const favorites = useSelector(s => s.auth.favorite);
  const dispatch = useDispatch();
  const [myMeals, setMyMeals] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const run = async () => {
        const arr = [];
        for (let i = 0; i < favorites.length; i++) {
          let m = await getMeal(favorites[i]);
          arr.push(m);
        }
        setMyMeals(arr);
      };

      run();
    }, [favorites]),
  );

  return (
    <>
      <FlatList
        data={myMeals}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Detail', {
                    data: {isCustomMeal: false, id: item.id},
                  });
                }}>
                <View key={index} style={styles.item}>
                  <Image source={{uri: item.imageUrl}} style={styles.image} />
                  <View style={styles.containText}>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </>
  );
};
export default MyFavoritesMeal;
