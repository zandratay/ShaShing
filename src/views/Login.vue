<template>
  <div class="landingPage">
    <img src="/logo.png" alt="Duck UI" width="150px" height="150px">
    <h1> Sign In </h1>
    <p id="existingtext"> Not an existing user? <button @click="newuser" class="existingUserBtn"
        id="existing"><strong>Create an Account.</strong></button></p>
    <button @click="signInWithGoogle" class="continueWithBtn">
      <img
        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
        alr="google logo" width="20px" height="20px">
      Continue With Google
    </button>

    <div class="or">----------------------------- OR -----------------------------</div>

    <div class="text-container">
      <strong id="signup"> Sign in with your email address and password</strong>
      <input class="inputBox" type="text" placeholder="Email" v-model="email" />
      <input class="inputBox" type="password" placeholder="Password" v-model="password" />
      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    </div>

    <button @click="signIn" id="nextBtn"> Submit </button>
  </div>


</template>

<script setup>
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { ref } from "vue";
import { useRouter } from 'vue-router'

const email = ref("");
const password = ref("")
const errMsg = ref()
const router = useRouter()
const errorMessage = ref();
import firebaseApp from "@/firebase";
const auth = getAuth()

const signIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log("Successfully signed in!", auth.currentUser);
    router.push('/');
  } catch (error) {
    handleError(error);
  }
};

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/");
  } catch (error) {
    handleError(error);
  }
};

const newuser = () => {
  router.push('/register');
};

function handleError(error) {
  console.error(error);
  if (error.code === "auth/invalid-credential") {
    errorMessage.value = "Invalid email or password";
  } else if (error.code === "auth/user-not-found") {
    errorMessage.value = "No account with that email was found";
  } else {
    errorMessage.value = "Please try again";
  }
}
</script>