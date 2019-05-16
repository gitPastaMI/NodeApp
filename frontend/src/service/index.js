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
      .catch(error => {
        return error;
      });
  },

  getUsers () {
   return Axios
     .get('/users')
     .then(response => {
       return response.data;
     })
     .catch(error => {
       return error;
     });
 }

}
