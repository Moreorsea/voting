<template>
  <div class="sort">
    <button
      class="sort__button"
      :class="[!isActive ? 'sort__button--active' : '']"
      @click="$emit('update', 'date')"
    >По дате</button>
    <button
      class="sort__button"
      :class="[isActive ? 'sort__button--active' : '']"
      @click="$emit('update', 'rating')"
    >По рейтингу</button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  sort: String
});

const emit = defineEmits(['update']);

const isActive = computed(() => props.sort === 'rating');


</script>

<!-- --color-light-grey -->
<style lang="scss" scoped>
.sort {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-light-grey);

  &__button {
    color: var(--color-light-grey);
    transition: color 0.7s;

    &:hover {
      color: var(--color-black);
    }

    &--active {
      color: var(--color-black);
    }
  }
}

@media (max-width: 768px) {
  .sort {
    gap: 0.75rem 1.25rem;
  }
}
</style>