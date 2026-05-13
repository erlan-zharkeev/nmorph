import { pascalToKebab } from "~/utils";

export const componentPathByName = (name: string) => {
  if (name === "NmorphTagList" || name === "NmorphTagItem") {
    return "/elements/tag";
  }

  return `/elements/${pascalToKebab(name).substring(7).toLowerCase()}`;
};
