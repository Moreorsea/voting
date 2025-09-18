// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/icon',
  ],
  icon: {
    mode: "svg",
    customCollections: [
      {
        prefix: "icon",
        dir: "./assets/icons",
      }
    ]
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'in-out'
    }
  }
})