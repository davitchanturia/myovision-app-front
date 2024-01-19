import { defineStore } from "pinia";

export const useValidationStore = defineStore("validation", {
  state: () => {
    return {
      response: {
        image_hash: null,
        image_path: null,
      },
    };
  },
  actions: {
    setResponse(payload) {
      this.response = payload;
    },
  },
});
