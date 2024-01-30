<template>
  <v-dialog
    transition="dialog-bottom-transition"
    width="800"
    activator="parent"
    @update:model-value="closeDialogHandler"
  >
    <v-sheet
      class="!px-6 !py-6 relative h-full !flex flex-column gap-4 text-light-on-surface"
    >
      valdiation is done

      <div class="flex justify-end gap-1 mt-3">
        <v-btn variant="outlined" @click="navigateTo('/')"> Close </v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script setup>
const closeDialogHandler = (isOPen) => {
  if (!isOPen) navigateTo("/");
};
</script>
