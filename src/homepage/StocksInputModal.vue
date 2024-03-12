<template>
  <div class="modal" v-if="isOpened">
    <div class="investment">
      <text class="addInvestment">Stocks</text>
      <button @click="close">close</button>
    </div>
    <div class="formDiv">
      <div class="investment">
        <div class="forms">
          <label>Stock Name</label>
          <input v-model="stockName" placeholder="Enter stocker name" class="selectInputs"/>
          <label>Purchase Price</label>
          <input v-model="purchasePrice" placeholder="Enter purchase price" class="selectInputs"/>
            <label>Country name</label>
            <div class="selectButtons">
            <button @click="openDropDown" class="buttonBg">
            {{ selectedCountry ? selectedCountry : "Select Country" }}
          </button>

          </div>
          <div v-if="dropDown">
            <div class="investments">
              <button @click="selectCountry('USA')" class="buttonBg">USA</button>
            </div>
            <div class="investments">
              <button @click="selectCountry('Singapore')" class="buttonBg">Singapore</button>
            </div>
          </div>
        </div>
        <div class="forms">
          <div class="forms">
            <label>Ticker name</label>
            <input v-model="tickerName" placeholder="Enter ticker name" class="selectInputs"/>
          </div>
          <div class="forms">
            <label>Purchase date</label>
            <input v-model="purchaseDate" placeholder="Enter purchase date" class="selectInputs"/>
          </div>
        </div>
      </div>
    </div>
    <div class="nextButton">
        <button class="whiteButton">Submit</button>
    </div>
  </div>
</template>
<script>
export default {

  props: ["isOpened"],

  data() {
    return {
        dropDown: false,
        selectedCountry: "",
        stockName: "",
        purchasePrice: "",
        tickerName: "",
        purchaseDate: ""
    }
  },
  methods: {
    close() {
      this.$emit("isEmitStocks", false);
    },

    openDropDown() {
      this.dropDown = !this.dropDown;
    },

    selectCountry(countryName) {
      this.selectedCountry = countryName;
      this.dropDown = false;
    },
  },
};
</script>
