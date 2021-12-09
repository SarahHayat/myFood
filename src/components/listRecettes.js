import React, {useEffect, useState, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const ListRecettes = props => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Categories', value: 'Categories'},
    {label: 'Pays', value: 'Pays'},
    {label: 'Ingrédients', value: 'Ingredients'},
    {label: 'Nom de la recette', value: 'Nom de la recette'},
  ]);
  const navigation = useNavigation();

  const getRecettes = () => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/filter.php?a=French')
      .then(json => {
        setData(json.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getRecettes();
  }, []);

  const handleTextChange = text => {
    return setSearchText(text);
  };

  return (
    <SafeAreaView>
      <Text style={styles.titleFiltre}>Filtrer par : </Text>
      <Text>{'\n'}</Text>
      <Text style={styles.titleValeur}>{searchText} :</Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={handleTextChange}
      />

      <FlatList
        style={styles.flatListMeal}
        data={data.meals}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('mealDetail', {id: item.idMeal});
              }}
              style={styles.buttonMeal}>
              <Text style={styles.titleMeal}>{item.strMeal}</Text>
              <Image
                source={{uri: item.strMealThumb}}
                style={{width: 100, height: 100}}
              />
              <Text>{'\n'}</Text>
            </TouchableOpacity>
            <Text>{'\n'}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  titleValeur: {
    fontSize: 20,
    top: '10%',
    textAlign: 'center',
  },
  titleFiltre: {
    fontSize: 20,
    textAlign: 'center',
  },
  flatListMeal: {
    top: '20%',
  },
  buttonMeal: {
    backgroundColor: '#dedede',
  },
  titleMeal: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: '35%',
    top: '40%',
  },
  stretch: {
    width: 50,
    height: 100,
    resizeMode: 'stretch',
  },
});

export default ListRecettes;
