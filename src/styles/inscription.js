import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 350,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  container: {
    alignSelf: 'center',
  },
  text: {
    marginHorizontal: 12,
  },
  button: {
    marginVertical: 10,
    backgroundColor: 'coral',
    padding: 10,
    borderRadius: 20,
    color: 'white',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export {styles};
