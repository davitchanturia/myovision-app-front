<template>
  <div class="h-full py-5 w-full max-w-5xl mx-auto">
    <div class="flex justify-evenly mt-40">
      <ImageUploader label="primary" />
      <ImageUploader label="secondary" />
    </div>

    <div class="mt-10 flex gap-4 w-full pt-10">
      <v-btn variant="tonal" class="w-1/2">
        Validation
        <validationDialog v-model="showValidationDialog" />
      </v-btn>
      <v-btn variant="tonal" class="w-1/2">
        Inference
        <inferenceDialog v-model="showInferenceDialog" />
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const showValidationDialog = ref(false);
const showInferenceDialog = ref(false);
</script>
