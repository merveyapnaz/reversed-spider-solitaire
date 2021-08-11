<template>
  <div>
    <div
      v-for="firework in 30"
      :class="'firework-' + firework"
      :key="firework"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Firework",
};
</script>

<style scoped>
@import "./firework.css";
</style>
