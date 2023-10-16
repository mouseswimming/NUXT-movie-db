<script lang="ts" setup>
import type { Image } from "~/types";
import { provideImageModal } from "~/composables/item";
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";

const images = ref<Image[] | null>(null);
const index = ref(0);

const current = computed(() => images.value?.[index.value]);

provideImageModal((img, idx) => {
  images.value = img;
  index.value = idx;
});

const prev = () => {
  if (!images.value) return;
  // endless looping
  index.value = (index.value - 1 + images.value.length) % images.value.length;
};

const next = () => {
  if (!images.value) return;

  index.value = (index.value + 1) % images.value.length;
};

useEventListener("keydown", (e) => {
  if (!images.value) return;

  if (e.key === "Escape") {
    images.value = null;
  } else if (e.key === "ArrowLeft") {
    prev();
  } else if (e.key === "ArrowRight") {
    next();
  }
});
</script>

<template>
  <div
    v-if="images && current"
    class="fixed inset-0 bg-black/95 p-8 flex items-center justify-center"
  >
    <button
      class="absolute right-5 top-5 text-3xl opacity-70 hover:opacity-100 hover:text-cyan-400 transition"
      @click="images = null"
    >
      <Icon name="ep:close-bold" />
    </button>
    <img
      :src="`${TMDB_IMAGE_BASE_THUMBNAIL}/${current.file_path}`"
      alt=""
      class="max-h-full max-w-full object-contain border-2 border-gray-400/10"
    />
  </div>
</template>
