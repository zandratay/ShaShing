<template>
    <div class="modal" v-if="isOpened">
        <div class="investment">
      <text class="addInvestment">Others</text>
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
          <label>Asset Name</label>
          <input v-model="assetName" placeholder="Enter asset name" class="selectInputs"/>
          <label class="inputDiv">Purchase Price</label>
          <input v-model="purchasePrice" placeholder="Enter purchase price" class="selectInputs"/>
        </div>
        <div class="forms">
          <div class="forms">
            <label>Purchase Date</label>
            <input v-model="purchaseDate" placeholder="Enter purchase date" class="selectInputs"/>
          </div>
          <div class="forms">
            <label class="inputDiv">Description</label>
            <input v-model="description" placeholder="Enter description" class="selectInputs"/>
          </div>
        </div>
      </div>
      <div>
        <div class="nextButton">
        <button class="whiteButton">Submit</button>
        </div>

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