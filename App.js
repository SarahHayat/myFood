import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {getMeal} from "./api/meal/meal";
import MealPageComponent from "./MealPageComponent";

const App = () => {

  return (
      <MealPageComponent id={52773}/>
  );
};

export default App;