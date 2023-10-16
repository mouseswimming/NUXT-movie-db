<script lang="ts" setup>
import { Media, MediaType } from "~/types";

const props = defineProps<{
  items: Media[];
  type: MediaType;
  fetch: (page: number) => Promise<void>;
  count?: number;
}>();

// when hit tail, auto load will start
const tailEl = ref<HTMLDivElement>();
const rootEl = ref<HTMLDivElement>();

let page = 0;
const isLoading = ref(false);

async function loadMore() {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    page++;
    await props.fetch(page);
  } finally {
    isLoading.value = false;
  }
}

if (process.client) {
  loadMore();

  useIntervalFn(() => {
    if (!tailEl.value || isLoading.value) return;
    if (props.count != null && props.items.length >= props.count) return;
    const { top } = tailEl.value.getBoundingClientRect();
    const delta = top - window.innerHeight;
    if (delta < 400) loadMore();
  }, 500);
} else {
  await loadMore();
}
</script>

<template>
  <div>
    <h1 class="px-8 pt-8 gap2 text-3xl">
      <slot />
    </h1>
    <div v-if="count != null" class="px-8 opacity-50">
      {{ $t("{count} items", { count }) }}
    </div>

    <div class="rootEl">
      <MediaGrid>
        <MediaCard
          v-for="item of items"
          :key="item.id"
          :type="type"
          :item="item"
        />
      </MediaGrid>
    </div>

    <div ref="tailEl" />
    <div v-if="isLoading" class="p10 animate-pulse text-xl text-white">
      <Icon name="eos-icons:bubble-loading" />
    </div>
  </div>
</template>
