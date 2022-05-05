export const toCapitalize = (text) => {
  if (!text || typeof text !== "string") return "";

  let label = text;
  if (text.includes("-")) label = text.replace("-", " ");

  return label
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};
