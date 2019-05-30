import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
// *******************************
  state: {
    user: null,
    navbarLinks: [
        {key:1, label: 'Home',      route:{ name: 'home'}},
        {key:2, label: 'Orders',    route:{ name: 'orders'}},
        {key:3, label: 'Accounts',  route:{ name: 'accounts'}},
        // {key:5, label: 'Logout',  route:{ name: 'login'}}
      ]
  },
// *******************************
  mutations: {
    setState (state,localState) {
      if (localState.user) {
        state.user = localState.user;
      }
    },

    setUser (state,user) {
      state.user = user;
      localStorage.setItem('localStorageState', JSON.stringify(state));
    },

    unsetUser (state) {
      state.user = null;
      localStorage.removeItem('localStorageState');
    },

  },
// *******************************
  actions: {
    restoreState (context) {
      if (localStorage.getItem('localStorageState')) {
        context.commit('setState',JSON.parse(localStorage.getItem('localStorageState')));
      }
    },

    login (context,user) {
      context.commit('setUser',user);
    },

    logout (context) {
      context.commit('unsetUser');
    },

  },
// *******************************
getters: {
    getUser: (state) => {
      return state.user
    },
    isLogged: (state) => {
      if (!state.user) {
        return false
      }
      return true
    },
    getNavbarLinks: (state) => {
      return state.navbarLinks
    },
  }
// *******************************
})
