<template>
    <div class="modal-overlay" :class="{ 'active': isVisible }" @click="closeModal"></div>
    
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <h1> Stocks </h1>
        <div> 
            <p> USA </p>
            <p> NASDAQ Composite </p>

            <p> Singapore </p>
            <p> Keppel </p>
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
  