import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import DashboardView from '../views/dashboard/index.vue'
import LoginView from '../views/auth/login.vue';
import RegisterView from '../views/auth/register.vue';
import ResetPasswordView from '../views/auth/reset-password.vue';
import BuilderView from '../views/builders/index.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'home-view',
          component: () => import('../views/home/HomeView.vue'),
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          path: 'summary',
          name: 'DashboardHome',
          component: () => import('../views/dashboard/DashboardHome.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/dashboard/profile/index.vue'),
        }
      ]
    },
    {
      path: '/builder',
      name: 'builder',
      component: BuilderView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
