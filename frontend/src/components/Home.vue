<template>
  <div class="homeComponent">
    <h1>HOME</h1>
    <div class="">
      {{error}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      error: null,
    }
  },
}
</script>

<style scoped>

</style>
