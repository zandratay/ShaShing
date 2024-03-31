<template>
  <div class="navbar">
    <NavBar />
  </div>

  <div class="content">
    <Header @addInvestment="getData" />
    <OverviewCharts />
    <AssetClass :isUpdateCash="cashUpdated" :isUpdateStock="stocksUpdated" :isUpdateBonds="bondsUpdated" :isUpdateCPF="cpfUpdated
    "/>
    <AddInvestment
      :isInvestment="addInvestment"
      @clicked="setData"
      @updateAssets="handleUpdateAssetClassCash"
      @updateStocks="handleUpdateAssetClassStocks"
      @updateBonds="handleUpdateAssetClassBonds"
      @updateCPF="handleUpdateAssetClassCPF"
    />
  </div>
</template>

<script>
import Header from "./Header.vue";
import OverviewCharts from "./OverviewCharts.vue";
import AssetClass from "./AssetClass.vue";
import NavBar from "./NavBar.vue";
import AddInvestment from "./AddInvestment.vue";


import firebaseApp from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

export default {
  components: {
    Header,
    OverviewCharts,
    AssetClass,
    NavBar,
    AddInvestment,
  },

  data() {
    return {
      addInvestment: false,
      clicked: false,
      user: null,
      cashUpdated: false,
      stocksUpdated: false,
      bondsUpdated: false,
      cpfUpdated: false,
    };
  },

  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },

  methods: {
    getData(data) {
      this.addInvestment = data;
    },
    setData(data) {
      this.addInvestment = data;
    },
    handleUpdateAssetClassCash(data) {
      this.cashUpdated = data;
    },

    handleUpdateAssetClassStocks(data) {
      this.stocksUpdated = data;
    },

    handleUpdateAssetClassBonds(data) {
      this.bondsUpdated = data;
    },

    handleUpdateAssetClassCPF(data) {
      this.cpfUpdated = data;
    },
  },
};
</script>
