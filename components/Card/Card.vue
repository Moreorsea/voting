<template>
  <article class="card">
    <CardHeader :post="post" />

    <input
      v-if="isUpdate"
      v-model="localPost.content"
      type="text"
    >
    <p
      v-else
      class="card__text"
    >{{ post.content }}</p>
    <div class="card__footer">
      <CardActions
        :post="localPost"
        @like="onLike"
        @dislike="onDisLike"
      />

      <template v-if="isAuth">
        <div
          class="card__footer-trash"
          @click="$emit('delete', post.id)"
        >
          <button>
            <Icon
              name="icon:archive"
              size="18px"
            />
          </button>
        </div>


        <button
          v-if="!isUpdate"
          class="card__footer-action card__footer-edit"
          @click="toggleUpdate"
        >
          <Icon
            name="icon:edit"
            size="18px"
          />
          <span>Изменить</span>
        </button>
        <button
          v-else
          class="card__footer-action card__footer-save"
          @click="handleUpdate"
        >
          <Icon
            name="icon:save"
            size="18px"
          />
          <span>Сохранить</span>
        </button>
      </template>
    </div>
  </article>
</template>

<script lang="ts" setup>
const props = defineProps<{
  post: any;
  isAuth: boolean;
}>();

const emit = defineEmits(['delete', 'update']);

const { apiUrl } = useRuntimeConfig().public;
const localPost = ref({ ...props.post });
const isUpdate = ref<boolean>(false);

watch(() => props.post, (value) => {
  localPost.value = { ...value };
});

const toggleUpdate = () => {
  isUpdate.value = !isUpdate.value;
};

const handleUpdate = () => {
  // emit('update')
  toggleUpdate();
};

const onLike = async () => {
  const updated = await $fetch(`${apiUrl}posts/${localPost.value.id}/like`, {
    method: 'POST',
  });
  localPost.value = updated;
};

const onDisLike = async () => {
  const updated = await $fetch(`${apiUrl}posts/${localPost.value.id}/dislike`, {
    method: 'POST',
  });
  localPost.value = updated;
};
</script>

<style lang="scss">
.card {
  width: 100%;
  max-width: 692px;
  padding-top: 30px;
  padding-right: 100px;
  border-bottom: 1px solid var(--color-light-grey);
  color: var(--color-black);

  &__text {
    margin-bottom: 15px;
    color: var(--color-grey);
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    overflow-wrap: anywhere;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 20px;
    margin-bottom: 30px;
    color: var(--color-grey);
    font-size: 14px;

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

@media (max-width: 768px) {
  .card {
    padding-top: 20px;
    padding-right: 0;

    &__footer {
      gap: 12px 16px;
      margin-bottom: 20px;
    }
  }
}
</style>
