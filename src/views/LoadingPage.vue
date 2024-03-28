<template>
    <div class="loading-overlay" v-if="isLoading">
        <img src='/loading_page.gif' alt="Loading..." />
    </div>
</template>
  
<script>
import { mapState } from 'vuex';
  
export default {
    computed: {
      ...mapState(['isLoading'])
    }
}
</script>
  
<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; 
  height: 100%; 
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent black background */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  z-index: 1000; /* Ensure it's on top of other content */
}
</style>
  