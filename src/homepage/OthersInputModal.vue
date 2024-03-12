<template>
    <div class="modal" v-if="isOpened">
        <div class="investment">
      <text class="addInvestment">Others</text>
      <button @click="close">close</button>
    </div>
    <div class="formDiv">
      <div class="investment">
        <div class="forms">
          <label>Asset Name</label>
          <input v-model="assetName" placeholder="Enter asset name" class="selectInputs"/>
          <label>Purchase Price</label>
          <input v-model="purchasePrice" placeholder="Enter purchase price" class="selectInputs"/>
        </div>
        <div class="forms">
          <div class="forms">
            <label>Purchase Date</label>
            <input v-model="purchaseDate" placeholder="Enter purchase date" class="selectInputs"/>
          </div>
          <div class="forms">
            <label>Description</label>
            <input v-model="description" placeholder="Enter description" class="selectInputs"/>
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
        props: ['isOpened'],

        data() {
            return {
                assetName: "",
                purchasePrice: "",
                purchaseDate: "",
                description: ""
            }
        },
        methods: {
            close() {
                this.$emit('isEmitOthers', false)
            }
        }
    }
</script>