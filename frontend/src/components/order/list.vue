<template>
  <div class="">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <div class="">
        <h3>ORDERS</h3>
        <router-link :to="{ name: 'order.new', params: {} }" tag="button">add</router-link>
        <router-link :to="{ name: 'home', params: {} }" tag="button">exit</router-link>
        <error v-bind:errors="error"/>
      </div>

      <router-link v-for="order in orders" v-bind:key="order.id" :to="{ name: 'order.edit', params: {orderid:order.id} }" tag="div">
        {{order}}
      </router-link>
      <div class="" v-if="(orders) && (orders.length===0)">
        NO DATA FOUND
      </div>
    </div>

  </div>
</template>

<script>
import API from '@/api'
import error from '@/components/Error'
export default {
  name: 'Orders',
  components:{error},
  data () {
    return {
      error: null,
      orders: null,
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

    read () {
      console.log('comp order list read');
      this.toggleLoading();
      API
        .getList('/orders',{owner:this.$store.getters.getUser.id, page:0})
        .then(data => {
          console.log('comp order list read data',data);
          (data.errors)?this.error = data.errors:this.orders = data;
        })
        .catch(error => {
          console.log('comp order list read error',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

  },

  mounted () {
    this.read();
  },

}
</script>

<style scoped>
.open {
  background: yellow;
}
</style>
