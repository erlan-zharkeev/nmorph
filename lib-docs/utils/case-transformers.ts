export const anyToPascalCase = (str: string) =>
  str.replace(/(^\w|-\w)/g, (clear) => clear.replace(/-/, "").toUpperCase());

export const pascalToSpace = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])/g, " $1")
    .trim();
};

export const pascalToKebab = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/--+/g, "-")
    .replace(/^-/, "");
};
