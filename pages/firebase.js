import * as firebase from 'firebase'
let database


export const init = () => {
  let config = {
    apiKey: "x",
    authDomain: "x",
    databaseURL: "x",
    projectId: "x",
    storageBucket: "x",
    messagingSenderId: "x"
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  
  database = firebase.database()
}