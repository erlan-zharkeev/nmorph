export interface ISlotsTableData {
  name: string;
}

export interface IBasicApiTableData {
  name: string;
  type: string;
}

export interface IAttributesTableData extends IBasicApiTableData {
  default: string;
}

export interface IVariablesTableData extends ISlotsTableData {}

export interface IExposesTableData extends ISlotsTableData {}

export interface IEventsTableData extends IBasicApiTableData {}
