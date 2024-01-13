export const checkConnectionStatus = async () => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "redis_status/";

  return useFetch(path);
  // return data.value;
};
