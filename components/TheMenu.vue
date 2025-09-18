<template>
  <nav class="navigate">
    <NuxtLink to="/" class="navigate__home">
      <Icon name="icon:home" size="24" />
    </NuxtLink>
    <NuxtLink to="/post/create">
      <Icon name="icon:purple" size="24" />
    </NuxtLink>
    <NuxtLink to="/auth/login">
      <Icon name="icon:exit" size="24" />
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.navigate {
  height: 100vh;
  width: 80px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  border-right: 1px solid var(--color-light-grey);
  position: fixed;
  background-color: var(--color-white);
  top: 0;
  left: 0;
  bottom: 0;

  &__home {
    margin-bottom: auto;
  }
}
</style>