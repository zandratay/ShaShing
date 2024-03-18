<template>
  <div class="modal" v-if="isOpened">
    <div class="investment">
      <text class="addInvestment">CPF</text>
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
          <label>CPF Account</label>
          <div class="selectButtons">
            <button @click="openDropDown" class="buttonBg">
              <text>{{
                selectAccount ? selectAccount : "Select CPF Account"
              }}</text>
            </button>
          </div>
          <div v-if="dropDown">
            <div class="investments">
              <button
                @click="selectedAccount('Ordinary Account')"
                class="buttonBg"
              >
                Ordinary Account
              </button>
            </div>
            <div class="investments">
              <button
                @click="selectedAccount('MediSave Account')"
                class="buttonBg"
              >
                MediSave Account
              </button>
            </div>
            <div class="investments">
              <button
                @click="selectedAccount('Retirement Account')"
                class="buttonBg"
              >
                Retirement Account
              </button>
            </div>
            <div class="investments">
              <button
                @click="selectedAccount('Special Account')"
                class="buttonBg"
              >
                Special Account
              </button>
            </div>
          </div>
        </div>
        <div class="forms">
          <label>Amount</label>
          
              <input
              v-model="amount"
              placeholder="Enter amount"
              class="selectInputs"
            />
          
          
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
      selectAccount: "",
      amount: "",
    };
  },

  methods: {
    close() {
      this.$emit("isEmitCPF", false);
    },

    openDropDown() {
      this.dropDown = !this.dropDown;
    },

    selectedAccount(accountType) {
      this.selectAccount = accountType;
      this.dropDown = false;
    },
  },
};
</script>
