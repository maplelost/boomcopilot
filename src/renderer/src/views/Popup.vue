<template>
  <!-- <div class="popup-container">
    <div class="search-input-container">
      <input
        v-model="inputValue"
        type="text"
        class="search-input"
        placeholder="中键复制内容会显示在这里"
      />
      <button v-if="inputValue" class="clear-button" @click="inputValue = ''">×</button>
      <div class="icon-button">{{ contentType }}</div>
    </div>
  </div> -->

  <div class="popup-container">
    <n-input-group>
      <n-input v-model:value="inputValue" size="large" placeholder="Hi, User" />
      <n-button type="primary" size="large" ghost> 搜索 </n-button>
    </n-input-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const inputValue = ref('')
const contentType = ref('')

window.api.receiveFromMidBtn((event, data: { type: string; content: string }) => {
  console.log('收到剪贴板内容:', data)

  if (data && data.type) {
    contentType.value = data.type

    if (data.type === 'text') {
      inputValue.value = data.content
    } else if (data.type === 'file') {
      inputValue.value = `文件: ${Array.isArray(data.content) ? data.content.join(', ') : data.content}`
    } else if (data.type === 'image') {
      inputValue.value = '图片内容已复制'
    }
  }
})
</script>

<style scoped lang="scss">
.popup-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.search-input-container {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-input {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  padding: 0 16px;
  border-radius: 24px;

  &::placeholder {
    color: #bbb;
  }
}

.clear-button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e0e0e0;
  border: none;
  color: #666;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    background: #d0d0d0;
  }
}

.icon-button {
  width: 24px;
  height: 24px;
  border: none;
  margin-right: 8px;
}
</style>
