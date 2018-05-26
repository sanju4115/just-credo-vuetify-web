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
import EditProfile from '../components/profile/EditProfile'
import SchoolDetail from '../components/place/SchoolDetail'
import SchoolClasses from '../components/place/SchoolClasses'
import FacilityAndExtra from '../components/place/FacilityAndExtra'
import Gallery from '../components/place/Gallery'
import AdminDashboard from '../components/admin/AdminDashboard'
import PlaceAdminHome from '../components/pleaceAdmin/PlaceAdminHome'
import SchoolAdminTimeline from '../components/pleaceAdmin/SchoolAdminTimeline'
import Approval from '../components/admin/Approval'

Vue.use(Router);

let router =  new Router({
  /**
   * Scrolls to top of page for every routing
   * @param to
   * @param from
   * @param savedPosition
   * @returns {{x: number, y: number}}
   */
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
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
      path: '/editProfile',
      name: 'EditProfile',
      component: EditProfile,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/adminDashboard',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/placeAdmin/:id',
      name: 'PlaceAdminHome',
      component: PlaceAdminHome,
      children: [
        { path: '', component: SchoolAdminTimeline, name:'SchoolAdminTimeline' },
      ],
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/approval/:id',
      name: 'Approval',
      component: Approval,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/place/schoolHome/:id',
      name: 'SchoolHome',
      component: SchoolHome,
      children: [
        { path: '', component: SchoolDetail, name:'SchoolDetail' },
        { path: 'classes', component: SchoolClasses, name:'SchoolClasses' },
        { path: 'facilities', component: FacilityAndExtra,name:'FacilityAndExtra' },
        { path: 'gallery', component: Gallery, name:'SchoolGallery' }
      ],
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
