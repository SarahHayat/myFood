import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Inscription from '../components/inscription';
import Home from '../components/home';
import MealPageComponent from '../components/MealPageComponent';
import ListRecettes from '../components/listRecettes';
import reducer from '../redux/reducer';
import {useSelector} from 'react-redux';
import NewRecipe from '../components/NewRecipe';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Navigator() {
  const user = useSelector(s => s.user);
  // let user = null;
  console.log('user ', user);
  return user ? (
    <Stack.Navigator
      initialRouteName="mealList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="mealList" component={ListRecettes} />
      <Stack.Screen
        name="mealDetail"
        component={MealPageComponent}
        id={({params}) => params.id}
      />
      <Stack.Screen name="newRecipe" component={NewRecipe} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="inscription" component={Inscription} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Nouvelle Recette"
        component={Navigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons name="list" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export {Navigator, TabNavigator};
