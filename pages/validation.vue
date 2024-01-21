<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="flex gap-6">
      <div class="h-full w-2/3">
        <img :src="path" class="w-2/3 flex-1 h-full" />
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
