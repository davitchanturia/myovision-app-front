<template>
  <div class="flex flex-col gap-1">
    <label class="text-sm capitalize">{{ label }}</label>
    <input type="file" />
  </div>
</template>

<script setup>
defineProps({
  label: String,
});
</script>
