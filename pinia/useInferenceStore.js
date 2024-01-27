import { defineStore } from "pinia";

export const useInferenceStore = defineStore("inference", () => {
  const initialValue = {
    image_path: null,
    image_hash: null,
    secondary_image_hash: null,
  };

  const response = ref(initialValue);

  const responseValue = computed(() => response.value);

  const setResponse = (payload) => {
    response.value = payload;
  };

  return { responseValue, setResponse };
});
