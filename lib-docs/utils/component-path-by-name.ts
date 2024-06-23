export const componentPathByName = (name: string) => {
  return `/components/${name.substring(6).toLowerCase()}`;
};
