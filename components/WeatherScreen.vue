<template>

</template>
<script setup>
const props = defineProps({
  city: String,
  temperature: Number
});
console.log(props.city, props.temperature);
</script>