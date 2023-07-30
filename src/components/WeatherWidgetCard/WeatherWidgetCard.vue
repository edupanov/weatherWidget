<template>
  <div class="card-wrapper">
    <div class="card-loading" v-if="isLoading">Loading...</div>
    <div class="card-error" v-else-if="hasError">Error: {{ errorMessage }}</div>
    <div v-else class="card-content">
      <h2 class="card-content__location">{{ location }}</h2>
      <div class="card-content__description-wrapper">
        <p class="card-content__description">{{ description }}</p>
        <img class="card-content__img" :src="imageUrl" alt="description image">
      </div>
      <p class="card-content__temperature">Temperature: {{ temperature }} °C</p>
      <p class="card-content__humidity">Humidity: {{ humidity }}%</p>
      <p class="card-content__visibility">Visibility: {{ visibility }} km</p>
      <div class="card-content__wind-wrapper">
        <p class="card-content__windSpeed">Wind: {{ windSpeed }} m/s</p>
        <p class="card-content__windDegree">Wind Direction:</p>
        <p class="card-content__windDegree-arrow" :style="{ transform: windDegree }">&#129045;</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {WeatherWidgetInterface} from "../../interfaces/WeatherWidgetInterface";

export default {
  name: "WeatherWidgetCard",
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      error: '',
      weatherData: {} as WeatherWidgetInterface,
      imageUrl: '',
    };
  },
  computed: {
    isLoading() {
      return this.loading;
    },
    hasError() {
      return !!this.error;
    },
    errorMessage() {
      return this.error;
    },
    location() {
      return this.weatherData ? `${this.weatherData.name}, ${this.weatherData.sys.country}` : '';
    },
    description() {
      return this.weatherData ? this.weatherData.weather[0].description : '';
    },
    temperature() {
      return this.weatherData ? this.weatherData.main.temp : '';
    },
    humidity() {
      return this.weatherData ? this.weatherData.main.humidity : '';
    },
    visibility() {
      return this.weatherData ? this.weatherData.visibility / 1000 : '';
    },
    windSpeed() {
      return this.weatherData ? this.weatherData.wind.speed : '';
    },
    windDegree() {
      return this.weatherData ? `rotate(${this.weatherData.wind.deg}deg)` : '';
    },
  },
  methods: {
    async getWeatherData(city: string) {
      this.loading = true;
      this.error = '';
      try {
        const apiKey = '68ec2fed9685015b648069f53e3b485c';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        this.weatherData = response.data;
        this.imageUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        this.loading = false;
      } catch (error) {
        this.error = 'Failed to fetch weather data';
        this.loading = false;
      }
    },
  },
  watch: {
    city: {
      immediate: true,
      handler(newCity: string) {
        // @ts-ignore
        this.getWeatherData(newCity);
      },
    },
  },
};
</script>

<style scoped>
@import "WeatherWidgetCard.scss";
</style>