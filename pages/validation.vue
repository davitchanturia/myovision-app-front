<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="flex flex-col gap-3">
      <div>image hash - {{ validationStore.response.image_hash }}</div>
      <div>image path - {{ validationStore.response.image_path }}</div>
    </div>
  </div>
</template>

<script setup>
import { useValidationStore } from "~/pinia/useValidationStore";

const validationStore = useValidationStore();
</script>
