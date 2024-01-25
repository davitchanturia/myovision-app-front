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
          <v-btn variant="text" @click="showDialog = false"> close </v-btn>
        </template>
      </baseForm>
    </v-sheet>
  </v-dialog>
</template>

<script setup>
import { useVModel } from "@vueuse/core";
import { useInferenceStore } from "~/pinia/useInferenceStore";
import { validate } from "../services/validation.js";

const props = defineProps(["modelValue"]);

const inferenceStore = useInferenceStore();

const emit = defineEmits(["update:modelValue"]);
const showDialog = useVModel(props, "modelValue", emit);

const sendRequestHandler = async (data) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("image_secondary", data.image_secondary);
  formData.append("config", data.config);

  const { data: response, error } = await validate(formData);

  if (!error.value) {
    inferenceStore.setResponse(response.value);

    navigateTo({ path: "/inference" });
  }
};
</script>
