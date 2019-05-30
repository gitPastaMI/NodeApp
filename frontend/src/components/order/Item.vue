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
            <input type="text" v-model="item.description" autofocus>
            <input type="text" v-model="item.qty" v-on:change="totalPrice()">
            <input type="text" v-model="item.unit_price" v-on:change="totalPrice()">
            <input type="text" v-model="item.total_price" disabled>
          </div>

          <div class="">
            <label for="">Version
              <input type="text" v-model="item.version" disabled>
            </label>
            <label for="">Created
              <input type="text" v-model="item.createdAt" disabled>
            </label>
            <label for="">Updated
              <input type="text" v-model="item.updatedAt" disabled>
            </label>
            <label for="">Owner ID
              <input type="text" v-model="item.UserId" disabled>
            </label>
            <label for="">Order ID
              <input type="text" v-model="item.OrderId" disabled>
            </label>
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
import API from '@/service/orders'
import error from '@/components/Error'
export default {
  name: 'ModalItem',
  components:{error},
  data () {
    return {
      showModal: true,
      item: {},
      error: null,
      loading: false,
    }
  },

  methods:{
    totalPrice () {
      if (this.item) {
        this.item.total_price = this.item.qty * this.item.unit_price;
        this.$forceUpdate();
        return this.item.total_price;
      } else {
        return 0;
      }
    },
    toggleLoading () {
      this.loading = !this.loading;
    },
    isLoading () {
      return this.loading;
    },

    init () {
      this.toggleLoading();
      API
        .getInitItem()
        .then(data => {
          if (data.errors) {
            this.error = data.errors;
          } else {
            this.item = data;
            this.item.UserId = this.$store.getters.getUser.id;
            this.item.OrderId = this.$route.params.orderid;
          }
        })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    read () {
      this.toggleLoading();
      API
       .getItem(this.$route.params.itemid)
       .then(data => {
         (data.errors)?this.error = data.errors:this.item = data;
       })
       .catch(error => {
         this.error = error;
       })
       .then(()=>{
         this.toggleLoading();
       });
    },

    save () {
      this.toggleLoading();
      API
        .saveItem(this.item)
        .then(data => {
           (data.errors)?this.error = data.errors:this.item = data;
        })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    remove () {
      this.toggleLoading();
      API
        .removeItem(this.item)
        .then(data => {
          this.exit();
        })
        .catch(error => {
          this.error = error;
        })
        .then(()=>{
          this.toggleLoading();
        });
    },

    exit () {
      this.$router.push({name: 'orderedit', params: {id:this.parent}});
      this.$emit('itemsaved');
    },

  },

  mounted () {
    (!this.$route.params.itemid)?this.init():this.read();
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
