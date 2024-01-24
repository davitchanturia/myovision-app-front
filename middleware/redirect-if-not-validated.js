import { useValidationStore } from "~/pinia/useValidationStore";

export default defineNuxtRouteMiddleware((_to, _from) => {
  const validationStore = useValidationStore();

  if (
    validationStore.response.image_hash === null ||
    validationStore.response.image_path === null
  ) {
    return navigateTo("/");
  }
});
