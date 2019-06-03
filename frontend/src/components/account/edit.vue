<template>
  <div class="">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>

      <div class="">
        <h3>ACCOUNT</h3>
        <button type="button" v-on:click="save()">save</button>
        <button type="button" v-on:click="remove()" v-if="(account.id)">delete</button>
        <router-link :to="{ name: 'account.list', params: {} }" tag="button">exit</router-link>
        <error v-bind:errors="error"/>
      </div>

      <div class="">
        <input type="text" v-model="account.id" disabled>
        <input type="text" v-model="account.description" autofocus placeholder="description">
      </div>
      <div class="">
        <input type="text" v-model="account.address" placeholder="address">
        <input type="text" v-model="account.location" placeholder="location">
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

      <div class="">
        {{account}}
      </div>

    </div>
  </div>
</template>

<script>
// import API from '@/service/accounts'
import API from '@/api'
import error from '@/components/Error'
export default {
  name: 'Account',

  components:{error},

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
      console.log('comp account edit INIT');
      API
        // .getInitAccount()
        .getNew('/account')
        .then(data => {
          console.log('comp account edit INIT data',data);
          if (data.errors) {
            this.error = data.errors;
          } else {
            this.account = data;
            this.account.UserId = this.$store.getters.getUser.id;
            console.log('comp account edit INIT account',this.account);
          }
        })
        .catch(error => {
          console.log('comp account edit INIT err',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    read (id) {
      console.log('comp account edit READ',id);
      this.toggleLoading();
      API
       // .getAccount(id)
       .getDetail('/account',{detail: id})
       .then(data => {
          console.log('comp account edit READ data',data);
          (data.errors)?this.error = data.errors:this.account = data;
       })
       .catch(error => {
         console.log('comp account edit READ err',error);
         this.error = error;
       })
       .then(()=>{
         this.toggleLoading();
       });
    },

    save () {
      console.log('comp account edit SAVE',this.account);
      this.toggleLoading();
      API
        // .saveAccount(this.account)
        .saveDetail('/account',this.account)
        .then(data => {
          console.log('comp account edit SAVE data',data);
          (data.errors)?this.error = data.errors:this.account = data;
        })
        .catch(error => {
          console.log('comp account edit SAVE err',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    remove () {
      console.log('comp account edit REMOVE',this.account);
      this.toggleLoading();
      API
        // .removeAccount(this.account)
        .removeDetail('/account',this.account)
        .then(data => {
          console.log('comp account edit REMOVE data',data);
          this.$router.push({name: 'accounts'});
        })
        .catch(error => {
          console.log('comp account edit REMOVE err',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

  },

  mounted () {
    (!this.$route.params.accountid)?this.init():this.read(this.$route.params.accountid);
  },

}
</script>

<style scoped>

</style>
