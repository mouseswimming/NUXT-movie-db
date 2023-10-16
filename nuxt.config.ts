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
  // image: {
  //   provider: "proxy",
  //   providers: {
  //     proxy: {
  //       provider: "ipx",
  //       options: {
  //         baseURL: "/api/ipx",
  //       },
  //     },
  //   },
  // },
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || "",
    },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: false,
      fallbackLocale: "en",
    },
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "de-DE",
        file: "de-DE.json",
      },
      {
        code: "es-ES",
        file: "es-ES.json",
      },
      {
        code: "ja",
        file: "ja.json",
      },
      {
        code: "zh-CN",
        file: "zh-CN.json",
      },
    ],
    lazy: true,
    langDir: "internationalization",
    defaultLocale: "en",
  },
});
