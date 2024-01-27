import { defineStore } from "pinia";

export const useValidationStore = defineStore("validation", () => {
  const initialValue = {
    image_hash: null,
    image_path: null,
  };

  const response = ref(initialValue);

  const responseValue = computed(() => response.value);

  const setResponse = (payload) => {
    response.value = payload;
  };

  return { responseValue, setResponse };
});
