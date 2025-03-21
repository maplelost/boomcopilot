<template>
  <div class="popup-container">
    <!-- 上部分：显示复制的文本 -->
    <div class="copied-text-container" :class="{ hidden: !inputValue }">
      <div class="copied-text-scroll">
        <div class="copied-text">{{ inputValue }}</div>
      </div>
    </div>

    <!-- 中间部分：输入框 -->
    <div class="search-input-container">
      <input v-model="userInput" type="text" class="search-input" placeholder="请输入文本..." />
      <button v-if="userInput" class="clear-button" @click="userInput = ''">×</button>
      <div class="icon-button">{{ contentType }}</div>
    </div>

    <!-- 下部分：模型选择 -->
    <div class="model-selection">
      <div
        v-for="model in models"
        :key="model.id"
        class="model-item"
        :class="{ active: selectedModel === model.id }"
        @click="selectModel(model.id)"
      >
        {{ model.name }}
      </div>
    </div>
  </div>

  <!-- <div class="popup-container">
    <n-input-group>
      <n-input v-model:value="inputValue" size="large" placeholder="Hi, User" />
      <n-button type="primary" size="large" ghost> 搜索 </n-button>
    </n-input-group>
  </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const inputValue = ref('')
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
  gap: 12px;
}

.copied-text-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 12px;
  height: 120px;
  transition: all 0.3s ease;

  &.hidden {
    height: 0;
    padding: 0;
    opacity: 0;
  }
}

.copied-text-scroll {
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

.copied-text {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: #333;
  word-break: break-all;
  line-height: 1.5;
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

.model-selection {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px 0;
}

.model-item {
  padding: 6px 12px;
  border-radius: 16px;
  background-color: #f5f5f5;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  &.active {
    background-color: #333;
    color: white;
  }
}
</style>
