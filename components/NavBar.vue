<template>
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
</template>

<style scoped lang="css">
.router-link-active {
  @apply text-cyan-400;
}
</style>
