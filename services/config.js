export const getDefaultConfig = async () => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "get_config_schema/";

  return useFetch(path);
};
