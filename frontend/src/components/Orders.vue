<template>
  <div class="ordersComponent">
    <h1>ORDERS</h1>

    <div class="">
      <button type="button" v-on:click="add()">add</button>
      <button type="button" v-on:click="exit()">exit</button>
    </div>

    <div class="">
      {{error}}
    </div>

    <div class="" v-for="order in orders" v-on:click="edit(order)">
      {{order}}
    </div>

  </div>
</template>

<script>
import API from '@/service'
export default {
  name: 'Orders',
  data () {
    return {
      error: null,
      orders: null,
    }
  },

  methods:{
    read () {
      API
        .getOrders()
        .then(data => {
          this.orders = data;
        })
        .catch(error => {
          this.error = API.handleError(error);
        });
    },

    add () {
      this.$router.push({name: 'ordernew'});
    },

    edit (order) {
      this.$router.push({name: 'orderedit', id:order.id});
    },

    exit () {
      this.$router.go(-1);
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
