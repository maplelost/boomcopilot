<template>
  <div class="popup-container">
    <n-input-group>
      <n-input v-model:value="inputValue" size="large" placeholder="Hi, User" />
      <n-button type="primary" size="large" ghost> 搜索 </n-button>
    </n-input-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>

<style scoped lang="scss">
.popup-container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  box-sizing: border-box;
  padding: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
