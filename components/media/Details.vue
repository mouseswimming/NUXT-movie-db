<script lang="ts" setup>
import type { Media, MediaType } from "~/types";
defineProps<{
  item: Media;
  type: MediaType;
}>();
</script>

<template>
  <MediaOverview :item="item" :type="type" />
</template>
