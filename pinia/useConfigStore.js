import { defineStore } from "pinia";
import { getDefaultConfig } from "../services/config.js";

export const useConfigStore = defineStore("config", {
  state: () => {
    return {
      amg_config: null,
    };
  },
  getters: {
    amg_config_options() {
      return this.amg_config;
    },
  },
  actions: {
    async initialize() {
      const { data, error } = await getDefaultConfig();

      if (!error.value) {
        this.amg_config = data.value?.amg_config;
      }
    },
  },
});
