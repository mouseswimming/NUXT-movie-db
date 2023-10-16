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
  const item = await getMedia(type.value, list.results?.[0].id);
  return () => ctx.slots?.default?.({ item });
});

useHead({
  title: type.value === "movie" ? "Movies" : "TV Shows",
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
      <template #default="{ item }">
        <NuxtLink :to="`/${type}/${item.id}`">
          <MediaHero :item="item" />
        </NuxtLink>
      </template>
    </AsyncWrapper>
    <CarouselAutoQuery
      v-for="query of queries"
      :key="query.type + query.query"
      :query="query"
    />
    <div>Footer Section</div>
  </div>
</template>
