<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
