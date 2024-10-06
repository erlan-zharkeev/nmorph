export const pascalToSpace = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])/g, ' $1')
    .trim();
};
