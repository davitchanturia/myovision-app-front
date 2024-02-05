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

export const getContours = async (hash) => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "get_contours/" + hash;

  const { data, error } = await useFetch(path);

  if (error.value) {
    throw new Error(error.value.message);
  }

  return data;
};

export const uploadContours = async (validationData) => {
  const config = useRuntimeConfig();
  const path = config.public.backendBase + "upload_contours/";

  const { data, error } = await useFetch(path, {
    method: "POST",
    body: validationData,
  });

  if (error.value) {
    throw new Error(error.value.message);
  }

  return data;
};

export const downloadData = (downloadData) => {
  const jsonString = JSON.stringify(downloadData, null, 2);

  const blob = new Blob([jsonString], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
