<template>
  <div class="navbar">
    <NavBar/>
  </div>

  <div class="content">
    <Header @addInvestment="getData" :user="user"/>
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

  import firebaseApp from '@/firebase';
  import { getAuth } from 'firebase/auth';
  const auth = getAuth();

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
        clicked: false,
        user: auth.currentUser
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