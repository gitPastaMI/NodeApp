import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import Public from '@/components/Public'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Orders from '@/components/Orders'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/public',    name: 'public',   component: Public,  meta: { isPublic: true, hasNavbar: false}},
    { path: '/login',     name: 'login',    component: Login,   meta: { isPublic: true, hasNavbar: false}},
    { path: '/home',      name: 'home',     component: Home},
    { path: '/orders',    name: 'orders',   component: Orders},
    { path: '*',  redirect: {name: 'login'}}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isPublic)) {
    next()
  } else {
    Store.dispatch('restoreState');
    if (Store.getters.isLogged) {
      next()
    } else {
      next('/login')
    }
  }
 })

export default router
