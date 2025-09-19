<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RouterNameEnum } from '@renderer/router'

const router = useRouter()
router.push({
  name: RouterNameEnum.POPUP
})
</script>

<style lang="scss" scoped></style>
