<template>
  <div class="header-item score-table">
    <img src="../assets/img/handGesture.svg" />{{ this.score }}
  </div>
</template>

<script>
export default {
  name: "ScoreTable",
  props: {
    score: { type: Number, default: 0 },
  },
};
</script>
