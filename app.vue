<template v-if="mounted">
  <MainApp v-if="isMobile"/>
  <MobileWarning v-else/>
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