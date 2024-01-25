import { useValidationStore } from "~/pinia/useValidationStore";

export const validate = async (data) => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "validation/";

  const validationStore = useValidationStore();

  const { data: response, error } = useFetch(path, {
    method: "POST",
    body: data,
  });

  if (!error.value) {
    validationStore.setResponse(response);

    navigateTo({ path: "/validation" });
  }
};
