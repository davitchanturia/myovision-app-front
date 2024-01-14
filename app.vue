<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useConnectionStore } from "./pinia/useConnectionStore";
import { useConfigStore } from "./pinia/useConfigStore";

const connectionStore = useConnectionStore();
await connectionStore.initialize();

const configStore = useConfigStore();
await configStore.initialize();
</script>
