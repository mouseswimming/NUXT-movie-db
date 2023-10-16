<script setup lang="ts">
import type { Media, MediaType } from "~/types";
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";

defineProps<{
  type: MediaType;
  item: Media;
}>();
</script>

<template>
  <NuxtLink :to="`/${item.media_type || type}/${item.id}`" class="pb-2">
    <div
      class="aspect-10/16 block bg-gray-600 p-1 hover:scale-95 transition duration-300"
    >
      <img
        v-if="item.poster_path"
        :src="`${TMDB_IMAGE_BASE_THUMBNAIL}/${item.poster_path}`"
        :alt="item.title || item.name"
        class="object-cover h-full w-full"
      />
      <div v-else class="h-full opacity-40 flex items-center justify-center">
        <Icon name="carbon:no-image" class="text-5xl" />
      </div>
    </div>
    <div class="mt-2">{{ item.title || item.name }}</div>
    <div class="flex text-sm gap-2 items-center">
      <StarsRate class="w-20" :value="item.vote_average" />
      <div op60>
        {{ item.vote_average }}
      </div>
    </div>
  </NuxtLink>
</template>
