<template>
  <div ref="draggableActionsEl" :style="style" style="position: fixed">
    <v-card class="w-80 !p-5 bg-white cursor-grabbing" style="position: fixed">
      <div class="flex items-center">
        <v-icon icon="mdi-drag" />
        <p class="text-sm prevent-select">Drag the component where you want</p>
      </div>
      <div class="grid grid-cols-2 gap-3 mt-3">
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
    </v-card>
  </div>
</template>

<script setup>
import { useDraggable } from "@vueuse/core";

const draggableActionsEl = ref(null);

const { x, y, style } = useDraggable(draggableActionsEl, {
  initialValue: { x: 1240, y: 40 },
});

const emit = defineEmits(["update:action"]);
</script>

<style>
.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
