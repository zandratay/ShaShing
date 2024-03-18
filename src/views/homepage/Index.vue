<template>
  <div class="navbar">
    <NavBar/>
  </div>

  <div class="content">
    <Header @addInvestment="getData" />
    <OverviewCharts />
    <AssetClass />
    <AddInvestment :isInvestment="addInvestment" @clicked="setData"/>
  </div>

</template>

<script>
  import Header from  './Header.vue';
  import OverviewCharts from  './OverviewCharts.vue';
  import AssetClass from  './AssetClass.vue';
  import NavBar from  './NavBar.vue';
  import AddInvestment from './AddInvestment.vue'

  export default {
    components: {
      Header, 
      OverviewCharts,
      AssetClass,
      NavBar,
      AddInvestment,
    },

    data() {
      return {
        addInvestment: false,
        clicked: false
      }
    },

    methods: {
      getData(data) {
        this.addInvestment = data
      },

      setData(data) {
        this.addInvestment = data
      }
    
    }
  }
</script>