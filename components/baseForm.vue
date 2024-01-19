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
      >
        <template #append-inner>
          <div>
            <v-icon
              icon="mdi-information-slab-circle-outline"
              size="20px"
              class="cursor-help"
            />
            <v-tooltip activator="parent" location="start">
              Tooltip Tooltip Tooltip Tooltip
            </v-tooltip>
          </div>
        </template>
      </v-text-field>
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
      >
        <template #append-inner>
          <div>
            <v-icon
              icon="mdi-information-slab-circle-outline"
              size="20px"
              class="cursor-help"
            />
            <v-tooltip activator="parent" location="start">
              Tooltip Tooltip Tooltip Tooltip
            </v-tooltip>
          </div>
        </template>
      </v-text-field>
    </div>

    <div class="flex mt-8">
      <ImageUploader
        v-model="primaryImage"
        label="primary"
        @upload:image="savePrimaryImageHandler"
      />
      <ImageUploader
        v-if="useForValidation"
        v-model="secondaryImage"
        label="secondary"
        @upload:image="saveSecondaryImageHandler"
      />
    </div>

    <div class="flex justify-end gap-1 mt-3">
      <slot name="close" />
      <v-btn variant="outlined" type="submit"> Submit </v-btn>
    </div>
  </form>
</template>

<script setup>
import { useConfigStore } from "../pinia/useConfigStore";

const configStore = useConfigStore();

defineEmits(["closeDialog"]);

defineProps({
  useForValidation: {
    type: Boolean,
    default: false,
  },
});

const primaryImage = ref();
const secondaryImage = ref();

const savePrimaryImageHandler = (file) => {
  primaryImage.value = file;
};

const saveSecondaryImageHandler = (file) => {
  secondaryImage.value = file;
};

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
  // console.log(AmgConfigObj.value);
  // console.log(GeneralConfigObj.value);
  // console.log(primaryImage.value);
  // console.log(secondaryImage.value);
};
</script>
