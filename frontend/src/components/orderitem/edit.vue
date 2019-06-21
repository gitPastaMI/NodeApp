<template>
  <div class="">
    <!--<button type="button" v-if="!showModal" v-on:click="showModal = true">{{label}}</button>-->
    <div class="modal" v-if="showModal">
      <div class="modal-content">

        <div class="" v-if="isLoading()">
          <h1>Loading...</h1>
        </div>
        <div class="" v-else>

          <div class="">
            {{item}}
          </div>

          <div class="">
            <h3>ITEM</h3>
            <button type="button" v-on:click="save()">save</button>
            <button type="button" v-on:click="remove()" v-if="(item.id)">delete</button>
            <button type="button" v-on:click="exit()">exit</button>
            <error v-bind:errors="error"/>
          </div>

          <div class="">
            <input type="text" v-model="item.id" disabled>
            <input type="text" v-model="item.status" disabled>
          </div>
          <div class="">
            <input type="text" v-model="item.product_key" autofocus>
            <input type="text" v-model="item.qty">
            <input type="text" v-model="item.unit_weight">
            <input type="text" v-model="item.total_wheight" disabled>
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
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'
import error from '@/components/Error'
export default {
  name: 'Item',
  components:{error},
  props: ['parent'],
  data () {
    return {
      showModal: true,
      item: {},
      error: null,
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

    init () {
      this.toggleLoading();
      console.log('comp item edit INIT');
      API
        .getNew('/item')
        .then(data => {
          console.log('comp item edit INIT data',data);
          if (data.errors) {
            this.error = data.errors;
          } else {
            this.item = data;
            this.item.UserId = this.$store.getters.getUser.id;
            this.item.OrderId = this.parent;
            console.log('comp item edit INIT order',this.item);
          }
        })
        .catch(error => {
          console.log('comp item edit INIT err',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    read (id) {
      console.log('comp item edit READ',id);
      this.toggleLoading();
      API
       .getDetail('/item',{detail: id})
       .then(data => {
          console.log('comp item edit READ data',data);
          (data.errors)?this.error = data.errors:this.item = data;
       })
       .catch(error => {
         console.log('comp item edit READ err',error);
         this.error = error;
       })
       .then(()=>{
         this.toggleLoading();
       });
    },

    save () {
      console.log('comp item edit SAVE',this.order);
      this.toggleLoading();
      API
        .saveDetail('/item',this.item)
        .then(data => {
          console.log('comp item edit SAVE data',data);
          (data.errors)?this.error = data.errors:this.item = data;
        })
        .catch(error => {
          console.log('comp item edit SAVE err',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    remove () {
      console.log('comp item edit REMOVE',this.order);
      this.toggleLoading();
      API
        .removeDetail('/item',this.item)
        .then(data => {
          console.log('comp item edit REMOVE data',data);
          this.exit();
        })
        .catch(error => {
          console.log('comp item edit REMOVE err',error);
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    exit () {
      this.$router.push({name: 'order.edit', params: {id:this.parent}});
      this.$emit('refresh');
    },

  },

  mounted () {
    (!this.$route.params.itemid)?this.init():this.read(this.$route.params.itemid);
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
