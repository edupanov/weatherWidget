<template>
<WeatherWidgetList/>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import WeatherWidgetList from "../../components/WeatherWidgetList/WeatherWidgetList.vue";

export default defineComponent({
  name: 'MainView',
  components: {WeatherWidgetList},
})
</script>

<style lang="scss" scoped>
</style>
