import axios from 'axios'

const Axios = axios.create({
    baseURL: `http://localhost:8181`
  })

export default {
   register (credentials) {
    console.log('service register 2',credentials);
    return Axios
      .post('/auth/register',credentials)
      .then(response => {
        console.log('service register response data 5',response.data);
        return response.data;
      })
      // .catch(error => {
      //   console.log('service register error 5',error.response);
      //   return error;
      // });
  },

  removeUser (user) {
    console.log('axios remove 2',user);
    return Axios
      .delete('/user',{ data: user })
      .then(response => {
        console.log('axios remove response 5',);
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
