import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '@renderer/views/main/Main.vue'
import Popup from '@renderer/views/main/Popup.vue'

export enum RouterNameEnum {
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
          path: `/${RouterNameEnum.POPUP}`,
          name: RouterNameEnum.POPUP,
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
