import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
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
import {getRandomMeal} from '../api/meal/meal';
import {SignIn} from '../components/SignIn';
import MyFavoritesMeal from '../components/MyFavoritesMeal';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const loadRandomMealId = async () => {
  let randomMeal = await getRandomMeal();
  return randomMeal.id;
};

function Navigator() {
  const user = useSelector(s => s.auth.user);
  return user ? (
    <Stack.Navigator
      initialRouteName="mealList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="mealList" component={ListRecettes} />
      <Stack.Screen
        name="mealDetail"
        component={MealPageComponent}
        data={({params}) => params.data}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="connexion" component={SignIn} />
      <Stack.Screen name="inscription" component={Inscription} />
    </Stack.Navigator>
  );
}

function StackFav() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="Mes recettes favorites" component={MyFavoritesMeal} />
      <Stack.Screen name="Detail" component={MealPageComponent} />
    </Stack.Navigator>
  );
}
function StackCustom() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="Mes recettes maison" component={MyReceipeHomeMade} />
      <Stack.Screen name="Detail" component={MealPageComponent} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const navigation = useNavigation();
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
        name="Recette aléatoire"
        component={MealPageComponent}
        listeners={{
          tabPress: async e => {
            e.preventDefault();
            navigation.navigate('mealDetail', {
              data: {
                isCustomMeal: false,
                id: await loadRandomMealId(),
              },
            });
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons name="shuffle-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="+ Recette"
        component={NewRecipe}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons name="camera-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Recettes maison"
        component={StackCustom}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons name="restaurant-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Mes recettes"
        component={StackFav}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons name="heart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export {Navigator, TabNavigator};
