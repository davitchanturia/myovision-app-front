import { useValidationStore } from "~/pinia/useValidationStore";

const validationStore = useValidationStore();

export default defineNuxtRouteMiddleware((_to, _from) => {
  if (
    validationStore.response?.image_hash === null ||
    validationStore.response?.image_path === null
  ) {
    return navigateTo("/");
  }
});
