<template>
    <div class="modal-overlay" :class="{ 'active': isVisible }" @click="closeModal"></div>
    
    <div class="modal" v-if="isVisible">
      <span class="close" @click="close">&times;</span>
      <h1> Cash </h1>
      <div class="modal-content">
        <div class="headerContainer">
          <span>Amount</span>
          <span>Date</span>
          <span>Bank</span>
        </div>
        <div> 
            <div v-for="(item, index) in cashes" :key="index" class="pointDiv">
              <div class="investmentContainer">
                <span>{{ item.amount }}</span>
                <span>{{ item.purchaseDate }}</span>
                <span>{{ item.selectedInvestment }}</span>
              </div>
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
      'isUpdateCash',
      "openInvestment",
      "isClicked"
    ],

    data() {
      return {
        modals: {
          cash: false,
        },
        cashes: [],
      };
    },

    watch: {
      isVisible(newVal, oldVal) {
        if (newVal === true) {
          this.fetchCash();
        }
      }
    },

    created() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          // Now that we have a user, fetch their data
          this.fetchCash();
        } else {
          // Handle user not logged in
          this.user = null;
        }
      });
    },

    mounted() {
      this.fetchCash();
    },

    methods: {
      close() {
        this.$emit('update:isVisible', false);
      },
      
      async fetchCash() {
        console.log("im called")
        if (this.user) {
          const userId = this.user.uid;
          var db = getFirestore(app);
          const docRef = doc(db, "users", userId);
          const data = await getDoc(docRef);
          if (data.exists()) {
            this.cashes = data.data().cash;
          }
        }
      },
    }
  }
  </script>
  