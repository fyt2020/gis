import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/pages/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
