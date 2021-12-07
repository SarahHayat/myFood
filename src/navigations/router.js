import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Inscription from '../components/inscription';
import MealList from '../components/mealList';
import Home from '../components/home';
import MealDetail from '../components/mealDetail';
import MealPageComponent from '../components/MealPageComponent';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="inscription" component={Inscription} />
        <Stack.Screen
          name="mealList"
          component={MealList}
          options={{headerLeft: null}}
        />
        <Stack.Screen
          name="mealDetail"
          component={MealPageComponent}
          id={({params}) => params.id}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export {Navigator};
