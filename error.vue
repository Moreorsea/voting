<template>
  <div class="error">
    <h1 class="error__title">{{ error.statusCode }}</h1>
    <p class="error__message">{{ statusMessage }}</p>
    <Button @click="() => navigateTo('/')">На главную</Button>
  </div>
</template>

<script lang="ts" setup>
const { error } = defineProps<{ error: NuxtError }>();

const statusMessage = computed(() => {
  if(error?.statusCode === 404) {
    return 'Страница не найдена, вернитесь на главную страницу'
  }

  return 'Что-то пошло не так, попробуйте перезагрузить страницу'
})
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Roboto", sans-serif;
  color: var(--color-grey);

  &__title {
    font-size: 7.5rem;
    font-weight: 500;
  }

  &__message {
    font-size: 1rem;
    margin: 1rem 0 2rem;
  }
}
</style>