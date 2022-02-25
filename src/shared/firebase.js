import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDsrvhAZAmKjTxebo2vp7gFYcxkhYlP9pk",

  authDomain: "cloneinsta-9ee36.firebaseapp.com",

  projectId: "cloneinsta-9ee36",

  storageBucket: "cloneinsta-9ee36.appspot.com",

  messagingSenderId: "677260727219",

  appId: "1:677260727219:web:5e3f1ada4a2731beb6b1c6",

  measurementId: "G-9BBDQP43TS"

};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();
export{auth, apiKey, firestore, storage, realtime};