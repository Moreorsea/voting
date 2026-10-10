<template>
  <section>
    <CardHeader :post="post" />

    <div v-html="post?.content"/>

    <div class="card__footer">
      <CardActions :post="post" />
    </div>
  </section>
</template>

<script lang="ts" setup>
const route = useRoute();
const { apiUrl } = useRuntimeConfig().public;

const { data: post } = useAsyncData(`post-${route.params?.id}`,
async () => {
  const result = await $fetch(`${apiUrl}posts/${route.params?.id}`);

  return result;
}, {
  watch: [route.params.id]
});
</script>