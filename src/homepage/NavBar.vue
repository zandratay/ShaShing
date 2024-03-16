<template>
    <div v-if="currentComponent === 'A'" class="nav-container">

        <div class="profile-information">
            <img id="duck-ui" src="https://content.instructables.com/FS1/ETHN/LGC9WODA/FS1ETHNLGC9WODA.png?auto=webp&fit=bounds&frame=1" alt="Duck UI">
            <strong> Duck UI </strong>

            <!-- <div class="navbaricon-container">
                <img class="navbaricon" src="https://cdn-icons-png.flaticon.com/512/25/25794.png" alt="home icon"> <br>
                <img class="navbaricon" src="https://www.pngkit.com/png/detail/961-9617712_report-report-icon-vector-png.png" alt="reports icon"> <br>
                <img class="navbaricon" src="https://cdn-icons-png.flaticon.com/512/25/25441.png" alt="bell icon"> <br>
            </div> -->
        </div>

        <nav class="left-nav">
            <ul>
                <li> Overview </li>
                <li> <button @click="showComponent('B')"> Stock respository </button> </li>
                <li> Social Media </li>
            </ul>
        </nav>
    </div>
    <div v-else-if="currentComponent === 'B'" class="nav-container">
        <div class="profile-information">
            <img id="duck-ui" src="https://content.instructables.com/FS1/ETHN/LGC9WODA/FS1ETHNLGC9WODA.png?auto=webp&fit=bounds&frame=1" alt="Duck UI">
            <strong> Duck UI </strong>

        </div>

        <nav class="left-nav">
            <ul>
                <li> <button @click="showComponent('A')"> Overview  </button> </li>
                <li>  Stock respository </li>
                <li> Social Media </li>
            </ul>
        </nav>

    </div>
</template>

<script>
export default {
    data() {
        return {
            currentComponent: 'A',
        };
    },
    emits:["page_at"],
    methods: {
        showComponent(component) {
            this.currentComponent = component;
            this.$emit('page_at', component)
        }
    }
}

</script>