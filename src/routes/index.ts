import { createRouter, createWebHistory, useRoute } from 'vue-router'
import FollowerPage from '@/views/FollowerPage.vue'
import HomePage from '@/views/HomePage.vue'
import PostPage from '@/views/PostPage.vue'

import { nextTick, ref } from 'vue'

export const isLoading = ref(false)
const route = useRoute()
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
  {
    path: '/posts/:id',
    name: 'post',
    component: PostPage,
    props: true,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { top: 0 }
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})

router.afterEach(async (to) => {
  isLoading.value = false
})

export default router
