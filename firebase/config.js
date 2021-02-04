import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA161l9C4AvHLWkiA_YGy03KpBkaW0PzVg",
    authDomain: "ig-clone-a8953.firebaseapp.com",
    projectId: "ig-clone-a8953",
    storageBucket: "ig-clone-a8953.appspot.com",
    messagingSenderId: "730154175772",
    appId: "1:730154175772:web:6673790bffb16a30eb7ed9",
    measurementId: "G-DJ1B9Z8LZK"
  };

  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }

 