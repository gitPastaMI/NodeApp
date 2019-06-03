<template>
  <div class="">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <div class="">
        <h3>DELIVERY GROUPS</h3>
        <router-link :to="{ name: 'delivery.group.add', params: {} }" tag="button"> + </router-link>
        <router-link :to="{ name: 'home', params: {} }" tag="button">exit</router-link>
        <error v-bind:errors="error"/>
      </div>

      <div class="" v-for="group in groups">
        {{group}}
      </div>
      <div class="" v-if="(groups) && (groups.length===0)">
        NO DATA FOUND
      </div>
    </div>

  </div>
</template>

<script>
import API from '@/api'
import error from '@/components/Error'
export default {
  name: 'DeliveryGroups',
  components:{error},
  data () {
    return {
      error: null,
      groups: null,
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
      console.log('comp group list read');
      this.toggleLoading();
      API
        .getList('/delivery/groups',{owner:this.$store.getters.getUser.id, page:0})
        .then(data => {
          console.log('comp group list read data',data);
          (data.errors)?this.error = data.errors:this.groups = data;
        })
        .catch(error => {
          console.log('comp group list read error',error);
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
