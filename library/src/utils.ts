export const createModifiers = (block: string, modifiers: string[]): string => {
  const stringifiedModifiers = modifiers.map((modifier) => {
    if (modifier) return `${block}--${modifier}`;
  });
  stringifiedModifiers.push(block);
  return stringifiedModifiers.join(' ');
};
