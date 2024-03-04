<template>
  <div v-if="!loaded">
    <Loader />
  </div>
  <div v-else>
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
city.value = await getRandomCity(getRandomInt(1000));
const weather = ref(null);
weather.value = await getCityWeather(city.value.latitude.toString(), city.value.longitude.toString());
const cityName: String = city.value.city;
const temperature: Number = weather.value.current.temperature_2m;
const isSunny = ref(false);
const isCloudy = ref(false);
const isRainy = ref(false);
const isThunderStorm = ref(false);
const isSnowy = ref(false);
if (weather.value.current.weather_code <= 2) {
  isSunny.value = true;
} else if (weather.value.current.weather_code <= 19) {
  isCloudy.value = true;
} else if (weather.value.current.weather_code <= 28) {
  isSnowy.value = true;
} else if (weather.value.current.weather_code == 29) {
  isThunderStorm.value = true;
} else if (weather.value.current.weather_code <= 99) {
  isRainy.value = true;
}
loaded.value = true;
</script>