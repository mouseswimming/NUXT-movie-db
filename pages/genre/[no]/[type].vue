<script lang="ts" setup>
import { getGenreList, getMediaByGenre } from "~/composables/tmdb";
import type { Media, MediaType } from "~/types";
import { MEDIA_TYPES } from "~/constants/lists";

const route = useRoute();
const no = computed(() => route.params.no as string);
const type = computed(() => (route.params.type as MediaType) || "movie");

const items: Media[] = reactive([]);
const list = await getGenreList(type.value);
const genreName = list.find((item) => item.id === +no.value)?.name;

async function fetch(page: number) {
  const data = await getMediaByGenre(type.value, no.value, page);
  items.push(...data.results);
}

definePageMeta({
  key: (route) => route.fullPath,
  validate: ({ params }) => {
    return MEDIA_TYPES.includes(params.type as MediaType);
  },
});
</script>

<template>
  <MediaAutoLoadGrid :fetch="fetch" :type="type" :items="items">
    {{ type === "tv" ? "TV" : "Movie" }} Genre: {{ genreName }}
  </MediaAutoLoadGrid>
</template>
