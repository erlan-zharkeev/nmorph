import type { InjectionKey, Ref } from "vue";
import { inject } from "vue";
import { pascalToKebab } from "./case-transformers";

export interface IDocsNavigationContext {
  anchors: Ref<string[]>;
  registerAnchor: (anchor: string) => void;
  resetAnchors: () => void;
}

export const docsNavigationKey: InjectionKey<IDocsNavigationContext> = Symbol("docs-navigation");

export const normalizeDocsAnchor = (anchor: string) => {
  const normalizedAnchor = anchor.trim();

  if (!normalizedAnchor) return "";

  return normalizedAnchor.startsWith("content-") ? normalizedAnchor : `content-${normalizedAnchor}`;
};

export const getDocsExampleAnchor = (component: unknown) => {
  const componentRecord = component as { __file?: string; __name?: string; name?: string } | undefined;
  const rawName =
    componentRecord?.__name ||
    componentRecord?.name ||
    componentRecord?.__file?.split(/[\\/]/).pop()?.replace(/\.vue$/i, "") ||
    "";
  const componentName = rawName.replace(/\.?example$/i, "").replace(/Example$/i, "");

  return normalizeDocsAnchor(pascalToKebab(componentName));
};

export const useDocsNavigation = () => inject(docsNavigationKey, null);
