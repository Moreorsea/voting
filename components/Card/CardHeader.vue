<template>
<div class="card__header">
      <Icon name="icon:purple" size="24px" />
      <p class="card__header-text">Purple School</p>
      <span class="card__header-date">4 дня назад</span>
    </div>
    <NuxtLink class="card__link" :to="{name: 'post-id', params: {id: post?.id}}">
    <h2 class="card__title">{{ post?.title }}</h2>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{
  post: any
}>();
</script>

<style lang="scss">
.card {
  &__header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;

    &-text {
      color: var(--color-grey);
      font-size: 16px;
    }

    &-date {
      color: var(--color-grey-300);
    }
  }

  &__title {
    color: var(--color-black);
    font-size: 22px;
    line-height: 22px;
    margin-bottom: 10px;
  }
}
</style>