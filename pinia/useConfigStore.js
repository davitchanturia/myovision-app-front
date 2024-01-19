import { defineStore } from "pinia";
import { getDefaultConfig } from "../services/config.js";

export const useConfigStore = defineStore("config", {
  state: () => {
    return {
      amg_config: null,
      amg_config_description: "",
      general_config: null,
      general_config_description: "",
    };
  },

  actions: {
    async initialize() {
      const { data, error } = await getDefaultConfig();

      if (!error.value) {
        this.amg_config = data.value?.AmgConfig?.properties;
        this.general_config = data.value?.GeneralConfig?.properties;

        this.amg_config_description = data.value?.AmgConfig?.description;
        this.general_config_description =
          data.value?.GeneralConfig?.description;
      }
    },
  },
});
