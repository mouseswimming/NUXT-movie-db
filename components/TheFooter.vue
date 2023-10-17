<script lang="ts" setup></script>

<template>
  <div class="p-10 flex place-content-between">
    <!-- credit -->
    <div class="flex gap-4 items-center">
      <span>
        Made with
        <a
          href="https://nuxt.com/"
          target="_blank"
          class="text-cyan-400 hover:underline"
          >Nuxt 3</a
        >
      </span>
      <span>|</span>
      <span>
        Data provided by
        <a
          href="https://developer.themoviedb.org/"
          target="_blank"
          class="text-cyan-400 hover:underline"
          >TMDB api</a
        >
        (but is not endorsed or certified by TMDB)
      </span>
    </div>
    <!-- language -->
    <LanguageSelect />
  </div>
</template>
