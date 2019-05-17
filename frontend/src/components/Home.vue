<template>
  <div class="homeComponent">
    <h1>HOME</h1>
    <div class="">
      {{this.$store.getters.getUser}}
      <button type="button" v-on:click="logout()">Logout</button>
    </div>
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

  methods : {
    logout () {
      this.$store.dispatch('logout')
        .then(response => {
          this.$router.push({name:'login'});
        });
    },
  },
}
</script>

<style scoped>

</style>
