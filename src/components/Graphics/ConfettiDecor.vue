<template>
  <canvas ref="confettiCanvas"></canvas>
</template>

<script>
import confetti from "canvas-confetti";

export default {
  mounted() {
    this.confetti();
  },
  methods: {
    confetti() {
      // Confetti animation logic using canvas-confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // After 5 seconds, remove the confetti canvas
      setTimeout(() => {
        this.$refs.confettiCanvas.style.display = "none";
      }, 5000);
    },
  },
};
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
