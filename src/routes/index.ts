import { createRouter, createWebHistory } from 'vue-router'
import FollowerPage from '@/views/FollowerPage.vue'
import HomePage from '@/views/HomePage.vue'
import { ref } from 'vue'

export const isLoading = ref(false)

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
    component: FollowerPage,
    props: true,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})

router.afterEach(() => {
  isLoading.value = false
})

export default router
