<template>
    <div class="navbar">
      <NavBar/>
    </div>
  
    <div class="content">
      <StockRespository @input-change="handleInputChange"/>
      <RespositoryList :searchQuery="searchQuery"/>
    </div>
  
  </template>
  
  <script>
    import Header from  '../Header.vue';
    import NavBar from  '../NavBar.vue';
    import RespositoryList from './RespositoryList.vue'
    import StockRespository from './StockRespository.vue'
  
    export default {
      components: {
        Header, 
        NavBar,
        RespositoryList,
        StockRespository,
      },
  
      data() {
        return {
            searchQuery: ''
        }
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