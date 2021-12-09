/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IngredientListItems = props => {
  return (
    <View
      key={props.index.toString()}
      style={{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        marginHorizontal: 10,
      }}>
      <Text style={{alignSelf: 'center'}}>{props.item.title}</Text>
      <TouchableOpacity
        style={{borderRadius: 20, marginHorizontal: 8}}
        onPress={() => props.onDelete(props.item.id)}>
        <Ionicons name="close-circle-outline" color="red" size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default IngredientListItems;
