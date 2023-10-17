<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Vivian's Media Station",
  titleTemplate: (title) =>
    title !== "Nuxt Movies" ? `${title} · Nuxt Movies` : title,
  meta: [
    {
      name: "description",
      content:
        "A TMDB client built with Nuxt Image to show the potential of it ✨",
    },
    {
      property: "og:image",
      content: "/image/social-card.webp",
    },
    { name: "charset", content: "utf-8" },
  ],
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/images/logo.svg",
    },
  ],
});

// make sure the page scroll to top after page transition
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
  if (history.state.scroll) {
    setTimeout(
      () =>
        document.querySelector("[data-scroll]")?.scrollTo(history.state.scroll),
      0
    );
  } else {
    setTimeout(
      () => document.querySelector("[data-scroll]")?.scrollTo(0, 0),
      0
    );
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #111;
  color: white;
  color-scheme: dark;
}
</style>
