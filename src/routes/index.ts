import { createRouter, createWebHistory } from 'vue-router'
import UserPage from '@/views/UserPage.vue'
import HomePage from '@/views/HomePage.vue'
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/user/:username',
    name: 'user',
    component: UserPage,
    props: true,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
