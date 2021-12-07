import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {signIn} from '../firebase/signIn';
import {styles} from '../styles/signInStyles';

class Inscription extends Component {
  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        <Image
          source={require('../assets/google.png')}
          style={{width: 100, height: 100, alignSelf: 'center'}}
        />
        <TouchableHighlight style={styles.touchable} onPress={() => signIn()}>
          <Text style={styles.button}>Continuer avec Google</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Inscription;
