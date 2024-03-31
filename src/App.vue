<template>

  <div id="app">
    <LoadingPage/>
    <router-view />
  </div>

</template>

<script>
import LoadingPage from './views/LoadingPage.vue'

export default {
  components: {
    LoadingPage
  }
}
</script>