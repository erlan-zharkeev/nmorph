import { Ref } from 'vue';
import { RouteLocationRaw } from 'vue-router';

export interface INmorphBreadcrumbItemProps {
  to?: string | RouteLocationRaw;
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
