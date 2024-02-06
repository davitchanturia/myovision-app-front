<template>
  <div class="flex flex-col gap-1">
    <label class="text-sm capitalize font-mono">{{ label }}</label>

    <v-btn
      variant="text"
      type="button"
      class="border border-dashed !capitalize !text-sm !font-normal rounded-md !bg-zinc-100 bg-"
      height="36"
      @click="customButtonClickHandler"
    >
      {{ buttonText }}
    </v-btn>

    <input ref="fileInput" type="file" hidden @change="fileUploadHandler" />

    <div
      v-if="selectedFileName && showFileName"
      class="selected-file max-w-96 truncate text-sm"
    >
      {{ selectedFileName }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  buttonText: String,
  required: {
    type: Boolean,
    default: false,
  },
  showFileName: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["upload:file"]);

const selectedFileName = ref("");

const fileUploadHandler = (e) => {
  const fileInput = e.target;

  if (fileInput.files.length > 0) {
    const file = fileInput.files ? fileInput.files[0] : null;

    emit("upload:file", file);

    selectedFileName.value = fileInput.files[0].name;
  } else {
    selectedFileName.value = "";
  }
};

const fileInput = ref(null);

const customButtonClickHandler = () => {
  fileInput.value.click();
};
</script>
