<template>
  <span class="">
    <button type="button" v-if="!showModal" v-on:click="show(true)">S</button>
    <button type="button" v-if="!showModal" v-on:click="pick()">U</button>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <div class="" v-if="isLoading()">
          <h1>Loading...</h1>
        </div>
        <div class="" v-else>
          <button type="button" class="close" v-on:click="show(false)">X</button>
          <h1>PICKER</h1>
          <error v-bind:errors="error"/>
          <input type="text" v-model="filter" placeholder="Insert text to find ..." autofocus size="50">
          <button type="button" v-on:click="search()">Search</button>
          <div class="" v-for="item in items" v-on:click="pick(item)">
            {{item}}
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import API from '@/api'
import error from '@/components/Error'
export default {
  name: 'Picker',
  components:{error},
  data () {
    return {
      showModal: false,
      loading: false,
      filter: null,
      items: null,
      error: null,
    }
  },

  methods:{
    toggleLoading () {
      this.loading = !this.loading;
    },
    isLoading () {
      return this.loading;
    },

    init () {
      this.filter = null;
      this.items = null;
    },
    show (value) {
      this.showModal = value;
    },
    search () {
      this.toggleLoading();
      API
       // .search(this.filter)
       .getList('/accounts',{filter: this.filter, owner:this.$store.getters.getUser.id, page:0})
       .then(data => {
        (data.errors)?this.error = data.errors:this.items = data;
       })
       .catch(error => {
         this.error = error;
       })
       .then(()=>{
         this.toggleLoading();
       });
    },
    pick (item) {
      this.$emit('picked',item);
      this.showModal = false;
    },
  },

  mounted () {
    this.init();
  },

}
</script>

<style scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0,0,0,0.5); /* Black w/ opacity */
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
}

.close {
  float: right;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
