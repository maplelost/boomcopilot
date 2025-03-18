import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { create, NButton } from 'naive-ui'

const naive = create({
  components: [NButton]
})

createApp(App).use(naive).mount('#app')
