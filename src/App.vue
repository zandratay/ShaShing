<template>

  <div class="navbar">
    <NavBar />
  </div>

  <div class="content">
    <Header />
    <OverviewCharts />
    <AssetClass />
  </div>

</template>

<script>
import Header from './homepage/Header.vue';
import OverviewCharts from './homepage/OverviewCharts.vue';
import AssetClass from './homepage/AssetClass.vue';
import NavBar from './homepage/NavBar.vue';

export default {
  components: {
    Header,
    OverviewCharts,
    AssetClass,
    NavBar,
  }
}
</script>