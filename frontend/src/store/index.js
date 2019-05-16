import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
// *******************************
  state: {
    user: null,
  },
// *******************************
  mutations: {
    setUser (state,user) {
      state.user = user
    },
    unsetUser (state) {
      state.user = null;
    },
  },
// *******************************
  actions: {
    login (context,credentials) {
      console.log('store action login pre commit 2', credentials);
      // TODO : api post
      context.commit('setUser',credentials);
      console.log('store action login post commit 3', credentials);
    },

    logout (context) {
      console.log('store action logout pre commit', state.user);
      context.commit('unsetUser');
      console.log('store action logout post commit', state.user);
    },
  },
// *******************************
getters: {
    getUser: (state) => {
      return state.user
    },
  }
// *******************************
})
