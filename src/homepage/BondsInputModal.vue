<template>
  <div class="modal" v-if="isOpened">
    <div class="investment">
      <text class="addInvestment">Bonds</text>
      <button @click="close" class="buttonBgFit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M6.707 6.293c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l4.793 4.793-4.793 4.793c-.39.39-.39 1.023 0 1.414.39.39 1.023.39 1.414 0l4.793-4.793 4.793 4.793c.39.39 1.023.39 1.414 0 .39-.39.39-1.023 0-1.414l-4.793-4.793 4.793-4.793c.39-.39.39-1.023 0-1.414-.39-.39-1.023-.39-1.414 0l-4.793 4.793-4.793-4.793z"/>
  </svg></button>
    </div>
    <div class="formDiv">
      <div class="investment">
        <div class="forms">
          <label>Bond Name</label>
          <input v-model="bondName" placeholder="Enter bond name" class="selectInputs"/>
          <label class="inputDiv">Purchase Price</label>
          <input v-model="purchasePrice" placeholder="Enter purchase price" class="selectInputs" />
            <label class="inputDiv">Country name</label>
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
            <label>Identification No.</label>
            <input v-model="identificationNo" placeholder="Enter identification no" class="selectInputs"/>
          </div>
          <div class="forms">
            <label class="inputDiv">Purchase date</label>
            <input v-model="purchaseDate" placeholder="Enter purchase date" class="selectInputs"/>
          </div>
        </div>
      </div>
      <div class="nextButton">
        <button class="whiteButton">Submit</button>
      </div>
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
      bondName: "",
      purchasePrice: "",
      identificationNo: "",
      purchaseDate: "",
    };
  },

  methods: {
    close() {
      this.$emit("isEmitBonds", false);
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
