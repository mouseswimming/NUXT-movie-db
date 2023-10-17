<script lang="ts" setup>
import { searchShows } from "~/composables/tmdb";
import type { Media } from "~/types";
import { MEDIA_TYPES } from "~/constants/lists";

const route = useRoute();
const router = useRouter();

// populate input if ther query exsie in link
const input = ref((route.query.s || "").toString());
const error = ref<unknown>();
const count = ref<undefined | number>();

const items = ref<Media[]>([]);
const currentSearch = ref(input.value);

const search = () => {
  // no change on keywords
  if (input.value === currentSearch.value) return;

  currentSearch.value = input.value.toString();
  count.value = undefined;
  items.value = [];
  router.replace({ query: { s: input.value } });
};

async function fetch(page: number) {
  if (!currentSearch.value) return;
  try {
    const data = await searchShows(currentSearch.value, page);
    count.value = data.total_results ?? count.value;

    let typedResults = data.results as Media[];
    typedResults = typedResults.filter(
      (item) =>
        item.popularity > 1 &&
        item.vote_average &&
        item.vote_average !== 0 &&
        item.media_type &&
        MEDIA_TYPES.includes(item.media_type)
    );

    items.value.push(...typedResults);
  } catch (e: any) {
    error.value = e;
  }
}

const retry = () => {
  error.value = undefined;
  search();
};

useHead({
  title: computed(() => `Search: ${currentSearch.value}`),
});

const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
};

const throttledSearch = useDebounceFn(search, 500);
watch(
  () => input.value,
  () => throttledSearch()
);
</script>

<template>
  <div>
    <!-- search bar -->
    <div
      class="flex bg-gray-400/10 px-6 py-4 items-center gap-3 sticky top-0 focus-within:outline focus-within:outline-cyan-400"
    >
      <Icon name="iconamoon:search-bold" class="text-2xl opacity-50" />
      <input
        type="search"
        v-focus
        v-model="input"
        :placeholder="$t('Type to search...')"
        class="text-2xl bg-transparent w-full outline-none"
        @keyup.enter="search"
      />
    </div>
  </div>
  <div v-if="error" class="p-8 grid gap-3">
    <h1 class="text-4xl text-red">
      {{ $t("Error occurred on fetching") }}
    </h1>
    <pre class="py2">{{ error }}</pre>
    <button class="n-link border px-4 py-1 rounded" @click="retry">
      {{ $t("Retry") }}
    </button>
  </div>
  <MediaAutoLoadGrid
    v-if="currentSearch"
    :key="currentSearch"
    :fetch="fetch"
    type="movie"
    :items="items"
    :count="count"
  >
    <div>{{ $t("Search result for: {currentSearch}", { currentSearch }) }}</div>
  </MediaAutoLoadGrid>
</template>
