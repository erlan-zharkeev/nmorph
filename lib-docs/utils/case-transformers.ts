export const anyToPascalCase = (str: string) =>
  str.replace(/(^\w|-\w)/g, (clear) => clear.replace(/-/, "").toUpperCase());

export const pascalToSpace = (str: string): string => {
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([a-z])(\d)/gi, "$1 $2")
    .trim();
};

export const pascalToKebab = (str: string) => {
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
    .replace(/([a-z])(\d)/gi, "$1-$2")
    .toLowerCase()
    .replace(/--+/g, "-")
    .replace(/^-/, "");
};
