<script setup lang="ts">
import type { Media, MediaType } from "~/types";

defineProps<{
  item: Media;
  type: MediaType;
}>();
</script>

<template>
  <!-- <h1>movie overview</h1> -->
  <MediaInfo :item="item" :type="type" />

  <!-- Videos carousel -->
  <CarouselBase v-if="item.videos?.results">
    <template #title>
      {{ $t("Videos") }}
      <span class="text-sm opacity-70"
        >({{ item.videos?.results.length }})</span
      >
    </template>
    <VideoCard
      v-for="i of item.videos?.results"
      :key="i.id"
      :item="i"
      class="flex-1 w-96 mb-4"
    />
  </CarouselBase>

  <!-- Photo carousel -->
  <CarouselBase v-if="item.images?.posters">
    <template #title>
      {{ $t("Posters") }}
      <span class="text-sm opacity-70"
        >({{ item.images?.posters.length }})</span
      >
    </template>
    <PhotoCard
      v-for="(i, idx) of item.images?.posters"
      :key="i.file_path"
      :item="i"
      :idx="idx"
      :items="item.images?.posters"
      class="flex-1 w-96 mb-4"
    />
  </CarouselBase>

  <!-- Cast carousel -->
  <CarouselBase v-if="item.credits?.cast?.length">
    <template #title>
      {{ $t("Cast") }}
      <span class="text-sm opacity-70">({{ item.credits?.cast?.length }})</span>
    </template>
    <PersonCard
      v-for="i of item.credits?.cast"
      :key="i.id"
      :item="i"
      class="flex-1 w-52"
    />
  </CarouselBase>
</template>
