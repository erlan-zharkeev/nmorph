import { pascalToKebab } from "~/utils";

export const componentPathByName = (name: string) => {
  return `/elements/${pascalToKebab(name).substring(7).toLowerCase()}`;
};
