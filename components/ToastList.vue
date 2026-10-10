<template>
  <div
    class="toasts"
    aria-live="polite"
  >
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toasts__item"
        :class="`toasts__item--${toast.type}`"
      >
        <span>{{ toast.message }}</span>
        <button
          type="button"
          class="toasts__close"
          aria-label="Закрыть"
          @click="remove(toast.id)"
        >
          ×
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
const { toasts, remove } = useToast();
</script>

<style lang="scss" scoped>
.toasts {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: min(360px, calc(100vw - 2rem));
  pointer-events: none;

  @media (max-width: 768px) {
    top: auto;
    right: 1rem;
    bottom: 80px;
    left: 1rem;
    max-width: none;
  }

  &__item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border: 1px solid var(--color-light-grey);
    background: var(--color-white);
    color: var(--color-grey);
    font-size: 0.875rem;
    line-height: 1.4;
    pointer-events: auto;
    box-shadow: 0 8px 24px rgb(0 0 0 / 8%);

    &--success {
      border-color: var(--color-success);
      color: var(--color-success);
    }

    &--error {
      border-color: var(--color-error);
      color: var(--color-error);
    }

    &--info {
      border-color: var(--color-grey-300);
    }
  }

  &__close {
    flex-shrink: 0;
    color: inherit;
    font-size: 1.25rem;
    line-height: 1;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
</style>
