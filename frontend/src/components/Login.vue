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
        <button type="button" v-on:click="remove(user)">delete</button>
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
      console.log('component register 1',this.credentials);
      API
        .register(this.credentials)
        .then(
          data => {
            console.log('component register data 6',data);
            this.user = data;
            this.read();
          })
        .catch(error => {
          if (error.response.status===418) {
            console.log('component register error 6',error.response.data);
            this.error = error.response.data;
          } else {
            console.log('component register error 6',error);
            this.error = error;
          }
        });
    },

    login () {
      // this.$store.dispatch('login',this.credentials)
      console.log('login comonent');
    },

    read () {
      API
        .getUsers()
        .then(
          data => {
            this.users = data;
          })
        .catch(error => {
          if (error.response.status===418) {
            console.log('component register error 6',error.response.data);
            this.error = error.response.data;
          } else {
            console.log('component register error 6',error);
            this.error = error;
          }
        });
    },

    remove (user) {
      console.log('component remove 1',user);
      API
        .removeUser(user)
        .then(data => {
          console.log('component remove data 6',data);
          this.read();
        })
        .catch(error => {
          if (error.response.status===418) {
            console.log('component register error 6',error.response.data);
            this.error = error.response.data;
          } else {
            console.log('component register error 6',error);
            this.error = error;
          }
        });
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
