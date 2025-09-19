<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { MainRoutesNameEnum } from '@renderer/router'

const router = useRouter()
router.push({
  name: MainRoutesNameEnum.POPUP
})
</script>

<style lang="scss" scoped></style>
