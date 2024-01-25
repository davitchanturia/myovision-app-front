<template>
  <div>{{ inferenceStore.response?.image_hash }}</div>
</template>

<script setup>
import { useInferenceStore } from "~/pinia/useInferenceStore";

const inferenceStore = useInferenceStore();

const config = useRuntimeConfig();

const socket = ref(null);

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
    inferenceStore.response?.secondary_image_hash;

  socket.value = new WebSocket(url);
});

onMounted(() => {
  console.log(socket.value);
  if (socket.value) {
    socket.value.onmessage = function (event) {
      console.log(socket.value.readyState);
    };
  }
});

const sendMessage = (param) => {
  if (socket.value !== null && socket.value.readyState === WebSocket.OPEN) {
    socket.value.send(param);
  }
};
</script>
