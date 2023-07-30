<template>
  <div class="city-list">
    <input type="text" v-model="newCity" class="city-list__input" placeholder="Enter city name" />
    <button @click="addCity" class="city-list__add-button">Add location</button>
    <draggable
        :list="cities"
        :options="{ handle: '.city-list__drag-handle' }"
        class="city-list__draggable"
    >
      <template #item="{ element }">
        <div :key="element" class="city-list__item">
          <div class="city-list__drag-handle">☰</div>
          <div class="city-list__item-content">
            {{ element }}
          </div>
          <button @click="removeCity(cities.indexOf(element))" class="city-list__remove-button">x</button>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'

export default {
  name: "EditWeatherWidget",

  components: {
    draggable,
  },
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newCity: '',
    };
  },
  methods: {
    addCity() {
      if (this.newCity.trim() !== '') {
        this.cities.push(this.newCity.trim())
        this.newCity = ''
        this.$emit('update:cities', this.cities)
      }
    },
    removeCity(index: number) {
      this.cities.splice(index, 1)
      this.$emit('update:cities', this.cities)
    },
  },
};
</script>

<style scoped>
@import "EditWeatherWidget.scss";
</style>
