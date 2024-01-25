<template>
  <div class="w-80">
    <div class="!p-5 bg-white border-2 border-sha border-black rounded-lg">
      <div class="text-center text-lg">Validation actions</div>
      <div class="grid grid-cols-1 gap-3 mt-3">
        <v-btn class="col-span-1" @click="emit('update:action', 0)">
          <v-icon icon="mdi-close-outline" />
        </v-btn>
        <v-btn class="col-span-1" @click="emit('update:action', 1)">
          <v-icon icon="mdi-check-outline" />
        </v-btn>
        <v-btn class="col-span-1" @click="emit('update:action', -1)">
          undo
        </v-btn>
        <v-btn class="col-span-1" @click="emit('update:action', 2)">
          skip
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:action"]);
</script>
