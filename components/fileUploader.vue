<template>
  <div class="flex flex-col gap-1">
    <label class="text-sm capitalize font-mono">{{ label }}</label>

    <button
      type="button"
      class="border border-dashed py-2 capitalize text-sm rounded-md bg-gray-100"
      @click="customButtonClickHandler"
    >
      {{ buttonText }}
    </button>

    <input ref="fileInput" type="file" hidden @change="fileUploadHandler" />

    <div v-if="selectedFileName" class="selected-file max-w-96 truncate">
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
});

const emit = defineEmits(["upload:image"]);

const selectedFileName = ref("");

const fileUploadHandler = (e) => {
  const fileInput = e.target;

  if (fileInput.files.length > 0) {
    const file = fileInput.files ? fileInput.files[0] : null;

    emit("upload:image", file);

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
