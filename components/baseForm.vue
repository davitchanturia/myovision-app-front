<template>
  <form @submit.prevent="submitHandler">
    <h1 class="font-mono">
      {{ configStore.amg_config_description }}
    </h1>

    <div class="grid grid-cols-2 gap-2 mt-4">
      <v-text-field
        v-for="(config, i) in AmgConfigObj"
        :key="i"
        v-model.number="config.default"
        :label="config.title"
        variant="outlined"
        type="number"
        :min="config.minimum"
        :max="config.maximum"
        :step="config.step ?? 'any'"
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
              {{ config.description }}
            </v-tooltip>
          </div>
        </template>
      </v-text-field>
    </div>

    <div class="mt-8">
      <h1 class="font-mono">
        {{ configStore.general_config_description }}
      </h1>

      <div class="mt-4">
        <div v-for="(config, i) in GeneralConfigObj" :key="i">
          <v-checkbox
            v-if="config.type === 'boolean'"
            v-model="config.default"
            :label="config.title"
            class="w-1/4"
          >
            <template #append>
              <div>
                <v-icon
                  icon="mdi-information-slab-circle-outline"
                  size="20px"
                  class="cursor-help"
                />
                <v-tooltip activator="parent" location="end">
                  {{ config.description }}
                </v-tooltip>
              </div>
            </template>
          </v-checkbox>
          <v-text-field
            v-else
            v-model.number="config.default"
            :label="config.title"
            variant="outlined"
            :type="config.type"
            :min="config.minimum"
            :step="config.step ?? 'any'"
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
                  {{ config.description }}
                </v-tooltip>
              </div>
            </template>
          </v-text-field>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 mt-8">
      <fileUploader
        label="primary"
        :required="useForInference ? false : true"
        class="col-span-1"
        button-text="upload image"
        @upload:file="savePrimaryImageHandler"
      />
      <fileUploader
        v-if="useForInference"
        label="secondary"
        :required="false"
        class="col-span-1"
        button-text="upload image"
        @upload:file="saveSecondaryImageHandler"
      />
    </div>

    <div class="flex justify-end gap-1 mt-5">
      <slot name="close" />
      <v-btn variant="outlined" type="submit"> Submit </v-btn>
    </div>
  </form>
</template>

<script setup>
import { useConfigStore } from "../pinia/useConfigStore";

const configStore = useConfigStore();

const emit = defineEmits(["closeDialog", "formSubmited"]);

const props = defineProps({
  useForInference: {
    type: Boolean,
    default: false,
  },
});

const primaryImage = ref(null);
const secondaryImage = ref(null);

const savePrimaryImageHandler = (file) => {
  primaryImage.value = file;
};

const saveSecondaryImageHandler = (file) => {
  secondaryImage.value = file;
};

const AmgConfigObj = ref(configStore.amg_config);
const GeneralConfigObj = ref(configStore.general_config);

const updatedDataForRequest = (configJson) => {
  const modifiedJSON = {};

  // Iterate over the properties of the original JSON
  for (const key in configJson) {
    if (configJson.hasOwnProperty(key)) {
      // Check if the nested object exists for the current key
      if (configJson[key] && typeof configJson[key] === "object") {
        // Extract only the "name" property from the nested object
        modifiedJSON[key] = configJson[key].default;
      }
    }
  }

  return modifiedJSON;
};

const submitHandler = async () => {
  const config = {
    amg_config: updatedDataForRequest(AmgConfigObj.value),
    general_config: updatedDataForRequest(GeneralConfigObj.value),
  };

  const jsonConfig = JSON.stringify(config);

  const payload = {
    config: jsonConfig,
    image: primaryImage.value,
  };

  if (props.useForInference) {
    payload.image_secondary = secondaryImage.value;
  }

  emit("formSubmited", payload);
};
</script>
