<template>
    <div class="welcome-info">
        <h3> Stock Respository page </h3>
    </div>
    <div class="graphs-container">
        <div class="charts">
            <h4> To add notification and search bar </h4>
            <input id = "header-input" type="text" placeholder = "Search Keyword..." @change="emitInputValue">
        </div>

    </div>
</template>

<script>
export default {
    methods: {
        emitInputValue(event) {
            // Emit an event with the input value
            const value = event.target.value;
            console.log('Emitting input-change:', value); // For debugging
            this.$emit('input-change', value);

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

</style>
