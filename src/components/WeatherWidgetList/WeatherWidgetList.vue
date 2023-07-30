<template>
  <button @click="toggleWidgets">
    {{ showEditWidget ? "Show Weather Widget" : "Edit Weather Widget" }}
  </button>
  <div v-if="showEditWidget">
    <EditWeatherWidget :cities="cities" @update:cities="updateCities"/>
  </div>
  <div v-else v-for="(city, index) in cities" :key="index">
    <WeatherWidgetCard :city="city"/>
  </div>
</template>

<script>

import WeatherWidgetCard from "../WeatherWidgetCard/WeatherWidgetCard.vue";
import EditWeatherWidget from "../EditWeatherWidget/EditWeatherWidget.vue";

export default {
  name: "WeatherWidgetList",
  components: {EditWeatherWidget, WeatherWidgetCard},
  data() {
    return {
      cities: ['gomel'],
      showEditWidget: false,
    };
  },
  methods: {
    toggleWidgets() {
      this.showEditWidget = !this.showEditWidget
    },
    updateCities(newCities) {
      this.cities = newCities
    },
  },
}
</script>

<style scoped>

</style>