<script lang="ts" setup>
import type { QueryItem } from "~/types";

const props = defineProps<{
  query: QueryItem;
}>();

const item = await listMedia(props.query.type, props.query.query, 1);
</script>

<template>
  <CarouselBase>
    <!-- carousel title -->
    <template #title>
      {{ $t(query.title) }}
    </template>
    <!-- explore more button -->
    <template #more>
      <NuxtLink
        :to="`/${props.query.type}/category/${props.query.query}`"
        class="n-link"
      >
        {{ $t("Explore more") }}
      </NuxtLink>
    </template>
    <MediaCard
      v-for="i of item.results"
      :key="i.id"
      :item="i"
      :type="props.query.type"
      class="flex-1 w-60"
    />
  </CarouselBase>
</template>
