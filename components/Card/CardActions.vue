<template>
  <div class="card__footer-action card__footer-like">
        <span>{{ post?.likes }}</span>
        <button>
          <Icon name="icon:like" size="18px" />
        </button>
      </div>
      <div class="card__footer-action card__footer-dislike">
        <span>{{ post?.dislikes }}</span>
        <button>
          <Icon name="icon:dislike" size="18px" />
        </button>
      </div>
</template>

<script lang="ts" setup>
defineProps<{
  post: any
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