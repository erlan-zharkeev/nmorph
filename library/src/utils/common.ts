export const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const toCssSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);

export type NmorphCssVariableValue = string | number | null | undefined | false;

export const createCssVariables = (variables: Record<`--${string}`, NmorphCssVariableValue>) => {
  return Object.entries(variables).reduce(
    (acc, [name, value]) => {
      if (value !== undefined && value !== null && value !== false) acc[name] = value;
      return acc;
    },
    {} as Record<string, string | number>
  );
};

export const createCssSizeVariables = (
  variables: Record<`--${string}`, number | string | null | undefined | false>
) => {
  return createCssVariables(
    Object.entries(variables).reduce(
      (acc, [name, value]) => {
        acc[name as `--${string}`] = value === false || value === null ? value : toCssSize(value);
        return acc;
      },
      {} as Record<`--${string}`, NmorphCssVariableValue>
    )
  );
};

type NmorphOptionThicknessType = 'basic' | 'thick' | 'thin';

const nmorphOptionThicknessHeightMap: Record<NmorphOptionThicknessType, number> = {
  basic: 30,
  thick: 38,
  thin: 24,
};

export const getNmorphOptionHeight = (thickness: NmorphOptionThicknessType = 'basic') => {
  return nmorphOptionThicknessHeightMap[thickness];
};

export const resolveDomElement = (element: unknown): Element | null => {
  if (typeof Element !== 'undefined' && element instanceof Element) return element;
  return (element as { $el?: Element } | null)?.$el || null;
};

export const generateUUID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4()}${s4()}-${s4()}-4${s4().substr(0, 3)}-${s4().substr(0, 1)}${s4().substr(1, 3)}-${s4()}${s4()}${s4()}`;
};
