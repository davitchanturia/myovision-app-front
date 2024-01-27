import { useValidationStore } from "~/pinia/useValidationStore";

export default defineNuxtRouteMiddleware((_to, _from) => {
  const validationStore = useValidationStore();

  if (
    validationStore.responseValue?.image_hash === null ||
    validationStore.responseValue?.image_path === null
  ) {
    return navigateTo("/");
  }
});
