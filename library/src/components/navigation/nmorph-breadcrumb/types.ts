import { Ref } from 'vue';

export interface INmorphBreadcrumbItemProps {
  to?: string | object;
  replace?: boolean;
}

export interface NmorphBreadcrumbInjectionItemWithId extends INmorphBreadcrumbItemProps {
  itemId: string;
}

export type NmorphBreadcrumbsType = Ref<NmorphBreadcrumbInjectionItemWithId[]>;

export interface NmorphBreadcrumbInjection {
  breadcrumbs: NmorphBreadcrumbsType;
  breadcrumbId: string;
}
