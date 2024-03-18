<template>
  <div class="modal-overlay" :class="{ 'active': isVisible }" @click="closeModal"></div>
  
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Logo_of_the_Central_Provident_Fund_Board_%28Singapore%29.svg/150px-Logo_of_the_Central_Provident_Fund_Board_%28Singapore%29.svg.png">
      <div> 
          <p> Savings account </p>
          <p> Medisave account </p>
          <p> Medishield account </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isVisible'],
  methods: {
    close() {
      this.$emit('update:isVisible', false);
    }
  }
}
</script>
