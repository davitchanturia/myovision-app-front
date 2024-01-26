<template>
  <div class="overflow-y-hidden max-w-[1300px] mx-auto">
    <div class="grid grid-cols-6 gap-10 w-full mx-auto h-full my-10">
      <div class="h-[760px] !overflow-hidden col-span-4">
        <canvas
          v-show="!canvasIsLoading"
          ref="canvasTemplate"
          style="border: 1px solid black"
        />
        <div v-if="canvasIsLoading">Image is loading ...</div>
      </div>
      <div class="col-span-2">
        <v-btn @click="sendMessage({ x: 700, y: 350 })"> click </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInferenceStore } from "~/pinia/useInferenceStore";

const inferenceStore = useInferenceStore();

const config = useRuntimeConfig();

const canvasTemplate = ref();
const canvasCtx = ref();

const socket = ref(null);

const canvasIsLoading = ref(false);

definePageMeta({
  middleware: ["redirect-if-not-inferenced"],
});

onBeforeMount(() => {
  const inferenceStore = useInferenceStore();

  const url =
    config.public.websocketBase +
    "inference/" +
    inferenceStore.response?.image_hash +
    "/" +
    inferenceStore.response?.image_secondary_hash;

  socket.value = new WebSocket(url);
});

onMounted(() => {
  const canvas = canvasTemplate.value;
  canvasCtx.value = canvas.getContext("2d", { willReadFrequently: true });

  const path = config.public.backendBase + inferenceStore?.response.image_path;

  canvasIsLoading.value = true;

  const img = new Image();
  img.src = path;
  img.crossOrigin = "Anonymous";

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    canvasCtx.value.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  canvasIsLoading.value = false;

  if (socket.value) {
    socket.value.onmessage = async (event) => {
      await handleMessage(event);
    };
  }
});

const sendMessage = (data) => {
  const updatedData = JSON.stringify({ x: data.x, y: data.y });
  if (socket.value !== null && socket.value.readyState === WebSocket.OPEN) {
    socket.value.send(updatedData);
  }
};

const handleMessage = async (event) => {
  console.log(event);
};
</script>
