export const validate = async (data) => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "validation/";

  return useFetch(path, {
    method: "POST",
    body: data,
  });
};
