<template>
  <div class="header-item">Time: {{ this.timer }}</div>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      hour: 0,
      minute: 0,
      second: 0,
    };
  },
  props: {
    isRunning: { type: Boolean, default: true },
  },
  computed: {
    timer() {
      return (
        this.checkTime(this.hour) +
        ":" +
        this.checkTime(this.minute) +
        ":" +
        this.checkTime(this.second)
      );
    },
  },
  methods: {
    setTimer() {
      if (this.second == 59) {
        this.second = 0;

        if (this.minute == 59) {
          this.minute = 0;
          this.hour++;
        } else {
          this.minute++;
        }
      } else {
        this.second++;
      }
    },
    checkTime(i) {
      // Add zero in front of numbers < 10
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    getTimerValue() {
      //Returns the current time in seconds
      return this.hour * 3600 + this.minute * 60 + this.second;
    },
  },
  created() {
    var self = this;

    setInterval(function () {
      //If timer not stopped
      if (self.isRunning) {
        self.setTimer();
      }
    }, 1000);
  },
};
</script>
