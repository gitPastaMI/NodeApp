<template>
  <div class="">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <h1>LOGIN</h1>
      <div class="">
        <img src="../assets/logo.png">
      </div>
      <error v-bind:errors="error"/>
      <div class="">
        <input type="text" v-model="credentials.username" autofocus>
        <input type="password" v-model="credentials.password">
        <button type="button" v-on:click="login()">Login</button>
        <button type="button" v-on:click="register()">Register</button>
      </div>
      <div class="">
        <div class="" v-for="user in users">
          {{user}}
          <button type="button" v-on:click="remove(user)">delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api/auth'
import error from '@/components/Error'
export default {
  name: 'Login',
  components:{error},
  data () {
    return {
      credentials: {},
      error: null,
      users: null,
      loading: false,
    }
  },

  methods:{
    toggleLoading () {
      this.loading = !this.loading;
    },
    isLoading () {
      return this.loading;
    },

    register () {
      this.toggleLoading ();
      API
        .register(this.credentials)
        .then(data => {
            if (data.errors) {
              this.error = data.errors;
            } else {
              this.user = data;
              this.read();
            }
          })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    login () {
      this.toggleLoading ();
      API
        .login(this.credentials)
        .then(data => {
          if (data.errors) {
            this.error = data.errors;
          } else {
            this.$store.dispatch('login',data)
            .then(response => {
              console.log('component login response',response);
              this.$router.push({name:'home'});
            });
          }
        })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });

    },

    read () {
      this.toggleLoading ();
      API
        .getUsers()
        .then(data => {
          (data.errors)?this.error = data.errors:this.users = data;
        })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    remove (user) {
      this.toggleLoading ();
      API
        .removeUser(user)
        .then(data => {
          this.error = data.errors;
          this.read();
        })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

  },

  mounted () {
    this.read();
  },

}
</script>

<style scoped>

</style>
