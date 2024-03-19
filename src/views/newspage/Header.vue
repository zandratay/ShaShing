<template>

    <div id = "header-bar">
        <img id = "header-img" src="https://wallpapers.com/images/featured/widescreen-3ao0esn9qknhdudj.jpg" alt="Duck UI">
        <input id = "header-input" type="text" placeholder = "Search Keyword..." @change="emitInputValue">

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

<style scoped>

    #header-bar {
        position: relative;
    }

    #header-input {
        position: absolute;
        top: 10%;
        left: 1%;
        width: 50%;
        height: auto;
        border-radius: 2em 2em 2em 2em;
    }

    
</style>