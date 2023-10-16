<script setup lang="ts">
import type { Video } from "~/types";
import {
  YOUTUBE_THUMBNAIL_QUALITY_NAME,
  YOUTUBE_IMAGE_BASE_URL,
} from "~/constants/images";

import { useIframeModal } from "~/composables/item";

const props = defineProps<{
  item: Video;
}>();

const showModal = useIframeModal();
const playVidoe = () => {
  return showModal(getVideoLink(props.item)!);
};
</script>

<template>
  <button class="grid gap-y-2 text-left" @click="playVidoe">
    <span class="relative">
      <img
        :src="`${YOUTUBE_IMAGE_BASE_URL}/${item.key}/${YOUTUBE_THUMBNAIL_QUALITY_NAME}`"
        :alt="item.name"
        class="aspect-video w-full border-2 border-gray-400/10"
      />
      <span
        class="absolute inset-0 bg-black/70 text-5xl flex items-center justify-center opacity-0 hover:opacity-100 transition duration-200"
      >
        <Icon name="octicon:play-24" />
      </span>
    </span>

    <span class="leading-none">
      {{ item.name }}
    </span>
    <span class="opacity-60 text-sm leading-none -mt-1">
      {{ item.type }}
    </span>
  </button>
</template>
