<template>
  <div class="landingPage">
    <img src="https://www.pngmart.com/files/23/Investment-PNG-File.png" alt="Duck UI" width="150px" height="150px">
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
      <p v-if="errMsg"> {{ errMsg }}</p>
    </div>

    <button @click="signIn" id="nextBtn"> Submit </button>

  </div>


</template>

<script setup>
import firebaseApp from '@/firebase.js';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { ref } from "vue";
import { useRouter } from 'vue-router'

const email = ref("");
const password = ref("")
const errMsg = ref()
const router = useRouter()

const signIn = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully signed in!");
      console.log(auth.currentUser)
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
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
};

const newuser = () => {
  router.push('/register')
}

// }
// Initialize Firebase Authentication and get a reference to the auth service
// const auth = getAuth(app);

// export default {
//   methods: {
//     signInWithGoogle() {
//       const provider = new GoogleAuthProvider();

//
//     }
//   }
// }
</script>