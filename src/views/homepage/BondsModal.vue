<template>
    <div class="modal-overlay" :class="{ 'active': isVisible }" @click="closeModal"></div>

    <div class="modal" v-if="isVisible">
      <span class="close" @click="close">&times;</span>
      <h1> Bonds </h1>

      <div class="modal-content">
        <div class="headerContainer">
          <span>Ticker</span>
          <span>Country</span>
          <span>Amount</span>
        </div>
        <div v-for="(item, index) in bonds" :key="index" class="pointDiv">
            <div class="investmentContainer">
              
              <span>{{ item.bondName }}</span>
              <span>{{ item.selectedCountry }}</span>
              <span>{{ item.amount }}</span>
            </div>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getFirestore, getDoc, doc } from "firebase/firestore";
  import app from "../../firebase";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  const auth = getAuth();

  export default {
    props: [
      'isVisible',
      'isUpdateBonds',
      "openInvestment",
      "isClicked"
    ],

    data() {
      return {
        modals: {
          bonds: false,
        },
        bonds: [],
      };
    },

    watch: {
      isVisible(newVal, oldVal) {
        if (newVal === true) {
          this.fetchBonds();
        }
      }
    },

    created() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          // Now that we have a user, fetch their data
          this.fetchBonds();
        } else {
          // Handle user not logged in
          this.user = null;
        }
      });
    },

    mounted() {
      this.fetchBonds();
    },

    methods: {
      close() {
        this.$emit('update:isVisible', false);
      },

      async fetchBonds() {
        if (this.user) {
          const userId = this.user.uid;
          var db = getFirestore(app);
          const docRef = doc(db, "users", userId);
          const data = await getDoc(docRef);
          if (data.exists()) {
            this.bonds = data.data().bonds;
          }
        }
      },
    }
  }
  </script>
  