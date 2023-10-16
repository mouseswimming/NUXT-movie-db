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
    <TheFooter />
  </div>
</template>
