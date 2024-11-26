import { pascalToKebab } from "~/utils";

export const componentPathByName = (name: string) => {
  return `/components/${pascalToKebab(name).substring(7).toLowerCase()}`;
};
