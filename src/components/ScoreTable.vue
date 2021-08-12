<template>
  <div class="header-item">
    <img src="../assets/img/hand-gesture.svg" />{{ this.score }}
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
