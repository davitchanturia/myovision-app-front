<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="flex gap-6">
      <div class="h-full w-2/3">
        <canvas ref="canvasTemplate" width="1000" height="900" />
        <!-- <img :src="path" class="w-2/3 flex-1 h-full" /> -->
      </div>

      <div class="flex flex-col justify-evenly gap-3 w-1/3 h-full">
        <v-btn class="w-24" @click="sendMessage"> x </v-btn>
        <v-btn class="w-24"> success </v-btn>
        <v-btn class="w-24"> undo </v-btn>
        <v-btn class="w-24"> skip </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useValidationStore } from "~/pinia/useValidationStore";

const validationStore = useValidationStore();

const config = useRuntimeConfig();
const path = config.public.backendBase + validationStore?.response.image_path;

const socket = ref(null);

const canvasTemplate = ref();
const canvasCtx = ref();

onBeforeMount(() => {
  const validationStore = useValidationStore();

  const url =
    config.public.websocketBase + validationStore.response?.image_hash;

  socket.value = new WebSocket(url);
});

onMounted(() => {
  if (socket.value) {
    socket.value.onmessage = function (event) {
      handleMessage(event);
    };
  }

  // canvas

  const canvas = canvasTemplate.value;
  canvasCtx.value = canvas.getContext("2d", { willReadFrequently: true });

  const img = new Image();
  img.src = path;
  img.crossOrigin = "Anonymous";

  const data = JSON.parse(`
  {
      "roi_coords": [
      [563, 290], [562, 292], [561, 294], [560, 297], [559, 299], [558, 302],
      [556, 304], [552, 304], [550, 304], [547, 303], [544, 302], [542, 300],
      [541, 298], [539, 296], [539, 294], [539, 292], [538, 290], [538, 287],
      [538, 285], [539, 283], [540, 280], [542, 278], [544, 275], [546, 273],
      [550, 270], [554, 269], [558, 269], [562, 271], [564, 275], [565, 279],
      [565, 283], [564, 287]
      ]
  }
  `);

  img.onload = () => {
    canvasCtx.value.drawImage(img, 0, 0, canvas.width, canvas.height);

    const img_data = canvasCtx.value.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    );

    for (let i = 0; i < data?.roi_coords.length; i++) {
      const x = data.roi_coords[i][0];
      const y = data.roi_coords[i][1];

      const index = (y * img_data.width + x) * 4;
      img_data.data[index] = 255; // red
      img_data.data[index + 1] = 0; // green
      img_data.data[index + 2] = 0; // blue
      img_data.data[index + 3] = 255; // alpha
      console.log(img_data);
    }
    canvasCtx.value.putImageData(img_data, 0, 0);
  };
});

const sendMessage = () => {
  if (socket.value !== null && socket.value.readyState === WebSocket.OPEN) {
    socket.value.send(0);
  }
};

const handleMessage = (event) => {
  console.log("Received message:", event.data);
  // Add your logic to handle the received message here
};
</script>
