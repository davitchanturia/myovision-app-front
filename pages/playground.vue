<template>
  <canvas id="tutorial" width="150" height="150" />
</template>

<script>
definePageMeta({
  layout: false,
});

function draw() {
  const canvas = document.getElementById("tutorial");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
  }
}
draw();
// window.addEventListener("load", draw);
</script>

<style>
canvas {
  border: 1px solid black;
}
</style>
