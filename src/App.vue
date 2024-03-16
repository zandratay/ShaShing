<template>

  <div class="navbar">
    <NavBar @page_at="changePage($event)"/>
  </div>
  
  <div class="content">
    <Header />
    <OverviewCharts /> 
    <AssetClass />
  </div>
  
</template>

<script>
  import Header from  './homepage/Header.vue';
  import OverviewCharts from  './homepage/OverviewCharts.vue';
  import StockRespository from  './homepage/StockRespository.vue';
  import AssetClass from  './homepage/AssetClass.vue';
  import RespositoryList from  './homepage/RespositoryList.vue';
  import NavBar from  './homepage/NavBar.vue';

  export default {
    data(){
      return {
        currentMainView: OverviewCharts,
        currentList : AssetClass
      }
    },
    components: {
      Header, 
      OverviewCharts,
      AssetClass,
      RespositoryList,
      NavBar
    },
    methods:{
      
    }
  }
</script>


