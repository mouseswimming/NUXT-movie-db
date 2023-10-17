<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n();

console.log(locales.value);

type local = {
  code: string;
  name: string;
  file: string;
};

const localOptions = computed(() => {
  console.log(locales.value);
  return locales.value as local[];
});

const curLoc = ref("");

const updateLocale = () => {
  setLocale(curLoc.value);
  window.location.reload();
};

onMounted(() => {
  curLoc.value = locale.value;
});
</script>

<template>
  <div>
    Languages:
    <select
      id="languageSelect"
      class="rounded-md text-sm py-1 px-2"
      v-model="curLoc"
      @change="updateLocale"
    >
      <option
        v-for="loc in localOptions"
        :key="loc.code"
        :value="loc.code"
        class="p-1"
      >
        {{ loc.name }}
      </option>
    </select>
  </div>
</template>
