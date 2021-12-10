import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  item: {
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
  text: {
    textAlign: 'center',
  },
  containText: {
    flex: 1,
    alignSelf: 'center',
  },
});

export {styles};
