<template>
  <div class="loginComponent">
    <h1>LOGIN</h1>
    <div class="">
      <input type="text" v-model="credentials.username" autofocus>
      <input type="password" v-model="credentials.password">
      <button type="button" v-on:click="register()">Register</button>
      <button type="button" v-on:click="login()">Login</button>
    </div>
    <div class="">
      <div class="" v-for="user in users">
        {{user}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      credentials: {},
      users: null,
    }
  },

  methods:{
    login () {
      console.log('logincomponent login pre dispatch 1');
      this.$store.dispatch('login',this.credentials)
      console.log('logincomponent login post dispatch 4');
    },
    register () {
      console.log('registercomponent pre dispatch register 1');
      this.$store.dispatch('register',this.credentials)
      console.log('registercomponent post dispatch register 4');
      this.read();
    },
    read () {
      console.log('readcomponent read');
    },
  },

  mounted () {
    this.read();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
