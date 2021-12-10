import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    borderColor: 'black',
    margin: 8,
    padding: 5,
    flexDirection: 'row',
  },
  image: {
    justifyContent: 'flex-start',
    width: 100,
    height: 100,
  },
  name: {
    alignSelf: 'center',
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 15,
  },
  title: {fontSize: 25, fontWeight: 'bold', alignSelf: 'center'},
});

export {styles};
