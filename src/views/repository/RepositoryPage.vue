<template>
    <div class="navbar">
      <NavBar/>
    </div>
  
    <div class="content">
      <StockRepository @input-change="handleInputChange" :notificationData="notificationData" :noSavedStocks="noSavedStocks"/>
      <RepositoryList @notification-output="notifcationToDisplay" @noSavedStocks="noSavedStocksChange" :searchQuery="searchQuery"/>
    </div>
  
  </template>
  
  <script>
    import Header from  '../homepage/Header.vue';
    import NavBar from  '../homepage/NavBar.vue';
    import RepositoryList from './RepositoryList.vue'
    import StockRepository from './StockRepository.vue'
  
    export default {
      components: {
        Header, 
        NavBar,
        RepositoryList,
        StockRepository,
      },
  
      data() {
        return {
            searchQuery: '',
            notificationData: [],
            noSavedStocks: false
        }
      },
  
      methods: {
        handleInputChange(value) {
            // Update the searchQuery data property
            console.log('handleInputChange received:', value); // For debugging
            this.searchQuery = value;
        },
        notifcationToDisplay(value) {
            // Update the notificationData data property
            console.log('notification received:', value); // For debugging
            this.notificationData = value;
        },
        noSavedStocksChange(value) {
            this.noSavedStocks = value;
        }
      }
    }
  </script>