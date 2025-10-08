// src/auth/useAuth.ts
import { reactive, computed } from 'vue'
import { getKeycloak } from './keycloak'
import { getFollowerByUsername } from '@/api/service/follower.service'
import type { Follower } from '@/types/follower'

const state = reactive<{
  ready: boolean
  authenticated: boolean
  follower: Follower | null
}>({
  ready: false,
  authenticated: false,
  follower: null,
})

export function useAuth() {
  const kc = getKeycloak()

  const token = computed(() => kc.token ?? '')
  const idToken = computed(() => kc.idToken ?? '')
  const profile = computed(() => kc.tokenParsed ?? ({} as any))
  const username = computed(() => profile.value?.preferred_username || profile.value?.name || '')

  const roles = computed<string[]>(() => {
    const realmRoles = profile.value?.realm_access?.roles ?? []
    const clientRoles =
      profile.value?.resource_access?.[import.meta.env.VITE_KEYCLOAK_CLIENT_ID]?.roles ?? []
    return [...new Set([...realmRoles, ...clientRoles])]
  })

  async function loadFollower() {
    if (username) {
      state.follower = await getFollowerByUsername(username.value)
    }
  }
  async function login() {
    await kc.login({ redirectUri: window.location.origin })
  }

  async function register() {
    await kc.register({ redirectUri: window.location.origin })
  }

  async function logout() {
    await kc.logout({ redirectUri: window.location.origin })
  }

  return {
    state,
    token,
    idToken,
    profile,
    username,
    roles,
    login,
    register,
    logout,
    follower: computed(() => state.follower),
    loadFollower,
    keycloak: kc,
  }
}

export function markAuthReady(authenticated: boolean) {
  state.ready = true
  state.authenticated = authenticated
}
