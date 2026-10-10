<template>
  <section class="account">
    <header class="account__header">
      <div class="account__profile">
        <label class="account__avatar">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt="Аватар"
            class="account__avatar-image"
          >
          <span
            v-else
            class="account__avatar-fallback"
          >
            {{ userInitial }}
          </span>
          <input
            class="account__avatar-input"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            @change="onAvatarChange"
          >
          <span class="account__avatar-hint">
            Изменить
          </span>
        </label>
        <div class="account__info">
          <h1 class="account__name">
            {{ authStore.user?.username || 'Пользователь' }}
          </h1>
          <p class="account__email">
            {{ authStore.user?.email || '' }}
          </p>
        </div>
      </div>

      <Button
        class="account__logout"
        @click="onLogout"
      >
        Выйти
      </Button>
    </header>

    <div class="account__tabs">
      <button
        type="button"
        class="account__tab"
        :class="{ 'account__tab--active': activeTab === 'posts' }"
        @click="activeTab = 'posts'"
      >
        Мои посты
      </button>
      <button
        type="button"
        class="account__tab"
        :class="{ 'account__tab--active': activeTab === 'votes' }"
        @click="activeTab = 'votes'"
      >
        Мои голоса
      </button>
    </div>

    <div
      v-if="activeTab === 'posts'"
      class="account__content"
    >
      <article
        v-for="post in mockPosts"
        :key="post.id"
        class="account-post"
      >
        <p class="account-post__meta">
          {{ post.date }}
        </p>
        <h2 class="account-post__title">
          {{ post.title }}
        </h2>
        <p class="account-post__text">
          {{ post.content }}
        </p>
        <div class="account-post__stats">
          <span>{{ post.likes }} лайков</span>
          <span>{{ post.dislikes }} дизлайков</span>
        </div>
      </article>

      <p
        v-if="!mockPosts.length"
        class="account__empty"
      >
        Пока нет постов
      </p>
    </div>

    <div
      v-else
      class="account__content"
    >
      <div
        v-for="vote in mockVotes"
        :key="vote.id"
        class="account-vote"
      >
        <Icon
          :name="vote.type === 'like' ? 'icon:like' : 'icon:dislike'"
          size="18px"
        />
        <div class="account-vote__body">
          <p class="account-vote__title">
            {{ vote.title }}
          </p>
          <p class="account-vote__date">
            {{ vote.date }}
          </p>
        </div>
      </div>

      <p
        v-if="!mockVotes.length"
        class="account__empty"
      >
        Пока нет голосов
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../../store/auth';

const { apiUrl } = useRuntimeConfig().public;
const authStore = useAuthStore();
const toast = useToast();
const activeTab = ref<'posts' | 'votes'>('posts');
const pendingAvatar = ref(false);

const avatarUrl = computed(() => authStore.user?.avatar || '');
const userInitial = computed(() =>
  (authStore.user?.username?.[0] || '?').toUpperCase()
);

const mockPosts = [
  {
    id: 1,
    title: 'Первый пост',
    content: 'Краткий текст первого поста блога.',
    date: '21.09.2026',
    likes: 3,
    dislikes: 1,
  },
  {
    id: 2,
    title: 'Заметки о Nuxt и API',
    content: 'Как подключить MySQL через XAMPP и отдать JSON.',
    date: '23.09.2026',
    likes: 5,
    dislikes: 0,
  },
];

const mockVotes = [
  {
    id: 1,
    type: 'like' as const,
    title: 'Четвёртый пост',
    date: '27.09.2026',
  },
  {
    id: 2,
    type: 'dislike' as const,
    title: 'Шестой пост',
    date: '27.09.2026',
  },
];

const onAvatarChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file || !authStore.token) {
    return;
  }

  const body = new FormData();
  body.append('avatar', file);

  try {
    pendingAvatar.value = true;
    const result = await $fetch<{ user: typeof authStore.user; }>(
      `${apiUrl}auth/avatar`,
      {
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    if (result.user) {
      authStore.setUser(result.user);
    }
    toast.success('Аватар обновлён');
  } catch {
    toast.error('Не удалось загрузить аватар');
  } finally {
    pendingAvatar.value = false;
    input.value = '';
  }
};

onMounted(async () => {
  if (!authStore.token) {
    return;
  }

  try {
    const result = await $fetch<{ user: NonNullable<typeof authStore.user>; }>(
      `${apiUrl}auth/me`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );
    authStore.setUser(result.user);
  } catch {
    // токен мог устареть — оставляем то, что в store
  }
});

const onLogout = () => {
  authStore.clearToken();
  navigateTo('/');
};
</script>

<style lang="scss" scoped>
.account {
  width: 100%;
  max-width: 692px;
  padding-top: 1rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  &__profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
  }

  &__avatar {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    overflow: hidden;
    border-radius: 50%;
    background-color: #f2f2f2;
    color: var(--color-black);
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;

    &:hover .account__avatar-hint {
      opacity: 1;
    }
  }

  &__avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__avatar-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__avatar-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  &__avatar-hint {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(0 0 0 / 45%);
    color: var(--color-white);
    font-size: 0.65rem;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  &__info {
    min-width: 0;
  }

  &__name {
    margin: 0;
    color: var(--color-black);
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.3;
  }

  &__email {
    margin: 0.15rem 0 0;
    color: var(--color-grey-300);
    font-size: 0.95rem;
    line-height: 1.4;
  }

  &__logout {
    flex-shrink: 0;
    padding: 0.65rem 1.5rem;
  }

  &__tabs {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-light-grey);
  }

  &__tab {
    color: var(--color-light-grey);
    font-size: 1rem;
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
      color: var(--color-black);
    }

    &--active {
      color: var(--color-black);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__empty {
    margin: 2rem 0;
    color: var(--color-grey-300);
    font-size: 0.95rem;
  }
}

.account-post {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-light-grey);

  &__meta {
    margin: 0 0 0.5rem;
    color: var(--color-grey-300);
    font-size: 0.875rem;
  }

  &__title {
    margin: 0 0 0.5rem;
    color: var(--color-black);
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.3;
  }

  &__text {
    margin: 0 0 0.75rem;
    color: var(--color-grey);
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
  }

  &__stats {
    display: flex;
    gap: 1.25rem;
    color: var(--color-grey-300);
    font-size: 0.875rem;
  }
}

.account-vote {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-light-grey);
  color: var(--color-grey-300);

  &__body {
    min-width: 0;
  }

  &__title {
    margin: 0;
    color: var(--color-black);
    font-size: 1rem;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  &__date {
    margin: 0.25rem 0 0;
    color: var(--color-grey-300);
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  .account {
    padding-top: 0.5rem;

    &__header {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    &__avatar {
      width: 4rem;
      height: 4rem;
    }

    &__avatar-hint {
      opacity: 1;
      font-size: 0.6rem;
    }

    &__name {
      font-size: 1.1rem;
      overflow-wrap: anywhere;
    }

    &__email {
      font-size: 0.875rem;
      overflow-wrap: anywhere;
    }

    &__logout {
      width: 100%;
    }

    &__tabs {
      gap: 1.25rem;
      margin-bottom: 1rem;
    }

    &__tab {
      font-size: 0.95rem;
    }
  }

  .account-post {
    padding: 1.15rem 0;

    &__title {
      font-size: 1.1rem;
      overflow-wrap: anywhere;
    }

    &__text {
      font-size: 0.95rem;
      overflow-wrap: anywhere;
    }

    &__stats {
      flex-wrap: wrap;
      gap: 0.75rem 1rem;
    }
  }

  .account-vote {
    padding: 1rem 0;
  }
}
</style>
