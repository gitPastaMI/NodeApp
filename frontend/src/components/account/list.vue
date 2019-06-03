<template>
  <div class="">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <div class="">
        <h3>ACCOUNTS</h3>
        <input type="text" v-model="filter" placeholder="Insert text to find ..." autofocus size="50">
        <button type="button" v-on:click="search()">search</button>
        <router-link :to="{ name: 'account.new', params: {} }" tag="button">add</router-link>
        <router-link :to="{ name: 'home', params: {} }" tag="button">exit</router-link>
        <error v-bind:errors="error"/>
      </div>

      <router-link v-for="account in accounts" v-bind:key="account.id" :to="{ name: 'account.edit', params: {accountid:account.id} }" tag="div">
        {{account}}
      </router-link>
      <div class="" v-if="(accounts) && (accounts.length===0)">
        NO DATA FOUND
      </div>
    </div>

  </div>
</template>

<script>
import API from '@/api'
import error from '@/components/Error'
export default {
  name: 'Accounts',
  components:{error},
  data () {
    return {
      loading: false,
      error: null,
      accounts: null,
      filter: null,
    }
  },

  methods:{
    toggleLoading () {
      this.loading = !this.loading;
    },
    isLoading () {
      return this.loading;
    },

    read () {
      console.log('comp account list read getAccounts');
      this.toggleLoading();
      API
        .getList('/accounts',{owner:this.$store.getters.getUser.id, page:0})
        .then(data => {
          console.log('comp account list read data',data);
          (data.errors)?this.error = data.errors:this.accounts = data;
        })
        .catch(error => {
          console.log('comp account list read error',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    search () {
      console.log('comp account list search');
      if (this.filter) {
        console.log('comp account list search',this.filter);
        this.toggleLoading();
        API
        // .search(this.filter)
        .getList('/accounts',{filter: this.filter, owner:this.$store.getters.getUser.id, page:0})
        .then(data => {
          console.log('comp account list search data',data);
          (data.errors)?this.error = data.errors:this.accounts = data;
        })
        .catch(error => {
          console.log('comp account list search err',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
      } else {
        this.read();
      }
    },

  },

  mounted () {
    this.read();
  },

}
</script>

<style scoped>

</style>
