<template>
  <div class="min-w-80 w-full">
    <div class="!p-5 bg-white border !border-black rounded-lg">
      <div class="text-center text-lg uppercase font-mono">
        Validation actions
      </div>
      <div class="grid grid-cols-2 gap-3 mt-3">
        <v-btn flat class="col-span-1" @click="emit('update:action', 0)">
          <v-icon icon="mdi-close-outline" />
        </v-btn>
        <v-btn flat class="col-span-1" @click="emit('update:action', 1)">
          <v-icon icon="mdi-check-outline" />
        </v-btn>
        <v-btn flat class="col-span-1" @click="emit('update:action', -1)">
          undo
        </v-btn>
        <v-btn flat class="col-span-1" @click="emit('update:action', 2)">
          skip
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:action"]);
</script>
