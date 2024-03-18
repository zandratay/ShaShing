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

  <!-- <div>
    <Login />
  </div> -->

</template>

<script>
  import Header from  './homepage/Header.vue';
  import OverviewCharts from  './homepage/OverviewCharts.vue';
  import AssetClass from  './homepage/AssetClass.vue';
  import NavBar from  './homepage/NavBar.vue';
  import AddInvestment from './homepage/AddInvestment.vue'
  import Login from './views/Login.vue'

  export default {
    components: {
      Header, 
      OverviewCharts,
      AssetClass,
      NavBar,
      AddInvestment,
      Login
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