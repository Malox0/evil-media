import { createRouter, createWebHistory, useRoute } from 'vue-router'
import FollowerPage from '@/views/FollowerPage.vue'
import HomePage from '@/views/HomePage.vue'
import PostPage from '@/views/PostPage.vue'

import { ref } from 'vue'
import { useAuth } from '@/auth/useAuth'

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

router.beforeEach(async (to) => {
  isLoading.value = true

  const { keycloak, roles } = useAuth()
  if (to.meta?.requiresAuth && !keycloak.authenticated) {
    await keycloak.login({ redirectUri: window.location.origin + to.fullPath })
    return false
  }
  if (to.meta?.roles) {
    const need = to.meta.roles as string[]
    if (!need.every((r) => roles.value.includes(r))) {
      return { path: '/' }
    }

    return true
  }
})

router.afterEach(async (to) => {
  isLoading.value = false
})

export default router
