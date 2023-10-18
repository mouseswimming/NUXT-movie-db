<script lang="ts" setup>
import type { Media } from "~/types";
import { formatTime } from "~/composables/utils";
import { TMDB_IMAGE_BASE_ORIGINAL } from "~/constants/images";

const props = withDefaults(
  defineProps<{
    item: Media;
  }>(),
  {
    item: () => ({} as Media),
  }
);

const mounted = useMounted();

const trailer = computed(() => getTrailer(props.item));

const showModal = useIframeModal();
const playTrailer = () => {
  return showModal(trailer.value!);
};
</script>

<template>
  <div
    :key="item.id"
    class="relative aspect-square md:aspect-[3/2] lg:aspect-[25/6] bg-black"
  >
    <div class="absolute top-0 right-0 bottom-0 max-lg:left-0 lg: left-1/3">
      <img
        :src="`${TMDB_IMAGE_BASE_ORIGINAL}/${item.backdrop_path}`"
        :alt="item.title || item.name"
        class="object-cover h-full w-full"
      />
    </div>
    <div
      class="absolute bottom-0 left-0 top-0 px-10 grid items-center max-lg:right-0 max-lg:top-auto max-lg:p-10 lg:px-24 lg:w-2/3 bg-gradient-to-r from-black via-black to-transparent"
    >
      <Transition appear name="hero">
        <div v-show="mounted">
          <h1 class="mt-2 text-3xl lg:text-4xl xl:text-5xl line-clamp-2">
            {{ item.title || item.name }}
          </h1>

          <div class="flex gap-3 items-center mt-4">
            <StarsRate :value="item.vote_average" class="w-24" />
            <div v-if="item.release_date" class="opacity-50">
              {{ item.release_date.slice(0, 4) }}
            </div>
            <div v-if="item.runtime" class="opacity-50">
              {{ formatTime(item.runtime) }}
            </div>
          </div>

          <p
            class="mt-5 opacity-80 leading-relaxed overflow-hidden line-clamp-3 max-w-[65ch]"
          >
            <span v-if="item.tagline" class="text-xl italic tracking-wide">
              " {{ item.tagline }} "
            </span>
            <span v-else class="md:line-clamp-5 md:text-base">
              {{ item.overview }}
            </span>
          </p>

          <div v-if="trailer" class="py-5 hidden lg:block">
            <button
              @click.prevent="playTrailer"
              class="flex gap-2 text-gray-300 bg-gray-200/10 px-6 py-4 rounded hover:bg-gray-200/30 hover:text-cyan-400 transition"
            >
              <Icon name="octicon:play-16" class="text-2xl" />
              {{ $t("Watch Trailer") }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="css" scoped>
.hero-enter-active,
.hero-leave-active {
  transition: transform 0.75s cubic-bezier(0.4, 0.25, 0.3, 1),
    opacity 0.3s cubic-bezier(0.4, 0.25, 0.3, 1);
}

.hero-enter-from,
.hero-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.hero-enter-to,
.hero-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
