import {StyleSheet} from 'react-native';

const ListMealsStyles = StyleSheet.create({
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
    bodyListMeals: {
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
  
    ddpFiltrerPar: {
      top: -10,
      marginLeft: 120,
      width: 200,
      height: 40,
    },
  
    ddpResultFiltre: {
      width: 210,
      padding: 10,
      borderWidth: 1,
      top: -10,
      borderColor: 'black',
      marginLeft: -10,
    },
  
    viewPickerDdpResultFiltre: {
      width: 198,
      height: 35,
      top: -15,
      marginLeft: 123,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 7,
      backgroundColor: 'white',
    },
  
    mealImage: {
      width: 100,
      height: 100,
      margin: 0,
      top: -10,
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

  export {ListMealsStyles};
