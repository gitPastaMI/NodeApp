<template>
  <div class="ordersComponent">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
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

  </div>
</template>

<script>
// import API from '@/service'
import API from '@/service/orders'
export default {
  name: 'Orders',
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
      this.toggleLoading();
      API
        .getOrders()
        .then(data => {
          this.orders = data;
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    add () {
      this.$router.push({name: 'ordernew'});
    },

    edit (order) {
      this.$router.push({name: 'orderedit', params:{id:order.id}});
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
