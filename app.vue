<template v-if="mounted">
  <SpeedInsights />
  <MainApp v-if="isMobile"/>
  <MobileWarning v-else/>
</template>
<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

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