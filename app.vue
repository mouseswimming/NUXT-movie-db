<script setup lang="ts">
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
