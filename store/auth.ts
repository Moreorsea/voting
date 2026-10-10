export type AuthUser = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  createdAt?: Date | string;
};

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | undefined>();
  const user = ref<AuthUser | null>(null);

  const setToken = (value: string): void => {
    token.value = value;
  };

  const setUser = (value: AuthUser | null): void => {
    user.value = value;
  };

  const clearToken = (): void => {
    token.value = undefined;
    user.value = null;
  };

  return {
    token,
    user,
    setToken,
    setUser,
    clearToken,
  };
}, {
  persist: true,
});
