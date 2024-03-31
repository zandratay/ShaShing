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
      isUpdateBonds(newVal, oldVal) {
        console.log(this.isUpdateCash);
        if (newVal == true) {
          this.fetchBonds();
        }
      }
    },

    mounted() {
      this.fetchBonds();
    },

    methods: {
      close() {
        this.$emit('update:isVisible', false);
      },

      async fetchBonds() {
        const userId = "177889";
        var db = getFirestore(app);
        const docRef = doc(db, "users", userId);
        const data = await getDoc(docRef);
        if (data.exists()) {
          this.bonds = data.data().bonds;
        }
      }
    }
  }
  </script>
  