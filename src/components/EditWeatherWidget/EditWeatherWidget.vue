<template>
  <div>
    <input type="text" v-model="newCity" placeholder="Enter city name" />
    <button @click="addCity">Add City</button>
    <draggable :list="cities" :options="{ handle: '.drag-handle' }">
      <template #item="{ element }">
        <div :key="element">
          <div class="drag-handle">☰</div>
          <div>
            {{ element }}
            <button @click="removeCity(cities.indexOf(element))">Remove</button>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'

export default {
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
    removeCity(index) {
      this.cities.splice(index, 1)
      this.$emit('update:cities', this.cities)
    },
  },
};
</script>

<style scoped>

</style>
