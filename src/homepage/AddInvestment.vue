<template>
  <div>
    <div class="modal" v-if="isInvestment">
      <div class="investment">
        <div><text>Select your investment type</text></div>

        <div><button @click="clicked">Close</button></div>
      </div>
      <div class="selectInvestment">
        <button @click="openDropDown">
          <text>{{
            selectedInvestment ? selectedInvestment : "Select investment type"
          }}</text>
        </button>
        <div v-if="dropDown">
          <div>
            <button @click="selectInvestment('Cash')"><text>Cash</text></button>
          </div>
          <div>
            <button @click="selectInvestment('Stocks')">
              <text>Stocks</text>
            </button>
          </div>
          <div>
            <button @click="selectInvestment('CPF')"><text>CPF</text></button>
          </div>
          <div>
            <button @click="selectInvestment('Bonds')">
              <text>Bonds</text>
            </button>
          </div>
          <div>
            <button @click="selectInvestment('Others')">
              <text>Others</text>
            </button>
          </div>
        </div>
      </div>
      <div>
        <button @click="openInputModal">Next</button>
      </div>
    </div>

    <CashInputModal v-model:isOpened="isCash" @isEmitCash="setDataCash"/>
    <CPFInputModal v-model:isOpened="isCPF" @isEmitCPF="setDataCPF"/>
    <BondsInputModal v-model:isOpened="isBonds" @isEmitBonds="setDataBonds"/>
    <OthersInputModal v-model:isOpened="isOthers" @isEmitOthers="setDataOthers"/>
    <StocksInputModal v-model:isOpened="isStocks" @isEmitStocks="setDataStocks"/>
  </div>
</template>

<script>
import BondsInputModal from "./BondsInputModal.vue";
import CashInputModal from "./CashInputModal.vue";
import CPFInputModal from "./CPFInputModal.vue";
import OthersInputModal from "./OthersInputModal.vue";
import StocksInputModal from "./StocksInputModal.vue";

export default {
  components: {
    CashInputModal,
    BondsInputModal,
    CPFInputModal,
    OthersInputModal,
    StocksInputModal,
  },

  props: ["isInvestment"],

  data() {
    return {
      selectedInvestment: "",
      dropDown: false,
      isCash: false,
      isStocks: false,
      isCPF: false,
      isBonds: false,
      isOthers: false,
    };
  },

  methods: {
    clicked() {
        this.selectedInvestment = "";
      this.$emit("clicked", false);
    },

    openDropDown() {
      this.dropDown = !this.dropDown;
    },

    selectInvestment(investmentType) {
      this.selectedInvestment = investmentType;
      this.dropDown = false;
    },

    openInputModal() {
      if (this.selectedInvestment === "Cash") {
        this.isCash = true;
      } else if (this.selectedInvestment === "Stocks") {
        this.isStocks = true;
      } else if (this.selectedInvestment === "Bonds") {
        this.isBonds = true;
      } else if (this.selectedInvestment === "Others") {
        this.isOthers = true;
      } else if (this.selectedInvestment === "CPF") {
        this.isCPF = true;
      }

      this.$emit("clicked", false);
    },

    setDataCash(data) {
        this.isCash = data
        this.selectedInvestment = "";
    },

    setDataBonds(data) {
        this.isBonds = data
        this.selectedInvestment = "";
    },

    setDataCPF(data) {
        this.isCPF = data
        this.selectedInvestment = "";
    },

    setDataStocks(data) {
        this.isStocks = data
        this.selectedInvestment = "";
    },

    setDataOthers(data) {
        this.isOthers = data
        this.selectedInvestment = "";
    }
  },
};
</script>
