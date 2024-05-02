export const createBlockModifiers = (block: string, modifiers: string[]): string => {
  const stringifiedModifiers = modifiers
    .filter((mod) => mod !== 'false')
    .filter((mod) => mod)
    .map((modifier) => {
      if (modifier && modifier !== 'undefined') return `${block}--${modifier}`;
    });

  stringifiedModifiers.push(block);
  return stringifiedModifiers.join(' ');
};

export const useModifiers = (data: { [key: string]: string[] }) => {
  return Object.entries(data)
    .map(([block, modifiers]) => {
      return createBlockModifiers(block, modifiers);
    })
    .join(' ');
};
