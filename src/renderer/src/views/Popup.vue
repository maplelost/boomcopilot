<template>
  <div class="popup-container">
    <!-- 剪贴板内容 -->
    <n-card class="clipboard-content">
      <n-code :code="clipboardContent" placeholder="Hi, User" />
    </n-card>

    <!-- 用户输入 -->
    <n-input-group>
      <n-input v-model:value="userInput" size="large" placeholder="Hi, User" />
      <n-button type="primary" size="large"> 搜索 </n-button>
    </n-input-group>

    <!-- 模型选择 -->
    <n-select v-model:value="selectedModel" size="large" :options="models" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const clipboardContent = ref('')
const userInput = ref('')
const contentType = ref('')
const selectedModel = ref('gpt-3.5')

const models = [
  { id: 'gpt-3.5', name: 'GPT-3.5' },
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'claude', name: 'Claude' }
]

const selectModel = (modelId: string) => {
  selectedModel.value = modelId
}

window.api.receiveFromClipboard((event, data: { type: string; content: string }) => {
  console.log('收到剪贴板内容:', data)

  if (data && data.type) {
    contentType.value = data.type

    if (data.type === 'text') {
      clipboardContent.value = data.content
    } else if (data.type === 'file') {
      clipboardContent.value = `文件: ${Array.isArray(data.content) ? data.content.join(', ') : data.content}`
    } else if (data.type === 'image') {
      clipboardContent.value = '图片内容已复制'
    }
  }
})
</script>

<style scoped lang="scss">
.popup-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.clipboard-content {
  height: 10%;
  overflow: auto;
}
</style>
