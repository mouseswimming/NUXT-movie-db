<script lang="ts" setup>
import type { Media, MediaType } from "~/types";
import {
  formatDate,
  formatLang,
  formatTime,
  numberWithCommas,
} from "~/composables/utils";
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";

const props = withDefaults(
  defineProps<{
    item: Media;
    type: MediaType;
  }>(),
  {
    item: () => ({} as Media),
    type: "movie",
  }
);
// externalIds: imdb id, wikidata_id, facebook_id, twitter_id
const externalIds = computed(() => ({
  ...props.item.external_ids,
  homepage: props.item.homepage,
}));

// movie director
const directors = computed(() =>
  props.item.credits?.crew.filter((person) => person.job === "Director")
);
</script>

<template>
  <div class="p-4 flex gap-8">
    <img
      v-if="item.poster_path"
      :src="`${TMDB_IMAGE_BASE_THUMBNAIL}/${item.poster_path}`"
      :alt="item.title || item.name"
      class="object-cover h-full max-w-sm max-lg:hidden"
    />
    <div class="max-w-[80ch] self-center grid gap-y-12">
      <div v-if="item.overview">
        <h2 class="text-3xl mb-4">
          {{ $t("Storyline") }}
        </h2>
        <div class="opacity-80 text-lg" v-text="item.overview" />
      </div>
      <div class="detail-info">
        <template v-if="item.release_date">
          <div>{{ $t("Release Date") }}:</div>
          <div>
            {{ formatDate(item.release_date) }}
          </div>
        </template>

        <template v-if="item.runtime">
          <div>{{ $t("Runtime") }}:</div>
          <div>
            {{ formatTime(item.runtime) }}
          </div>
        </template>

        <template v-if="directors?.length">
          <div>{{ $t("Director") }}:</div>

          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="person of directors"
              :key="person.id"
              :to="`/person/${person.id}`"
              class="bg-gray-200/10 text-cyan-400 rounded px-2 py-1 hover:bg-gray-200/20 text-xs"
            >
              {{ person.name }}
            </NuxtLink>
          </div>
        </template>

        <template v-if="item.budget">
          <div>{{ $t("Budget") }}:</div>

          <div>${{ numberWithCommas(item.budget) }}</div>
        </template>

        <template v-if="item.revenue">
          <div>{{ $t("Revenue") }}:</div>
          <div>${{ numberWithCommas(item.revenue) }}</div>
        </template>

        <template v-if="item.genres && item.genres.length">
          <div>{{ $t("Genre") }}:</div>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="genre of item.genres"
              :key="genre.id"
              :to="`/genre/${genre.id}/${type}`"
              class="bg-gray-200/10 text-cyan-400 rounded px-2 py-1 hover:bg-gray-200/20 text-xs"
            >
              {{ genre.name }}
            </NuxtLink>
          </div>
        </template>

        <template v-if="item.status">
          <div>{{ $t("Status") }}:</div>
          <div>
            {{ item.status }}
          </div>
        </template>

        <template v-if="item.original_language">
          <div>{{ $t("Language") }}:</div>
          <div>
            {{ formatLang(item.original_language) }}
          </div>
        </template>

        <template
          v-if="item.production_companies && item.production_companies.length"
        >
          <div>{{ $t("Production") }}:</div>

          <div>
            {{ item.production_companies.map((i) => i.name).join(", ") }}
          </div>
        </template>
      </div>
      <ExternalLinks :links="externalIds" />
    </div>
  </div>
</template>

<style scoped lang="css">
.detail-info {
  display: grid;
  column-gap: 1rem;
  row-gap: 0.75rem;
  grid-template-columns: max-content 1fr max-content 1fr;
}

.detail-info div:nth-child(2n + 1) {
  @apply opacity-80;
}
</style>
