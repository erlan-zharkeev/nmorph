export const docsLink = (
  text: string,
  href: string,
  target = "_blank"
): string =>
  `<a class="docs-link" target="${target}" href="${href}">${text}</a>`;
