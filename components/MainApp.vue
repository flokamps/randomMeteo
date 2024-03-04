<template>
  <div v-if="!loaded">
    <Loader />
  </div>
</template>
<script setup lang="ts">
const loaded = ref(false);
</script>