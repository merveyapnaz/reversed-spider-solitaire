<template>
  <div class="confirm-modal">
    <div class="confirm-modal-text">
      {{ text }}
    </div>
    <div class="confirm-modal-buttons">
      <div class="confirm-btn-yes" @click="newGame">Yes</div>
      <div class="confirm-btn-no" @click="cancel">No</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    text: { type: String, default: "" },
  },
  methods: {
    newGame() {
      this.$emit("confirmModalResponse", true);
    },
    cancel() {
      this.$emit("confirmModalResponse", false);
    },
  },
};
</script>

<style scoped>
@import "./confirm-modal.css";
</style>
