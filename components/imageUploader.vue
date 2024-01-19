<template>
  <div class="flex flex-col gap-1">
    <label class="text-sm capitalize">{{ label }}</label>
    <input type="file" :required="required" @change="fileUploadHandler" />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["upload:image"]);

const fileUploadHandler = (e) => {
  const fileInput = e.target;
  const file = fileInput.files ? fileInput.files[0] : null;

  emit("upload:image", file);
};
</script>
