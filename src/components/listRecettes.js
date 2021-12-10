import React, { useEffect, useState, Component, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
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
import { useNavigation } from '@react-navigation/native';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

const ListRecettes = (props) => {
  const [data, setData] = useState([]);
  const [category, setCategorys] = useState([]);
  const [pays, setPays] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showCat, setShowCat] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showPays, setShowPays] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [showFlatListRecipes, setShowFlatListRecipes] = useState(true);
  const [showFlatListRecipesFitered, setShowFlatListRecipesFitered] = useState(false);
  const [selected, setSelected] = useState('');
  const [searchText, setSearchText] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Categories', value: 'Categories' },
    { label: 'Pays', value: 'Pays' },
    { label: 'Ingrédients', value: 'Ingrédients' },
    { label: 'Nom de la recette', value: 'Nom de la recette' },
  ]);
  const navigation = useNavigation();

  const getRecettes = useCallback(async () => {
    const res = await axios({
      method: 'get',
      url: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=French',
    });

    setData(res.data);
  }, []);

  const getRecettesByCategory = useCallback(async (category) => {
    const res = await axios({
      method: 'get',
      url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category,
    });

    setData(res.data);
  }, []);

  const getRecettesByArea = useCallback(async (area) => {
    const res = await axios({
      method: 'get',
      url: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=' + area,
    });

    setData(res.data);
  }, []);

  const getRecettesByIngredient = useCallback(async (ingredient) => {
    const res = await axios({
      method: 'get',
      url: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + ingredient,
    });

    setData(res.data);
  }, []);

  const getCategorys = useCallback(async () => {
    const res = await axios({
      method: 'get',
      url: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    });

    setCategorys(res.data.meals);
  }, []);

  const getAreas = useCallback(async () => {
    const res = await axios({
      method: 'get',
      url: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
    });

    setPays(res.data.meals);
  }, []);

  const getIngredients = useCallback(async () => {
    const res = await axios({
      method: 'get',
      url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    });

    setIngredients(res.data.meals);
  }, []);

  useEffect(() => {
    getRecettes();
    getCategorys();
    getAreas();
    getIngredients();
  }, []);


  const bindFiltre = (text) => {
    setSearchText(text + ' :');
    switch (text) {
      case 'Categories': {
        setShowPays(false);
        setShowIngredients(false);
        setShowRecipe(false);
        setShowFlatListRecipesFitered(false);
        setShowFlatListRecipes(true);
        setShowCat(true);
        break;
      }
      case 'Pays': {
        setShowIngredients(false);
        setShowCat(false);
        setShowRecipe(false);
        setShowFlatListRecipesFitered(false);
        setShowFlatListRecipes(true);
        setShowPays(true);
        break;
      }
      case 'Ingrédients': {
        setShowPays(false);
        setShowCat(false);
        setShowRecipe(false);
        setShowFlatListRecipesFitered(false);
        setShowFlatListRecipes(true);
        setShowIngredients(true);
        break;
      }
      case 'Nom de la recette': {
        setShowPays(false);
        setShowCat(false);
        setShowIngredients(false);
        setShowFlatListRecipes(false);
        setShowFlatListRecipesFitered(true);
        setShowRecipe(true);
        break;
      }
    }
  }

  const searchFilterFunction = (text) => {
    if (text) {
      const newMeal = data.meals.filter(
        function (item) {
          const itemData = item.strMeal
            ? item.strMeal.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newMeal);
      setSearch(text);
    } else {
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => {
          navigation.navigate('mealDetail', { id: item.idMeal });
        }} style={styles.buttonMeal}>
          <Text style={styles.titleMeal}>{item.strMeal}</Text>
          <Image
            source={{ uri: item.strMealThumb }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{'\n'}</Text>
        </TouchableOpacity>
        <Text>{'\n'}</Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.bodyListMeals}>
      <Text style={styles.titleFiltre}>Filtrer par : </Text>

      <DropDownPicker
        open={open}
        value={value}
        style={styles.ddpFiltrerPar}
        listMode="MODAL"
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={bindFiltre}
      />

      <Text style={styles.titleValeur}>{searchText} </Text>

      {showCat ? (
        <View style={styles.viewPickerDdpResultFiltre}>
        <Picker
          mode="dialog"
          style={styles.ddpResultFiltre}
          selectedValue={selected}
          onValueChange={(item) => {
            setSelected(item); getRecettesByCategory(item)
          }}>
          {category.map((item) => {
            return (<Picker.Item label={item.strCategory} value={item.strCategory} key={item.strCategory} />)
          })}
        </Picker>
        </View>
      ) : null}

      {showPays ? (
        <View style={styles.viewPickerDdpResultFiltre}>
        <Picker
          mode="dialog"
          style={styles.ddpResultFiltre}
          selectedValue={selected}
          onValueChange={(item) => { setSelected(item); getRecettesByArea(item) }}>
          {pays.map((item) => {
            return (<Picker.Item label={item.strArea} value={item.strArea} key={item.strArea} />)
          })}
        </Picker>
        </View>
      ) : null}

      {showIngredients ? (
        <View style={styles.viewPickerDdpResultFiltre}>
        <Picker
          mode="dialog"
          selectedValue={selected}
          style={styles.ddpResultFiltre}
          onValueChange={(item) => { setSelected(item); getRecettesByIngredient(item) }}>
          {ingredients.map((item) => {
            return (<Picker.Item label={item.strIngredient} value={item.strIngredient} key={item.idIngredient} />)
          })}
        </Picker>
        </View>
      ) : null}

      {showRecipe ? (
        <TextInput style={styles.textNameRecipe} onChangeText={(text) => searchFilterFunction(text)}
          value={search}>

        </TextInput>
      ) : null}

      {showFlatListRecipesFitered ? (

        <FlatList
          style={styles.flatListFiltered}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      ) : null}

      {showFlatListRecipes ? (

        <FlatList
          style={styles.flatListMeal}
          data={data.meals}
          renderItem={({ item }) => (
            <View style={styles.borderFlatListMeal}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('mealDetail', { id: item.idMeal });
                }}
                style={styles.buttonMeal}>
                <Text style={styles.titleMeal}>{item.strMeal}</Text>
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={styles.mealImage}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      ) : null}

      <FlatList
        style={styles.flatListMeal}
        data={data.meals}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('mealDetail', {data: {
                  isCustomMeal: false,
                    id: item.idMeal
                  }});
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
  titleValeur: {
    fontSize: 20,
    marginLeft: 10,
    top: 15,
  },
  flatListFiltered: {
    top: 35,
  },

  textNameRecipe: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    top: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 10,
    width: 200,
  },
  bodyListMeals : {
    backgroundColor: '#e3d7d7',
  },
  titleFiltre: {
    fontSize: 20,
    top: 25,
    marginLeft: 10,
  },
  filtreResult: {
    top: "20%",
  },

  ddpFiltrerPar : {
    top: -10,
    marginLeft: 120,
    width: 200,
    height: 40,
  },

  ddpResultFiltre : {
    width: 210,
    padding: 10,
    borderWidth: 1,
    top: -10,
    borderColor: 'black',
    marginLeft: -10,
  },

  viewPickerDdpResultFiltre : {
    width: 198,
    height: 35,
    top: -15,
    marginLeft: 123,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
  },

  mealImage : {
    width: 100, 
    height: 100,
    margin: 0,
    top:-10,
  },

  flatListMeal: {
    top: 10,
  },
  buttonMeal: {
    borderRadius: 20,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'white',
    marginBottom: 15,
    borderTopLeftRadius: 0,
  },

  titleMeal: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
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
