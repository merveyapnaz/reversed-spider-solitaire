<template>
  <about-game @startGame="startGame" />
</template>

<script>
import AboutGame from "@/components//AboutGame/AboutGame";
export default {
  name: "About",
  components: {
    "about-game": AboutGame,
  },
  methods: {
    startGame() {
      this.$router.push("/SpiderSolitaire");
    },
  },
};
</script>

<style></style>
