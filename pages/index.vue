<template>
  <div v-if="error">Ошибка загрузки постов: {{ error.message }}</div>
  <template v-else-if="content?.posts?.length">
    <AddUpdate />
    <Sort
      :sort="sort"
      @update="updateSort"
    />
    <Card
      v-for="post in content.posts"
      :key="post.id"
      :post="post"
      :is-auth="authStore?.token"
      @delete="deletePost"
      @update="updatePost"
    />
    <Pagination
      v-if="content.meta.totalPages > 1"
      :meta="content.meta"
      @update="updatePage"
    />
  </template>
  <div v-else>к сожалению, посты не найдены</div>
</template>

<script lang="ts" setup>
import {useAuthStore} from "../store/auth";

const { apiUrl } = useRuntimeConfig().public;
const route = useRoute();
const authStore = useAuthStore();
const sort = computed(() =>
  route.query.sort === 'rating' ? 'rating' : 'date'
);

const page = computed(() => route.query.page || 1);
const toast = useToast();

const { data: content, error, refresh } = await useAsyncData("postsResponse",
  async () => {
    const result = await $fetch<{ posts: unknown[]; }>(`${apiUrl}posts?sort=${sort.value}&page=${page.value}`);

    return {posts: result.posts, meta: result.meta};
  }, {
    watch: [sort, page]
  }
);

const updatePost = (): void => {};

const deletePost = async (id): void => {
  try {
    await $fetch(`${apiUrl}posts/${id}`, {method: 'DELETE'});
    toast.success('Пост успешно удалён');
    await refresh();
  } catch(error) {
    toast.error('Ошибка при удалении');
  }

};

const updateSort = (value): void => {
  navigateTo({ query: { ...route.query, sort: value } });
};

const updatePage = (value): void => {
  navigateTo({query: {...route.query, page: value}});
};
</script>