import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'

import '@mdi/font/css/materialdesignicons.css'
import { vuetify } from './plugins/vuetify'
import router from './routes'

createApp(App).use(router).use(vuetify).mount('#app')
