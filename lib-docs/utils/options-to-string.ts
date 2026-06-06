export const optionsToString = (
  options: Record<string, string | number>
): string => Object.keys(options).join(", ");
