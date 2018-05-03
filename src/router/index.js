import Vue from 'vue'
import Router from 'vue-router'
import * as firebase from 'firebase'
import Home from '../components/Home'
import Feed from '../components/dashboard/Feed'
import Blogs from '../components/dashboard/Blogs'
import ProfileHome from '../components/profile/ProfileHome'
import LoginRegister from '../components/LoginRegister'
import SchoolHome from '../components/place/SchoolHome'
import Error from '../components/error/Error'
import AddPlaceHome from '../components/addPlace/AddPlaceHome'

Vue.use(Router);

let router =  new Router({
  routes: [
    {
      path: '*',
      name: 'LoginRegister',
      component: LoginRegister
    },
    {
      path: '/',
      name: 'LoginRegister',
      component: LoginRegister
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/feeds',
      name: 'Feed',
      component: Feed,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'ProfileHome',
      component: ProfileHome,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/place/schoolHome/:id',
      name: 'SchoolHome',
      component: SchoolHome,
      props: true,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
      props: (route) => ({
        query: route.query.error
      }),
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/addPlace',
      name: 'AddPlace',
      component: AddPlaceHome,
      props: true,
      meta:{
        requiresAuth: true
      }
    }
  ],
  mode:'history'
});

router.beforeEach(((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next()
}));

export default router;
