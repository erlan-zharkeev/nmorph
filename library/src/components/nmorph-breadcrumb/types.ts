import { Ref } from 'vue';
import { RouteLocationRaw } from 'vue-router';

export interface NmorphBreadcrumbItemProps {
  to?: string | RouteLocationRaw;
  replace?: boolean;
}

export interface NmorphBreadcrumbInjectionItemWithId extends NmorphBreadcrumbItemProps {
  itemId: string;
}

export interface NmorphBreadcrumbInjection {
  breadcrumbs: Ref<NmorphBreadcrumbInjectionItemWithId[]>;
  breadcrumbId: string;
}
