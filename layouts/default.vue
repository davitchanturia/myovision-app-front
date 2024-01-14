<template>
  <div class="h-screen flex flex-col">
    <div
      class="w-full"
      :class="connectionStore.isConnected ? 'bg-green-200' : 'bg-red-200'"
    >
      <div class="w-full max-w-5xl mx-auto flex justify-end py-1">
        <div>
          <v-icon :icon="connectionIcon" class="text-white cursor-pointer" />

          <v-tooltip activator="parent" location="bottom">
            {{
              connectionStore.isConnected
                ? "Redis connected"
                : "Redis connection failed"
            }}
          </v-tooltip>
        </div>
      </div>
    </div>

    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useConnectionStore } from "../pinia/useConnectionStore.js";

const connectionStore = useConnectionStore();

const connectionIcon = computed(() =>
  connectionStore.isConnected ? "mdi mdi-wifi" : "mdi-wifi-off",
);
</script>
