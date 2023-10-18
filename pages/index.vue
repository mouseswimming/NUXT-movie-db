<script lang="ts" setup>
import type { MediaType, Media } from "~/types";
import { QUERY_LIST } from "~/constants/lists";

const route = useRoute();
const type = computed(() => (route.params.type as MediaType) || "movie");

// on home page, we only show popular from movie and tv
const queries = computed(() => [QUERY_LIST.movie[0], QUERY_LIST.tv[0]]);

const AsyncWrapper = defineComponent(async (_, ctx) => {
  const list = await listMedia(type.value, queries.value[0].query, 1);

  const promises = [];
  for (let i = 0; i < 5; i++) {
    promises.push(await getMedia(type.value, list.results[i].id));
  }

  const heroItems = await Promise.all(promises);

  return () => ctx.slots?.default?.({ heroItems });
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
