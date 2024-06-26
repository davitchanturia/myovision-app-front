<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    width="800"
    min-height="400"
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
      <baseForm v-else @form-submited="sendRequestHandler">
        <template #close>
          <Transition>
            <span v-if="imageMisses" class="mt-2 text-red-500 font-mono text-sm"
              >You have to upload image</span
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
import { validate } from "../services/validation.js";
import { useValidationStore } from "~/pinia/useValidationStore";

const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);
const showDialog = useVModel(props, "modelValue", emit);

const validationStore = useValidationStore();

const imageMisses = ref(false);

const isLoading = ref(false);

const sendRequestHandler = async (data) => {
  if (data.image === null) {
    imageMisses.value = true;

    setTimeout(() => {
      imageMisses.value = false;
    }, 3000);

    return;
  }

  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("config", data.config);

  try {
    isLoading.value = true;
    const response = await validate(formData);
    validationStore.setResponse(response);
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
  }

  navigateTo({ path: "/validation" });
};
</script>
