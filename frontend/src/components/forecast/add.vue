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
  name: 'DeliveryForecast',
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
        .getList('/forecast',{page:0})
        .then(data => {
          console.log('comp forecast add read data',data);
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
      let forecast = {
        key:this.$store.getters.getUser.id+'-'+new Date().valueOf(),
        userid:this.$store.getters.getUser.id,
        products: []
      };
      console.log('comp forecast add forecast',forecast);
      console.log('comp forecast add products',this.products);
      this.products.forEach((item) => {
        // if (item.confirmed) {
          forecast.products.push({
            key: item.product_key,
            qty: 10// item.qty
          });
        // }
      });
      console.log('comp forecast add savebulk forecast',forecast);
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
