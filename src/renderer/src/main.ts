import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'

import {
  create,
  NButton,
  NInput,
  NInputGroup,
  NInputNumber,
  NSelect,
  NSpace,
  NSplit,
  NText,
  NInputGroupLabel,
  NCard,
  NCode
} from 'naive-ui'

const naive = create({
  components: [
    NButton,
    NInput,
    NInputGroup,
    NInputNumber,
    NSelect,
    NSpace,
    NSplit,
    NText,
    NInputGroup,
    NInputGroupLabel,
    NCard,
    NCode
  ]
})

createApp(App).use(naive).mount('#app')
