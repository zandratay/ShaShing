<template>
    <div v-if="!noSavedStocks" class="welcome-info">
        <div class="charts">
            <h4> Latest Released financial reports! </h4>
            <!-- <p v-for="cell in notificationData" class="notification-item"> 
                {{formatDate(cell.date)}}: {{cell.stock}} released their {{cell.report}} 
            </p> -->
            <div v-for="cell in notificationData" :key="cell.date" class="notification-item">
                <span class="date">{{ formatDate(cell.date) }}</span>
                <span class="colon">:</span>
                <span class="content">{{ cell.stock }} released their {{ cell.report }}</span>
            </div>
        </div>
    </div>
    <div v-if="!noSavedStocks" class="welcome-info">
        <div class="charts">
            <h4> Search bar: </h4>
            <input id = "header-input"type="text" placeholder = "Search Keyword..." @input="emitInputValue">
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


<style>
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
  margin-bottom: 5px; /* Adjust spacing between items */
  /* justify-content: flex-start; */
  /* text-align: justify; */
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
