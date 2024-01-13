<template>
  <div class="h-screen flex flex-col">
    <div
      class="w-full"
      :class="connectionStore.isConnected ? 'bg-green-200' : 'bg-red-200'"
    >
      <div class="w-full max-w-5xl mx-auto flex justify-end py-1">
        <div>
          <v-icon
            v-if="connectionStore.isConnected"
            icon="mdi mdi-wifi"
            class="text-white cursor-pointer"
          />
          <v-icon
            v-else
            icon="mdi-wifi-off"
            class="text-white cursor-pointer"
          />
          <v-tooltip activator="parent" location="bottom">
            Redis connection failed
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

console.log(connectionStore.isConnected);
</script>
