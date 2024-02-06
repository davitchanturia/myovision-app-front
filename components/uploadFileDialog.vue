<template>
  <v-dialog v-model="showDialog" width="500" activator="parent">
    <v-sheet class="px-5 py-3">
      <div>
        <fileUploader
          v-model="uploadFileVal"
          @upload:image="uploadFileHandler"
        />
      </div>

      <div class="flex justify-end gap-1 mt-3">
        <v-btn variant="outlined" @click="showDialog = false"> close </v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script setup>
import { useVModel } from "@vueuse/core";

const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue", "upload:file"]);
const showDialog = useVModel(props, "modelValue", emit);

const uploadFileVal = ref(null);

const uploadFileHandler = (data) => {
  emit("upload:file", data);
};
</script>
