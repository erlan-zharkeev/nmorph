export const anyToPascalCase = (str: string) =>
  str.replace(/(^\w|-\w)/g, (clear) => clear.replace(/-/, '').toUpperCase());

export const camelToKebab = (input: string) => {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const camelToTitle = (str: string) => {
  const result = str.replace(/([A-Z])/g, ' $1').trim();
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const pascalToKebab = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/--+/g, '-')
    .replace(/^-/, '');
};

export const pascalToSpace = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])/g, ' $1')
    .trim();
};
