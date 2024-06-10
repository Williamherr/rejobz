import './assets/index.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { useApplicationStore } from './stores/applications'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.provide('application', useApplicationStore())
app.mount('#app')
