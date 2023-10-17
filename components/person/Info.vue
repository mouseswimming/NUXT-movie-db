<script lang="ts" setup>
import type { Person } from "~/types";
import { formatDate } from "~/composables/utils";
import { TMDB_IMAGE_BASE_THUMBNAIL } from "~/constants/images";

const props = defineProps<{
  person: Person;
}>();

// externalIds: imdb id, wikidata_id, facebook_id, twitter_id
const externalIds = computed(() => ({
  ...props.person.external_ids,
  homepage: props.person.homepage,
}));
</script>

<template>
  <div class="p-4 flex gap-8">
    <img
      v-if="person.profile_path"
      :src="`${TMDB_IMAGE_BASE_THUMBNAIL}/${person.profile_path}`"
      :alt="person.name"
      class="object-cover h-full max-w-sm max-lg:hidden block border-4 border-gray-300/10 aspect-[3/4]"
    />
    <div class="max-w-[80ch] self-center grid gap-y-12">
      <div>
        <h2 class="text-3xl mb-4">
          {{ person.name }}
        </h2>
        <div
          v-if="person.biography"
          class="opacity-80 text-lg"
          v-text="person.biography"
        />
      </div>

      <div class="detail-info">
        <template v-if="person.known_for_department">
          <div>{{ $t("Known for") }}:</div>
          <div>
            {{ person.known_for_department }}
          </div>
        </template>

        <template v-if="person.place_of_birth">
          <div>{{ $t("Place of birth") }}:</div>
          <div>
            {{ person.place_of_birth }}
          </div>
        </template>

        <template v-if="person.birthday">
          <div>{{ $t("Place of birth") }}:</div>
          <div>
            {{ formatDate(person.birthday) }}
          </div>
        </template>
      </div>

      <ExternalLinks :links="externalIds" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.detail-info {
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 0.75rem;
  column-gap: 1rem;
}

.detail-info div:nth-child(2n + 1) {
  @apply opacity-80;
}
</style>
