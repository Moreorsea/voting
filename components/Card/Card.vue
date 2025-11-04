<template>
  <article class="card">
    <CardHeader :post="post" />

    <p class="card__text">{{ post.content }}</p>
    <div class="card__footer">
      <CardActions :post="post" />

      <div class="card__footer-trash">
        <button>
          <Icon name="icon:archive" size="18px" />
        </button>
      </div>

      <button class="card__footer-action card__footer-edit">
        <Icon name="icon:edit" size="18px" />
        <span>Изменить</span>
      </button>
    </div>
  </article>
</template>

<script lang="ts" setup>
defineProps<{
  post: any
}>();
</script>

<style lang="scss">
.card {
  border-bottom: 1px solid var(--color-light-grey);
  color: var(--color-black);
  width: 692px;
  padding-top: 30px;
  padding-right: 100px;

  &__text {
    font-size: 16px;
    line-height: 24px;
    color: var(--color-grey);
    margin-bottom: 15px;
    font-weight: 300;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 20px;
    color: var(--color-grey);
    font-size: 14px;
    margin-bottom: 30px;

    &-trash {
      margin-left: auto;
    }

    &-action {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>