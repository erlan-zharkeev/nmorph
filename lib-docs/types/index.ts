export interface ISlotsTableData {
  name: string;
  description?: string;
}

export interface IBasicApiTableData {
  name: string;
  type: string;
  description?: string;
}

export interface IAttributesTableData extends IBasicApiTableData {
  default: string;
  required?: boolean;
  modalName?: string;
}

export interface IVariablesTableData {
  name: string;
  description?: string;
}

export interface IExposesTableData extends IBasicApiTableData {}

export interface IEventsTableData extends IBasicApiTableData {}

export interface ITranslates {
  name: string;
  description?: string;
}
