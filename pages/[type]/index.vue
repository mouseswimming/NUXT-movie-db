<script lang="ts" setup>
import type { MediaType } from "~/types";
import { MEDIA_TYPES, QUERY_LIST } from "~/constants/lists";

const route = useRoute();
const type = computed(() => (route.params.type as MediaType) || "movie");

const queries = computed(() => QUERY_LIST[type.value as MediaType]);

const AsyncWrapper = defineComponent(async (_, ctx) => {
  if (!queries.value)
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });

  const list = await listMedia(type.value, queries.value?.[0].query, 1);
  if (!list) return () => {};

  const promises = [];
  for (let i = 0; i < 5; i++) {
    promises.push(await getMedia(type.value, list.results[i].id));
  }

  const heroItems = await Promise.all(promises);

  return () => ctx.slots?.default?.({ heroItems });
});

useHead({
  title:
    type.value === "movie"
      ? "Movies - Vivian's Media Station"
      : "TV Shows - Vivian's Media Station",
});

definePageMeta({
  key: (route) => route.fullPath,
  validate: ({ params }) => {
    return MEDIA_TYPES.includes(params.type as MediaType);
  },
});
</script>

<template>
  <div class="overflow-x-hidden">
    <AsyncWrapper>
      <template #default="{ heroItems }">
        <MediaHeroSlider :type="type" :items="heroItems" />
      </template>
    </AsyncWrapper>
    <CarouselAutoQuery
      v-for="query of queries"
      :key="query.type + query.query"
      :query="query"
    />
    <TheFooter />
  </div>
</template>
