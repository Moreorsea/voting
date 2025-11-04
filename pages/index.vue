<template>
  <Card v-for="post in posts" :key="post.id" :post="post" />
</template>

<script lang="ts" setup>
const { apiUrl } = useRuntimeConfig().public;

const { data: posts } = await useAsyncData("postsResponse",
  async () => {
    const result = await $fetch(`${apiUrl}posts`);

    return result.posts;
  }
)
</script>