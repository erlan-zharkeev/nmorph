import { docsLink } from "./docs-link";

const mdn = (path: string) =>
  `https://developer.mozilla.org/en-US/docs/${path}`;
const source = (path: string) =>
  `https://gitlab.com/ketjo/nmorph/-/blob/production/library/src/${path}`;

const apiTypeLinks: Record<string, string> = {
  Blob: mdn("Web/API/Blob"),
  Background: mdn("Web/CSS/background"),
  "Border-radius": mdn("Web/CSS/border-radius"),
  "Border-width": mdn("Web/CSS/border-width"),
  Color: mdn("Web/CSS/color_value"),
  CSSProperties: "https://vuejs.org/api/utility-types.html#cssproperties",
  Date: mdn("Web/JavaScript/Reference/Global_Objects/Date"),
  Event: mdn("Web/API/Event"),
  File: mdn("Web/API/File"),
  FileList: mdn("Web/API/FileList"),
  FocusEvent: mdn("Web/API/FocusEvent"),
  "Font-size": mdn("Web/CSS/font-size"),
  Gap: mdn("Web/CSS/gap"),
  Gradient: mdn("Web/CSS/gradient"),
  Height: mdn("Web/CSS/height"),
  HTMLElement: mdn("Web/API/HTMLElement"),
  HTMLImageElement: mdn("Web/API/HTMLImageElement"),
  HTMLInputElement: mdn("Web/API/HTMLInputElement"),
  InputEvent: mdn("Web/API/InputEvent"),
  "Intl.DateTimeFormatOptions": mdn(
    "Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options",
  ),
  KeyboardEvent: mdn("Web/API/KeyboardEvent"),
  Length: mdn("Web/CSS/length"),
  Margin: mdn("Web/CSS/margin"),
  "Max-height": mdn("Web/CSS/max-height"),
  "Max-width": mdn("Web/CSS/max-width"),
  "Min-height": mdn("Web/CSS/min-height"),
  "Min-width": mdn("Web/CSS/min-width"),
  MouseEvent: mdn("Web/API/MouseEvent"),
  "Object-fit": mdn("Web/CSS/object-fit"),
  Padding: mdn("Web/CSS/padding"),
  PointerEvent: mdn("Web/API/PointerEvent"),
  Promise: mdn("Web/JavaScript/Reference/Global_Objects/Promise"),
  SubmitEvent: mdn("Web/API/SubmitEvent"),
  "Transition-duration": mdn("Web/CSS/transition-duration"),
  Width: mdn("Web/CSS/width"),

  INmorphCheckboxGroupOption: source("types/index.ts"),
  INmorphCheckboxOption: source("types/index.ts"),
  INmorphFormDataExpose: source("types/index.ts"),
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
  INmorphTabPaneProps: source("components/navigation/nmorph-tabs/types.ts"),
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
