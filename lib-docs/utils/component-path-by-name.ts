import { pascalToKebab } from "@nmorph/nmorph-ui-kit";

export const componentPathByName = (name: string) => {
  return `/components/${pascalToKebab(name).substring(7).toLowerCase()}`;
};
