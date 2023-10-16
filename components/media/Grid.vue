<template>
  <div class="grid gap-4 p-8 grid-template">
    <slot />
  </div>
</template>

<style>
.grid-template {
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
}
</style>
