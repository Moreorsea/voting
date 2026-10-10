// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  // Windows: иначе dev-сервер может слушать только [::1], а fetch на localhost идёт на 127.0.0.1
  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/icon',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
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
  runtimeConfig: {
    jwtSecret: process.env.NUXT_JWT_SECRET || 'dev-secret-change-me',
    db: {
      host: process.env.NUXT_DB_HOST || 'localhost',
      port: Number(process.env.NUXT_DB_PORT) || 3306,
      user: process.env.NUXT_DB_USER || 'root',
      password: process.env.NUXT_DB_PASSWORD || '',
      database: process.env.NUXT_DB_NAME || 'voting',
    },
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL
    }
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'in-out'
    }
  }
});