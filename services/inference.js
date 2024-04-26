export const inference = async (inferenceData) => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "inference/";

  const { data, error } = await useFetch(path, {
    method: "POST",
    body: inferenceData,
  });

  if (error.value) {
    throw new Error(error.value.message);
  }

  return data;
};

export const getInferenceResults = async (myotube_hash, nuclei_hash) => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "inference/get_data/" + myotube_hash + "/" + nuclei_hash;

  const { data, error } = await useFetch(path);

  if (error.value) {
    throw new Error(error.value.message);
  }

  return data.value;
};
