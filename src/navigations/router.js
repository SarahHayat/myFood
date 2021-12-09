import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Inscription from '../components/inscription';
import Home from '../components/home';
import MealPageComponent from '../components/MealPageComponent';
import ListRecettes from '../components/listRecettes';
import reducer from '../redux/reducer';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

function Navigator() {
  const user = useSelector(s => s.user);
  // let user = null;
  console.log('user ', user);
  return user ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="mealList">
        <Stack.Screen name="mealList" component={ListRecettes} />
        <Stack.Screen
          name="mealDetail"
          component={MealPageComponent}
          id={({params}) => params.id}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="inscription" component={Inscription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export {Navigator};
