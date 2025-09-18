<template>
  <div>
    <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import "@/assets/scss/index.scss"
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
