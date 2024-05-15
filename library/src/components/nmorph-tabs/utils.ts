import { NmorphTableModelType } from './type';

export const getTabLabelId = (tabsIdentifier: string | undefined, name: NmorphTableModelType) => {
  if (!tabsIdentifier) return;
  return `nmorph-tabs-label-${tabsIdentifier}-${name}`;
};

export const getTabContentId = (tabsIdentifier: string | undefined, name: NmorphTableModelType) => {
  if (!tabsIdentifier) return;
  return `nmorph-tabs-content-${tabsIdentifier}-${name}`;
};
