<template>
  <div class="">
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <h3>DELIVERY GROUP</h3>
      <error v-bind:errors="error"/>
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
      group: null,
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
          console.log('comp delivery detail data',data);
          (data.errors)?this.error = data.errors:this.group = data;
        })
        .catch(error => {
          console.log('comp delivery detail error',error);
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
