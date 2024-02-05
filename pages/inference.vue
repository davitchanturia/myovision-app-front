<template>
  <NuxtLayout name="page">
    <template #canvas>
      <canvas
        v-show="!canvasIsLoading"
        ref="canvasTemplate"
        style="border: 1px solid black"
        @click="getCursorPosition"
      />
      <div v-if="canvasIsLoading">Image is loading ...</div>
    </template>

    <template #rightSide>
      <div class="flex flex-col justify-between h-full">
        <div>
          <div v-if="noResult === true" class="font-mono text-sm">
            Myotube not found.
          </div>

          <inferenceDataViewer
            v-else-if="noResult === false"
            :myotube-data="myotubeData"
            :clusters-data="clusterData"
          />

          <div v-if="noResult === null">
            Click on a Myotube on the image to retrieve data.
          </div>
        </div>

        <infoDialog>
          <div class="font-semibold">General Info:</div>
          <div
            class="w-full grid grid-cols-2 gap-1 font-this text-sm border !border-black p-4 rounded-lg mt-2"
          >
            <div
              v-for="(generalInfoItem, i) in inferenceStore.generalInfoValue"
              :key="i"
              class="col-span-1"
            >
              <b>{{ updatedLabel(generalInfoItem.label) }}:</b>
              {{ generalInfoItem.value }}
            </div>
          </div>
        </infoDialog>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { convertJsonToArray } from "../helpers/array";
import { useInferenceStore } from "~/pinia/useInferenceStore";

const config = useRuntimeConfig();

const canvasTemplate = ref();
const canvasCtx = ref();

const socket = ref(null);

const inferenceStore = useInferenceStore();

console.log(inferenceStore.responseValue.value?.general_info);

const canvasIsLoading = ref(false);

const myotubeData = ref({});
const clusterData = ref({});

const noResult = ref(null);

definePageMeta({
  middleware: ["redirect-if-not-inferenced"],
});

onBeforeMount(() => {
  const inferenceStore = useInferenceStore();

  const url =
    config.public.websocketBase +
    "inference/" +
    inferenceStore.responseValue.value?.image_hash +
    "/" +
    inferenceStore.responseValue.value?.image_secondary_hash;

  socket.value = new WebSocket(url);
});

onMounted(() => {
  const inferenceStore = useInferenceStore();

  const canvas = canvasTemplate.value;
  canvasCtx.value = canvas.getContext("2d", { willReadFrequently: true });

  const path =
    config.public.backendBase + inferenceStore?.responseValue.value?.image_path;

  canvasIsLoading.value = true;

  const img = new Image();
  img.src = path;
  img.crossOrigin = "Anonymous";

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    canvasCtx.value.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.style.transform = `scale(${750 / canvas.width}, ${
      750 / canvas.height
    })`;
    canvas.style.transformOrigin = "top left";
  };

  canvasIsLoading.value = false;

  if (socket.value) {
    socket.value.onmessage = async (event) => {
      await handleMessage(event);
    };
  }
});

const sendMessage = async (x, y) => {
  const updatedData = JSON.stringify({ x, y });

  if (socket.value !== null && socket.value.readyState === WebSocket.OPEN) {
    await socket.value.send(updatedData);
  }
};

const getCursorPosition = (event) => {
  const rect = canvasTemplate.value.getBoundingClientRect();
  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(event.clientY - rect.top);

  const updatedX = x / (750 / canvasTemplate.value.width);
  const updatedY = y / (750 / canvasTemplate.value.height);

  sendMessage(updatedX, updatedY);
};

const handleMessage = async (event) => {
  const parsedData = JSON.parse(event.data);

  if (parsedData?.info_data?.myotube === null) {
    noResult.value = true;
    return;
  }
  noResult.value = false;

  myotubeData.value = convertJsonToArray(parsedData?.info_data?.myotube);
  clusterData.value = parsedData?.info_data?.clusters.map((element) =>
    convertJsonToArray(element),
  );
};

const updatedLabel = (label) => {
  return label.replace("_", " ");
};
</script>
