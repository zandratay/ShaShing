// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCqBgJclJR76jLlQ8wT9nCzgk9S49aTObE",
  authDomain: "eventful-e238f.firebaseapp.com",
  projectId: "eventful-e238f",
  storageBucket: "eventful-e238f.appspot.com",
  messagingSenderId: "645407834455",
  appId: "1:645407834455:web:5591d10731ee106b013e12",
  measurementId: "G-26V56ED0TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;