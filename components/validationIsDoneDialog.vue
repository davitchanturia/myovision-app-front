<template>
  <v-dialog
    transition="dialog-bottom-transition"
    width="500"
    activator="parent"
    @update:model-value="closeDialogHandler"
  >
    <v-sheet
      class="!px-6 !py-6 relative h-full !flex flex-column gap-4 text-light-on-surface font-mono"
    >
      <div>
        The validation has been completed! click on the download button to
        obtain the resulting contours.
      </div>

      <div class="mt-2">
        <v-btn
          :disabled="downloadData == null || downloadData === undefined"
          variant="text"
          @click="downlaodDataHandler"
        >
          download coordinates
        </v-btn>
      </div>

      <div class="flex justify-end gap-1 mt-1">
        <v-btn variant="outlined" @click="navigateTo('/')"> Close </v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script setup>
import { useValidationStore } from "~/pinia/useValidationStore";
import { getContours } from "../services/validation.js";

const validationStore = useValidationStore();

const downloadData = ref(null);

const closeDialogHandler = (isOPen) => {
  if (!isOPen) navigateTo("/");
};

onMounted(async () => {
  const response = await getContours(
    validationStore.responseValue.value?.image_hash,
  );

  downloadData.value = response.value;
});

const downlaodDataHandler = () => {
  const jsonString = JSON.stringify(downloadData.value, null, 2);

  const blob = new Blob([jsonString], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
</script>
