import { Icon } from '#build/components';
<script setup lang="ts">
import type { Person } from "~/types";
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";

defineProps<{
  item: Person;
}>();
</script>

<template>
  <NuxtLink :to="`/person/${item.id}`">
    <div
      class="block bg-gray-400/10 p-1 aspect-10/16 transition duration-300 hover:scale-95 hover:z-10"
    >
      <img
        v-if="item.profile_path"
        :src="`${TMDB_IMAGE_BASE_THUMBNAIL}/${item.profile_path}`"
        :alt="item.name"
        class="object-cover h-full w-full"
      />
      <div v-else class="h-full opacity-40 flex items-center justify-center">
        <Icon name="carbon:no-image" class="text-5xl" />
      </div>
    </div>
    <div class="mt-2">
      {{ item.name }}
    </div>
    <div class="opacity-50 mb-8">
      {{ item.character || item.known_for_department }}
    </div>
  </NuxtLink>
</template>
