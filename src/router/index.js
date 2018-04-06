import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Feed from '@/components/dashboard/Feed'
import Blogs from '@/components/dashboard/Blogs'
import ProfileHome from '@/components/profile/ProfileHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/feeds',
      name: 'Feed',
      component: Feed
    },{
      path: '/blogs',
      name: 'Blogs',
      component: Blogs
    },{
      path: '/profile',
      name: 'ProfileHome',
      component: ProfileHome
    }
  ],
  mode:'history'
})
