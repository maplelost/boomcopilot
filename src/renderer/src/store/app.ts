import { defineStore } from 'pinia'

export const use_app_store = defineStore('app-store', {
  state: () => ({
    windowWidth: 0,
    windowHeight: 0
  }),
  actions: {
    setWindowSize(width: number, height: number) {
      this.windowWidth = width
      this.windowHeight = height
    }
  }
})

const appStore = use_app_store()

export default appStore
