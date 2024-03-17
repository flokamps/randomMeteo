<template>
  <div class="flex flex-col items-center">
    <div id="settings" class="absolute top-10 left-5 settings-enter-active">
      <img ref="settingsImage" :src="settings" alt="Settings"/>
    </div>
    <div id="weatherIcon" class="flex justify-end relative overflow-hidden w-full h-1/3">
      <img class="absolute cover-enter-active max-h-full" :src="props.weather.cover" alt="Weather cover" />
    </div>
    <div id="texts" class="flex-col flex texts-enter-active pl-5">
      <div id="temperature">
        <p class="font-bold">{{ Math.round(props.temperature) }}°</p>
      </div>
      <div class="flex items-center" id="weatherDescription">
        <img :src="props.weather.icon" alt="Rain" />
        <p class="ml-1 font-light text-base">{{ props.weather.credo }}</p>
      </div>
      <div id="city">
        <p class="font-bold">{{ props.city }}</p>
      </div>
      <div id="cityDescription" class="py-5">
        <p class="font-light pr-5">{{ props.description.length > 150 ? props.description.slice(0, 150) : props.description }}... <a v-if="props.wikiLink" :href="props.wikiLink" class="font-bold" :style="{ color: weather.moreFont }">en savoir plus</a></p>
      </div>
    </div>
    <div ref="swipeElement" id="swipe" class="mt-auto fixed bottom-0 mb-6">
      <div id="baseSwap" class="flex flex-col font-bold items-center swipe-enter-active w-full">
        <p>Glisser pour voyager</p>
        <img :src="swipe"  alt="Swipe icon" class="swipe opacity-80"/>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  city: String,
  temperature: Number,
  weather: Object,
  description: String,
  wikiLink: String,
});
const emit = defineEmits(['reload'])

const mainDiv = inject('mainDiv');

const swipeElement = ref(null);
const settingsImage = ref(null);
const handleScroll = () => {
  const windowHeight = window.visualViewport.height;

  const scrollDistance = mainDiv.value.scrollTop;

  if (scrollDistance >= windowHeight) {
    emit('reload');
  }

  swipeElement.value.style.transform = `translateY(${scrollDistance / 5}px)`;
  settingsImage.value.style.transform = `translateX(-${scrollDistance / 5}px)`;
};

onMounted(() => {
  if (!swipeElement.value || !mainDiv.value) return;
  mainDiv.value.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  if (!mainDiv.value) return;
  mainDiv.value.removeEventListener('scroll', handleScroll);
});

import swipe from "~/assets/img/swipe.svg";
import settings from "~/assets/img/settings.svg";
</script>