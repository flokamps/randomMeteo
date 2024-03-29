<template>
  <div class="flex flex-col items-center">
    <div id="settings" class="absolute top-10 left-5 settings-enter-active z-10" @click="handleClick">
      <img ref="settingsImage" :src="settings" alt="Settings"/>
    </div>
    <div ref="settingsInterface"
         class="rounded-2xl	absolute hidden top-10 left-5 w-9/10 h-9/10 z-10 settings-interface-active flex flex-col items-center"
         id="settingsInterface">
      <div class="flex-auto flex flex-col justify-evenly">
        <div class="persona-link">
          <h5 class="text-3xl font-bold">Florian Kamps</h5>
          <div class="socials py-5">
            <a href="https://www.linkedin.com/in/florian-kamps/"><img :src="socials.linkedin" alt="Linkedin"></a>
            <a href="https://github.com/flokamps"><img :src="socials.github" alt="Github"></a>
            <a href="https://twitter.com/rootmeih"><img :src="socials.twitter" alt="Twitter"></a>
          </div>
        </div>
        <div class="persona-link">
          <h5 class="text-3xl font-bold">BastiUI</h5>
          <div class="socials py-5">
            <a href="https://www.youtube.com/@BastiUi"><img :src="socials.youtube" alt="Youtube"></a>
            <a href="https://www.linkedin.com/in/bastienmarecaux/"><img :src="socials.linkedin" alt="Linkedin"></a>
            <a href="https://www.figma.com/@bastiui"><img :src="socials.figma" alt="Figma"></a>
            <a href="https://www.twitch.tv/bastiui"><img :src="socials.twitch" alt="Twitch"></a>
          </div>
        </div>
        <p class="mx-5 text-xs">Dessiné par BastUI, développé par Florian Kamps</p>
      </div>
      <div id="interfaceClose" class="mt-auto mb-10 bg-red-500 text-white p-5 rounded-full" @click="handleClose">
        <img :src="cross" alt="Close"/>
      </div>
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
    <div ref="swipeElement" id="swipe" class="mt-auto fixed bottom-0 mb-6 pointer-events-none">
      <div id="baseSwap" class="flex flex-col font-bold items-center swipe-enter-active w-full">
        <p>Glisser pour voyager</p>
        <img :src="swipe"  alt="Swipe icon" class="swipe opacity-80"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import swipe from "~/assets/img/swipe.svg";
import settings from "~/assets/img/settings.svg";
import cross from "~/assets/img/cross.svg";
import { socials } from "~/assets/img/socials";

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
const settingsInterface = ref(null);
const handleScroll = () => {
  const windowHeight = window.visualViewport.height - 1;

  const scrollDistance = mainDiv.value.scrollTop;

  if (scrollDistance >= windowHeight) {
    emit('reload');
  }

  swipeElement.value.style.transform = `translateY(${scrollDistance / 5}px)`;
  settingsImage.value.style.transform = `translateX(-${scrollDistance / 5}px)`;
};

const handleClick = () => {
  settingsInterface.value.classList.remove('hidden');
}

const handleClose = () => {
  settingsInterface.value.classList.add('hidden');
}

onMounted(() => {
  if (!mainDiv.value) return;
  mainDiv.value.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  if (!mainDiv.value) return;
  mainDiv.value.removeEventListener('scroll', handleScroll);
});
</script>