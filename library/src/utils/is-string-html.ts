export const isStringHtml = (string: string | undefined) => {
  if (!string) return false;
  const doc = new DOMParser().parseFromString(string, 'text/html');
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};
