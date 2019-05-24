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
        <input type="text" v-model="order.order_num" autofocus>
      </div>

      <div class="">
        {{order.Account}}
        <!-- <accountPicker v-on:picked="setAccount" v-bind:id="order.AccountId"/> -->
        <accountPicker v-on:picked="setAccount"/>
        <button type="button" v-on:click="unsetAccount">X</button>
      </div>

      <div class="">
        {{order.Shipto}}
        <!-- <accountPicker v-on:picked="setShipto" v-bind:id="order.ShiptoId"/> -->
        <accountPicker v-on:picked="setShipto"/>
        <button type="button" v-on:click="unsetShipto">X</button>
      </div>

      <div class="">
        {{order.Billto}}
        <accountPicker v-on:picked="setBillto"/>
        <button type="button" v-on:click="unsetBillto">X</button>
      </div>

      <div class="">
        <input type="text" v-model="order.version" disabled>
        <input type="text" v-model="order.createdAt" disabled>
        <input type="text" v-model="order.updatedAt" disabled>
      </div>
      <div class="" v-if="order.UserId">
        {{order.User}}
      </div>

      <div class="">
        <h3>ITEMS</h3>
        <button type="button" v-on:click="add()">add</button>
        <div class="" v-for="item in items" v-on:click="edit(item)">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/service/orders'
import accountPicker from '../account/Picker'
export default {
  name: 'Order',

  components: {accountPicker},

  data () {
    return {
      error: null,
      order: {},
      items: {},
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
        .getInitOrder()
        .then(data => {
          this.order = data;
          this.order.UserId = this.$store.getters.getUser.id;
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
       .getOrder(id)
       .then(data => {
         this.order = data;
         this.readItems();
       })
       .catch(error => {
         this.error = API.handleError(error);
       })
       .then(()=>{
         this.toggleLoading();
       });
    },

    readItems () {
      this.toggleLoading();
      API
       .getItems(this.order.id)
       .then(data => {
         this.items = data;
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
        .saveOrder(this.order)
        .then(data => {
          this.order = data;
          // this.read(data.id);
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
        .removeOrder(this.order)
        .then(data => {
          this.$router.push({name: 'orders'});
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    setAccount (account) {
      this.order.AccountId = account.id;
      this.order.Account = account;
      this.$forceUpdate();
    },
    unsetAccount () {
      this.order.AccountId = null;
      this.order.Account = null;
      this.$forceUpdate();
    },
    setShipto (account) {
      this.order.ShiptoId = account.id;
      this.order.Shipto = account;
      this.$forceUpdate();
    },
    unsetShipto () {
      this.order.ShiptoId = null;
      this.order.Shipto = null;
      this.$forceUpdate();
    },
    setBillto (account,id,obj) {
      this.order.BilltoId = account.id;
      this.order.Billto = account;
      this.$forceUpdate();
    },
    unsetBillto (id,obj) {
      this.order.BilltoId = null;
      this.order.Billto = null;
      this.$forceUpdate();
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
