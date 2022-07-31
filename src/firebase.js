import firebase from "firebase";

import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCFP0gOEZbRrz26Bp55XiG9X1UIuJj17bQ",
  authDomain: "micro-reef-355306.firebaseapp.com",
  projectId: "micro-reef-355306",
  storageBucket: "micro-reef-355306.appspot.com",
  messagingSenderId: "847752856658",
  appId: "1:847752856658:web:68aa87031b721d54234b8b"
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();