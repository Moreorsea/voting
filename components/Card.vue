<template>
  <article class="card">
    <div class="card__header">
      <Icon name="icon:purple" size="24px" />
      <p class="card__header-text">Purple School</p>
      <span class="card__header-date">4 дня назад</span>
    </div>
    <h2 class="card__title">Добавить функцию голосования</h2>
    <p class="card__text">Попробовать добавить в приложение функцию голосования, которая позволит определить, какая фича более полезна, а какая нет. После добавления поста появляется...</p>
    <div class="card__footer">
      <div class="card__footer-action card__footer-like">
        <span>10</span>
        <button>
          <Icon name="icon:like" size="18px" />
        </button>
      </div>
      <div class="card__footer-action card__footer-dislike">
        <span>1</span>
        <button>
          <Icon name="icon:dislike" size="18px" />
        </button>
      </div>

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

<style lang="scss" scoped>
.card {
  border-bottom: 1px solid var(--color-light-grey);
  color: var(--color-black);
  width: 692px;
  padding-top: 30px;
  padding-right: 100px;

  &__header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;

    &-text {
      color: var(--color-grey);
      font-size: 16px;
    }

    &-date {
      color: var(--color-grey-300);
    }
  }

  &__title {
    font-size: 22px;
    line-height: 22px;
    margin-bottom: 10px;
  }

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