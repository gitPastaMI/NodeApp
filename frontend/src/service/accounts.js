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

  getInitAccount () {
    return Axios
      .get('/account')
      .then(response => {
        return response.data;
      })
  },

  getAccount (id) {
   return Axios
     .get('/account/'+id)
     .then(response => {
       return response.data;
     })
   },

   saveAccount (account,user) {
     if (account.id) {
       return Axios
       .put('/account',account)
       .then(response => {
         return response.data;
       })
     } else {
       return Axios
       .post('/account',{account,user})
       .then(response => {
         return response.data;
       })
     }
    },

    removeAccount (account) {
      return Axios
        .delete('/account',{ data: account })
        .then(response => {
          return response.data;
        })
    },

    search (filter) {
      return Axios.get('/account/picker/'+filter)
        .then(response => {
          return response.data;
        })
    },

}
