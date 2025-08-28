<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 0.5rem 2rem;
  border-radius: 20px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
}
</style>