<script lang="ts" setup>
import type { MediaType } from "~/types";
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";
import { MEDIA_TYPES } from "~/constants/lists";

const route = useRoute();
const type = computed(() => (route.params.type as MediaType) || "movie");
const id = computed(() => route.params.id as string);

const $img = useImage();

const [item, recommendations] = await Promise.all([
  getMedia(type.value, id.value),
  getRecommendations(type.value, id.value),
]);

useHead({
  title: item.title || item.name,
  meta: [
    { name: "description", content: item.overview },
    {
      property: "og:image",
      content: $img(`${TMDB_IMAGE_BASE_THUMBNAIL}/${item.poster_path}`, {
        width: 1200,
        height: 630,
      }),
    },
  ],
});
definePageMeta({
  key: (route) => route.fullPath,
  validate: ({ params }) => {
    return MEDIA_TYPES.includes(params.type as MediaType);
  },
});
</script>

<template>
  <MediaHero :item="item" />
  <MediaDetails :item="item" :type="type" />
  <CarouselBase v-if="recommendations?.results.length">
    <template #title>
      {{ $t("More like this") }}
    </template>
    <MediaCard
      v-for="i of recommendations.results"
      :key="i.id"
      :item="i"
      :type="type"
      class="flex-1 w-60"
    />
  </CarouselBase>
</template>
