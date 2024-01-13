<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useConnectionStore } from "./pinia/useConnectionStore";

const connectionStore = useConnectionStore();
await connectionStore.initialize();
</script>
