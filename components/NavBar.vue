<!-- <template>
  <div
    class="grid max-lg:flex bg-black items-center justify-evenly py-5 lg:px-5 lg:border-r border-white/10 max-lg:border-t"
  >
    <NuxtLink to="/" title="Home" class="n-link">
      <Icon name="ic:baseline-home" class="text-2xl" />
    </NuxtLink>
    <NuxtLink to="/movie" title="Movies" class="n-link">
      <Icon name="tabler:movie" class="text-2xl" />
    </NuxtLink>
    <NuxtLink to="/tv" title="TV shows" class="n-link">
      <Icon name="lucide:tv" class="text-2xl" />
    </NuxtLink>
    <NuxtLink to="/search" title="Search" class="n-link">
      <Icon name="iconamoon:search" class="text-2xl" />
    </NuxtLink>
  </div>
</template> -->
<template>
  <div
    class="grid max-lg:flex bg-black items-center justify-evenly border-r border-white/50 lg:border-t"
  >
    <NuxtLink to="/" title="Home" class="nav-link">
      <Icon name="ic:baseline-home" class="text-2xl" />
    </NuxtLink>
    <NuxtLink to="/movie" title="Movies" class="nav-link">
      <Icon name="tabler:movie" class="text-2xl" />
    </NuxtLink>
    <NuxtLink to="/tv" title="TV shows" class="nav-link">
      <Icon name="lucide:tv" class="text-2xl" />
    </NuxtLink>
    <NuxtLink to="/search" title="Search" class="nav-link">
      <Icon name="iconamoon:search" class="text-2xl" />
    </NuxtLink>
  </div>
</template>

<style scoped lang="css">
.nav-link {
  @apply relative py-4 px-5 h-full w-full flex items-center justify-center isolate shadow-inner shadow-white/20 text-white/70  transition-colors duration-200;
}

.nav-link::before {
  content: "";
  @apply absolute inset-0 bg-teal-200 -z-10  transition-transform duration-200 lg:origin-left lg:scale-x-0 max-lg:origin-bottom max-lg:scale-y-0;
}

.nav-link:hover:not(.router-link-active) {
  @apply text-teal-900;
}

.nav-link::before:hover:not(.router-link-active) {
  @apply max-lg:scale-y-100 lg:scale-x-100;
}

.router-link-active {
  @apply text-white bg-teal-600;
}
</style>
