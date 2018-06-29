import firebase from 'react-native-firebase';

const config = {
  apiKey: "AIzaSyBYZH86Yb04bZnNwtZ4TsO6Rdy4JrBBjVM",
  authDomain: "iq-53182.firebaseapp.com",
  databaseURL: "https://iq-53182.firebaseio.com",
  projectId: "iq-53182",
  storageBucket: "iq-53182.appspot.com",
  messagingSenderId: "917387417404"
};


firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};