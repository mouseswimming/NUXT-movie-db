<script lang="ts" setup>
import type { MediaType, Media } from "~/types";
import Items from "../carousel/Items.vue";
const props = defineProps<{
  type: MediaType;
  items: Media[];
}>();

const slides = [...props.items, props.items[0]];
const slideNum = computed(() => props.items.length);

const formatTranslate = computed(() => {
  return -slideIndex.value * 100 + "%";
});

const slideIndex = ref(0);
const isSliderHover = ref(false);

let sliderInterval: string | number | NodeJS.Timeout | undefined;

onMounted(() => {
  const slider = document.querySelector("#slider") as HTMLDivElement;
  slider.style.transition =
    "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  const nextSlide = () => {
    slider.style.transition =
      "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    slideIndex.value = slideIndex.value + 1;
    if (slideIndex.value === slideNum.value) {
      setTimeout(() => {
        slider.style.transition = "none";
        slider.style.transform = `translateX(0%)`;
        slideIndex.value = 0;
      }, 800);
    }
  };
  sliderInterval = setInterval(() => {
    if (isSliderHover.value) return;
    nextSlide();
  }, 5000);
});

onUnmounted(() => {
  clearInterval(sliderInterval);
});
</script>

<template>
  <div class="overflow-x-hidden aspect-square md:aspect-[3/2] lg:aspect-[25/7]">
    <div
      class="flex relative flex-nowrap h-full"
      :style="{ transform: `translateX(${formatTranslate})` }"
      id="slider"
    >
      <template v-for="item in slides" :key="item.id">
        <NuxtLink
          :to="`/${type}/${item.id}`"
          class="flex-shrink-0 w-full h-full"
          @mouseover="isSliderHover = true"
          @mouseleave="isSliderHover = false"
        >
          <MediaHero :item="item" />
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
