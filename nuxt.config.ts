// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', 
    '@nuxt/eslint'
  ],
  eslint: {
    checker: true,
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  nitro: {
    preset: 'node-server',
  },
})