<template>
  <div class="header-item new-game-btn" @click="newGame">
    <img src="../assets/img/refresh.svg" />New Game
  </div>
</template>

<script>
export default {
  name: "NewGameButton",
  methods: {
    newGame() {
      window.location.reload();
    },
  },
};
</script>
