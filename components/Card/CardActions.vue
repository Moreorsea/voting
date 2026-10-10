<template>
  <div class="card__footer-action card__footer-like">
    <span>{{ post?.likes }}</span>
    <button
      type="button"
      @click="$emit('like')"
    >
      <Icon
        name="icon:like"
        size="18px"
      />
    </button>
  </div>
  <div class="card__footer-action card__footer-dislike">
    <span>{{ post?.dislikes }}</span>
    <button
      type="button"
      @click="$emit('dislike')"
    >
      <Icon
        name="icon:dislike"
        size="18px"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  post: any;
}>();

defineEmits<{
  like: [];
  dislike: [];
}>();
</script>

<style lang="scss">
.card {
  &__footer {
    &-action {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>
