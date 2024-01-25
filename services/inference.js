import { useInferenceStore } from "~/pinia/useInferenceStore";

export const inference = async (data) => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "inference/";

  const inferenceStore = useInferenceStore();

  const { data: response, error } = useFetch(path, {
    method: "POST",
    body: data,
  });

  if (!error.value) {
    inferenceStore.setResponse(response);

    navigateTo({ path: "/inference" });
  }
};
