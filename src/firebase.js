import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDB9HW0MoZdivgkBGwBHpVYNBR2cBs-3GA",
  authDomain: "paradigmasparcial2.firebaseapp.com",
  projectId: "paradigmasparcial2",
  storageBucket: "paradigmasparcial2.appspot.com",
  messagingSenderId: "430129853552",
  appId: "1:430129853552:web:5915de19c1484e23ff70b5"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();