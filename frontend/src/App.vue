<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {navbar},
  data () {
    return {

    }
  },
}
</script>

<style>
div {
  font-family: sans-serif;
  font-size: small;
  border: thin dotted;
  padding: 5px;
}
</style>
