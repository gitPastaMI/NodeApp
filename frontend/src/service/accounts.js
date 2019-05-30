import axios from 'axios'

const Axios = axios.create({
    baseURL: `http://localhost:8181`
  })

export default {
  getAccounts (page = 0) {
  return Axios
    .get('/accounts/'+page)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
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
      return Axios.get('/account/f/'+filter)
        .then(response => {
          return response.data;
        })
    },

}
