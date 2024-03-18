<template>
  <div class="graphs-container">
    <div class="left">
      <div class="box">
        <h3 class="heading"> Your Net Worth </h3>
        <h1 style="text-align: center; margin-top: -18px; color:#164F92;"> $1000 </h1>
      </div>

      <div class="pie-chart">
        <h1 class="heading">Your Asset Composition</h1>
        <pie-chart style="margin-left: 5px; position: relative; height:80%; width:100%;" :data="chartdata2"></pie-chart>
      </div>
    </div>

    <div class="right">
      <div class="line-chart">
        <h3 class="heading" style=" margin-top: 2px;"> Your Portfolio </h3>

        <div class="buttons-container">
          <!-- Use dynamic class binding to apply active style -->
          <button :class="{'active': activeView === 'day'}" class="view-button" @click="dayview()">Last 24h</button>
          <button :class="{'active': activeView === 'week'}" class="view-button" @click="weekview()">Last 7d</button>
          <button :class="{'active': activeView === 'month'}" class="view-button" @click="monthview()">Last 30d</button>
        </div>
        <line-chart style="padding-left: 10px; position: relative;" :data="chartdata"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OverviewCharts",
  data() {
    return {
      activeView: 'week', // Track active view
      chartdata: {},
      chartdata2: { Bonds: 1000, CPF: 2000, Stocks: 500, Cash: 100 },
    };
  },
  methods: {
    dayview() {
      this.activeView = 'day';
      this.chartdata = {
        "9:00 am": 5,
        "12:00 pm": 5,
        "3:00 pm": 6,
        "6:00 pm": 8,
      };
    },
    weekview() {
      this.activeView = 'week';
      this.chartdata = {
        "11/3": 5,
        "12/3": 10,
        "13/3": 2,
        "14/3": -10,
        "15/3": 0,
        "16/3": 15,
        "17/3": 8,
      };
    },
    monthview() {
      this.activeView = 'month';
      this.chartdata = {
        "11/3": 5,
        "21/3": 15,
        "31/3": 30,
        "10/4": 35,
      };
    },
  },
  mounted() {
    this.weekview(); // Default to week view on mount
  },
};
</script>