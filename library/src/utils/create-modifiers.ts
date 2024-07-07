export const createBlockModifiers = (block: string, modifiers: string[]): string => {
  const stringifiedModifiers = modifiers
    .filter((mod) => mod !== 'false' && mod && mod !== 'undefined')
    .map((modifier) => `${block}--${modifier}`);

  stringifiedModifiers.push(block);
  return stringifiedModifiers.join(' ').trim().replace(/\s+/g, ' ');
};

export const useModifiers = (data: { [key: string]: string[] }) => {
  return Object.entries(data)
    .map(([block, modifiers]) => createBlockModifiers(block, modifiers))
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');
};
