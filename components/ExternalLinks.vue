<script lang="ts" setup>
import type { ExternalIds } from "~/types";

defineProps<{
  links: ExternalIds;
}>();
</script>

<template>
  <div class="flex gap-6 items-center text-3xl">
    <a
      v-if="links.twitter_id"
      :href="`https://twitter.com/${links.twitter_id}`"
      target="_blank"
      aria-label="Link to Twitter account"
      rel="noopener"
      class="n-link text-2xl"
    >
      <Icon name="simple-icons:x" />
    </a>
    <a
      v-if="links.facebook_id"
      :href="`https://www.facebook.com/${links.facebook_id}`"
      target="_blank"
      aria-label="Link to Facebook account"
      rel="noopener"
      class="n-link"
    >
      <Icon name="simple-icons:facebook" />
    </a>
    <a
      v-if="links.instagram_id"
      :href="`https://instagram.com/${links.instagram_id}`"
      target="_blank"
      aria-label="Link to Instagram account"
      rel="noopener"
      class="n-link"
    >
      <Icon name="simple-icons:instagram" />
    </a>
    <a
      v-if="links.imdb_id"
      :href="`https://www.imdb.com/movie/${links.imdb_id}`"
      target="_blank"
      aria-label="Link to IMDb account"
      rel="noopener"
      class="n-link"
    >
      <Icon name="simple-icons:imdb" />
    </a>
    <a
      v-if="links.github_id"
      :href="`https://github.com/${links.github_id}`"
      target="_blank"
      aria-label="Link to GitHub account"
      rel="noopener"
      class="n-link"
    >
      <Icon name="simple-icons:github" />
    </a>
    <a
      v-if="links.linkedin_id"
      :href="`https://www.linkedin.com/in/${links.linkedin_id}`"
      target="_blank"
      aria-label="Link to LinkedIn account"
      rel="noopener"
      class="n-link"
    >
      <Icon name="simple-icons:linkedin" />
    </a>
    <a
      v-if="links.email"
      :href="links.email"
      aria-label="Link to Email"
      rel="noopener"
      scale-120
      class="n-link"
    >
      <Icon name="mdi:email-outline" />
    </a>
    <a
      v-if="links.homepage"
      :href="links.homepage"
      aria-label="Link to Homepage"
      rel="noopener"
      scale-120
      class="n-link"
    >
      <div i-ph-link-simple />
      <Icon name="mdi:web" />
    </a>
    <slot />
  </div>
</template>
