import { useInferenceStore } from "~/pinia/useInferenceStore";

export default defineNuxtRouteMiddleware((_to, _from) => {
  const inferenceStore = useInferenceStore();

  if (
    inferenceStore.response?.image_hash === null ||
    inferenceStore.response?.image_path === null
  ) {
    return navigateTo("/");
  }
});
