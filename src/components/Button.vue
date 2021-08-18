<template>
  <div class="header-item custom-button" @click="callback">
    <img :src="require('@/assets/img/' + src)" />{{ name }}
  </div>
</template>

<script>
import { buttonTypeEnum } from "@/common/enums/buttonTypeEnum";

export default {
  name: "Button",
  props: {
    type: { type: Number, required: true },
  },
  data() {
    return {
      buttonTypeEnum: buttonTypeEnum,
      name: "",
      src: "",
      callbackFunction: "",
    };
  },
  methods: {
    callback() {
      this.$emit(this.callbackFunction);
    },
  },
  created() {
    if (this.type == this.buttonTypeEnum.NewGame) {
      this.name = "New Game";
      this.src = "refresh.svg";
      this.callbackFunction = "newGame";
    } else {
      this.name = "Hint";
      this.src = "hint.svg";
      this.callbackFunction = "hint";
    }
  },
};
</script>
