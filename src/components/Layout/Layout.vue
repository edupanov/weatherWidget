<template>
  <div class="layoutWrapper">
    <div class="container">
      <div class="mainBlockContainer">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
};
</script>

<style lang="scss" scoped>
  @import 'Layout';
</style>
