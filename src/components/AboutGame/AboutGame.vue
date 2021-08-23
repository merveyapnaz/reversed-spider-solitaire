<template>
  <div class="about-content">
    <div class="about">
      <h1>Reversed Spider Solitaire</h1>
      <hr />
      <ul>
        <li>
          Reversed spider solitaire is a card game played with 8 decks of cards.
          The cards are shuffled and laid face down, four sixes and six fives.
          The last card of each set is left face up. The remaining cards, on the
          other hand, are divided into groups of ten in the face down position
          and kept above.
        </li>
        <li>
          The order of cards should be as follows. A, 2, 3, 4, 5, 6, 7, 8 ,9
          ,10, J, Q, K
        </li>
        <li>
          With each card move, the card one below the move card is turned up.
        </li>
        <li>
          If there are no cards left to move, the first set of ten cards in the
          above undistributed deck is dealt face up.
        </li>
        <li>
          Each correctly sorted deck is vhoved from the screen and collected
          upwards.
        </li>
        <li>The game is won when each of the eight decks is completed.</li>
        <li>
          Hurry up, every second you spend will be deducted from your endgame
          score.
        </li>
      </ul>
    </div>

    <button class="header-item start-game" @click="startGame">
      Start Game !
    </button>
  </div>
</template>

<script>
export default {
  name: "AboutGame",
  methods: {
    startGame() {
      this.$emit("startGame");
    },
  },
};
</script>

<style scoped>
@import "./about-game.css";
</style>
