<template>
  <div class="flex justify-center items-center h-screen flex-col background-container">
    <div :style="{ backgroundImage: currentGradient }" class="background" :class="{'next': odd}"></div>
    <div :style="{ backgroundImage: nextGradient }" class="background" :class="{'next': !odd}"></div>
    <div class="slider-container">
      <transition name="slide" id="loader-svg" mode="out-in">
        <img :key="currentImageSrc" :src="currentImageSrc" alt="loader" class="h-full" />
      </transition>
    </div>
    <p id="loader-text" class="font-bold">Téléportation en cours...</p>
  </div>
</template>
<script setup>
import {icons} from '~/assets/img/index.js';

const images = ref(icons);
const imagesKeys = Object.keys(images.value);

const odd = ref(false);

const backgroundGradients = [
  "linear-gradient(to bottom, #FFE79A, #FFFFFF)",
  "linear-gradient(to bottom, #C0DFFE, #FFFFFF)",
  "linear-gradient(to bottom, #FFE79A, #FFFFFF)",
  "linear-gradient(to bottom, #FFFFFF, #FFFFFF)",
]

const currentImageIndex = ref(0);
const currentGradient = ref(backgroundGradients[0]);
const nextGradient = ref("");

const currentImageSrc = computed(() => images.value[imagesKeys[currentImageIndex.value]]);

watch(() => currentImageIndex.value, async (newVal) => {
  if (!odd.value) {
    nextGradient.value = backgroundGradients[(newVal) % backgroundGradients.length];
  } else {
    currentGradient.value = backgroundGradients[(newVal) % backgroundGradients.length];
  }
  await nextTick();
  odd.value = !odd.value;
});

onMounted(() => {
  const intervalId = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % imagesKeys.length;
  }, 1500);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
</script>