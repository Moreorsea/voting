<template>
  <NuxtLink
    class="add-update"
    to="/post/create"
  >
    <span class="add-update__icon">+</span>
    <span class="add-update__text">Добавить новое обновление для голосования</span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.add-update {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  color: var(--color-grey);
  font-size: 0.95rem;
  line-height: 1.4;

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #f2f2f2;
    color: var(--color-black);
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1;
  }

  &__text {
    color: var(--color-grey-300);
  }
}

@media (max-width: 768px) {
  .add-update {
    align-items: flex-start;
    margin-bottom: 1rem;
    font-size: 0.9rem;

    &__text {
      padding-top: 0.25rem;
    }
  }
}
</style>
