import { defineStore } from "pinia";

export const useInferenceStore = defineStore("inference", {
  state: () => {
    return {
      response: {
        image_path: null,
        image_hash: null,
        secondary_image_hash: null,
      },
    };
  },
  actions: {
    setResponse(payload) {
      this.response = payload;
    },
  },
});
