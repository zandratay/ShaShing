<template>
  <div class="modal" v-if="isOpened">
    <div class="investment">
      <text class="addInvestment">Cash</text>
      <button @click="close">close</button>
    </div>
    <div class="formDiv">
      <div class="investment">
        <div class="forms">
          <label>Bank Name</label>
          <div class="selectButtons">
            <button @click="openDropDown" class="buttonBg">
            {{ selectedInvestment ? selectedInvestment : "Select Bank Name" }}
          </button>

          </div>
          
          <div v-if="dropDown">
            <div class="investments">
              <button class="buttonBg" @click="selectInvestment('POSB')">POSB</button>
            </div>
            <div class="investments">
              <button class="buttonBg" @click="selectInvestment('OCBC')">OCBC</button>
            </div>
          </div>
        </div>
        <div class="forms">
          <div class="forms">
            <label>Amount</label>
            <input v-model = "amount" placeholder="Enter amount" class="selectInputs"/>
          </div>
          <div class="forms">
            <label>Purchase date</label>
            <input v-model = "purchaseDate" placeholder="Enter purchaseDate" class="selectInputs"/>
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
      selectedInvestment: "",
      amount: "",
      purchaseDate: "",
    };
  },

  methods: {
    close() {
      this.$emit("isEmitCash", false);
    },

    openDropDown() {
      this.dropDown = !this.dropDown;
    },

    selectInvestment(investmentType) {
      this.selectedInvestment = investmentType;
      this.dropDown = false;
    },
  },
};
</script>
