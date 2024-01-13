// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', "@nuxtjs/tailwindcss", "@invictus.codes/nuxt-vuetify", "@nuxtjs/eslint-module"],
})