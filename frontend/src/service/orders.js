import axios from 'axios'

const Axios = axios.create({
    baseURL: `http://localhost:8181`
  })

export default {

  getItems (orderid,page = 0) {
    return Axios
      .get('/order/'+orderid+'/items/'+page)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },

   getInitItem () {
    return Axios
      .get('/orderitem')
      .then(response => {
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
       if (item.id) {
         return Axios
         .put('/orderitem',item)
         .then(response => {
           return response.data;
         })
         .catch(error => {
           return error;
         });
       } else {
         return Axios
         .post('/orderitem',item)
         .then(response => {
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
