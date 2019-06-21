<template>
  <div class="">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>

      <div class="">
        <h3>DELIVERY</h3>
        <!-- <router-link :to="{ name: 'delivery.group.detail', params: {groupid: delivery.DeliveryGroupId} }" tag="button">exit</router-link> -->
        <error v-bind:errors="error"/>
      </div>

      <div class="">
        {{delivery}}
      </div>

    </div>
  </div>
</template>

<script>
import API from '@/api'
import error from '@/components/Error'
export default {
  name: 'Delivery',

  components:{error},

  data () {
    return {
      error: null,
      delivery: {},
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

    read (id) {
      console.log('comp delivery edit READ',id);
      this.toggleLoading();
      API
       .getDetail('/delivery',{detail: id})
       .then(data => {
          console.log('comp delivery edit READ data',data);
          (data.errors)?this.error = data.errors:this.delivery = data;
       })
       .catch(error => {
         console.log('comp delivery edit READ err',error);
         this.error = error;
       })
       .then(()=>{
         this.toggleLoading();
       });
    },
  },

  mounted () {
    this.read(this.$route.params.deliveryid);
  },

}
</script>

<style scoped>

</style>
