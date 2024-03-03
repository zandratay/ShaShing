<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <h1> Cash</h1>
        <div> 
            <p> POSB </p>
            <p> Savings account 123 </p>

            <p> DBS </p>
            <p> Savings account 234 </p>
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
  