import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import GameDetails from '../views/GameDetails.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'




Vue.use(VueAxios, axios)

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game/:id',
    name: 'game-details',
    component: GameDetails
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
