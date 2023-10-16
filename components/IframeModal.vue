<script lang="ts" setup>
import { onKeyDown } from "@vueuse/core";
import { provideIframeModal } from "~/composables/item";

const src = ref<string | null>(null);

function showModal(link: string) {
  src.value = link;
}

const iframeEl = ref<HTMLIFrameElement>();

provideIframeModal(showModal);

onKeyDown("Escape", () => {
  if (src.value) {
    src.value = null;
  }
});

onClickOutside(iframeEl, () => {
  src.value = null;
});
</script>

<template>
  <div
    v-if="src"
    class="fixed inset-0 bg-black/95 grid items-center justify-items-center"
  >
    <button
      class="absolute right-5 top-5 text-3xl opacity-70 hover:opacity-100 hover:text-cyan-400 transition"
      @click="src = null"
    >
      <Icon name="ep:close-bold" />
    </button>
    <iframe ref="iframeEl" :src="src" form class="w-full aspect-video"></iframe>
  </div>
</template>
