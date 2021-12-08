import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Inscription from '../../android/app/src/components/inscription';
import Home from '../../android/app/src/components/home';
import MealDetail from '../../android/app/src/components/mealDetail';
import MealPageComponent from '../../android/app/src/components/MealPageComponent';
import listRecettes from '../../android/app/src/components/listRecettes';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="inscription" component={Inscription} />
        <Stack.Screen
          name="listRecettes"
          component={listRecettes}
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
