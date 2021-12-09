import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OldInscription from '../components/oldInscription';
import Home from '../components/home';
import MealPageComponent from '../components/MealPageComponent';
import ListRecettes from '../components/listRecettes';
import authReducer from '../redux/authReducer';
import {useSelector} from 'react-redux';
import NewRecipe from '../components/NewRecipe';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyReceipeHomeMade from '../components/MyReceipeHomeMade';
import {Inscription} from '../components/Inscription';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Navigator() {
  const user = useSelector(s => s.auth.user);
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
        data={({params}) => params.data}
      />
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
        tabBarActiveTintColor: 'coral',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Recettes"
        component={Navigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons name="list" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Nouvelle Recette"
        component={NewRecipe}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons name="camera-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Mes recettes maison"
        component={MyReceipeHomeMade}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons name="restaurant-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export {Navigator, TabNavigator};
