<template>
  <div class="flex flex-col pl-5 h-screen">
    <div id="weatherIcon" class="flex justify-end relative overflow-hidden">
      <img class="absolute" :src="props.weather.cover" alt="Sunny and Cloudy" />
    </div>
    <div id="temperature">
      <p class="font-bold">{{ Math.round(props.temperature) }}°</p>
    </div>
    <div class="flex" id="weatherDescription">
      <img :src="props.weather.icon" alt="Rain" />
      <p class="ml-1 font-light">{{ props.weather.credo }}</p>
    </div>
    <div id="city">
      <p class="font-bold">{{ props.city }}</p>
    </div>
    <div id="cityDescription">
      <p class="font-light">Montluçon est une commune française située dans le centre de la France, sous-préfecture du département de l'Allier dans la région Auvergne-Rhône-Alpes...</p>
    </div>
    <div id="swipe" class="flex flex-col font-bold items-center mt-auto mb-6">
      <p>Glisser pour voyager</p>
      <img :src="swipe" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  city: String,
  temperature: Number,
  weather: Object,
});

import swipe from "~/assets/img/swipe.svg";
console.log(props.city, props.temperature);
</script>