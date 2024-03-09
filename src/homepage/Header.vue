<template>
  <img
    id="header-img"
    src="https://wallpapers.com/images/featured/widescreen-3ao0esn9qknhdudj.jpg"
    alt="Duck UI"
  />

  <div class="welcome-info">
    <div class="welcome-div">
        <div>
            <h2>Welcome, John!</h2>
            <h3>Current Portfolio</h3>
            <p>Updated at 22 March, 5pm</p>
        </div>
        <div>
            <button v-on:click="activateInvestment">Add Investment</button>
        </div>
    </div>
    

    
  </div>
</template>

<script>

    export default {

    data() {
        isClicked: false
    },

    methods: {
        activateInvestment() {
            this.$emit('addInvestment', true);
        }
    }
}

</script>

<style scoped></style>
