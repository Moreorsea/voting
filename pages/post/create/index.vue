<template>
  <section class="create-post">
    <form class="create-post__form">
      <div class="create-post__editor">
        <div
          class="create-post__rail"
          aria-hidden="true"
        />

        <div class="create-post__icon">
          +
        </div>

        <div class="create-post__fields">
          <input
            class="create-post__title"
            type="text"
            name="title"
            placeholder="Тема"
          >

          <textarea
            class="create-post__content"
            name="content"
            placeholder="Текст...."
            rows="8"
          />
        </div>
      </div>

      <Button
        type="submit"
        class="create-post__submit"
      >
        Сохранить
      </Button>
    </form>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
});
</script>

<style lang="scss" scoped>
.create-post {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 40px);
  padding-top: 1.5rem;

  &__form {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  &__editor {
    position: relative;
    display: grid;
    grid-template-columns: 2rem 1fr;
    column-gap: 0.75rem;
    align-items: start;
  }

  &__rail {
    position: absolute;
    top: 2rem;
    left: 1rem;
    bottom: 0;
    width: 1px;
    transform: translateX(-50%);
    background-color: var(--color-light-grey);
  }

  &__icon {
    position: relative;
    z-index: 1;
    display: flex;
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

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
    padding-top: 0.2rem;
  }

  &__title,
  &__content {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--color-black);
    font-family: inherit;
    resize: none;

    &::placeholder {
      color: var(--color-grey-300);
    }
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.4;
  }

  &__content {
    min-height: 12rem;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.6;
  }

  &__submit {
    position: sticky;
    bottom: 1.5rem;
    align-self: flex-end;
    margin-top: auto;
    padding: 0.85rem 2.5rem;
  }
}
</style>
