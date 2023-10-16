<script lang="ts" setup>
import type { Person } from "~/types";

defineProps<{
  person: Person;
}>();
</script>

<template>
  <PersonInfo :person="person" />
</template>
