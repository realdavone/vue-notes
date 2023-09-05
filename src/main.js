import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import Modal from '@/components/Modal.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const pinia = createPinia()

const app = createApp(App)

app.component('Modal', Modal)

app.use(pinia).use(autoAnimatePlugin).mount('#app')
