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
      .catch(error => {
        console.log('service register error 5',error);
        return error;
      });
  },

  removeUser (user) {
    return Axios
      .delete('/user',user)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      })
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
