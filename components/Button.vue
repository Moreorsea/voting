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
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
}
</style>