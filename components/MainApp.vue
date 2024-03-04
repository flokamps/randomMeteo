<template>
  <div v-if="!loaded">
    <Loader />
  </div>
  <div v-else :style="{ backgroundImage: currentBackground }" class="h-screen">
    <WeatherScreen
        :city="cityName"
        :temperature="temperature"
        :isSunny="isSunny"
        :isCloudy="isCloudy"
        :isRainy="isRainy"
        :isThunderStorm="isThunderStorm"
        :isSnowy="isSnowy"
    />
  </div>
</template>
<script setup lang="ts">
const loaded = ref(false);
const city = ref(null);
const weather = ref(null);
const cityName = ref("");
const temperature = ref(0);
const currentBackground = ref("");
const isSunny = ref(false);
const isCloudy = ref(false);
const isRainy = ref(false);
const isThunderStorm = ref(false);
const isSnowy = ref(false);

const backgroundGradients = {
  sunny: "linear-gradient(to bottom, #FFE79A, #FFFFFF)",
  sunnyCloudy: "linear-gradient(to bottom, #C0DFFE, #FFFFFF)",
  cloudy: "linear-gradient(to bottom, #FFE79A, #FFFFFF)",
  snowy: "linear-gradient(to bottom, #FFFFFF, #FFFFFF)",
  thunderstorm: "linear-gradient(to bottom, #FFE79A, #FFFFFF)",
  rainy: "linear-gradient(to bottom, #C0DFFE, #FFFFFF)",
};

async function loadData() {
  city.value = await getRandomCity(getRandomInt(1000));
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
    currentBackground.value = backgroundGradients.sunny;
  } else if (weatherCode <= 28) {
    isSnowy.value = true;
    currentBackground.value = backgroundGradients.snowy;
  } else if (weatherCode == 29) {
    isThunderStorm.value = true;
    currentBackground.value = backgroundGradients.thunderstorm;
  } else if (weatherCode <= 99) {
    isRainy.value = true;
    currentBackground.value = backgroundGradients.rainy;
  }

  if (weatherCode <= 19 && weatherCode >= 2) {
    isCloudy.value = true;
    currentBackground.value = isSunny.value ? backgroundGradients.sunnyCloudy : backgroundGradients.cloudy;
  }
}

onMounted(() => {
  loadData();
});
</script>