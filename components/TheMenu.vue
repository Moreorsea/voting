<template>
  <nav class="navigate">
    <NuxtLink
      to="/"
      class="navigate__home"
    >
      <Icon
        name="icon:home"
        size="24"
      />
    </NuxtLink>
    <NuxtLink
      v-if="authStore?.token"
      to="/auth/account"
    >
      <NuxtImg
        :src="avatarUrl"
        class="navigate__avatar"
      />
    </NuxtLink>
    <NuxtLink to="/auth/login">
      <Icon
        name="icon:exit"
        size="24"
      />
    </NuxtLink>
  </nav>
</template>

<script lang="ts" setup>
import {useAuthStore} from "../store/auth";

const authStore = useAuthStore();
const avatarUrl = computed(() => authStore.user?.avatar || '');
</script>

<style lang="scss" scoped>
.navigate {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  width: 80px;
  height: 100vh;
  padding: 20px;
  border-right: 1px solid var(--color-light-grey);
  background-color: var(--color-white);

  &__home {
    margin-bottom: auto;
  }

  &__avatar {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    object-fit: cover;
  }
}

@media (max-width: 768px) {
  .navigate {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    flex-direction: row;
    justify-content: space-around;
    gap: 0;
    width: 100%;
    height: 64px;
    padding: 0 8px;
    border-right: none;
    border-top: 1px solid var(--color-light-grey);
  }

  .navigate__home {
    margin-bottom: 0;
  }
}
</style>