export const validate = async (validationData) => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "validation/";

  const { data, error } = await useFetch(path, {
    method: "POST",
    body: validationData,
  });

  if (error.value) {
    throw new Error(error.value.message);
  }

  return data;
};
