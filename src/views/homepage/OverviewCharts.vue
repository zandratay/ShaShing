<template>
  <div class="graphs-container">
    <div class="left">
      <div class="box">
        <h3 class="heading">Your Net Worth</h3>
        <h1 style="text-align: center; margin-top: -18px; color: #164f92">
          ${{ totalNetWorth }}
        </h1>
      </div>

      <div class="pie-chart">
        <h1 class="heading">Your Asset Composition</h1>
        <pie-chart
          style="margin-left: 5px; position: relative; height: 80%; width: 100%"
          :data="chartDataForPie"
        ></pie-chart>
      </div>
    </div>

    <div class="right">
      <div class="line-chart">
        <h3 class="heading" style="margin-top: 2px">Your Portfolio</h3>

        <div class="buttons-container">
          <!-- Use dynamic class binding to apply active style -->
          <button
            :class="{ active: activeView === 'day' }"
            class="view-button"
            @click="dayview()"
          >
            Last 24h
          </button>
          <button
            :class="{ active: activeView === 'week' }"
            class="view-button"
            @click="weekview()"
          >
            Last 7d
          </button>
          <button
            :class="{ active: activeView === 'month' }"
            class="view-button"
            @click="monthview()"
          >
            Last 30d
          </button>
        </div>
        <line-chart
          :data="chartdata"
          :library="{
            elements: { line: { tension: 0 }, point: { radius: 0 } },
          }"
          style="padding-left: 10px; position: relative"
        ></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

export default {
  name: "OverviewCharts",
  data() {
    return {
      activeView: "week", // Track active view
      chartdata: {},
      chartdata2: { Bonds: 1000, CPF: 2000, Stocks: 500, Cash: 100 },
      // Additional state properties for fetched data
      assets: [],
      simulatedTime: null, // Store the simulated time globally
      simulatedAmount: null, // Store the simulated amount globally
    };
  },
  computed: {
    totalNetWorth() {
      // Ensure 'this.assets' is structured correctly to sum up the amounts
      // This code assumes 'this.assets' is an object containing arrays of assets
      return Object.values(this.assets)
        .reduce((total, assetType) => {
          if (Array.isArray(assetType)) {
            // Sum up all amounts within this asset type
            const assetTypeTotal = assetType.reduce((assetTypeSum, asset) => {
              return assetTypeSum + parseFloat(asset.amount || 0);
            }, 0);
            return total + assetTypeTotal;
          }
          return total;
        }, 0)
        .toFixed(0); // Convert the total to a string with 2 decimal places
    },

    assetSums() {
      // This object will hold the sum for each asset type
      const sums = {};

      // Iterate over each asset type in the 'assets' object
      Object.entries(this.assets).forEach(([assetType, entries]) => {
        if (Array.isArray(entries)) {
          // Calculate the sum for this asset type
          sums[assetType] = entries.reduce(
            (sum, asset) => sum + parseFloat(asset.amount || 0),
            0
          );
        }
      });

      return sums;
    },

    chartDataForPie() {
      // This method assumes `this.assetSums` holds the sums for each asset type
      const pieChartData = {};
      Object.entries(this.assetSums).forEach(([assetType, sum]) => {
        let formattedAssetType = assetType;
        // If assetType is 'CPF', make it uppercase
        if (formattedAssetType.toLowerCase() === "cpf") {
          formattedAssetType = formattedAssetType.toUpperCase();
        } else {
          // Capitalize the first letter of the assetType
          formattedAssetType =
            formattedAssetType.charAt(0).toUpperCase() +
            formattedAssetType.slice(1);
        }

        pieChartData[formattedAssetType] = sum;
      });

      return pieChartData;
    },
  },
  methods: {
    fetchData() {
      const db = getFirestore(firebaseApp);
      const userDocRef = doc(db, "users", "177889");

      onSnapshot(
        userDocRef,
        (doc) => {
          if (doc.exists()) {
            this.assets = doc.data();
            // Recalculate the view based on the latest data
            this[this.activeView + "view"]();
          } else {
            // Document does not exist
            console.log("Document not found");
          }
        },
        (error) => {
          // Error fetching document
          console.error("Error fetching document: ", error);
        }
      );
    },
    generateFixedRandomTime() {
      if (!this.simulatedTime) {
        // Check if the time has already been generated
        const randomPastMillisec = Math.floor(
          Math.random() * 24 * 60 * 60 * 1000
        );
        this.simulatedTime = new Date(
          new Date().getTime() - randomPastMillisec
        );
        this.simulatedAmount = Math.floor(Math.random() * 1000); // Random amount for the asset
      }
    },
    generateSixHourIntervalLabels() {
      const labels = {};
      const now = new Date();
      // Start 24 hours ago from 'now'
      const startOfPeriod = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      for (let i = 0; i < 24; i += 6) {
        const time = new Date(startOfPeriod.getTime() + i * 60 * 60 * 1000);
        const label = `${time.getHours()}:00`;
        labels[label] = 0; // Start all labels at 0
      }

      // Add label for the current time
      labels[`${now.getHours()}:00`] = 0;

      return labels;
    },
    calculateHistoricalCumulativeSum(assetsObject, daysBeforeNow) {
      const now = new Date();
      const startOfTimeframe = new Date();
      startOfTimeframe.setDate(now.getDate() - daysBeforeNow);

      let historicalCumulativeSum = 0;
      let sums = {};

      // First, calculate the cumulative sum up to the start of the timeframe
      Object.values(assetsObject).forEach((assetArray) => {
        if (Array.isArray(assetArray)) {
          assetArray.forEach((asset) => {
            if (asset.purchaseDate && asset.amount) {
              const [day, month, year] = asset.purchaseDate.split("/");
              const purchaseDate = new Date(year, month - 1, day); // Adjust for zero-based month index

              if (purchaseDate < startOfTimeframe) {
                historicalCumulativeSum += parseFloat(asset.amount);
              }
            }
          });
        }
      });

      // Initialize the sums with the historical cumulative sum for each day up to 'now'
      for (let i = daysBeforeNow; i >= 0; i--) {
        const date = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - i
        );
        const label = `${date.getDate()}/${date.getMonth() + 1}`;
        sums[label] = historicalCumulativeSum;
      }

      // Add amounts within the timeframe to the sums
      Object.values(assetsObject).forEach((assetArray) => {
        if (Array.isArray(assetArray)) {
          assetArray.forEach((asset) => {
            if (asset.purchaseDate && asset.amount) {
              const [day, month, year] = asset.purchaseDate.split("/");
              const purchaseDate = new Date(year, month - 1, day); // Adjust for zero-based month index

              if (purchaseDate >= startOfTimeframe && purchaseDate <= now) {
                const label = `${purchaseDate.getDate()}/${
                  purchaseDate.getMonth() + 1
                }`;
                const amount = parseFloat(asset.amount);
                // Add amount to the historical sum from this date onwards
                for (
                  let j = purchaseDate.getDate() - startOfTimeframe.getDate();
                  j <= daysBeforeNow;
                  j++
                ) {
                  const futureDate = new Date(
                    startOfTimeframe.getFullYear(),
                    startOfTimeframe.getMonth(),
                    startOfTimeframe.getDate() + j
                  );
                  const futureLabel = `${futureDate.getDate()}/${
                    futureDate.getMonth() + 1
                  }`;
                  if (sums[futureLabel] !== undefined) {
                    sums[futureLabel] += amount;
                  }
                }
              }
            }
          });
        }
      });
      return sums;
    },

    // Views
    dayview() {
      const now = new Date();

      // Set the active view to 'day'
      this.activeView = "day";

      // Generate the fixed random time and amount, if not already done
      if (!this.simulatedTime || !this.simulatedAmount) {
        this.generateFixedRandomTime();
      }

      // Generate labels for the past 24 hours at 6-hour intervals
      const labelsForPast24Hours = this.generateSixHourIntervalLabels();

      // Calculate the historical cumulative sum for the assets
      const historicalData = this.calculateHistoricalCumulativeSum(
        this.assets,
        0
      ); // Only today's data

      // Simulated label based on the fixed random time
      const randomHourLabel = `${this.simulatedTime.getHours()}:00`;

      // Add the simulated amount to the historicalData at the simulated time
      historicalData[randomHourLabel] =
        (historicalData[randomHourLabel] || 0) + this.simulatedAmount;

      // Merge labels for past 24 hours with the historical data
      this.chartdata = { ...labelsForPast24Hours, ...historicalData };

      // Filter chartdata to include only the last 24 hours
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      this.chartdata = Object.fromEntries(
        Object.entries(this.chartdata).filter(([label]) => {
          const [hours] = label.split(":");
          const labelTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            parseInt(hours)
          );
          return labelTime >= twentyFourHoursAgo && labelTime <= now;
        })
      );
    },

    weekview() {
      this.activeView = "week";
      // Adjust the days parameter as needed for accurate timeframe calculation
      this.chartdata = this.calculateHistoricalCumulativeSum(this.assets, 7);
    },
    monthview() {
      this.activeView = "month";
      // Adjust the days parameter as needed for accurate timeframe calculation
      this.chartdata = this.calculateHistoricalCumulativeSum(this.assets, 30);
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>
