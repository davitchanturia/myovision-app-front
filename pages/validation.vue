<template>
  <div class="overflow-y-hidden max-w-[1300px] mx-auto">
    <div class="grid grid-cols-6 gap-10 w-full mx-auto h-full my-10">
      <div class="h-[760px] !overflow-hidden col-span-4">
        <canvas ref="canvasTemplate" style="border: 1px solid black" />
      </div>
      <validationActions class="col-span-2" @update:action="actionHandler" />
    </div>
  </div>
</template>

<script setup>
import { useValidationStore } from "~/pinia/useValidationStore";
import { contourColor } from "../helpers/colors";

definePageMeta({
  middleware: ["redirect-if-not-validated"],
});

const validationStore = useValidationStore();

const config = useRuntimeConfig();

const socket = ref(null);

const canvasTemplate = ref();
const canvasCtx = ref();

const activeCoordinates = ref();

const defaultImgSize = 750;

onBeforeMount(() => {
  const validationStore = useValidationStore();

  const url =
    config.public.websocketBase +
    "validation/" +
    validationStore.response?.image_hash;

  socket.value = new WebSocket(url);
});

onMounted(() => {
  // canvas
  const canvas = canvasTemplate.value;
  canvasCtx.value = canvas.getContext("2d", { willReadFrequently: true });

  const path = config.public.backendBase + validationStore?.response.image_path;

  const img = new Image();
  img.src = path;
  img.crossOrigin = "Anonymous";

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    canvasCtx.value.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // socket
  if (socket.value) {
    socket.value.onmessage = function (event) {
      handleMessage(event, canvas);
    };
  }
});

const updateCanvas = (coords, canvas, { red, green, blue }) => {
  const img_data = canvasCtx.value.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  );

  for (let i = 0; i < coords.length; i++) {
    const x = coords[i][0];
    const y = coords[i][1];

    const index = (y * img_data.width + x) * 4;
    img_data.data[index] = red; // red
    img_data.data[index + 1] = green; // green
    img_data.data[index + 2] = blue; // blue
    img_data.data[index + 3] = 255; // alpha
  }

  canvasCtx.value.putImageData(img_data, 0, 0);

  canvas.style.transform = `scale(${defaultImgSize / canvas.width}, ${
    defaultImgSize / canvas.height
  })`;
  canvas.style.transformOrigin = "top left";
};

const sendMessage = (param) => {
  if (socket.value !== null && socket.value.readyState === WebSocket.OPEN) {
    socket.value.send(param);
  }
};

const actionHandler = (param) => {
  const color = contourColor(param);

  updateCanvas(activeCoordinates.value, canvasTemplate.value, color);

  sendMessage(param);
};

const handleMessage = (event, canvas) => {
  const parsedData = JSON.parse(event.data);
  activeCoordinates.value = parsedData.roi_coords;

  const color = contourColor();

  updateCanvas(parsedData.roi_coords, canvas, color);
};
</script>
