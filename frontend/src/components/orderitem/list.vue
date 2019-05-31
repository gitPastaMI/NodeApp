<template>
  <div class="">
    <router-view v-on:refresh="read()"></router-view>
    <div class="" v-if="isLoading()">
      <h1>Loading...</h1>
    </div>
    <div class="" v-else>
      <div class="">
        <h3>ITEMS</h3>
        <button type="button" v-on:click="add()">add</button>
        <error v-bind:errors="error"/>
      </div>
      <div class="" v-for="item in items" v-on:click="edit(item)">
        {{item}}
      </div>
      <div class="" v-if="(items) && (items.length===0)">
        NO DATA FOUND
      </div>
    </div>

  </div>
</template>

<script>
import API from '@/api'
import error from '@/components/Error'
export default {
  name: 'Items',
  components:{error},
  props: ['parent'],
  data () {
    return {
      error: null,
      items: null,
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
      console.log('comp orderitem list read',this.parent);
      this.toggleLoading();
      API
        .getList('/items',{owner:this.$store.getters.getUser.id, parent: this.parent.id, page:0})
        .then(data => {
          console.log('comp orderitem list read data',data);
          (data.errors)?this.error = data.errors:this.items = data;
        })
        .catch(error => {
          console.log('comp orderitem list read error',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    add () {
      console.log();
      this.$router.push({name: 'item.new', params: {parent: this.parent.id}});
    },

    edit (item) {
      this.$router.push({name: 'item.edit', params: {itemid: item.id}});
    },

  },

  mounted () {
    this.read();
  },

}
</script>

<style scoped>

</style>
