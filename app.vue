<template>
  <div v-if="mounted">
    <div v-if="isMobile">
      <MainApp />
    </div>
    <div v-else>
      <MobileWarning />
    </div>
  </div>
</template>
<script setup lang="ts">
const mounted = ref(false);
const isMobile = ref(false);
const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
  mounted.value = true;
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile);
});
</script>