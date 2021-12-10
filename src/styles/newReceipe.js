import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    color: 'black',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonView: {
    flexDirection: 'row',
  },
  buttonStyle: {
    margin: 10,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'coral',
    padding: 5,
    borderRadius: 20,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  input: {
    height: 40,
    width: 350,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  inputError: {
    height: 40,
    width: 350,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    borderColor: 'red',
  },
  inputArea: {
    height: 60,
    width: 350,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  labelInput: {
    marginHorizontal: 12,
  },
  addButton: {
    marginVertical: 10,
    backgroundColor: 'coral',
    padding: 10,
    borderRadius: 20,
    color: 'white',
    alignSelf: 'center',
  },
  textAddButton: {
    color: 'white',
  },
});

export {styles};
