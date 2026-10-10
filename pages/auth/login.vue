<template>
  <section class="login">
    <form
      class="login__form"
      @submit.prevent
    >
      <h1 class="login__title">Вход на платформу</h1>

      <label class="login__field">
        <Icon
          name="icon:email"
          size="18px"
          class="login__icon"
        />
        <input
          v-model="email"
          class="login__input"
          type="email"
          name="email"
          placeholder="Email"
          autocomplete="email"
        >
      </label>

      <label class="login__field">
        <Icon
          name="icon:key"
          size="18px"
          class="login__icon"
        />
        <input
          v-model="password"
          class="login__input login__input--password"
          :type="isPasswordVisible ? 'text' : 'password'"
          name="password"
          placeholder="Пароль"
          autocomplete="current-password"
        >
        <button
          type="button"
          class="login__toggle"
          :aria-label="isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
          @click="isPasswordVisible = !isPasswordVisible"
        >
          <Icon
            :name="isPasswordVisible ? 'icon:eye-off' : 'icon:eye'"
            size="18px"
          />
        </button>
      </label>

      <Button
        type="submit"
        class="login__submit"
        @click="onSubmit"
      >
        Войти в аккаунт
      </Button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import {useAuthStore} from "../../store/auth";

const email = ref('');
const password = ref('');
const isPasswordVisible = ref(false);
const error = ref('');
const pending = ref(false);
const { apiUrl } = useRuntimeConfig().public;
const authStore = useAuthStore();

// const {data } = await useAsyncData("auth",
// async () => {
//   const result = await $fetch(`${apiUrl}/auth/login`, {
//     method: 'POST',
//     body: {
//       email: email.value,
//       password: password.value
//     }
//   })

//   console.log('RES', result)
// })

const onSubmit = async () => {
  try {
    pending.value = true;
    const result = await $fetch(`${apiUrl}auth/login`, {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value
    }
  });

  if (result?.token) {
    authStore.setToken(result.token);
  }
  if (result?.user) {
    authStore.setUser(result.user);
  }
  navigateTo('/auth/account');

  console.log('RES', result);
  } catch(error) {
    error.value = 'Не удалось войти';
  } finally {
    pending.value = false;
    error.value = '';
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 40px);

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 360px;
  }

  &__title {
    margin-bottom: 2rem;
    color: var(--color-black);
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.4;
    text-align: center;
  }

  &__field {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  &__icon {
    position: absolute;
    left: 1.1rem;
    pointer-events: none;
  }

  &__toggle {
    position: absolute;
    right: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    color: var(--color-grey-300);
    cursor: pointer;

    &:hover {
      color: var(--color-grey);
    }
  }

  &__input {
    width: 100%;
    padding: 0.85rem 1.25rem 0.85rem 2.75rem;
    border: 1px solid var(--color-light-grey);
    border-radius: 999px;
    background: var(--color-white);
    color: var(--color-black);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s ease;

    &--password {
      padding-right: 2.75rem;
    }

    &::placeholder {
      color: var(--color-grey-300);
    }

    &:focus {
      border-color: var(--color-grey-300);
    }
  }

  &__submit {
    width: 100%;
    margin-top: 0.75rem;
    padding: 0.85rem 2rem;
  }
}
</style>
