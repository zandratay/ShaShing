<template>
  <div class="landingPage">
    <img src="https://www.pngmart.com/files/23/Investment-PNG-File.png" alt="Duck UI" width="150px" height="150px">
    <h1> Create an account</h1>
    <p id="existingtext" >Already have an account?<button @click="existinguser" class="existingUserBtn" id="existing"><strong>Log
          In.</strong></button></p>
    <button @click="signInWithGoogle" class="continueWithBtn">
      <img
        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
        alr="google logo" width="20px" height="20px">
      Continue With Google
    </button>

    <div class="or">----------------------------- OR -----------------------------</div>

    <div class="text-container">
      <strong id="signup"> Sign up with your email address and password</strong>
      <input class="inputBox" type="text" placeholder="Email" v-model="email" />
      <input class="inputBox" type="password" placeholder="Password" v-model="password" />
    </div>

    <button @click="register" id="nextBtn"> Submit </button>

  </div>


</template>

<script setup>
import firebaseApp from '@/firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { ref } from "vue";
import { useRouter } from 'vue-router'

const email = ref("");
const password = ref("")
const router = useRouter()

const register = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");
      console.log(auth.currentUser)
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    })
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user)
      router.push("/");
    }).catch((error) => {
      console.error(error);
    });
}

const existinguser = () => {
  router.push('/login')
}
</script>