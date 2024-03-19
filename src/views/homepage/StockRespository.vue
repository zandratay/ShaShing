<template>
    <div class="welcome-info">
        <h3> Stock Respository page </h3>
    </div>
    <div class="graphs-container">
        <div class="charts">
            <h4> To add notification and search bar </h4><br><br>
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
