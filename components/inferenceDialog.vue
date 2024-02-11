<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    width="800"
    activator="parent"
  >
    <v-sheet
      class="!px-6 !py-6 relative h-full !flex flex-column gap-4 text-light-on-surface"
    >
      <div v-if="isLoading" class="flex justify-between items-center">
        <div>Computing objects ...</div>
        <div>
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </div>
      <baseForm v-else use-for-inference @form-submited="sendRequestHandler">
        <template #close>
          <Transition>
            <span v-if="imageMisses" class="mt-2 text-red-500 font-mono text-sm"
              >you have to upload min 1 image</span
            >
          </Transition>
          <v-btn variant="text" @click="showDialog = false"> close </v-btn>
        </template>
      </baseForm>
    </v-sheet>
  </v-dialog>
</template>

<script setup>
import { useVModel } from "@vueuse/core";
import { inference } from "../services/inference.js";
import { useInferenceStore } from "~/pinia/useInferenceStore";

const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);
const showDialog = useVModel(props, "modelValue", emit);

const imageMisses = ref(false);

const inferenceStore = useInferenceStore();
const isLoading = ref(false);

const sendRequestHandler = async (data) => {
  if (data.image === null && data.image_secondary === null) {
    imageMisses.value = true;

    setTimeout(() => {
      imageMisses.value = false;
    }, 3000);

    return;
  }

  const formData = new FormData();
  formData.append("config", data.config);

  if (data.image !== null) {
    formData.append("image", data.image);
  }

  if (data.image_secondary !== null) {
    formData.append("image_secondary", data.image_secondary);
  }

  try {
    isLoading.value = true;
    const response = await inference(formData);
    inferenceStore.setResponse(response);
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
  }

  navigateTo({ path: "/inference" });
};
</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
