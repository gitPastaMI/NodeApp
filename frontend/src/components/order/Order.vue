<template>
  <div class="formContainer">
    <div class="gridCenterd" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="gridCenterd" v-else>
      <div class="">
        {{order}}
      </div>

      <div class="">
        <h3>ORDER</h3>
        <button type="button" v-on:click="save()">save</button>
        <button type="button" v-on:click="remove()" v-if="(order.id)">delete</button>
        <button type="button" v-on:click="exit()">exit</button>
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

      <h3>ITEMS</h3>
      <router-view v-on:itemsaved="readitems(order.id)"/>
      <button type="button" v-on:click="add()">+</button>
      <div class="" v-if="items.length === 0">
        No items found
      </div>
      <div class="" v-else v-for="item in items" v-on:click="edit(item.id)">
        {{item}}
      </div>

    </div>
  </div>
</template>

<script>
import API from '@/service/orders'
import accountpicker from '@/components/account/Picker'
import error from '@/components/Error'
export default {
  name: 'Order',

  components: {accountpicker,error},

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
          if (data.errors) {
            this.error = data.errors;
          } else {
            this.order = data;
            this.order.UserId = this.$store.getters.getUser.id;
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
       .getOrder(id)
       .then(data => {
         if (data.errors) {
           this.error = data.errors;
         } else {
           this.order = data;
           this.readitems(this.order.id);
         }
       })
       .catch(error => {
         this.error = error;
       })
       .then(()=>{
         this.toggleLoading();
       });
    },

    readitems (orderid) {
      this.toggleLoading();
      API
       .getItems(orderid)
       .then(data => {
         if (data.length!==0) {
           this.items = data;
         }
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
        .saveOrder(this.order)
        .then(data => {
          (data.errors)?this.error = data.errors:this.order = data;
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
        .removeOrder(this.order)
        .then(data => {
          this.$router.push({name: 'orders'});
        })
        .catch(error => {
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

    add () {
      this.$router.push({name: 'orderitemnew'});
    },
    edit (id) {
      this.$router.push({name: 'orderitemedit', params: {itemid: id}});
    },

    exit () {
      this.$router.push({name: 'orders'});
    },

  },

  mounted () {
    (!this.$route.params.orderid)?this.init():this.read(this.$route.params.orderid);
  },

}
</script>

<style scoped>

</style>
