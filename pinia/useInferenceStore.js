import { defineStore } from "pinia";
import { convertJsonToArray } from "../helpers/array";

export const useInferenceStore = defineStore("inference", () => {
  const initialValue = {
    image_path: null,
    image_hash: null,
    secondary_image_hash: null,
    general_info: null,
  };

  const response = ref(initialValue);

  const generalInfo = ref();

  const responseValue = computed(() => response.value);
  const generalInfoValue = computed(() => generalInfo.value);

  const setResponse = (payload) => {
    response.value = payload;
    generalInfo.value = convertJsonToArray(payload.value.general_info);
  };

  return { responseValue, setResponse, generalInfoValue };
});
