<template>
  <div class="h-screen flex flex-col">
    <div class="w-full bg-green-300">
      <div class="w-full max-w-5xl mx-auto flex justify-end py-1">
        <div>
          <v-icon icon="mdi mdi-wifi" class="text-white cursor-pointer" />
          <v-tooltip activator="parent" location="bottom">
            Redis connected
          </v-tooltip>
        </div>
      </div>
    </div>

    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup></script>
