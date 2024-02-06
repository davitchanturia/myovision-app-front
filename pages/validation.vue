<template>
  <NuxtLayout name="page">
    <template #canvas>
      <div v-if="canvasIsLoading">Image is loading ...</div>
      <canvas v-show="!canvasIsLoading" ref="canvasTemplate" />
    </template>

    <template #rightSide>
      <div class="flex flex-col justify-between h-full">
        <div>
          <div class="grid grid-cols-2 gap-2 w-full font-mono">
            <fileUploader
              v-model="uploadFileVal"
              :required="false"
              class="col-span-1"
              button-text="upload"
              :show-file-name="false"
              @upload:file="uploadFileHandler"
            />
            <v-btn
              variant="text"
              class="col-span-1 mt-1 !capitalize"
              @click="downloadDataHandler"
            >
              download
            </v-btn>
          </div>

          <validationActions class="mt-10" @update:action="actionHandler" />

          <canvasDetails class="mt-10" />
        </div>

        <infoDialog>
          The validation page provides a way to collect labelled data by
          interactively verifying model predictions. The contours are displayed
          one after the other allowing the user to classify each contour using 4
          different actions
        </infoDialog>
      </div>

      <validationIsDoneDialog v-if="validationDone" />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useValidationStore } from "~/pinia/useValidationStore";
import { contourColor } from "../helpers/colors";
import {
  getContours,
  downloadData,
  uploadContours,
} from "../services/validation.js";

definePageMeta({
  middleware: ["redirect-if-not-validated"],
});

const config = useRuntimeConfig();

const socket = ref(null);

const canvasTemplate = ref();
const canvasCtx = ref();

const canvasIsLoading = ref(false);

const activeCoordinates = ref();

const defaultImgSize = 750;

const downloadCoordsData = ref(null);

onBeforeMount(() => {
  const validationStore = useValidationStore();

  const url =
    config.public.websocketBase +
    "validation/" +
    validationStore.responseValue.value?.image_hash;

  socket.value = new WebSocket(url);
});

onMounted(async () => {
  const validationStore = useValidationStore();

  // canvas
  const canvas = canvasTemplate.value;
  canvasCtx.value = canvas.getContext("2d", { willReadFrequently: true });

  const path =
    config.public.backendBase +
    validationStore?.responseValue.value?.image_path;

  canvasIsLoading.value = true;

  const img = new Image();
  img.src = path;
  img.crossOrigin = "Anonymous";

  img.onload = async () => {
    canvas.width = img.width;
    canvas.height = img.height;

    await canvasCtx.value.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.style.transform = `scale(${defaultImgSize / canvas.width}, ${
      defaultImgSize / canvas.height
    })`;
    canvas.style.transformOrigin = "top left";
  };

  canvasIsLoading.value = false;

  // socket
  if (socket.value) {
    socket.value.onmessage = async (event) => {
      await handleMessage(event, canvas);
    };
  }

  const response = await getContours(
    validationStore.responseValue.value?.image_hash,
  );

  downloadCoordsData.value = response.value;
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

const sendMessage = async (param) => {
  if (socket.value !== null && socket.value.readyState === WebSocket.OPEN) {
    await socket.value.send(param);
  }
};

const actionHandler = (param) => {
  const color = contourColor(param);

  updateCanvas(activeCoordinates.value, canvasTemplate.value, color);

  sendMessage(param);
};

const validationDone = ref(false);

const handleMessage = async (event, canvas) => {
  const parsedData = JSON.parse(event.data);

  if (parsedData.contour_id === parsedData.total) {
    validationDone.value = true;
    return;
  }

  activeCoordinates.value = parsedData.roi_coords;

  const color = contourColor();

  updateCanvas(parsedData.roi_coords, canvas, color);
};

const downloadDataHandler = () => {
  downloadData(downloadCoordsData.value);
};

const uploadFileVal = ref(null);

const uploadFileHandler = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await uploadContours(formData);

  if (response.value?.batched_coords.length > 0) {
    const color = contourColor(1);

    response.value.batched_coords.forEach((element) => {
      updateCanvas(element, canvasTemplate.value, color);
    });
  }
};
</script>
