import {firebase} from './firebase';

async function getSignIn(values) {
  const data = {email: values.email, password: values.password};
  return firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(response => {
      if (response.user) {
        //add user in store
        return JSON.stringify(response.user);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

async function registerUser(values) {
  const data = {email: values.email, password: values.password};

  return firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(userCredential => {
      //add user in store
      return JSON.stringify(userCredential.user);
    })
    .catch(error => {
      console.log('error message', error.message);
    });
}

export {getSignIn, registerUser};
