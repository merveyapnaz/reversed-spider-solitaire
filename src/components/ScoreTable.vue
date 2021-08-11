<template>
  <div class="header-item">Score: {{ this.score }}</div>
</template>

<script>
export default {
  name: "ScoreTable",
  data() {
    return {
      score: 0,
      movePoint: 100,
      deckPoint: 500,
    };
  },
  props: {
    moveCount: { type: Number, default: 0 },
    deckCount: { type: Number, default: 0 },
    isGameEnd: { type: Boolean, default: false },
    timerValue: { type: Number, default: 0 },
  },
  watch: {
    moveCount() {
      this.calculateScore();
    },
    deckCount() {
      this.calculateScore();
    },
  },
  methods: {
    calculateScore() {
      this.score =
        this.moveCount * this.movePoint + this.deckCount * this.deckPoint;

      if (this.isGameEnd) {
        this.score -= this.timerValue;
      }
    },
  },
};
</script>
