export type NmorphSortOrderType = NmorphSortOrder | undefined;

export const NmorphSortOrder = {
  ascending: 'ascending',
  descending: 'descending',
} as const;

export type NmorphSortOrder = keyof typeof NmorphSortOrder;
