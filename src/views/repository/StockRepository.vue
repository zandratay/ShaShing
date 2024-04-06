<template>
    <div v-if="!noSavedStocks">
        <div class="latest-release">
            <h4 
            style="font-size: 30px; font-weight: 600; color: black; letter-spacing: 1px; 
            background-color: rgba(255, 255, 255, 0.3);
            width: 50%; padding: 10px; margin-bottom:0%">
                Latest Financial Reports
            </h4>
            <h6 
            style="font-size: 15px; color: black; letter-spacing: 1px; 
            background-color: rgba(255, 255, 255, 0.3);
            width: 50%; padding: 10px; margin-top:0% ;">
                Notice: Only stocks listed in the USA stock exchange are displayed at this page for financial reports viewing
            </h6>
            <!-- <p v-for="cell in notificationData" class="notification-item"> 
                {{formatDate(cell.date)}}: {{cell.stock}} released their {{cell.report}} 
            </p> --> 
            <div v-for="cell in notificationData" :key="cell.date" class="notification-item">
                <span class="date" style="font-weight:bold;">{{ formatDate(cell.date) }}</span>
                <span class="colon">:</span>
                <span class="content">{{ cell.stock }} released their {{ cell.report }}</span>
            </div>
        </div>
    </div>
    <div v-if="!noSavedStocks">
        <div class="repo-search-bar">
            <!-- <h4> Search bar </h4> -->
            <input id = "search-bar" type="text" placeholder = "Search Keywords" @input="emitInputValue">
            <img src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-4r9dtbbw.png" alt="Search icon" style="height:10px; width:10px; margin-left: 7px;">
        </div>

    </div>
</template>

<script>
export default {
    props: {
        notificationData: Array,
        noSavedStocks: Boolean
    },
    methods: {
        emitInputValue(event) {
            // Emit an event with the input value
            const value = event.target.value;
            console.log('Emitting input-change:', value); // For debugging
            this.$emit('input-change', value);

        },
        formatDate(dateString) {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            const date = new Date(dateString);
            const day = date.getDate();
            const monthIndex = date.getMonth();
            const year = date.getFullYear();

            let ordinalIndicator;
            if (day % 10 === 1 && day !== 11) {
                ordinalIndicator = "st";
            } else if (day % 10 === 2 && day !== 12) {
                ordinalIndicator = "nd";
            } else if (day % 10 === 3 && day !== 13) {
                ordinalIndicator = "rd";
            } else {
                ordinalIndicator = "th";
            }

            const formattedDate = `${day}${ordinalIndicator} ${months[monthIndex]} ${year}`;
            return formattedDate;
        }
    }
}
</script>


<style scoped>
.latest-release {
    position: relative; /* Needed to position the pseudo-element */
    /* background-image: url('https://mergersandinquisitions.com/wp-content/uploads/2019/06/cat-investment-banking-banner.jpg'); */
    background-color: rgb(221, 238, 251);
    margin-left: 60px; /* Initial margin to match the collapsed navbar width */
    padding: 10px;
    padding-top: 1px;
    height: fit-content;
    margin-top: 10px;
    width: 90%;
}

/* .latest-release::before {
    content: ""; 
    position: absolute; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.4); 
    z-index: 1; 
}

.latest-release * {
    position: relative;
    z-index: 2;
} */


#search-bar {
    margin-left: 60px; /* Initial margin to match the collapsed navbar width */
    padding: 8px;
    margin-top: 15px;
    border-radius: 20px;
    border: solid black 1px;
    background-color: white;
    width: fit-content;
}

.charts {
  /* background-color: #fff;*/
  background-color: #fff;
  flex: 0 1 calc(33.333% - 20px); /* Adjusted for the gap */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px; /* Space between the cards */
  padding: 10px; /* Space between the cards */
  overflow: hidden; /* Ensures the image does not flow outside the card's boundary */
  border-radius: 10px; /* Rounded corners for the card */
  transition: transform 0.3s ease-in-out; /* Smooth transform effect */
}

.notification-item {
  display: flex;
  align-items: center;
  padding: 13px;
  background-color: rgba(255, 255, 255, 0.3);
  width: 50%;
}

.date {
  flex: 0 0 150px; /* The date will not grow or shrink and has a fixed width of 150px */
  text-align: justify;
  text-justify: inter-word;
}

.colon {
  margin-left: 10px;
}

.content {
  margin-left: 10px; /* Space between the colon and the content */
}

</style>
