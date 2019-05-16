import axios from 'axios'

const API = axios.create({
    baseURL: `http://localhost:8181`
  })

export default {
  register (credentials) {
    API
    .post('/auth/register',credentials)
    .then(data => {})
    .catch(error => {

    });
  }
}
