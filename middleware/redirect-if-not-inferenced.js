import { useInferenceStore } from "~/pinia/useInferenceStore";

const inferenceStore = useInferenceStore();

export default defineNuxtRouteMiddleware((_to, _from) => {
  if (
    inferenceStore.response?.image_hash === null ||
    inferenceStore.response?.image_path === null
  ) {
    return navigateTo("/");
  }
});
