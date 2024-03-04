<template>
  <div v-if="!loaded">
    <Loader />
  </div>
  <div v-else :style="{ backgroundImage: currentBackground, color: fontColor }" class="h-screen">
    <WeatherScreen
        :city="cityName"
        :temperature="temperature"
        :weather="weatherSpecs"
    />
  </div>
</template>
<script setup lang="ts">
import { icons } from "assets/img";
import { weatherIcons} from "assets/img/weather";

const loaded = ref(false);
const city = ref(null);
const weather = ref(null);
const cityName = ref("");
const temperature = ref(0);
const currentBackground = ref("");
const fontColor = ref("");
const isSunny = ref(false);
const weatherSpecs = ref(null);

const weatherProperty = {
  sunny: { bg: "linear-gradient(to bottom, #FFE79A, #FFFFFF)", font: '#51401F', credo: 'Ensoleillé', icon: icons.sun, cover: weatherIcons.sun },
  sunnyCloudy: { bg: "linear-gradient(to bottom, #C0DFFE, #FFFFFF)", font: '#1F3851', credo: 'Partiellement couvert', icon: icons.sunnyCloudy, cover: weatherIcons.sunnyCloudy },
  cloudy: { bg: "linear-gradient(to bottom, #C0DFFE, #FFFFFF)", font: '#1F3851', credo: 'Nuageux', icon: icons.clouds, cover: weatherIcons.clouds },
  snowy: { bg: "linear-gradient(to bottom, #FFFFFF, #FFFFFF)", font: '#000000', credo: 'Chutes de neige', icon: icons.snow, cover: weatherIcons.snow },
  thunderstorm: { bg: "linear-gradient(to bottom, #FFE79A, #FFFFFF)", font: '#51401F', credo: 'Orageux', icon: icons.bolt, cover: weatherIcons.thunderstorm },
  rainy: { bg: "linear-gradient(to bottom, #C0DFFE, #FFFFFF)", font: '#1F3851', credo: 'Averses', icon: icons.rain, cover: weatherIcons.rain },
};

async function loadData() {
  city.value = await getRandomCity(getRandomInt(100));
  while (city.value.city.length >= 11) {
    city.value = await getRandomCity(getRandomInt(100));
  }
  weather.value = await getCityWeather(city.value.latitude.toString(), city.value.longitude.toString());

  cityName.value = city.value.city;
  temperature.value = weather.value.current.temperature_2m;

  determineWeather();

  await new Promise(resolve => setTimeout(resolve, 3000));
  loaded.value = true;
}

function determineWeather() {
  const weatherCode = weather.value.current.weather_code;

  if (weatherCode <= 2) {
    isSunny.value = true;
    currentBackground.value = weatherProperty.sunny.bg;
    fontColor.value = weatherProperty.sunny.font;
    weatherSpecs.value = weatherProperty.sunny;
  } else if (weatherCode <= 28) {
    currentBackground.value = weatherProperty.snowy.bg;
    fontColor.value = weatherProperty.snowy.font;
    weatherSpecs.value = weatherProperty.snowy;
  } else if (weatherCode == 29) {
    currentBackground.value = weatherProperty.thunderstorm.bg;
    fontColor.value = weatherProperty.thunderstorm.font;
    weatherSpecs.value = weatherProperty.thunderstorm;
  } else if (weatherCode <= 99) {
    currentBackground.value = weatherProperty.rainy.bg;
    fontColor.value = weatherProperty.rainy.font;
    weatherSpecs.value = weatherProperty.rainy;
  }

  if (weatherCode <= 19 && weatherCode >= 2) {
    currentBackground.value = isSunny.value ? weatherProperty.sunnyCloudy.bg : weatherProperty.cloudy.bg;
    weatherSpecs.value = isSunny.value ? weatherProperty.sunnyCloudy : weatherProperty.cloudy;
  }
}

onMounted(() => {
  loadData();
});
</script>