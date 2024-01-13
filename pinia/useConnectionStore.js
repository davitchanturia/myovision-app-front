import { defineStore } from "pinia";
import { checkConnectionStatus } from "../services/connection.js";

export const useConnectionStore = defineStore("connection", {
  state: () => {
    return {
      isConnected: null,
    };
  },
  getters: {
    status() {
      return this.isConnected;
    },
  },
  actions: {
    async initialize() {
      const { data, error } = await checkConnectionStatus();

      if (!error.value) {
        this.isConnected = data.value?.status;
      }
    },
  },
});
