<script lang="ts" setup>
import type { Image } from "~/types";
import { provideImageModal } from "~/composables/item";
import { TMDB_IMAGE_BASE_ORIGINAL } from "~/constants/images";

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
  // index.value = index.value === 0 ? images.value.length : index.value;
};

const next = () => {
  if (!images.value) return;

  index.value = (index.value + 1) % images.value.length;
  // index.value = index.value === 0 ? images.value.length : index.value;
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

const target = ref(null);
const prevBtn = ref(null);
const nextBtn = ref(null);

onClickOutside(
  target,
  () => {
    images.value = null;
  },
  { ignore: [prevBtn, nextBtn] }
);
</script>

<template>
  <div
    v-if="images && current"
    class="fixed inset-0 bg-black/95 p-8 flex items-center justify-center"
  >
    <!-- close button -->
    <button
      class="absolute right-5 top-5 text-3xl opacity-70 hover:opacity-100 hover:text-cyan-400 transition"
      @click.stop="images = null"
    >
      <Icon name="ep:close-bold" />
    </button>
    <img
      ref="target"
      :src="`${TMDB_IMAGE_BASE_ORIGINAL}/${current.file_path}`"
      alt=""
      class="max-h-full max-w-full object-contain border-2 border-gray-400/10"
    />
    <!-- counter -->
    <div class="absolute left-5 bottom-5">
      {{ index + 1 }} / {{ images.length }}
    </div>
    <!-- nav button -->
    <button
      class="absolute left-5 top-1/2 text-5xl -mt-[24px] opacity-70 text-white hover:opacity-100 hover:text-cyan-400 transition"
      ref="prevBtn"
      @click.stop="prev"
    >
      <Icon name="ph:caret-circle-left-fill" />
    </button>
    <button
      class="absolute right-5 top-1/2 text-5xl -mt-[24px] opacity-70 text-white hover:opacity-100 hover:text-cyan-400 transition"
      ref="nextBtn"
      @click.stop="next"
    >
      <Icon name="ph:caret-circle-right-fill" />
    </button>
  </div>
</template>
