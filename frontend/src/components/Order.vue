<template>
  <div class="orderComponent">
    <h1>ORDER</h1>
    <div class="">
      <button type="button" v-on:click="save()">save</button>
      <button type="button" v-on:click="exit()">exit</button>
    </div>

    <div class="">
      {{error}}
    </div>

    <div class="">
      {{order}}
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
      order: null,
    }
  },
  methods:{
    init () {
      API
        .getInitOrder()
        .then(data => {
          this.order = data;
        })
        .catch(error => {
          this.error = API.handleError(error);
        });
    },

    read () {
      console.log('read');
      // API
      //   .getOrder()
      //   .then(data => {
      //     this.order = data;
      //   })
      //   .catch(error => {
      //     this.error = API.handleError(error);
      //   });
    },

    save () {
      API
        .saveOrder(this.order)
        .then(data => {
          this.order = data;
        })
        .catch(error => {
          this.error = API.handleError(error);
        });
    },

    exit () {
      this.$router.go(-1);
    },

  },

  mounted () {
    console.log(this.$route.params.id);
    (this.$route.params.id)?this.read():this.init();
  },

}
</script>

<style scoped>

</style>
