<template>
  <div class="flex flex-col pl-5">
    <div id="weatherIcon" class="flex justify-end relative overflow-hidden">
      <img class="absolute cover-enter-active" :src="props.weather.cover" alt="Weather cover" />
    </div>
    <div id="texts" class="flex-col flex texts-enter-active">
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