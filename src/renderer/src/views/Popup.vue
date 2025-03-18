<template>
  <div class="popup-container">
    <div class="search-input-container">
      <input v-model="inputValue" type="text" class="search-input" placeholder="Hi, User" />
      <button v-if="inputValue" class="clear-button" @click="inputValue = ''">×</button>
      <div class="icon-button">123</div>
    </div>
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
