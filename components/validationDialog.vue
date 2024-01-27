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
      <baseForm @form-submited="sendRequestHandler">
        <template #close>
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

const sendRequestHandler = async (data) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("config", data.config);

  const response = await validate(formData);

  validationStore.setResponse(response);

  navigateTo({ path: "/validation" });
};
</script>
