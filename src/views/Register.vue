<template>
  <div class="landingPage">
    <img src="/logo.png" alt="Duck UI" width="150px" height="150px">
    <h1>Create an account</h1>
    <p id="existingtext">Already have an account?<button @click="existinguser" class="existingUserBtn"
        id="existing"><strong>Log In.</strong></button></p>
    <button @click="signInWithGoogle" class="continueWithBtn">
      <img
        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
        alt="google logo" width="20px" height="20px">
      Continue With Google
    </button>
    <div class="or">----------------------------- OR -----------------------------</div>
    <div class="text-container">
      <strong id="signup">Sign up with your email address and password</strong>
      <input class="inputBox" type="text" placeholder="Email" v-model="email" />
      <input class="inputBox" type="password" placeholder="Password" v-model="password" />
      <input class="inputBox" type="text" placeholder="Username" v-model="displayName" />
      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <button @click="register" id="nextBtn">Submit</button>
  </div>
</template>


<script setup>
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from 'vue-router'

const email = ref("");
const password = ref("");
const displayName = ref(""); // Added for displayName
const errorMessage = ref();
const router = useRouter();
const auth = getAuth();

const register = async () => {
  if (!email.value || !password.value || !displayName.value) {
    errorMessage.value = 'All fields are required';
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    // After successful registration, update the displayName
    await updateProfile(userCredential.user, {
      displayName: displayName.value
    });
    console.log("Successfully registered with display name!", auth.currentUser);
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

const existinguser = () => {
  router.push('/login');
};

function handleError(error) {
  console.error(error);
  switch (error.code) {
    case 'auth/email-already-in-use':
      errorMessage.value = 'User already exists';
      break;
    case 'auth/invalid-email':
      errorMessage.value = 'Invalid email';
      break;
    default:
      errorMessage.value = 'An error occurred. Please try again later.';
      break;
  }
}
</script>
