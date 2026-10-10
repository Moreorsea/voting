<template>
  <div class="pagination">
    <button
      v-for="i in meta.totalPages"
      :key="i"
      type="button"
      class="pagination__button"
      @click="$emit('update', i)"
    >
      {{ i }}
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}>();

const emit = defineEmits(['update']);
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: auto;
  padding: 2rem 0 4rem;
  color: var(--color-grey-300);
}

@media (max-width: 768px) {
  .pagination {
    justify-content: flex-start;
    padding: 1.5rem 0 2rem;
  }
}
</style>
