import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import signUp from '../views/signUp.vue'
import Room from '../views/room.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signUp',
    component: signUp
  },
  {
    path: '/room',
    name: 'Room',
    component: Room
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
