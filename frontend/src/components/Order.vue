<template>
  <div class="orderComponent">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <h3>ORDER</h3>
      <h1>{{order.order_num}}</h1>
      <div class="">
        <button type="button" v-on:click="save()">save</button>
        <button type="button" v-on:click="remove()" v-if="(order.id)">delete</button>
        <button type="button" v-on:click="exit()">exit</button>
      </div>

      <div class="">
        {{error}}
      </div>

      <div class="">
        {{order}}
      </div>

      <div class="">
        <input type="text" v-model="order.id" disabled>
        <input type="text" v-model="order.order_status" disabled>
        <input type="text" v-model="order.order_date" disabled>
      </div>

      <div class="">
        <input type="text" v-model="order.order_num" autofocus>
      </div>

      <div class="">
        {{order.Account}}
        <accountPicker v-on:picked="setAccount"/>
        <button type="button" v-on:click="unsetAccount">X</button>
      </div>

      <div class="">
        {{order.Shipto}}
      </div>

      <div class="">
        {{order.Billto}}
      </div>

      <div class="">
        <input type="text" v-model="order.version" disabled>
        <input type="text" v-model="order.createdAt" disabled>
        <input type="text" v-model="order.updatedAt" disabled>
      </div>
      <div class="" v-if="order.UserId">
        {{order.User}}
      </div>

      <button type="button" v-on:click="add()">add</button>
      <div class="" v-for="item in order.items" v-on:click="edit(item)">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
import OrdersAPI from '@/service/orders'
import accountPicker from './account/Picker'
export default {
  name: 'Order',

  components: {accountPicker},

  data () {
    return {
      error: null,
      order: {},
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
      OrdersAPI
        .getInitOrder()
        .then(data => {
          this.order = data;
          this.order.UserId = this.$store.getters.getUser.id;
        })
        .catch(error => {
          this.error = OrdersAPI.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    read (id) {
      this.toggleLoading();
      OrdersAPI
       .getOrder(id)
       .then(data => {
         this.order = data;
       })
       .catch(error => {
         this.error = OrdersAPI.handleError(error);
       })
       .then(()=>{
         this.toggleLoading();
       });
    },

    save () {
      this.toggleLoading();
      OrdersAPI
        .saveOrder(this.order)
        .then(data => {
          this.order = data;
        })
        .catch(error => {
          this.error = OrdersAPI.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    remove () {
      this.toggleLoading();
      OrdersAPI
        .removeOrder(this.order)
        .then(data => {
          this.$router.push({name: 'orders'});
        })
        .catch(error => {
          this.error = OrdersAPI.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    setAccount (account) {
      this.order.AccountId = account.id;
      this.order.Account = account;
      console.log('setaccount',this.order.AccountId,this.order.Account);
    },
    unsetAccount (account) {
      this.order.AccountId = null;
      this.order.Account = null;
    },

    add() {
      this.toggleLoading();
      console.log('add');
      this.toggleLoading();
    },

    edit() {
      this.toggleLoading();
      console.log('edit');
      this.toggleLoading();
    },

    exit () {
      this.$router.push({name: 'orders'});
    },

  },

  mounted () {
    (!this.$route.params.id)?this.init():this.read(this.$route.params.id);
  },

}
</script>

<style scoped>

</style>
