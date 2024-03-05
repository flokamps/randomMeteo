<template>
  <div class="flex flex-col">
    <div id="weatherIcon" class="flex justify-end relative overflow-hidden">
      <img class="absolute cover-enter-active" :src="props.weather.cover" alt="Weather cover" />
    </div>
    <div id="texts" class="flex-col flex texts-enter-active pl-5">
      <div id="temperature">
        <p class="font-bold">{{ Math.round(props.temperature) }}°</p>
      </div>
      <div class="flex items-center" id="weatherDescription">
        <img :src="props.weather.icon" alt="Rain" />
        <p class="ml-1 font-light">{{ props.weather.credo }}</p>
      </div>
      <div id="city">
        <p class="font-bold">{{ props.city }}</p>
      </div>
      <div id="cityDescription">
        <p class="font-light">Montluçon est une commune française située dans le centre de la France, sous-préfecture du département de l'Allier dans la région Auvergne-Rhône-Alpes...</p>
      </div>
    </div>
    <div ref="swipeElement" id="swipe" class="flex flex-col font-bold items-center mt-auto mb-6 swipe-enter-active fixed bottom-0 w-full">
      <p>Glisser pour voyager</p>
      <img :src="swipe"  alt="Swipe icon" class="swipe opacity-80"/>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  city: String,
  temperature: Number,
  weather: Object,
});

const mainDiv = inject('mainDiv');

const swipeElement = ref(null);
const handleScroll = () => {

  const scrollDistance = mainDiv.value.scrollTop;

  swipeElement.value.style.transform = `translateY(${scrollDistance / 5}px)`;
  swipeElement.value.style.transition = 'transform 0.3s ease-out';
};

onMounted(() => {
  swipeElement.value.classList.remove('swipe-enter-active');
  mainDiv.value.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  mainDiv.value.removeEventListener('scroll', handleScroll);
});

import swipe from "~/assets/img/swipe.svg";
console.log(props.city, props.temperature);
</script>