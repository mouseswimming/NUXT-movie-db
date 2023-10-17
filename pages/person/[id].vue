<script lang="ts" setup>
import { getPerson } from "~/composables/tmdb";
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";

const route = useRoute();
const id = computed(() => route.params.id as string);

const person = await getPerson(id.value);
const $img = useImage();

useHead({
  title: person.name,
  meta: [
    { name: "description", content: person.biography || person.name },
    {
      property: "og:image",
      content: $img(`${TMDB_IMAGE_BASE_THUMBNAIL}/${person.profile_path}`, {
        width: 1200,
        height: 630,
      }),
    },
  ],
});
</script>

<template>
  <div>
    <PersonDetails :person="person" />

    <!-- Participated movies -->
    <CarouselBase v-if="person.combined_credits?.cast?.length !== 0">
      <template #title>
        {{ $t("Known for") }}
        <span class="text-sm opacity-70"
          >({{ person.combined_credits?.cast?.length }})</span
        >
      </template>
      <template v-for="i of person.combined_credits?.cast" :key="i.id">
        <MediaCard
          v-if="i.release_date"
          :item="i"
          type="movie"
          class="flex-1 w-60"
        />
      </template>
    </CarouselBase>

    <!-- Actor Photos -->
    <CarouselBase v-if="person.images?.profiles?.length !== 0">
      <template #title>
        {{ $t("Posters") }}
        <span class="text-sm opacity-70"
          >({{ person.images?.profiles.length }})</span
        >
      </template>
      <template v-for="(i, idx) of person.images?.profiles" :key="i.id">
        <PhotoCard
          v-if="i.file_path"
          :item="i"
          :idx="idx"
          :items="person.images?.profiles!"
          class="flex-1 w-96"
        />
      </template>
    </CarouselBase>
    <TheFooter />
  </div>
</template>
