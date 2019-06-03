<template>
  <div class="">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <div class="">
        {{order}}
      </div>

      <div class="">
        <h3>ORDER</h3>
        <button type="button" v-on:click="save()">save</button>
        <button type="button" v-on:click="remove()" v-if="(order.id)">delete</button>
        <router-link :to="{ name: 'order.list', params: {} }" tag="button">exit</router-link>
        <error v-bind:errors="error"/>
      </div>

      <div class="">
        <input type="text" v-model="order.id" disabled>
        <input type="text" v-model="order.order_status" disabled>
        <input type="text" v-model="order.order_date" disabled>
        <input type="text" v-model="order.order_num" autofocus>
      </div>

      <div class="">
        {{order.Account}}
        <accountpicker v-on:picked="pickAccount"/>
      </div>

      <div class="">
        {{order.Shipto}}
        <accountpicker v-on:picked="pickShipto"/>
      </div>

      <div class="">
        {{order.Billto}}
        <accountpicker v-on:picked="pickBillto"/>
      </div>

      <div class="">
        <input type="text" v-model="order.version" disabled>
        <input type="text" v-model="order.createdAt" disabled>
        <input type="text" v-model="order.updatedAt" disabled>
      </div>
      <div class="" v-if="order.UserId">
        {{order.User}}
      </div>

      <orderitems v-bind:parent="order" v-if="order.id"/>

    </div>
  </div>
</template>

<script>
import API from '@/api'
import error from '@/components/Error'
import accountpicker from '@/components/account/picker'
import orderitems from '@/components/orderitem/list'
export default {
  name: 'Order',

  components: {error,accountpicker,orderitems},

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
      console.log('comp order edit INIT');
      API
        .getNew('/order')
        .then(data => {
          console.log('comp order edit INIT data',data);
          if (data.errors) {
            this.error = data.errors;
          } else {
            this.order = data;
            this.order.UserId = this.$store.getters.getUser.id;
            console.log('comp order edit INIT order',this.order);
          }
        })
        .catch(error => {
          console.log('comp order edit INIT err',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    read (id) {
      console.log('comp order edit READ',id);
      this.toggleLoading();
      API
       .getDetail('/order',{detail: id})
       .then(data => {
          console.log('comp order edit READ data',data);
          (data.errors)?this.error = data.errors:this.order = data;
       })
       .catch(error => {
         console.log('comp order edit READ err',error);
         this.error = error;
       })
       .then(()=>{
         this.toggleLoading();
       });
    },

    save () {
      console.log('comp order edit SAVE',this.order);
      this.toggleLoading();
      API
        .saveDetail('/order',this.order)
        .then(data => {
          console.log('comp order edit SAVE data',data);
          (data.errors)?this.error = data.errors:this.order = data;
        })
        .catch(error => {
          console.log('comp order edit SAVE err',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    remove () {
      console.log('comp order edit REMOVE',this.order);
      this.toggleLoading();
      API
        .removeDetail('/order',this.order)
        .then(data => {
          console.log('comp order edit REMOVE data',data);
          this.$router.push({name: 'orders'});
        })
        .catch(error => {
          console.log('comp order edit REMOVE err',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    pickAccount (account) {
      this.order.AccountId = (account===undefined)?null:account.id;
      this.order.Account = (account===undefined)?null:account;
      this.$forceUpdate();
    },

    pickShipto (account) {
      this.order.ShiptoId = (account===undefined)?null:account.id;
      this.order.Shipto = (account===undefined)?null:account;
      this.$forceUpdate();
    },

    pickBillto (account) {
      this.order.BilltoId = (account===undefined)?null:account.id;
      this.order.Billto = (account===undefined)?null:account;
      this.$forceUpdate();
    },

  },

  mounted () {
    (!this.$route.params.orderid)?this.init():this.read(this.$route.params.orderid);
  },

}
</script>

<style scoped>

</style>
