import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCOuYYSINK1IMo_X_bVSJvEgziJkXfCwog",
    authDomain: "shashing-7ca3f.firebaseapp.com",
    projectId: "shashing-7ca3f",
    storageBucket: "shashing-7ca3f.appspot.com",
    messagingSenderId: "24453043982",
    appId: "1:24453043982:web:1f496301f4756d535d295f",
    measurementId: "G-YQ6YKFQ5NH"
  };

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp;