export const body4 = () => `
  font-weight: 400;
  font-size: var(--font-size-tiny);
  line-height: var(--line-height-regular);
`;

export const body3 = () => `
  font-weight: 400;
  font-size: var(--font-size-extra-small);
  line-height: var(--line-height-regular);
`;

export const body2 = () => `
  font-weight: 400;
  font-size: var(--font-size-small);
  line-height: var(--line-height-regular);
`;

export const body1 = () => `
  font-weight: 400;
  font-size: var(--font-size-base);
  line-height: var(--line-height-regular);
`;

export const title4 = () => `
  font-weight: 600;
  font-size: var(--font-size-small);
  line-height: var(--line-height-loose);
`;

export const title3 = () => `
  font-weight: 600;
  font-size: var(--font-size-medium);
  line-height: var(--line-height-loose);
`;

export const title2 = () => `
  font-weight: 600;
  font-size: var(--font-size-large);
  line-height: var(--line-height-loose);
`;

export const title1 = () => `
  font-weight: 800;
  font-size: var(--font-size-extra-large);
  line-height: var(--line-height-loose);
`;

export const nmorphOutset = () => `
  background: var(--nmorph-main-color);
  box-shadow:
    var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);
`;

export const nmorphInset = () => `
  background: var(--nmorph-main-color);
  box-shadow:
    inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);
`;

export const nmorphBorder = (borderWidth: number) => `
  border: ${borderWidth}px solid var(--nmorph-main-color);
`;


export const nmorphCombined = (borderWidth = 0, isInsetDark = false) => `
  ${nmorphBorder(borderWidth)}

  background: var(--nmorph-main-color);
  box-shadow:
    var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color),
    inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    inset calc(-1 * var(--base-shadow-width)) calc(-0.5 * var(--base-shadow-width)) var(--base-shadow-blur) ${
      isInsetDark ? 'var(--nmorph-dark-shade-color)' : 'var(--nmorph-light-shade-color)'
    };
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
