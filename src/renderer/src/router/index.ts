import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '@/views/main/Main.vue'
import Popup from '@/views/main/Popup.vue'

export enum MainRoutesNameEnum {
  POPUP = 'popup'
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: `/${MainRoutesNameEnum.POPUP}`,
          name: MainRoutesNameEnum.POPUP,
          component: Popup
        }
      ]
    }
    // { 
    //   path: '/',
    //   name: 'popup',
    //   component: Popup
    // },
  ]
})

export default router
