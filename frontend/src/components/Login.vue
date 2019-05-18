<template>
  <div class="loginComponent" v-bind:class="{ disabled: isDisabled }">
    <h1>LOGIN</h1>
    <div class="">
      <img src="../assets/logo.png">
    </div>
    <div class="">
      <input type="text" v-model="credentials.username" autofocus>
      <input type="password" v-model="credentials.password">
      <button type="button" v-on:click="login()">Login</button>
      <button type="button" v-on:click="register()">Register</button>
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
      error: null,
      users: null,
      isDisabled: false,
    }
  },

  methods:{
    register () {
      this.toggleDisabled ();

      API
        .register(this.credentials)
        .then(data => {
            this.user = data;
            this.toggleDisabled ();

            this.read();
          })
        .catch(error => {
          this.error = API.handleError(error);
          this.toggleDisabled ();

          // if (error.response.status===418) {
          //   console.log('component register error 6',error.response.data);
          //   this.error = error.response.data;
          // } else {
          //   console.log('component register error 6',error);
          //   this.error = error;
          // }
        });
    },

    login () {
      this.toggleDisabled ();
      API
        .login(this.credentials)
        .then(data => {
          this.$store.dispatch('login',data)
            .then(response => {
              this.$router.push({name:'home'});
            });
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleDisabled();
        });

    },

    read () {
      this.toggleDisabled ();
      API
        .getUsers()
        .then(data => {
          this.users = data;
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleDisabled();
        });
    },

    remove (user) {
      this.toggleDisabled ();
      API
        .removeUser(user)
        .then(data => {
          this.read();
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleDisabled();
        });
    },

    toggleDisabled () {
      this.isDisabled = !this.isDisabled;
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
