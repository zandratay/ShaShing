<template>
  <div class="modal-overlay" :class="{ 'active': isVisible }" @click="closeModal"></div>
  
  <div class="modal" v-if="isVisible">
    <span class="close" @click="close">&times;</span>
    <h1> Stocks </h1>
    <div class="modal-content">
        <div class="headerContainer">
          <span>Ticker</span>
          <span>Country</span>
          <span>Amount</span>
        </div>
        <div v-for="(item, index) in stocks" :key="index" class="pointDiv">
          <div class="investmentContainer"> 
            <span>{{ item.tickerName }}</span>
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
    'isUpdateStock',
    "openInvestment",
    "isClicked"
  ],

  data() {
    return {
      modals: {
        stocks: false,
      },
      stocks: [],
    };
  },

  watch: {
    isUpdateStock(newVal, oldVal) {
      console.log(this.isUpdateStock);
      if (newVal == true) {
        this.fetchStock();
      }
    }
  },

  mounted() {
    this.fetchStock();
  },

  methods: {
    close() {
      this.$emit('update:isVisible', false);
    },

    async fetchStock() {
      const userId = "177889";
      var db = getFirestore(app);
      const docRef = doc(db, "users", userId);
      const data = await getDoc(docRef);
      if (data.exists()) {
        this.stocks = data.data().stocks;
      }
    }
  }
}
</script>
