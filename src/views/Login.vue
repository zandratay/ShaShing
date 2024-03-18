<template>
    <h1> Sign In to an Account </h1>
    <p><button @click= "newuser">Register as new user</button></p>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg"> {{  errMsg  }}</p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>

  </template>
  
  <script setup>

  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { useRouter } from 'vue-router'

  const email = ref("");
  const password = ref("")
  const errMsg = ref()
  const router = useRouter()

  const register = () => {
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