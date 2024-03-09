<template>
    <div class="modal" v-if="isInvestment">
        <div>
            <text>Select your investment type</text>
            <button @click="clicked">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    props:['isInvestment'],

    methods: {
        clicked() {
            this.$emit('clicked', false)
        }
    }
}
</script>
