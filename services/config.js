export const getDefaultConfig = async () => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "get_config/";

  return useFetch(path);
};
