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
        <button type="button" v-on:click="add()">add</button>
        <button type="button" v-on:click="exit()">exit</button>
        <error v-bind:errors="error"/>
      </div>

      <div class="" v-for="account in accounts" v-on:click="edit(account)">
        {{account}}
      </div>
    </div>

  </div>
</template>

<script>
import API from '@/service/accounts'
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
      this.toggleLoading();
      API
        .getAccounts()
        .then(data => {
          (data.errors)?this.error = data.errors:this.accounts = data;
        })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    search () {
      if (this.filter) {
        this.toggleLoading();
        API
        .search(this.filter)
        .then(data => {
          (data.errors)?this.error = data.errors:this.accounts = data;
        })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
      } else {
        this.read();
      }
    },

    add () {
      this.$router.push({name: 'accountnew'});
    },

    edit (account) {
      this.$router.push({name: 'accountedit', params:{accountid:account.id}});
    },

    exit () {
      this.$router.push({name: 'home'});
    },

  },

  mounted () {
    this.read();
  },

}
</script>

<style scoped>

</style>
