<template>
  <div class="weather-widget-list">
    <button class="weather-widget-list__toggle-button" @click="toggleWidgets">
      {{ showEditWidget ? "Show Weather Widget" : "Edit Weather Widget" }}
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

export default {
  name: "WeatherWidgetList",
  components: { EditWeatherWidget, WeatherWidgetCard },
  data() {
    return {
      cities: [],
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
    updateCities(newCities: string[]) {
      this.cities = newCities;
      this.saveCitiesToLocalStorage();
    },
    async getCurrentCity() {
      try {
        const position = await this.getCurrentPosition();
        const city = await this.getCityName(position.coords.latitude, position.coords.longitude);
        if (!this.cities.includes(city)) {
          this.cities.push(city);
          this.saveCitiesToLocalStorage();
        }
      } catch (error) {
        console.error(error);
      }
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
          reject(new Error('Geolocation is not supported by this browser.'));
        }
      });
    },
    async getCityName(latitude, longitude) {
      const apiKey = '68ec2fed9685015b648069f53e3b485c';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.name;
      } catch (error) {
        throw new Error('Failed to fetch city data from OpenWeatherMap.');
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
</script>

<style scoped>
@import "WeatherWidgetList.scss";
</style>