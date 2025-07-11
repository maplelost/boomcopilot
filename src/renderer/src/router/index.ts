import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'popup',
      component: () => import('../views/Popup.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/Main.vue')
    }
  ]
})

export default router 