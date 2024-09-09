export const enumToString = (
  enumVariables: Record<string, string | number>
): string => Object.keys(enumVariables).join(", ");
