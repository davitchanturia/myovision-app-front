<template>
  <form @submit.prevent="submitHandler">
    <h1>{{ configStore.amg_config_description }}</h1>

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
      <h1>{{ configStore.general_config_description }}</h1>

      <div class="mt-4">
        <v-text-field
          v-for="(config, i) in GeneralConfigObj"
          :key="i"
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

    <div class="flex mt-8">
      <ImageUploader
        v-model="primaryImage"
        label="primary"
        required
        @upload:image="savePrimaryImageHandler"
      />
      <ImageUploader
        v-if="useForInference"
        v-model="secondaryImage"
        label="secondary"
        :required="false"
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
import { getDefaultConfig } from "../services/config.js";

const configStore = useConfigStore();

const { data, error } = await getDefaultConfig();

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
