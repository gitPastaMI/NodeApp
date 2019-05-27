import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import Public from '@/components/Public'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Orders from '@/components/order/Orders'
import Order from '@/components/order/Order'
import OrderItem from '@/components/order/ItemModal'
import Account from '@/components/account/Account'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/public',             name: 'public',         component: Public,    meta: {isPublic: true, hasNavbar: false}},
    {path: '/login',              name: 'login',          component: Login,     meta: {isPublic: true, hasNavbar: false}},
    {path: '/home',               name: 'home',           component: Home},
    {path: '/orders',             name: 'orders',         component: Orders},
    {path: '/order',              name: 'ordernew',       component: Order},
    {path: '/order/:orderid',     name: 'orderedit',      component: Order,
      children: [
        {path: 'item',            name: 'orderitemnew',   component: OrderItem, meta: {hasNavbar: false}},
        {path: 'item/:itemid',    name: 'orderitemedit',  component: OrderItem, meta: {hasNavbar: false}}
    ]},
    {path: '/account',            name: 'accountnew',     component: Account,   props: true,  meta: {hasNavbar: false}},
    {path: '/account/:accountid', name: 'accountedit',    component: Account,   props: true,  meta: {hasNavbar: false}},
    {path: '*',  redirect: {name: 'login'}}
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
