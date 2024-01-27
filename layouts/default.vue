<template>
  <div class="h-screen flex flex-col">
    <div
      class="w-full"
      :class="connectionStore.isConnected ? 'bg-green-200' : 'bg-red-200'"
    >
      <div class="w-full mx-auto flex justify-end py-1 pr-32">
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

    <div class="flex-1 bg-[#fefefe] relative">
      <slot />
      <div
        v-if="route.name !== 'index'"
        class="w-10 h-10 absolute left-7 top-4"
      >
        <v-btn flat @click="navigateTo('/')">
          <v-icon icon="mdi-arrow-left" />
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConnectionStore } from "../pinia/useConnectionStore.js";

const connectionStore = useConnectionStore();

const connectionIcon = computed(() =>
  connectionStore.isConnected ? "mdi mdi-wifi" : "mdi-wifi-off",
);

const route = useRoute();
</script>
