export const typography = (variant = 'body') => `
  font-weight: var(--nmorph-typography-${variant}-font-weight);
  font-size: var(--nmorph-typography-${variant}-font-size);
  line-height: var(--nmorph-typography-${variant}-line-height);
`;

export const body4 = () => `
  ${typography('caption')}
`;

export const body3 = () => `
  ${typography('body-small')}
`;

export const body2 = () => `
  ${typography('body')}
`;

export const body1 = () => `
  ${typography('body-large')}
`;

export const title4 = () => `
  ${typography('label')}
`;

export const title3 = () => `
  ${typography('title-small')}
`;

export const title2 = () => `
  ${typography('title')}
`;

export const title1 = () => `
  ${typography('title-large')}
`;

export const nmorphOutset = () => `
  background: var(--nmorph-main-color);
  box-shadow: var(--nmorph-shadow-outset);
`;

export const nmorphInset = () => `
  background: var(--nmorph-main-color);
  box-shadow: var(--nmorph-shadow-inset);
`;

export const nmorphBorder = (borderWidth: number) => `
  border: ${borderWidth}px solid var(--nmorph-main-color);
`;

export const nmorphCombined = (borderWidth = 0, isInsetDark = false) => `
  ${nmorphBorder(borderWidth)}

  background: var(--nmorph-main-color);
  box-shadow: ${isInsetDark ? 'var(--nmorph-shadow-combined-dark)' : 'var(--nmorph-shadow-combined)'};
`;

export const nmorphPlainSurface = () => `
  background: var(--nmorph-main-color);
  border: var(--nmorph-plain-border);
  box-shadow: none;
`;

export const disabled = () => `
  cursor: not-allowed;
  opacity: 0.6;
`;

export const ellipsis = () => `
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const focusOutline = () => `
  outline: 2px solid var(--nmorph-accent-color);
`;
