import { docsLink } from "./docs-link";

const mdn = (path: string) =>
  `https://developer.mozilla.org/en-US/docs/${path}`;
const source = (path: string) =>
  `https://gitlab.com/ketjo/nmorph/-/blob/production/library/src/${path}`;

const apiTypeLinks: Record<string, string> = {
  Blob: mdn("Web/API/Blob"),
  CSSProperties: "https://vuejs.org/api/utility-types.html#cssproperties",
  Date: mdn("Web/JavaScript/Reference/Global_Objects/Date"),
  Event: mdn("Web/API/Event"),
  File: mdn("Web/API/File"),
  FileList: mdn("Web/API/FileList"),
  FocusEvent: mdn("Web/API/FocusEvent"),
  HTMLElement: mdn("Web/API/HTMLElement"),
  HTMLImageElement: mdn("Web/API/HTMLImageElement"),
  HTMLInputElement: mdn("Web/API/HTMLInputElement"),
  InputEvent: mdn("Web/API/InputEvent"),
  "Intl.DateTimeFormatOptions": mdn(
    "Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options",
  ),
  KeyboardEvent: mdn("Web/API/KeyboardEvent"),
  MouseEvent: mdn("Web/API/MouseEvent"),
  PointerEvent: mdn("Web/API/PointerEvent"),
  Promise: mdn("Web/JavaScript/Reference/Global_Objects/Promise"),
  SubmitEvent: mdn("Web/API/SubmitEvent"),

  INmorphCheckboxOption: source("types/index.ts"),
  INmorphFromDataExpose: source("types/index.ts"),
  INmorphNotification: source(
    "components/providers/nmorph-notification-provider/types.ts",
  ),
  INmorphRadioOption: source("types/index.ts"),
  INmorphRule: source("hooks/use-field-validation.ts"),
  INmorphScrollExpose: source("components/basic/nmorph-scroll/types.ts"),
  INmorphSelectButtonOption: source(
    "components/form/nmorph-select-button/types.ts",
  ),
  INmorphSelectOption: source("components/form/nmorph-select/types.ts"),
  INmorphTabPaneProps: source("components/navigation/nmorph-tabs/type.ts"),
  NmorphAvailableFormValueType: source("components/form/nmorph-form/types.ts"),
  NmorphContextMenuOption: source(
    "components/navigation/nmorph-context-menu/types.ts",
  ),
  NmorphFormValueType: source("components/form/nmorph-form/types.ts"),
  NmorphRulesType: source("hooks/use-field-validation.ts"),
  NmorphTagItem: "/elements/tag-item",
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const typeNames = Object.keys(apiTypeLinks).sort(
  (left, right) => right.length - left.length,
);
const typeNamePattern = new RegExp(
  `(^|[^A-Za-z0-9_$])(${typeNames.map(escapeRegExp).join("|")})(?=$|[^A-Za-z0-9_$])`,
  "g",
);

const anchorPattern = /(<a\b[^>]*>.*?<\/a>)/gis;
const isAnchorSegment = (segment: string) => /^<a\b/i.test(segment);

const linkPlainTypeNames = (type: string) =>
  type.replace(typeNamePattern, (_match, prefix: string, typeName: string) => {
    return `${prefix}${docsLink(typeName, apiTypeLinks[typeName])}`;
  });

export const linkApiType = (type: string): string =>
  type
    .split(anchorPattern)
    .map((segment) =>
      isAnchorSegment(segment) ? segment : linkPlainTypeNames(segment),
    )
    .join("");
