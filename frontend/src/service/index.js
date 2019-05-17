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

   register (credentials) {
    return Axios
      .post('/auth/register',credentials)
      .then(response => {
        return response.data;
      })
      // .catch(error => {
      //   console.log('service register error 5',error.response);
      //   return error;
      // });
  },

  login (credentials) {
    return Axios
      .post('/auth/login',credentials)
      .then(response => {
        return response.data
      });
  },

  removeUser (user) {
    return Axios
      .delete('/user',{ data: user })
      .then(response => {
        return response.data;
      })
      // .catch(error => {
      //   console.log('axios remove error 5',);
      //   return error;
      // })
  },

  getUsers () {
   return Axios
     .get('/users')
     .then(response => {
       return response.data;
     })
     // .catch(error => {
     //   return error;
     // });
 }

}
