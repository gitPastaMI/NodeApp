<template>
  <div class="formContainer">
    <div class="gridCenterd" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="gridCentered shadowed" v-else>

      <div class="">
        <h3>ACCOUNT</h3>
        <button type="button" v-on:click="save()">save</button>
        <button type="button" v-on:click="remove()" v-if="(account.id)">delete</button>
        <button type="button" v-on:click="exit()">exit</button>
        <button type="button" v-on:click="getOrders()" v-if="account.id">orders</button>
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
import API from '@/service/accounts'
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
      API
        .getInitAccount()
        .then(data => {
          if (data.errors) {
            this.error = data.errors;
          } else {
            this.account = data;
            this.account.UserId = this.$store.getters.getUser.id;
          }
        })
        .catch(error => {
          this.error = error;
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
          (data.errors)?this.error = data.errors:this.account = data;
       })
       .catch(error => {
         this.error = error;
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
          (data.errors)?this.error = data.errors:this.account = data;
        })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    remove () {
      this.toggleLoading();
      API
        .removeAccount(this.account)
        .then(data => {
          this.$router.push({name: 'accounts'});
        })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    exit () {
      this.$router.push({name: 'accounts'});
    },

    getOrders () {
      console.log('account component getorders');
    },

  },

  mounted () {
    (!this.$route.params.accountid)?this.init():this.read(this.$route.params.accountid);
  },

}
</script>

<style scoped>
.shadowed {
  border:thin solid;
  border-color: LightSeaGreen 	 	;
  box-shadow: 15px 15px 5px  CadetBlue	 	;
}
</style>
