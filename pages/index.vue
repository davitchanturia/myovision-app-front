<template>
  <div class="h-full py-5 w-full max-w-5xl mx-auto">
    <div
      v-if="configStore.amg_config"
      class="mt-20 flex gap-4 w-full pt-10 px-5 font-mono"
    >
      <v-btn variant="tonal" class="w-1/2">
        Validation
        <validationDialog v-model="showValidationDialog" />
      </v-btn>
      <v-btn variant="tonal" class="w-1/2">
        Inference
        <inferenceDialog v-model="showInferenceDialog" />
      </v-btn>
    </div>

    <div v-else class="font-mono">Something went wrong, try later</div>
  </div>
</template>

<script setup>
import { useConfigStore } from "../pinia/useConfigStore";

const configStore = useConfigStore();

const noConfigs = computed(() => configStore.amg_config);
console.log(configStore.amg_config);

const showValidationDialog = ref(false);
const showInferenceDialog = ref(false);
</script>
