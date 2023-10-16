import ItemsVue from '../carousel/Items.vue';
<script setup lang="ts">
import type { Image } from "~/types";
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";
import { useImageModal } from "~/composables/item";

const props = defineProps<{
  item: Image;
  idx: number;
  items: Image[];
}>();

const show = useImageModal();
</script>

<template>
  <button class="grid gap-y-2 text-left" @click="show(items, idx)">
    <img
      :src="`${TMDB_IMAGE_BASE_THUMBNAIL}/${item.file_path}`"
      alt=""
      class="aspect-auto w-full border-2 border-gray-400/10"
    />
  </button>
</template>
