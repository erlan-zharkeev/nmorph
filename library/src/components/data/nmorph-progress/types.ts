export type NmorphProgressType = 'linear' | 'circle';
export type NmorphProgressColorFn = (percentage: number) => string;
export type NmorphProgressColorType = string | { color: string; percentage: number }[] | NmorphProgressColorFn;
