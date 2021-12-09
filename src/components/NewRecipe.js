/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {styles} from '../styles/newReceipe';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import IngredientListItems from './IngredientListItems';

const NewRecipe = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [ingredient, setIngredient] = useState();
  const [instructions, setInstruction] = useState({});
  const [error, setError] = useState(false);

  const receipe = useSelector(s => s.receipe.newReceipe);
  const ingredients = useSelector(s => s.receipe.ingredients);

  console.log('ingrsient', ingredients);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const emptyAllInput = () => {
    setTitle('');
    setCategory('');
    setOrigin('');
    setInstruction('');
  };
  const addIngredient = useCallback(
    text => {
      dispatch({type: 'add', value: {title: text, id: Math.random()}});
      setIngredient('');
      // setItem()
    },
    [dispatch],
  );

  const removeIngredient = useCallback(
    id => {
      dispatch({type: 'remove', id: id});
    },
    [dispatch],
  );
  const addReceipe = useCallback(() => {
    console.log(title);
    if (title === null) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    let receipe = {
      id: Math.random(),
      name: title,
      category: category,
      origin: origin,
      instructions: instructions,
      imageUrl: file,
      ingredients: ingredients,
    };
    dispatch({type: 'create', value: receipe});
    dispatch({type: 'erase'});
    emptyAllInput();
    navigation.navigate('Mes recettes maison');
  }, [dispatch, title, origin, category, instructions]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        await takePicture();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const takePicture = useCallback(async () => {
    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setFile(response.assets[0].uri);
      }
    });
  }, []);

  const chooseFile = useCallback(async () => {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setFile(response.assets[0].uri);
      }
    });
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      onKeyboardWillShow={(frames: Object) => {}}>
      {title ? (
        <Text style={styles.titleText}>{title}</Text>
      ) : (
        <Text style={styles.titleText}>Nouvelle recette</Text>
      )}
      <View style={styles.container}>
        {file ? (
          <Image
            source={{
              uri: file,
            }}
            style={{width: 100, height: 100}}
          />
        ) : (
          <Image
            source={require('../assets/noImage.png')}
            style={{width: 100, height: 100}}
          />
        )}
        <View style={styles.buttonView}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={requestCameraPermission}>
            <Ionicons name="camera-outline" color="white" size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={chooseFile}>
            <Ionicons name="image-outline" color="white" size={26} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.labelInput}>Titre :</Text>
          <TextInput
            style={error ? styles.inputError : styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder={'Lasagnes'}
          />
          <Text style={styles.labelInput}>Categorie :</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder={'Diner'}
          />
          <Text style={styles.labelInput}>Origine :</Text>
          <TextInput
            style={styles.input}
            value={origin}
            onChangeText={setOrigin}
            placeholder={'France'}
          />
          <Text style={styles.labelInput}>Instructions :</Text>
          <TextInput
            style={[styles.inputArea]}
            multiline={true}
            numberOfLines={5}
            value={instructions}
            onChangeText={setInstruction}
            placeholder={"Faire chauffer de l'eau ..."}
          />
          <Text style={styles.labelInput}>Ingredients :</Text>
          <TextInput
            style={[styles.input]}
            value={ingredient}
            onChangeText={setIngredient}
            placeholder={'Fromage, Pain ..'}
            onSubmitEditing={event => {
              addIngredient(event.nativeEvent.text);
            }}
          />
          <ScrollView horizontal={true}>
            <FlatList
              numColumns={4}
              style={{flexDirection: 'row'}}
              data={ingredients}
              renderItem={({index, item}) => {
                return (
                  <IngredientListItems
                    index={index}
                    item={item}
                    onDelete={removeIngredient}
                  />
                );
              }}
            />
          </ScrollView>
        </View>
      </View>
      <TouchableHighlight
        style={styles.addButton}
        onPress={() => {
          addReceipe();
        }}>
        <Text style={styles.textAddButton}>Créer ma recette</Text>
      </TouchableHighlight>
    </KeyboardAwareScrollView>
  );
};

export default NewRecipe;
