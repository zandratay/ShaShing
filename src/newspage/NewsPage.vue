<template>

  <div class="navbar">
    <NavBar />
  </div>
  
  <div class="content">
    <Header @input-change="handleInputChange" />
    <NewsDisplay :searchQuery="searchQuery" />
  </div>
  
</template>

<script>
  import Header from  './newspage/Header.vue';
  import NavBar from  './homepage/NavBar.vue';
  import NewsDisplay from './newspage/NewsDisplay.vue';

  export default {
    components: {
      Header, 
      NavBar,
      NewsDisplay
    },
    data() {
      return {
        searchQuery: ''
      };
    },

    methods: {
      handleInputChange(value) {
        // Update the searchQuery data property
        console.log('handleInputChange received:', value); // For debugging
        this.searchQuery = value;
        // You might also call a method to fetch new data based on the updated searchQuery here
      }
    }
  }
</script>




