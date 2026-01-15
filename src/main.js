import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

// Import styles
import './styles/main.css'
import './styles/tailwind.css'

// Import directives
import { clickOutside, focus, tooltip } from './directives'

// Create app instance
const app = createApp(App)

// Register global directives
app.directive('click-outside', clickOutside)
app.directive('focus', focus)
app.directive('tooltip', tooltip)

// Register global properties
app.config.globalProperties.$appName = import.meta.env.VITE_APP_TITLE || 'Vue 3 Blog'
app.config.globalProperties.$appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0'

// Use plugins
app.use(pinia)
app.use(router)

// Mount app
app.mount('#app')
