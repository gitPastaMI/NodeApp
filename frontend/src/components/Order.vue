<template>
  <div class="orderComponent" v-bind:class="{ disabled: isDisabled }">
    <h1>ORDER</h1>
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
      <input type="text" v-model="order.order_num">
    </div>

    <div class="">
      <input type="text" v-model="order.version" disabled>
      <input type="text" v-model="order.createdAt" disabled>
      <input type="text" v-model="order.updatedAt" disabled>
    </div>

  </div>
</template>

<script>
import API from '@/service'
export default {
  name: 'Order',
  data () {
    return {
      error: null,
      order: {},
      isDisabled: false,
    }
  },
  methods:{
    init () {
      this.toggleDisabled();
      API
        .getInitOrder()
        .then(data => {
          this.order = data;
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleDisabled();
        });
    },

    read (id) {
      this.toggleDisabled();
      API
       .getOrder(id)
       .then(data => {
         this.order = data;
       })
       .catch(error => {
         this.error = API.handleError(error);
       })
       .then(()=>{
         this.toggleDisabled();
       });
    },

    save () {
      this.toggleDisabled();
      API
        .saveOrder(this.order,this.$store.getters.getUser)
        .then(data => {
          this.order = data;
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleDisabled();
        });
    },

    remove () {
      this.toggleDisabled();
      API
        .removeOrder(this.order)
        .then(data => {
          this.$router.push({name: 'orders'});
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleDisabled();
        });
    },

    exit () {
      this.$router.push({name: 'orders'});
    },

    toggleDisabled () {
      this.isDisabled = !this.isDisabled;
    },

  },

  mounted () {
    (!this.$route.params.id)?this.init():this.read(this.$route.params.id);
  },

}
</script>

<style scoped>

</style>
