<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <div>
        <h2>{{ `${weatherData.name}, ${weatherData.sys.country}`}}</h2>
        <p>{{ weatherData.weather[0].description }}</p>
        <img :src="imageUrl" alt="description image">
        <p>Temperature: {{ weatherData.main.temp }} °C</p>
        <p>Humidity: {{ weatherData.main.humidity }}%</p>
        <p>visibility: {{ weatherData.visibility/1000 }} km</p>
        <p>Wind: {{ weatherData.wind.speed }} m/s</p>
        <p>Wind: {{ weatherData.wind.deg }} градусы для поворота стрелки</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
      weatherData: null,
      imageUrl: null
    };
  },
  watch: {
    city: {
      immediate: true,
      handler(newCity) {
        this.getWeatherData(newCity);
      },
    },
  },
  methods: {
    async getWeatherData(city) {
      this.loading = true;
      this.error = '';
      try {
        const apiKey = '68ec2fed9685015b648069f53e3b485c';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        console.log(response.data)
        this.weatherData = response.data;
        this.imageUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        this.loading = false;
      } catch (error) {
        this.error = 'Failed to fetch weather data';
        this.loading = false;
      }
    },
  },

}
</script>

<style scoped>

</style>