<script setup lang="ts">
const scrollEl = ref<HTMLDivElement>();

function scrollLeft() {
  scrollEl.value?.scrollTo({
    left: 0,
    behavior: "smooth",
  });
}
function scrollRight() {
  const currentLeftPos = scrollEl.value?.scrollLeft ?? 0;
  const clientWidth = scrollEl.value?.clientWidth ?? 0;
  const fullScrollWidth = scrollEl.value?.scrollWidth ?? 0;
  let leftPos = currentLeftPos + clientWidth;
  leftPos =
    leftPos > fullScrollWidth - clientWidth
      ? fullScrollWidth - clientWidth
      : leftPos;

  scrollEl.value?.scrollTo({
    left: leftPos,
    behavior: "smooth",
  });
}
</script>

<template>
  <div class="flex py-3 px-10 items-center mt-5 place-content-between">
    <div class="text-2xl">
      <slot name="title" />
    </div>
    <slot name="more" />
  </div>
  <div class="relative base-container">
    <div ref="scrollEl" class="overflow-y-auto">
      <div class="flex gap-4 w-max py-2 px-10 relative isolate">
        <slot />
      </div>
    </div>
    <!-- <button
      class="carousel-nav-button left-button"
      title="Scroll left"
      @click="scrollLeft()"
    >
      <Icon name="bx:caret-left-circle" />
    </button>
    <button
      class="carousel-nav-button right-button"
      title="Scroll right"
      @click="scrollRight()"
    >
      <Icon name="bx:caret-right-circle" />
    </button> -->
  </div>
</template>

<style lang="css" scoped>
.carousel-nav-button {
  @apply absolute top-2 bottom-28  py-2 items-center justify-center text-gray-400 bg-black/50 opacity-0 transition text-4xl w-10;
}

.base-container:hover .carousel-nav-button {
  @apply text-white opacity-100;
}

.left-button {
  @apply left-0;
}

.right-button {
  @apply right-0;
}
</style>
