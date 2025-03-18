<script setup lang="ts">
import Popup from './views/Popup.vue'

const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div class="main-window-container">
    <Popup />
  </div>
</template>

<style scoped lang="scss">
.main-window-container {
  width: 100%;
  height: 100%;
}
</style>
