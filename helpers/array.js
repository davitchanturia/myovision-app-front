export const convertJsonToArray = (json) => {
  const x = [];

  for (const [key, value] of Object.entries(json)) {
    x.push({ label: key, value: value });
  }
  return x;
};
