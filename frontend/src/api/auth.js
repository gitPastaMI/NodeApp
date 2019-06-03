import axios from 'axios'

const Axios = axios.create({
    baseURL: `http://localhost:8181`
  })

export default {
  register (credentials) {
    return Axios
      .post('/auth/register',credentials)
      .then(response => {
        return response.data;
      })
  },

  login (credentials) {
    return Axios
      .post('/auth/login',credentials)
      .then(response => {
        console.log('api auth login',response);
        return response.data
      });
  },

  removeUser (user) {
    return Axios
      .delete('/user',{ data: user })
      .then(response => {
        return response.data;
      })
  },

  getUsers () {
   return Axios
     .get('/users')
     .then(response => {
       return response.data;
     })
   },

}
