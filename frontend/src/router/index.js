import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import Public from '@/components/Public'
import Login from '@/components/Login'
import Home from '@/components/Home'
// import Orders from '@/components/order/Orders'
import OrderList from '@/components/order/list'
import OrderEdit from '@/components/order/edit'
import OrderItem from '@/components/orderitem/edit'
import AccountList from '@/components/account/list'
import AccountEdit from '@/components/account/edit'
import DeliveryGroups from '@/components/deliverygroup/list'
import DeliveryGroup from '@/components/deliverygroup/detail'
import Forecast from '@/components/forecast/add'
import DeliveryDetail from '@/components/delivery/detail'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/public',               name: 'public',         component: Public,    meta: {isPublic: true, hasNavbar: false}},
    {path: '/login',                name: 'login',          component: Login,     meta: {isPublic: true, hasNavbar: false}},
    {path: '/home',                 name: 'home',           component: Home},
    {path: '/orders',               name: 'order.list',     component: OrderList},
    {path: '/order',                name: 'order.new',      component: OrderEdit},
    {path: '/order/:orderid',       name: 'order.edit',     component: OrderEdit,
      children: [
        {path: 'item',              name: 'item.new',        component: OrderItem ,props: true},//, meta: {hasNavbar: false}},
        {path: 'item/:itemid',      name: 'item.edit',       component: OrderItem ,props: true},//, meta: {hasNavbar: false}}
      ]
    },
    {path: '/accounts',             name: 'account.list',    component: AccountList},
    {path: '/account',              name: 'account.new',     component: AccountEdit},
    {path: '/account/:accountid',   name: 'account.edit',    component: AccountEdit},
    {path: '/forecast',             name: 'forecast.add',    component: Forecast},
    {path: '/deliveries',           name: 'delivery.group.list', component: DeliveryGroups},
    {path: '/delivery/group/:groupid',  name: 'delivery.group.detail', component: DeliveryGroup},
    {path: '/delivery/:deliveryid', name: 'delivery.detail',  component: DeliveryDetail},
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
