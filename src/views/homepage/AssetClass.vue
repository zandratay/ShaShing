<template>
    <div class="assets-container">
      <div class="assets" @click="openModal('Cash')">
        <div>
          <strong> <text class="investmentTitle">Cash</text> </strong>
          <div v-for="(item, index) in cashes" :key="index" class="pointDiv">
            <div class="investmentContainer">
              <span>{{ item.amount }}</span>
              <span>{{ item.purchaseDate }}</span>
              <span>{{ item.selectedInvestment }}</span>
            </div>
          </div>
        </div>
      </div>
  
      <div class="assets" @click="openModal('Stocks')">
        <div>
          <strong> <text class="investmentTitle">Stocks</text> </strong>
          <div v-for="(item, index) in stocks" :key="index" class="pointDiv">
            <div class="investmentContainer">
             
              <span>{{ item.tickerName }}</span>
              <span>{{ item.selectedCountry }}</span>
              <span>{{ item.amount }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="assets" @click="openModal('Bonds')">
          <div>
          <strong> <text class="investmentTitle">Bonds</text> </strong>
          <div v-for="(item, index) in bonds" :key="index" class="pointDiv">
            <div class="investmentContainer">
              
              <span>{{ item.bondName }}</span>
              <span>{{ item.selectedCountry }}</span>
              <span>{{ item.amount }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="assets" @click="openModal('CPF')"><div>
          <strong> <text class="investmentTitle">CPF</text> </strong>
          <div v-for="(item, index) in cpf" :key="index" class="pointDiv">
            <div class="investmentContainer">
              
              <span>{{ item.amount }}</span>
              <span>{{ item.selectAccount }}</span>
            </div>
          </div>
        </div></div>
      <CashModal v-model:isVisible="modals.cash" />
      <StocksModal v-model:isVisible="modals.stocks" />
      <BondsModal v-model:isVisible="modals.bonds" />
      <CPFModal v-model:isVisible="modals.cpf" />
    </div>
  </template>
  
  <script>
  import CashModal from "./CashModal.vue";
  import BondsModal from "./BondsModal.vue";
  import StocksModal from "./StocksModal.vue";
  import CPFModal from "./CPFModal.vue";
  import { getFirestore, getDoc, doc } from "firebase/firestore";
  import app from "../../firebase";
  
  export default {
    components: {
      CashModal,
      BondsModal,
      StocksModal,
      CPFModal,
    },
  
    props: [
      "openInvestment",
      "isClicked",
      "isUpdateCash",
      "isUpdateStock",
      "isUpdateBonds",
      "isUpdateCPF",
    ],
  
    data() {
      return {
        modals: {
          cash: false,
          stocks: false,
          bonds: false,
          cpf: false,
        },
        cashes: [],
        stocks: [],
        bonds: [],
        cpf: [],
      };
    },
  
    watch: {
      isUpdateCash(newVal, oldVal) {
        console.log(this.isUpdateCash);
        if (newVal == true) {
          this.fetchCash();
        }
      },
  
      isUpdateStock(newVal, oldVal) {
        console.log(this.isUpdateStock);
        if (newVal == true) {
          this.fetchStock();
        }
      },
  
      isUpdateBonds(newVal, oldVal) {
        console.log(this.isUpdateCash);
        if (newVal == true) {
          this.fetchBonds();
        }
      },
  
      isUpdateCPF(newVal, oldVal) {
        console.log(this.isUpdateCash);
        if (newVal == true) {
          this.fetchCPF();
        }
      },
    },
    mounted() {
      this.fetchCash();
      this.fetchStock();
      this.fetchBonds();
      this.fetchCPF();
    },
  
    methods: {
      openModal(asset) {
        // First, set all modals to false to ensure only one can be open at a time
        for (let key in this.modals) {
          this.modals[key] = false;
        }
  
        // Now, open the correct modal
        if (asset === "Cash") {
          this.modals.cash = true;
        } else if (asset === "Bonds") {
          this.modals.bonds = true;
        } else if (asset === "Stocks") {
          this.modals.stocks = true;
        } else if (asset === "CPF") {
          this.modals.cpf = true;
        }
      },
  
      async fetchCash() {
        const userId = "177889";
        var db = getFirestore(app);
        const docRef = doc(db, "users", userId);
        const data = await getDoc(docRef);
        if (data.exists()) {
          this.cashes = data.data().cash;
        }
      },
  
      async fetchStock() {
        const userId = "177889";
        var db = getFirestore(app);
        const docRef = doc(db, "users", userId);
        const data = await getDoc(docRef);
        if (data.exists()) {
          this.stocks = data.data().stocks;
        }
      },
  
      async fetchBonds() {
        const userId = "177889";
        var db = getFirestore(app);
        const docRef = doc(db, "users", userId);
        const data = await getDoc(docRef);
        if (data.exists()) {
          this.bonds = data.data().bonds;
        }
      },
  
      async fetchCPF() {
        const userId = "177889";
        var db = getFirestore(app);
        const docRef = doc(db, "users", userId);
        const data = await getDoc(docRef);
        if (data.exists()) {
          this.cpf = data.data().cpf;
        }
      },
    },
  };
  </script>
  