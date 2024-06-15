import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


let firebaseApp = firebase.initializeApp({

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyDL4w1cOgmPeN0nEhBeAcMNckZoGW-v02s",
    authDomain: "clone-5e7c8.firebaseapp.com",
    projectId: "clone-5e7c8",
    storageBucket: "clone-5e7c8.appspot.com",
    messagingSenderId: "126114863078",
    appId: "1:126114863078:web:5ad8e9e18ad19c0ebce827",
    measurementId: "G-3WXD3RC9C1"
})

let db = firebaseApp.firestore();
export {db}