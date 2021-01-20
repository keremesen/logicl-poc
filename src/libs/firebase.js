import firebase from 'firebase/app';
import 'firebase/auth';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyD8qhjDIOv2_q9u-i0Ei28UAs84MY2zjmc",
    authDomain: "logicl-poc.firebaseapp.com",
    projectId: "logicl-poc",
    storageBucket: "logicl-poc.appspot.com",
    messagingSenderId: "359414721534",
    appId: "1:359414721534:web:e1cdeedfd952cbfe1c6eaf"
};

if(!firebase.apps.length){
    firebase.initializeApp(FIREBASE_CONFIG);
}


export default firebase;