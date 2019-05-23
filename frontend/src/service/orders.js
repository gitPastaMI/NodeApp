import axios from 'axios'

const Axios = axios.create({
    baseURL: `http://localhost:8181`
  })

export default {
   handleError (error) {
     if (error.response.status===418) {
       return error.response.data;
     } else {
       return error;
     }
   },

 getOrders (page = 0) {
  return Axios
    .get('/orders/'+page)
    .then(response => {
      return response.data;
    })
  },

  getInitOrder () {
   return Axios
     .get('/order')
     .then(response => {
       return response.data;
     })
   },

 saveOrder (order) {
   console.log('save order',order);
   if (order.id) {
     return Axios
     .put('/order',order)
     .then(response => {
       return response.data;
     })
     .catch(error => {
       return error;
     });
   } else {
     return Axios
     .post('/order',order)
     .then(response => {
       return response.data;
     })
     .catch(error => {
       return error;
     });
   }
  },

  getOrder (id) {
   return Axios
     .get('/order/'+id)
     .then(response => {
       return response.data;
     })
   },

   removeOrder (order) {
     return Axios
       .delete('/order',{ data: order })
       .then(response => {
         return response.data;
       })
   },
}
