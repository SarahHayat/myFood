import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";
import BackHandler from "react-native/Libraries/Utilities/BackHandler";
import { signOut } from "../firebase/signIn";

const MealList = ({ navigation }) => {

  return (
<View>
    <Text>Meal List!</Text>
    <Button title={"got to detail meal"} onPress={()=>{navigation.navigate('mealDetail')}}/>
</View>
  );
};

export default MealList;
