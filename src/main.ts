import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'

import '@mdi/font/css/materialdesignicons.css'
import { vuetify } from './plugins/vuetify'
import router from './routes'
import { markAuthReady, useAuth } from './auth/useAuth'
import { initKeycloak } from './auth/keycloak'
;(async () => {
  try {
    const { loadFollower } = useAuth()

    const authenticated = await initKeycloak(() => {
      console.log('Keycloak initialized!')
    })
    markAuthReady(authenticated)

    if (authenticated) {
      await loadFollower()
    }
    const app = createApp(App)
    app.use(router)
    app.use(vuetify)
    app.mount('#app')
  } catch (err) {
    console.error('Keycloak init failed:', err)
  }
})()
