export interface ISlotsTableData {
  name: string;
}

export interface IBasicApiTableData {
  name: string;
  type: string;
}

export interface IAttributesTableData extends IBasicApiTableData {
  default: string;
  required?: boolean;
}

export interface IVariablesTableData extends ISlotsTableData {}

export interface IExposesTableData extends ISlotsTableData {}

export interface IEventsTableData extends IBasicApiTableData {}

export enum DocsInfo {
  warning = "warning",
  info = "info",
}
