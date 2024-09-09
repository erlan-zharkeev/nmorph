export interface IAttributesTableData {
  name: string;
  type: string;
  default: string;
}

export interface ISlotsTableData {
  name: string;
}

export interface IVariablesTableData extends ISlotsTableData {}
