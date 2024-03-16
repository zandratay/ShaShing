import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

//import app from "./firebase";
//import {getFirestore} from "firebase/firestore";

//var db = getFirestore(app)



createApp(App).use(VueChartkick).mount('#app')
