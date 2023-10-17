// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === "development";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/image-edge",
  ],
  routeRules: {
    "/**": isDev
      ? {}
      : {
          cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true },
        },
    "/api/**": { cors: true },
    "/api/tmdb/**": { swr: 3600 },
  },
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || "",
    },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: "en",
    },
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "de-DE",
        name: "Deutsch",
        file: "de-DE.json",
      },
      {
        code: "es-ES",
        name: "Español",
        file: "es-ES.json",
      },
      {
        code: "ja",
        name: "日本語",
        file: "ja.json",
      },
      {
        code: "zh-CN",
        name: "简体中文",
        file: "zh-CN.json",
      },
    ],
    lazy: true,
    langDir: "internationalization",
    defaultLocale: "en",
  },
});
