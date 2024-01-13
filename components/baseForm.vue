<template>
  <form>
    <div class="grid grid-cols-2 gap-2">
      <v-text-field label="Label" variant="outlined" />
      <v-text-field label="Label" variant="outlined" />
      <v-text-field label="Label" variant="outlined" />
      <v-text-field label="Label" variant="outlined" />
      <v-text-field label="Label" variant="outlined" />
      <v-text-field label="Label" variant="outlined" />
      <v-text-field label="Label" variant="outlined" />
      <v-text-field label="Label" variant="outlined" />
      <v-text-field label="Label" variant="outlined" />
      <v-text-field label="Label" variant="outlined" />
      <v-text-field label="Label" variant="outlined" />
    </div>

    <v-divider color="red" />

    <div class="mt-8">
      <v-text-field label="Label" variant="outlined" />
    </div>

    <div class="flex justify-end gap-1">
      <slot name="close" />
      <v-btn variant="outlined"> Submit </v-btn>
    </div>
  </form>
</template>

<script setup>
defineEmits(["closeDialog"]);
</script>
