<template>
  <div id="app">
    <navbar/>
    
    <router-view></router-view>
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
.formContainer {
  display: grid;
  grid-template-columns: 20% auto auto 20%;
}
.gridCentered {
  grid-column-start: 2;
}
.shadowed {
  border:thin solid;
  border-color: LightSeaGreen;
  box-shadow: 15px 15px 5px CadetBlue;
}
</style>
