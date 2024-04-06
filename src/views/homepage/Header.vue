<template>
  <div v-if="user">
    <img id="header-img"
      src="https://mergersandinquisitions.com/wp-content/uploads/2019/06/cat-investment-banking-banner.jpg"
      alt="Duck UI" />

    <div class="welcome-info">
      <div class="welcome-div">
        <div>
          <h2>Welcome, {{ user.displayName }}!</h2>
          <h3>Current Portfolio</h3>
          <p>Updated at 22 March, 5pm</p>
        </div>
        <div>
          <button class="buttonBgPlus" v-on:click="activateInvestment">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor"
                d="M12 2c-.552 0-1 .448-1 1v8H3c-.552 0-1 .448-1 1s.448 1 1 1h8v8c0 .552.448 1 1 1s1-.448 1-1v-8h8c.552 0 1-.448 1-1s-.448-1-1-1h-8V3c0-.552-.448-1-1-1z" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
export default {
  data() {
    return {
      isClicked: false,
      user: null
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },

  methods: {
    activateInvestment() {
      this.$emit("addInvestment", true);
    },
  },
};
</script>