import axios from 'axios'

const Axios = axios.create({
    baseURL: `http://localhost:8181`
  })

export default {

  getList (path,params) {
    console.log('API getlist',path,params);
    return Axios
      .get(path,{params})
      .then(response => {
        console.log('API getlist data',response.data);
        return response.data;
      })
      .catch(error => {
        console.log('API getlist error',error);
        return error;
      });
  },

  getNew (path) {
    console.log('API getNew',path);
    return Axios
      .get(path)
      .then(response => {
        console.log('API getNew data',response.data);
        return response.data;
      })
      .catch(error => {
        console.log('API getNew err',error);
        return error;
      });
  },

 saveDetail (path,object) {
   console.log('API saveDetail',path,object);
   if (object.id) {
     console.log('API saveDetail PUT ',path,object);
     return Axios
     .put(path,object)
     .then(response => {
       console.log('API saveDetail data',response.data);
       return response.data;
     })
     .catch(error => {
       console.log('API saveDetail error',error);
       return error;
     });
   } else {
     console.log('API saveDetail POST ',path,object);
     return Axios
     .post(path,object)
     .then(response => {
       console.log('API saveDetail data',response.data);
       return response.data;
     })
     .catch(error => {
       console.log('API saveDetail error',error);
       return error;
     });
   }
  },

  getDetail (path,params) {
    console.log('API getdetail',path,params);
    return Axios
      .get(path,{params})
      .then(response => {
        console.log('API getdetail data',response.data);
        return response.data;
      })
      .catch(error => {
        console.log('API getdetail error',error);
        return error;
      });
  },

  removeDetail (path,object) {
    console.log('API removeDetail',path,object);
    return Axios
      .delete(path,{ data: object })
      .then(response => {
        console.log('API removeDetail data',response.data);
        return response.data;
      })
      .catch(error => {
        console.log('API removeDetail err',error);
        return error;
      });
  },

  defineDG (path,object) {
    console.log('API defineDG POST ',path,object);
    return Axios
    .post(path,object)
    .then(response => {
      console.log('API defineDG data',response.data);
      return response.data;
    })
    .catch(error => {
      console.log('API defineDG error',error);
      return error;
    });
   },

}
