<template>
  <div class="modal-overlay" :class="{ 'active': isOpened }" @click="closeModal"></div>
  <div class="modal" v-if="isOpened">
    <div class="investment">
      <text class="addInvestment">Cash</text>
      <button @click="close" class="buttonBgFit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="currentColor"
            d="M6.707 6.293c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l4.793 4.793-4.793 4.793c-.39.39-.39 1.023 0 1.414.39.39 1.023.39 1.414 0l4.793-4.793 4.793 4.793c.39.39 1.023.39 1.414 0 .39-.39.39-1.023 0-1.414l-4.793-4.793 4.793-4.793c.39-.39.39-1.023 0-1.414-.39-.39-1.023-.39-1.414 0l-4.793 4.793-4.793-4.793z"
          />
        </svg>
      </button>
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
              <button class="buttonBg" @click="selectInvestment('POSB')">
                POSB
              </button>
            </div>
            <div class="investments">
              <button class="buttonBg" @click="selectInvestment('OCBC')">
                OCBC
              </button>
            </div>
          </div>
        </div>
        <div class="forms">
          <div class="forms">
            <label>Amount</label>
            <input
              type="number"
              step="0.01"
              v-model="amount"
              placeholder="Enter amount"
              class="selectInputs"
            />
          </div>
          <div class="forms">
            <label class="inputDiv">Purchase date</label>
            <input
              type="date"
              v-model="purchaseDate"
              placeholder="Enter purchase date"
              class="selectInputs"
            />
          </div>
        </div>
      </div>
      <div class="nextButton">
        <button class="whiteButton" @click="close">Submit</button>
      </div>
    </div>
  </div>
</template>
<script>
import { X } from "lucide-react";
export default {
  props: ["isOpened"],

  components: {
    X,
  },

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
