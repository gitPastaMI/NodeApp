<template>
  <div class="">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <div class="">
        <h3>DELIVERY FORECAST</h3>
        <router-link :to="{ name: 'home', params: {} }" tag="button">exit</router-link>
        <button type="button" v-on:click="create()">create</button>
        <error v-bind:errors="error"/>
      </div>
      <div class="" v-for="product in products">
        {{product}}
        <input type="text" v-model="product.description" disabled>
        <input type="text" v-model="product.total" size=5 disabled>
        <input type="text" v-model="product.qty" size=5>
        <input type="checkbox" v-model="product.confirmed">
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'
import error from '@/components/Error'
export default {
  name: 'DeliveryGroup',
  components:{error},
  data () {
    return {
      error: null,
      loading: false,
      products: null,
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
      console.log('comp group add read');
      this.toggleLoading();
      API
        .getList('/delivery/extract',{page:0})
        .then(data => {
          console.log('comp group add read data',data);
          (data.errors)?this.error = data.errors:this.products = data;
          this.products.forEach(function(element) {
            element.qty = element.total;
            element.confirmed = false;
          });
          console.log('products manipolated',this.products);
        })
        .catch(error => {
          console.log('comp group add read error',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    create () {
      this.toggleLoading();
      let forecast = [];
      this.products.forEach((product) => {
        if (product.confirmed) {
          // forecast.push(product);
          forecast.push({
            forecast_hatkey: this.$store.getters.getUser.id+'-'+new Date().valueOf(),
            forecast_product_key: product.product_key,
            forecast_qty: product.qty,
            UserId: this.$store.getters.getUser.id
          });
        }
      });
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log(forecast);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      API
      .saveBulk('/forecast',{forecast})
      .then(data => {
        if (data.errors) {
          this.error = data.errors;
        } else {
          this.$router.push({name: 'delivery.group.list'});
        }
      })
      .catch(error => {
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

</style>
