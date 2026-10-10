<template>
  <div class="card__header">
    <Icon
      name="icon:purple"
      size="24px"
    />
    <p class="card__header-text">Purple School</p>
    <span class="card__header-date">{{ date.toLocaleString("ru-RU") }}</span>
  </div>
  <NuxtLink
    class="card__link"
    :to="{name: 'post-id', params: {id: post?.id}}"
  >
    <h2 class="card__title">{{ post?.title }}</h2>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
  post: any;
}>();

const date = computed(() => new Date(props.post?.createdAt));
</script>

<style lang="scss">
.card {
  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 15px;
    margin-bottom: 10px;

    &-text {
      color: var(--color-grey);
      font-size: 16px;
    }

    &-date {
      color: var(--color-grey-300);
      font-size: 14px;
    }
  }

  &__title {
    margin-bottom: 10px;
    color: var(--color-black);
    font-size: 22px;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }
}

@media (max-width: 768px) {
  .card {
    &__header {
      &-text {
        font-size: 14px;
      }

      &-date {
        width: 100%;
        margin-left: 39px;
        font-size: 12px;
      }
    }

    &__title {
      font-size: 18px;
    }
  }
}
</style>