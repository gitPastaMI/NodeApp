<template>
  <div class="">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <h3>DELIVERY GROUP</h3>
      <router-link :to="{ name: 'delivery.group.list', params: {} }" tag="button">exit</router-link>
      <error v-bind:errors="error"/>
      <div class="">
        {{group}}
      </div>
      <div class="">
        {{group.User}}
      </div>
      <router-link v-for="delivery in group.Deliveries" v-bind:key="delivery.id" :to="{ name: 'delivery.detail', params: {deliveryid:delivery.id} }" tag="div">
        {{delivery}}
      </router-link>
      <div class="" v-if="(group.Deliveries) && (group.Deliveries.length===0)">
        NO DATA FOUND
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
      group: {},
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
      console.log('comp delivery detail read');
      this.toggleLoading();
      API
        .getDetail('/delivery/group',{detail: id})
        .then(data => {
          console.log('comp group detail data',data);
          (data.errors)?this.error = data.errors:this.group = data;
        })
        .catch(error => {
          console.log('comp group detail error',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

  },

  mounted () {
    this.read(this.$route.params.groupid)
  },
}
</script>

<style scoped>

</style>
