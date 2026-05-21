export type NmorphModifierValue = string | number | false | null | undefined;
export type NmorphModifierInput = NmorphModifierValue[] | Record<string, boolean | null | undefined>;

const isModifierValue = (modifier: NmorphModifierValue): modifier is string | number =>
  modifier !== false && modifier !== null && modifier !== undefined && modifier !== '';

const normalizeModifiers = (modifiers: NmorphModifierInput): Array<string | number> => {
  if (Array.isArray(modifiers)) return modifiers.filter(isModifierValue);

  return Object.entries(modifiers)
    .filter(([, enabled]) => Boolean(enabled))
    .map(([modifier]) => modifier);
};

export const createBlockModifiers = (block: string, modifiers: NmorphModifierInput): string => {
  const stringifiedModifiers = normalizeModifiers(modifiers).map((modifier) => `${block}--${modifier}`);

  stringifiedModifiers.push(block);
  return stringifiedModifiers.join(' ').trim().replace(/\s+/g, ' ');
};

export const useModifiers = (data: { [key: string]: NmorphModifierInput }) => {
  return Object.entries(data)
    .map(([block, modifiers]) => createBlockModifiers(block, modifiers))
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');
};
