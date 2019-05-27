<template>
  <div class="">
    <!--<button type="button" v-if="!showModal" v-on:click="showModal = true">{{label}}</button>-->
    <!--<div class="modal" v-if="showModal">
      <div class="modal-content">-->

        <div class="" v-if="isLoading()">
          <h1>Loading...</h1>
        </div>
        <div class="" v-else>
          <h3>ITEM</h3>
          <div class="">
            <button type="button" v-on:click="save()">save</button>
            <button type="button" v-on:click="remove()" v-if="(item.id)">delete</button>
            <button type="button" v-on:click="exit()">exit</button>
          </div>

          <div class="">
            {{error}}
          </div>

          <div class="">
            {{item}}
          </div>

          <div class="">
            <input type="text" v-model="item.id" disabled>
          </div>
          <div class="">
            <input type="text" v-model="item.status" disabled>
          </div>
          <div class="">
            <input type="text" v-model="item.description" autofocus>
          </div>
          <div class="">
            <input type="text" v-model="item.qty">
          </div>
          <div class="">
            <input type="text" v-model="item.unit_price">
          </div>
          <div class="">
            <input type="text" v-bind="item.total_price" disabled>
          </div>
          <div class="">
            <input type="text" v-bind="total_price" disabled>
          </div>

          <div class="">
            <input type="text" v-model="item.version" disabled>
            <input type="text" v-model="item.createdAt" disabled>
            <input type="text" v-model="item.updatedAt" disabled>
            <input type="text" v-model="item.UserId" disabled>
            <input type="text" v-model="item.OrderId" disabled>
          </div>

          <div class="">
            {{item.User}}
          </div>

        </div>
      <!--</div>
    </div>-->
  </div>
</template>

<script>
import API from '@/service/orders'
export default {
  name: 'ItemModal',

  props: ['parent','item'],

  data () {
    return {
      // showModal: true,
      error: null,
      loading: false,
    }
  },

  computed: {
    total_price: () => {
      return this.item?this.item.qty * this.item.unitprice:0;
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
      console.log('orderitem init');
      /*this.toggleLoading();
      API
        .getInitItem()
        .then(data => {
          this.item = data;
          this.item.UserId = this.$store.getters.getUser.id;
          this.item.OrderId = this.parent;
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });*/
    },

    read () {
      console.log('orderitem read');
    },

    /*save () {
      this.toggleLoading();
      API
        .saveItem(this.item)
        .then(data => {
          this.item = data;
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });
    },*/

    /*remove () {
      this.toggleLoading();
      API
        .removeItem(this.order)
        .then(data => {
          this.$router.push(this.callerRoute);
        })
        .catch(error => {
          this.error = API.handleError(error);
        })
        .then(()=>{
          this.toggleLoading();
        });
    },*/

    exit () {
      this.showModal = false;
    },

  },

  mounted () {
    console.log('orderitem mounted',this.parent,this.item);
    (this.item===undefined)?this.init():this.read();
//    (!this.$route.params.id)?this.init():this.read(this.$route.params.id);
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
  margin: 10% auto; /* 15% from the top and centered */
  padding: 15px;
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
