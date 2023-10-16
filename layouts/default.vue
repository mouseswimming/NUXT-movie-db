<template>
  <div class="h-full w-full overflow-hidden layout">
    <div class="overflow-x-hidden overflow-y-auto">
      <slot />
    </div>
    <NavBar class="lg:order-first" />
    <IframeModal />
    <ImageModal />
  </div>
</template>

<style lang="css" scoped>
.layout {
  @apply grid max-lg:grid-rows-[1fr_max-content] lg:grid-cols-[max-content_1fr];
}
</style>
