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
    .catch(error => {
      return error;
    });
  },

  getInitOrder () {
   return Axios
     .get('/order')
     .then(response => {
       return response.data;
     })
     .catch(error => {
       return error;
     });
   },

 saveOrder (order) {
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
     .catch(error => {
       return error;
     });
   },

   removeOrder (order) {
     return Axios
       .delete('/order',{ data: order })
       .then(response => {
         return response.data;
       })
       .catch(error => {
         return error;
       });
   },

  getItems (orderid,page = 0) {
    console.log('getitems',orderid,page);
    return Axios
      .get('/order/'+orderid+'/items/'+page)
      .then(response => {
        console.log('getitems response',response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },

   getInitItem () {
     console.log('service getinititem');
    return Axios
      .get('/orderitem')
      .then(response => {
        console.log('service getInitItem',response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      });
    },

    getItem (id) {
     return Axios
       .get('/orderitem/'+id)
       .then(response => {
         return response.data;
       })
       .catch(error => {
         return error;
       });
     },

     saveItem (item) {
       console.log('service saveitem',item);
       if (item.id) {
         return Axios
         .put('/orderitem',item)
         .then(response => {
           console.log('service saveitem PUT',response.data);
           return response.data;
         })
         .catch(error => {
           return error;
         });
       } else {
         return Axios
         .post('/orderitem',item)
         .then(response => {
           console.log('service saveitem POST',response.data);
           return response.data;
         })
         .catch(error => {
           return error;
         });
       }
      },

      removeItem (item) {
        return Axios
          .delete('/orderitem',{ data: item })
          .then(response => {
            return response.data;
          })
          .catch(error => {
            return error;
          });
      },
}
