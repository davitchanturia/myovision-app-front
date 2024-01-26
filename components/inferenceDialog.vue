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
      <baseForm use-for-inference @form-submited="sendRequestHandler">
        <template #close>
          <Transition>
            <span v-if="imageMisses" class="mt-1 text-red-500"
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

const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);
const showDialog = useVModel(props, "modelValue", emit);

const imageMisses = ref(false);

const sendRequestHandler = async (data) => {
  if (data.image !== null || data.image_secondary) {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("image_secondary", data.image_secondary);
    formData.append("config", data.config);

    await inference(formData);
  }

  imageMisses.value = true;

  setTimeout(() => {
    imageMisses.value = false;
  }, 3000);
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
