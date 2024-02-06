import { useInferenceStore } from "~/pinia/useInferenceStore";

export default defineNuxtRouteMiddleware(() => {
  const inferenceStore = useInferenceStore();

  if (
    inferenceStore.responseValue?.image_hash === null ||
    inferenceStore.responseValue?.image_path === null
  ) {
    return navigateTo("/");
  }
});
