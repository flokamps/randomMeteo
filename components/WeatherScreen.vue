<template>
  <div class="flex flex-col">
    <div id="weatherIcon" class="flex justify-end relative overflow-hidden h-96">
      <img class="absolute cover-enter-active" :src="props.weather.cover" alt="Weather cover" />
    </div>
    <div id="texts" class="flex-col flex texts-enter-active pl-5">
      <div id="temperature">
        <p class="font-bold text-8xl">{{ Math.round(props.temperature) }}°</p>
      </div>
      <div class="flex items-center" id="weatherDescription">
        <img :src="props.weather.icon" alt="Rain" />
        <p class="ml-1 font-light text-base">{{ props.weather.credo }}</p>
      </div>
      <div id="city">
        <p class="font-bold text-5xl">{{ props.city }}</p>
      </div>
      <div id="cityDescription" class="py-5">
        <p class="font-light pr-5">{{ props.description.length > 150 ? props.description.slice(0, 150) : props.description }}... <a v-if="props.wikiLink" :href="props.wikiLink" class="font-bold" :style="{ color: weather.moreFont }">en savoir plus</a></p>
      </div>
    </div>
    <div ref="swipeElement" id="swipe" class="mt-auto mb-6 fixed bottom-0 w-full">
      <div id="baseSwap" class="flex flex-col font-bold items-center swipe-enter-active w-full">
        <p>Glisser pour voyager</p>
        <img :src="swipe"  alt="Swipe icon" class="swipe opacity-80 h-12"/>
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
const handleScroll = () => {
  const windowHeight = window.innerHeight;

  const scrollDistance = mainDiv.value.scrollTop;

  if (scrollDistance >= windowHeight) {
    emit('reload');
  }

  swipeElement.value.style.transform = `translateY(${scrollDistance / 5}px)`;
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
</script>