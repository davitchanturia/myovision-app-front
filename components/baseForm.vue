<template>
  <form @submit.prevent="submitHandler">
    <div class="grid grid-cols-2 gap-2">
      <v-text-field
        v-for="(config, i) in AmgConfigObj"
        :key="i"
        v-model.number="config.value"
        :label="replaceUnderscoresWithSpaces(config.label)"
        variant="outlined"
        type="number"
        :min="0"
        step="any"
        class="capitalize"
      />
    </div>

    <div class="mt-8">
      <v-text-field
        v-for="(config, i) in GeneralConfigObj"
        :key="i"
        v-model.number="config.value"
        :label="replaceUnderscoresWithSpaces(config.label)"
        :min="0"
        step="any"
        variant="outlined"
        class="capitalize"
        type="number"
      />
    </div>

    <div class="flex justify-end gap-1">
      <slot name="close" />
      <v-btn variant="outlined" type="submit"> Submit </v-btn>
    </div>
  </form>
</template>

<script setup>
import { useConfigStore } from "../pinia/useConfigStore";

const configStore = useConfigStore();

defineEmits(["closeDialog"]);

const replaceUnderscoresWithSpaces = (key) => {
  return key.replaceAll("_", " ");
};

const baseConfigUpdater = (config_key) => {
  const x = [];

  for (const [key, value] of Object.entries(config_key)) {
    x.push({ label: key, value: value });
  }
  return x;
};

const updatedAmgConfig = computed(() =>
  baseConfigUpdater(configStore.amg_config_options),
);

const updatedGeneralConfig = computed(() =>
  baseConfigUpdater(configStore.general_config_options),
);

const AmgConfigObj = ref(updatedAmgConfig.value);
const GeneralConfigObj = ref(updatedGeneralConfig.value);

const submitHandler = () => {
  console.log(AmgConfigObj.value);
  console.log(GeneralConfigObj.value);
};
</script>
