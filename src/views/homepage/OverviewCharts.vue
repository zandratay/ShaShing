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
          <button
            :class="{ active: activeView === 'week' }"
            class="view-button"
            @click="weekview()"
          >
            1W
          </button>
          <button
            :class="{ active: activeView === 'month' }"
            class="view-button"
            @click="monthview()"
          >
            1M
          </button>
          <button
            :class="{ active: activeView === 'year' }"
            class="view-button"
            @click="yearview()"
          >
            1Y
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
import firebaseApp from "@/firebase";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

export default {
  name: "OverviewCharts",
  data() {
    return {
      activeView: "week", // Track active view
      chartdata: {},
      chartdata2: {},
      // Additional state properties for fetched data
      assets: [],
      simulatedTime: null, // Store the simulated time globally
      simulatedAmount: null, // Store the simulated amount globally
      user: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (user) {
        this.fetchData();
      }
    });
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
      const userId = this.user.uid;
      const db = getFirestore(firebaseApp);
      console.log("hello");
      if (this.user) {
        const userId = this.user.uid;
        console.log(this.user.uid);
        const userDocRef = doc(db, "users", userId);
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
      }
    },
    calculateHistoricalCumulativeSum(assetsObject, daysBeforeNow) {
      const now = new Date();
      const startOfTimeframe = new Date();
      startOfTimeframe.setDate(now.getDate() - daysBeforeNow);

      let historicalCumulativeSum = 0;
      let sums = {};

      // Calculate the cumulative sum up to the start of the timeframe
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
        const label =
          daysBeforeNow === 364
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            : `${date.getDate()}/${date.getMonth() + 1}`;
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
                const label =
                  daysBeforeNow === 364
                    ? `${purchaseDate.getDate()}/${
                        purchaseDate.getMonth() + 1
                      }/${purchaseDate.getFullYear()}`
                    : `${purchaseDate.getDate()}/${
                        purchaseDate.getMonth() + 1
                      }`;
                const amount = parseFloat(asset.amount);

                // Add amount to the historical sum from this date onwards
                for (
                  let j =
                    (purchaseDate - startOfTimeframe) / (1000 * 60 * 60 * 24);
                  j <= daysBeforeNow;
                  j++
                ) {
                  const futureDate = new Date(
                    startOfTimeframe.getTime() + j * (1000 * 60 * 60 * 24)
                  );
                  const futureLabel =
                    daysBeforeNow === 364
                      ? `${futureDate.getDate()}/${
                          futureDate.getMonth() + 1
                        }/${futureDate.getFullYear()}`
                      : `${futureDate.getDate()}/${futureDate.getMonth() + 1}`;

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
    weekview() {
      this.activeView = "week";
      // Adjust the days parameter as needed for accurate timeframe calculation
      this.chartdata = this.calculateHistoricalCumulativeSum(this.assets, 6);
    },
    monthview() {
      this.activeView = "month";
      // Adjust the days parameter as needed for accurate timeframe calculation
      this.chartdata = this.calculateHistoricalCumulativeSum(this.assets, 29);
    },
    yearview() {
      this.activeView = "year";
      this.chartdata = this.calculateHistoricalCumulativeSum(this.assets, 364);

      // Generate monthly labels
      let monthlyData = {};
      Object.keys(this.chartdata).forEach((label) => {
        const [day, month, year] = label.split("/");
        const monthYear = `${month}/${year}`;

        // Only update the monthly data if it's the last day of the month or the last day we have data for
        if (
          !monthlyData[monthYear] ||
          day === "31" ||
          day === Object.keys(this.chartdata).slice(-1)[0].split("/")[0]
        ) {
          monthlyData[monthYear] = this.chartdata[label];
        }
      });

      this.chartdata = monthlyData;
    },
  },
};
</script>
