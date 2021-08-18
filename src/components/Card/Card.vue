<template>
  <div class="card-content">
    <div v-if="card.type == cardTypeEnum.Card">
      <div
        v-if="card.isOpen"
        class="card heart"
        :class="card.isSelected ? 'selected' : ''"
        draggable="true"
      >
        <div class="card-top">
          <div class="number">{{ card.cardNumber }}</div>

          <div class="symbol-small">{{ symbol }}</div>
        </div>
        <div class="symbol-large">{{ symbol }}</div>
      </div>
      <div v-else class="card down"></div>
    </div>
    <div
      v-else-if="card.type == cardTypeEnum.Distribute"
      class="card-distribute"
      :class="card.isSelected ? 'selected' : ''"
    ></div>
    <div
      v-else-if="card.type == cardTypeEnum.Holder"
      class="card-holder"
      draggable="true"
    ></div>
    <div v-else-if="card.type == cardTypeEnum.Complated" class="card heart">
      <div class="card-top">
        <div class="number">A</div>
        <div class="symbol-small">{{ symbol }}</div>
      </div>
      <div class="symbol-large">{{ symbol }}</div>
    </div>
  </div>
</template>

<script>
import { cardTypeEnum } from "@/common/enums/cardTypeEnum";
export default {
  name: "Card",
  props: {
    card: { type: Object, required: true },
  },
  watch: {
    card() {},
  },
  data() {
    return {
      symbol: "♥",
      cardTypeEnum: cardTypeEnum,
    };
  },
};
</script>

<style scoped>
@import "./card.css";
</style>
