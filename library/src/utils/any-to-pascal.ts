export const anyToPascalCase = (str: string) =>
  str.replace(/(^\w|-\w)/g, (clear) => clear.replace(/-/, '').toUpperCase());
