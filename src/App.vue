<template>

  <div class="navbar">
    <NavBar @page_at="changePage($event)"/>
  </div>
  
  <div class="content">
    <Header />
    <component :is="currentMainView"></component>
    <!-- <OverviewCharts /> -->
    <AssetClass />
  </div>
  
</template>

<script>
  import Header from  './homepage/Header.vue';
  import OverviewCharts from  './homepage/OverviewCharts.vue';
  import StockRespository from  './homepage/StockRespository.vue';
  import AssetClass from  './homepage/AssetClass.vue';
  import NavBar from  './homepage/NavBar.vue';

  export default {
    data(){
      return {
        currentMainView: OverviewCharts
      }
    },
    components: {
      Header, 
      OverviewCharts,
      AssetClass,
      NavBar
    },
    methods:{
      changePage(page) {
        console.log(page);
        if (page === 'A') {
          this.currentMainView = OverviewCharts;
        } else {
          this.currentMainView = StockRespository;
        }
      }
    }
  }
</script>


