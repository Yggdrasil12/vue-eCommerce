import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Authentication/Login.vue'
import SignUp from '../views/Authentication/Signup.vue'
import Products from '../views/Products/Products.vue'
import Edit from '../views/Products/Edit.vue'
import Detail from '../views/Products/Detail.vue'
import Profile from '../views/Profile/Profile.vue'
import EditProfile from '../views/Profile/EditProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // Authentication
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    // Products
    {
      path: '/products',
      name: 'products',
      component: Products,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/details/:id',
      name: 'details',
      component: Detail,
    },
    // Profile
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/profile/edit',
      name: 'editProfile',
      component: EditProfile,
    },
  ],
})

export default router
