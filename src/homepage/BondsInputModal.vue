<template>
  <div class="modal" v-if="isOpened">
    <div class="investment">
      <text>Bonds</text>
      <button @click="close">close</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["isOpened"],

  methods: {
            close() {
                this.$emit('isEmitBonds', false)
            }
        }
};
</script>
