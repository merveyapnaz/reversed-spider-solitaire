<template>
  <button class="header-item new-game-btn" @click="newGame">New Game</button>
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
