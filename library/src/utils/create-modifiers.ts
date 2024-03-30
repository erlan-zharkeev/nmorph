export const createBlockModifiers = (block: string, modifiers: string[]): string => {
  const stringifiedModifiers = modifiers
    .filter((mod) => mod !== 'false')
    .filter((mod) => mod)
    .map((modifier) => {
      if (modifier) return `${block}--${modifier}`;
    });

  stringifiedModifiers.push(block);
  return stringifiedModifiers.join(' ');
};

export const getModifiers = (data: { [key: string]: string[] }) => {
  return Object.entries(data)
    .map(([block, modifiers]) => {
      return createBlockModifiers(block, modifiers);
    })
    .join(' ');
};
