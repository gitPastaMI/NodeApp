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
      {{user}}
    </div>
    <div class="">
      {{error}}
    </div>
    <div class="">
      <div class="" v-for="user in users">
        {{user}}
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/service'
export default {
  name: 'Login',
  data () {
    return {
      credentials: {},
      user: null,
      error: null,
      users: null,
    }
  },

  methods:{
    register () {
      console.log('FRONTEND register component 1');
      API.register(this.credentials)
      .then(data => {
        console.log('FRONTEND register component 6',data);
        this.user = data;
      })
      .catch(error => {
        console.log('FRONTEND register component 6',error);
        this.error = error;
      });
    },

    login () {
      // this.$store.dispatch('login',this.credentials)
      console.log('login comonent');
    },

    read () {
      console.log('read component');
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
