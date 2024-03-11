<template>
  <div class="modal" v-if="isOpened">
    <div class="investment">
      <text>Cash</text>
      <button @click="close">close</button>
    </div>
    <div>
        
            <div class="investment">
                <div class="forms">
                    <label>Bank Name</label>
                    <button @click="openDropDown">{{
            selectedInvestment ? selectedInvestment : "Select Bank Name"
          }}</button>
                    <div v-if="dropDown">
                        <div>
                            <button @click="selectInvestment('POSB')">POSB</button>
                        </div>
                        <div>
                            <button @click="selectInvestment('OCBC')">OCBC</button>
                        </div>
                    </div>
                </div>
                <div class="forms">
                    <div class="forms">
                        <label>Amount</label>
                        <input />
                    </div>
                    <div class="forms">
                        <label>Purchase date</label>
                        <input />
                    </div>
                </div>
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
        selectedInvestment: ""
    }
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
