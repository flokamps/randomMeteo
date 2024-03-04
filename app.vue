<template>
  <div v-if="isMobile">
    <Test />
  </div>
  <div v-else>
    <MobileWarning />
  </div>
</template>
<script setup lang="ts">
const isMobile = ref(false);
const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile);
});
</script>