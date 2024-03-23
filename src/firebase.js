// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCOuYYSINK1IMo_X_bVSJvEgziJkXfCwog",
  authDomain: "shashing-7ca3f.firebaseapp.com",
  projectId: "shashing-7ca3f",
  storageBucket: "shashing-7ca3f.appspot.com",
  messagingSenderId: "24453043982",
  appId: "1:24453043982:web:1f496301f4756d535d295f",
  measurementId: "G-YQ6YKFQ5NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;