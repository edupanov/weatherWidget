<template>
  <div class="weather-widget-list">
    <button class="weather-widget-list__toggle-button" @click="toggleWidgets">
      {{ showEditWidget ? "Show Weather Widget" : "Configure the Widget" }}
    </button>
    <div v-if="showEditWidget" class="weather-widget-list__edit">
      <EditWeatherWidget :cities="cities" @update:cities="updateCities" />
    </div>
    <div v-else class="weather-widget-list__cards">
      <WeatherWidgetCard
          v-for="city in cities"
          :key="city"
          :city="city"
          class="weather-widget-list__card"
      />
    </div>
  </div>
</template>

<script lang="ts">
import WeatherWidgetCard from "../WeatherWidgetCard/WeatherWidgetCard.vue";
import EditWeatherWidget from "../EditWeatherWidget/EditWeatherWidget.vue";
import { getCurrentCityName } from "../../helpers/weatherListHelpers";

export default {
  name: "WeatherWidgetList",
  components: { EditWeatherWidget, WeatherWidgetCard },
  data() {
    return {
      cities: [] as Array<string>,
      showEditWidget: false,
    };
  },
  mounted() {
    this.loadCitiesFromLocalStorage();
    this.getCurrentCity();
  },
  methods: {
    toggleWidgets() {
      this.showEditWidget = !this.showEditWidget;
    },
    updateCities(newCities: any) {
      this.cities = newCities;
      this.saveCitiesToLocalStorage();
    },
    async getCurrentCity() {
      try {
        const city = await getCurrentCityName();
        if (city && !this.cities.includes(city)) {
          this.cities.push(city);
          this.saveCitiesToLocalStorage();
        }
      } catch (error) {
        console.error(error);
      }
    },
    saveCitiesToLocalStorage() {
      localStorage.setItem('cities', JSON.stringify(this.cities));
    },
    loadCitiesFromLocalStorage() {
      const storedCities = localStorage.getItem('cities');
      if (storedCities) {
        this.cities = JSON.parse(storedCities);
      }
    },
  },
};
</script><style scoped>
@import "WeatherWidgetList.scss";
</style>