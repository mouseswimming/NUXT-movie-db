<script lang="ts" setup>
import type { MediaType } from "~/types";
import { QUERY_LIST } from "~/constants/lists";

const route = useRoute();
const type = computed(() => (route.params.type as MediaType) || "movie");

// on home page, we only show popular from movie and tv
const queries = computed(() => [QUERY_LIST.movie[0], QUERY_LIST.tv[0]]);

const AsyncWrapper = defineComponent(async (_, ctx) => {
  const list = await listMedia(type.value, queries.value[0].query, 1);
  const item = await getMedia(type.value, list.results[0].id);

  return () => ctx.slots?.default?.({ item });
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
