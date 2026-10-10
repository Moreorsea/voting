export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useCookie<string | undefined>('auth');

  if(!auth.value) {
    return navigateTo('/auth/login');
  }
});