import axios from 'axios'

const Axios = axios.create({
    baseURL: `http://localhost:8181`
  })

export default {
   register (credentials) {
    console.log('AXIOS post /auth/register pre axios 2',credentials);
    return Axios
      .post('/auth/register',credentials)
      .then(data => {
        console.log('AXIOS post then 5',data);
        return data;
      })
      .catch(error => {
        console.log('AXIOS post error 5',error);
        return error;
      });
  }
}
