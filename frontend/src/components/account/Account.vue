<template>
  <div class="accountComponent">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <h3>ACCOUNT</h3>
      <div class="">
        <button type="button" v-on:click="save()">save</button>
        <button type="button" v-on:click="remove()" v-if="(account.id)">delete</button>
        <button type="button" v-on:click="exit()">exit</button>
      </div>

      <div class="">
        {{error}}
      </div>

      <div class="">
        {{account}}
      </div>

      <div class="">
        <input type="text" v-model="account.id" disabled>
      </div>
      <div class="">
        <input type="text" v-model="account.description" autofocus>
      </div>
      <div class="">
        <input type="text" v-model="account.address">
      </div>
      <div class="">
        <input type="text" v-model="account.location" >
      </div>

      <div class="">
        <input type="text" v-model="account.version" disabled>
        <input type="text" v-model="account.createdAt" disabled>
        <input type="text" v-model="account.updatedAt" disabled>
        <input type="text" v-model="account.UserId" disabled>
      </div>

      <div class="">
        {{account.User}}
      </div>

    </div>
  </div>
</template>

<script>
import API from '@/service/accounts'
export default {
  name: 'Account',

  props: ['callerRoute'],

  data () {
    return {
      error: null,
      account: {},
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

    init () {
      this.toggleLoading();
      API
        .getInitAccount()
        .then(data => {
          this.account = data;
          this.account.UserId = this.$store.getters.getUser.id;
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    read (id) {
      this.toggleLoading();
      API
       .getAccount(id)
       .then(data => {
         this.account = data;
       })
       .catch(error => {
         this.error = API.handleError(error);
       })
       .then(()=>{
         this.toggleLoading();
       });
    },

    save () {
      this.toggleLoading();
      API
        .saveAccount(this.account)
        .then(data => {
          this.account = data;
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    remove () {
      this.toggleLoading();
      API
        .removeAccount(this.order)
        .then(data => {
          this.$router.push({name: 'accounts'});
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    exit () {
      this.$router.push(this.callerRoute);
    },

  },

  mounted () {
    (!this.$route.params.id)?this.init():this.read(this.$route.params.id);
  },

}
</script>

<style scoped>

</style>
