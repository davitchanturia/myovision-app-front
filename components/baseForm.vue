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
      <v-text-field label="Label" variant="outlined" />
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

const updatedConfig = computed(() => {
  const x = [];

  for (const [key, value] of Object.entries(configStore.amg_config_options)) {
    console.log(key);
    x.push({ label: key, value: value });
  }
  return x;
});

const AmgConfigObj = ref(updatedConfig.value);

const submitHandler = () => {
  console.log(AmgConfigObj.value);
};
</script>
