export default {
  meta: {
    description:
      "Library of UI components for Vue 3 and Nuxt in the neumorphism/sceumorphism style.",
  },
  guide: "Guide",
  components: "Components",
  about: "About",
  search: "Search",
  attributes: "Attributes",
  slots: "Slots",
  variables: "Variables",
  exposes: "Expose",
  "right-aside-title": "Contents",
  name: "Name",
  events: "Events",
  translates: "Translations",
  description: "Description",
  text: "Text",
  type: "Type",
  default: "Default",
  loadingText: "Loading ...",
  basic: "Basic",
  data: "Data",
  feedback: "Feedback",
  form: "Form",
  navigation: "Navigation",
  other: "Other",
  attention: "Attention",
  "top-bar": {
    menu: "Menu",
    nav: "Nav",
    search: "Search",
    "search-shortcut": "Ctrl K",
  },
  "search-dialog": {
    placeholder: "Search components, guide, API",
    empty: "Nothing found",
    hint: "Open with Ctrl K",
    groups: {
      guide: "Guide",
      component: "Component",
      api: "API",
      changelog: "Changelog",
      project: "Project",
    },
  },
  "footer-bar": {
    license: "Licensed under",
  },
  "unsupported-resolution": {
    title: "Resolution is not supported",
    description:
      "Open the documentation on a device with a screen width of at least 320px.",
  },
  "guide-page": {
    title: "Guide",
    "full-title": "Nmorph UI Kit guide",
    "full-description":
      "A practical guide for installing Nmorph, wiring it into Vue and Nuxt, configuring themes, using forms and overlays, and preparing component-heavy interfaces for production.",
    "theme-customize": "Customize theme",
    "custom-theme-color": "Change base color",
    "custom-text-color": "Text color",
    "custom-accent-color": "Accent color",
    "enter-color": "Enter color",
    "get-started-btn": "Quick start",
    explained:
      '<b class="main-section__subtitle">Neumorphism / Sceumorphism</b>',
    "apply-theme": "Apply theme",
    "main-content":
      '<p class="main-section__first-explained-content">Vue 3 and Nuxt UI kit for creating unique 3D designs in neumorphic style</p>',
    "quick-start": {
      installation: "Installation",
      "choose-package-manager":
        "Use <b>pnpm</b> to install the package and work with the monorepo.",
      plugin: "Library integration",
      "alternative-plugin": "Alternative integration method",
      nuxt: "Nuxt integration",
      usage: "Basic usage",
    },
    config: {
      "add-config": "Example of adding library configuration",
      available:
        "Currently, there are three available settings: theme, i18n, and zIndex",
      theme: "Theme",
      i18n: "Internationalization (i18n)",
      ls: "Save current theme in local storage",
      "rest-themes": "Your custom themes",
      "default-theme": "Selected default theme",
      "dark-shade":
        "Dark shadow depth coefficient, works only with dynamic shadow generation approach",
      "light-shade":
        "Light shadow depth coefficient, works only with dynamic shadow generation approach",
      "shadow-width": "Shadow distance",
      "shadow-blur": "Shadow blur",
      "theme-explained":
        "Pass theme colors during library installation. The minimum useful setup is main, text, and accent for each theme.",
      "auto-generation":
        "If a theme has main but no darkShade and lightShade, Nmorph generates the shadow colors automatically. Pass darkShade and lightShade manually when you need exact values.",
      "theme-runtime":
        "Use the runtime API when colors come from controls such as a color picker. Runtime colors update the managed Nmorph style tag and are not written into inline html style attributes.",
      "main-var":
        "To automatically generate darkShade and lightShade, just pass this variable.",
      "shade-var":
        "Will be automatically calculated if not mutated directly and passed via the main variable.",
      "i18n-content":
        "For proper i18n functionality, ensure that you connect i18n before the library. Currently, three locales are available: en, zh, ru.<p>The default locale is en. Import only the locales you need.</p><p>If the locales are missing, you need to add your own. The locale property will overwrite the locale from i18n passed above.</p>",
      "rewrite-translation":
        "Rewrite library translations. You can find translation message names in the component documentation.",
      "other-messages": "Other translations",
      "css-variables": "CSS Variables",
      "css-variables-content":
        "The library exposes the following CSS custom properties that you can use in your own styles.",
      "css-variables-theme-derived": "Theme-derived variables (set per theme)",
      "css-variables-auto-generated":
        "Additional text contrast variables (configurable per theme)",
      "css-variables-static":
        "Additional theme color variables (set per theme)",
      "css-var-main": "Main background color",
      "css-var-dark-shade": "Dark shadow shade",
      "css-var-light-shade": "Light shadow shade",
      "css-var-text": "Primary text color",
      "css-var-scroll-thumb": "Scroll thumb color",
      "css-var-scroll-color-scheme": "Native scrollbar color scheme",
      "css-var-accent": "Accent / brand color",
      "css-var-focus-text": "Text color on focused/accent elements",
      "css-var-placeholder": "Placeholder text color",
      "css-var-semi-contrast":
        "text color +30% brightness — for secondary text",
      "css-var-contrast": "text color +70% brightness — for high-contrast text",
    },
    other: {
      "utils-classes": "Utility classes",
    },
  },
  "about-page": {
    eyebrow: "About the project",
    lead: "Nmorph UI Kit is a Vue 3 and Nuxt component library for building tactile interfaces with soft shadows, clear states, and consistent component APIs.",
    meta: {
      vue: "Vue 3",
      nuxt: "Nuxt",
      typescript: "TypeScript",
      lightweight: "Very small bundle",
      treeShaking: "Tree-shaking",
      license: "MIT license",
    },
    "overview-title": "What it is",
    "overview-content":
      "The project provides ready-made building blocks for product interfaces: form controls, data display components, navigation, feedback elements, theme utilities, and documentation examples. The same package can be used in regular Vue applications and in Nuxt projects through the Nuxt module.",
    "features-title": "What it provides",
    features: {
      components: {
        title: "Component set",
        text: "Reusable components for forms, tables, overlays, navigation, feedback, and common UI patterns.",
      },
      bundle: {
        title: "Lightweight bundle",
        text: "The package is intentionally small and tree-shakable: import only the components, icons, and style entrypoints you use, and modern bundlers can drop unused exports.",
      },
      theme: {
        title: "Theme system",
        text: "CSS variables, light and dark themes, dynamic shadows, and utility classes for consistent styling.",
      },
      nuxt: {
        title: "Vue and Nuxt support",
        text: "Direct Vue plugin setup plus a Nuxt module for integration with Nuxt applications.",
      },
      typescript: {
        title: "Typed API",
        text: "Typed props, exported enums, helper types, and examples that document the public component API.",
      },
    },
    "system-title": "How the library works",
    system: {
      plugin: {
        title: "Plugin lifecycle",
        text: "NmorphLibrary installs the common styles, merges i18n messages, prepares theme variables, watches browser dimensions, and provides the shared Nmorph instance used by components.",
      },
      themeEngine: {
        title: "Theme engine",
        text: "Theme colors are written as CSS variables on the document, switched with the nmorph-data-theme attribute, and can be generated dynamically from the main color when shade tokens are not provided.",
      },
      nuxtModule: {
        title: "Nuxt module",
        text: "The Nuxt entry transpiles the package, registers the universal plugin for SSR and client rendering, optionally adds the full stylesheet, and merges Nmorph messages into an existing Nuxt i18n setup.",
      },
      styles: {
        title: "Styles and sizes",
        text: "Component styles share the same height scale, typography classes, radius tokens, shadow utilities, and color variables, so controls can be mixed without manual visual tuning.",
      },
      overlays: {
        title: "Overlay layer",
        text: "Dropdown, overlay, dialog, select, autocomplete, date picker, and image preview use a shared layering model with Teleport, z-index allocation, outside click handling, and placement helpers.",
      },
      forms: {
        title: "Form model",
        text: "Form components integrate with NmorphForm and validation hooks, supporting text, numeric, boolean, and array fields while still allowing direct v-model usage.",
      },
      virtualization: {
        title: "Virtualization",
        text: "Large-option and large-row scenarios are handled through virtual list mechanics for table, select, and autocomplete, with controlled item height, overscan, and scroll positioning.",
      },
      accessibility: {
        title: "Accessibility baseline",
        text: "Inputs keep native form elements where possible, expose focusable controls, preserve disabled and loading states, and keep icon-only actions inside semantic buttons.",
      },
    },
    "design-title": "Design approach",
    "design-content":
      "Nmorph uses a neumorphic and skeuomorphic visual language: soft shadows, inset states, restrained surfaces, and accent colors that make controls feel tactile without hiding their function.",
    "status-title": "Project status",
    "status-content":
      "The library is actively developed and tested. Breaking visual issues, integration problems, and component API gaps are tracked through the project issue board.",
    "links-title": "Project links",
    links: {
      guide: "Guide",
      components: "Components",
      changelog: "Changelog",
      repository: "Repository",
      issues: "Issues",
    },
  },
  "changelog-page": {
    changelog: {
      title: "Changelog",
      items: {
        "tag-list-common-color-api":
          "NmorphTagList and NmorphTagItem now expose a color prop for common design backgrounds, support v-model:selected-value and click events for clicked tag values, automatically choose readable text and close icon colors, and remove borders from common tags.",
        "tag-list-custom-content":
          "NmorphTagItem now supports a default slot for custom content, and NmorphTagList can forward an item scoped slot while preserving existing text, click, close, and v-model behavior.",
        "realtime-ui-components-api":
          "Added touch-friendly tooltip triggers, call-oriented media and audio meter components, toggle button state, public styling props, typed select modes, richer context menu items, and backward-compatible typo aliases.",
        "context-menu-repeat-right-click":
          "NmorphContextMenu now only repositions an already open context menu from a repeated right-click inside the trigger, so outside right-clicks no longer move the menu.",
        "text-input-prepend-placeholder-color":
          "NmorphTextInput prepend icons now match the placeholder color by default and switch to the focus text color together with the input.",
        "form-item-model-binding":
          "NmorphFormItem now provides field context so nested form controls can bind to a field by id when modelValue is omitted, while explicit v-model remains controlled.",
        "file-upload-form-rules":
          "NmorphFileUpload now participates in NmorphForm rules, rejects invalid files before accepting them, updates form field errors, and cleans up managed preview URLs.",
        "form-controls-visual-polish":
          "Polished form control sizing and surfaces, including checkbox and radio content height, select radius, text input backgrounds, autofill styling, and card padding propagation.",
        "dev-open-opt-in-browser":
          "Workspace dev scripts no longer open browser tabs by default; pass --open when the docs or sandbox should launch automatically.",
        "component-types-split":
          "Component prop, emit, slot, and shared library typings now live in focused type modules, keeping generated declarations easier to consume.",
        "file-upload-type-helpers":
          "NmorphFileUpload and form validation now share file type matching helpers, so MIME, extension, accept, and image-preview checks stay consistent.",
        "image-preview-lazy-portal":
          "NmorphImagePreview now mounts its preview portal only while open, so pages with many previews do not accumulate hidden portals in body.",
        "image-preview-gallery-trigger":
          "NmorphImagePreview now supports a gallery trigger that renders multiple thumbnails before opening the overlay.",
        "button-multiline-height":
          "NmorphButton now uses its height prop as a minimum for regular buttons, allowing multi-line content to expand without clipping while icon buttons stay fixed.",
        "context-menu-open-controls":
          "NmorphContextMenu now supports click, both, longpress, and manual triggers, exposes openAt/openAtElement/close, and keeps pointer menus inside the viewport.",
        "tag-list-common-design":
          "NmorphTagList now accepts design=\"common\" to render plain token-backed tags with contrast text and icons instead of the neumorphic inset surface.",
        "badge-larger-sizes":
          "NmorphBadge size now includes medium, large, and extra-large variants for larger tags, dots, and ribbons.",
        "style-utils-unification":
          "Unified modifier normalization and CSS size helpers across components so boolean modifiers and numeric CSS values follow one code path.",
        "virtual-list-style-helpers":
          "Select, Autocomplete, Table, and VirtualList now share option-height and virtual-list style helpers for more consistent scrolling surfaces.",
        "dialog-overlay-close-api":
          "NmorphDialog now documents close-on-overlay, keeps close-on-click-modal as a compatibility alias, and uses an accessible close button in the header.",
        "component-local-style-split":
          "Moved Avatar, Image, TextInput, and Scroll layout styles from common injected CSS into their component files for clearer component ownership.",
        "new-components-suite":
          "Added NmorphTextarea, NmorphDrawer, NmorphLayout, NmorphSpace, NmorphQRCode, and NmorphVirtualList to the library exports.",
        "new-components-docs-sandbox":
          "Added documentation pages, API tables, overview examples, and sandbox demos for the new components.",
        "expanded-icon-set":
          "Added more NmorphIcon exports for chevrons, clipboard states, data/server, drag handles, filters, mail, shields, save, undo, and redo actions.",
        "component-polish-round":
          "Polished existing form, data, and navigation components, including option heights, pagination controls, avatar rendering, switch/button states, and Backtop behavior.",
        "docs-api-inline-descriptions":
          "Docs API tables can now use inline descriptions when an i18n key is not available, avoiding missing-translation noise for new component pages.",
        "link-icon-name-prop":
          "NmorphLink now accepts iconName/icon-name to render a library icon before the link text, with docs and tests covering the new prop.",
        "avatar-loader-text-color":
          "NmorphAvatar loading icons now inherit the default text color instead of forcing the accent color.",
        "avatar-initials-text-color":
          "NmorphAvatar fallback initials now use the default text color instead of the accent color.",
        "badge-flat-ribbon-radius":
          "NmorphBadge flat corner ribbons now render without rounded outer edges while corner ribbons keep their visible inner radius.",
        "empty-padding-token":
          "NmorphEmpty now has a valid default padding token, keeps text inside its content area, and the docs example wraps on narrow screens.",
        "docs-collapse-title-scope":
          "Collapse examples in the docs now keep their clickable item titles visible while the source-code accordion still hides its internal title.",
        "sandbox-table-border-color":
          "The sandbox table example no longer applies an accent border override, so it matches the default Nmorph table surface more closely.",
        "docs-skeleton-loading-example":
          "The Skeleton loading docs example now imports NmorphSkeletonItem correctly, so the loading placeholder renders when loading is enabled.",
        "docs-css-type-links":
          "Docs API tables now link CSS value types such as Width, Height, Padding, Color, Background, and Transition-duration to MDN.",
        "docs-api-type-links":
          "Docs API tables now auto-link known attribute, expose, and event types, and stale component links now point to the correct element anchors.",
        "docs-example-english-source":
          "Docs example source blocks now use plain English example text instead of copying runtime i18n expressions.",
        "nuxt-build-dir-isolation":
          "Docs and sandbox Nuxt production builds now write to .nuxt-build so build commands no longer overwrite active dev-server metadata.",
        "dropdown-hide-shadow-prop":
          "NmorphDropdown and NmorphContextMenu now accept hide-shadow to render menu panels without the default neumorphic shadow.",
        "backtop-teleport-styles":
          "NmorphBacktop now keeps its position variables on the teleported button, and the docs example has a fixed scroll area so the button can appear.",
        "docs-void-expose-types":
          "Docs API tables now show expose methods without arguments and return values as void instead of () => void.",
        "docs-left-aside-scroll":
          "Docs component navigation now restores the left sidebar scroll position when moving between component pages.",
        "form-menu-option-height":
          "Autocomplete, Select slot options, and TimePicker menu options now align their item height with the control height.",
        "file-upload-all-file-types":
          "NmorphFileUpload now accepts all files by default, matches restricted types by MIME or extension, and only renders image previews for image files.",
        "pin-icon": "Added NmorphIconPin.",
        "card-header-slot-wrapper":
          "NmorphCard now renders the header wrapper only when the header slot is provided.",
        "card-combined-border-style":
          "NmorphCard now forwards --nmorph-card-combined-border-width only for combined shadow cards.",
        "send-icons":
          "Added NmorphIconSend and NmorphIconSendFilled paper plane icons.",
        "message-action-icons":
          "Added NmorphIconReply, NmorphIconReplyFilled, NmorphIconForward, and NmorphIconForwardFilled for chat message actions.",
        "smile-icon": "Added NmorphIconSmile for emoji images and reactions.",
        "scroll-gap-defaults":
          "NmorphScroll now defaults xGapInPx and yGapInPx to 0 so custom scrollbars sit flush by default.",
        "image-preview-click-through":
          "NmorphImagePreview now lets empty preview space close the overlay instead of blocking outside clicks.",
        "docs-localhost-open":
          "Root docs dev script now opens lib-docs at 127.0.0.1 instead of a LAN address.",
        "autocomplete-close-clear-spacing":
          "NmorphAutocomplete now closes without refocusing itself, keeps its clear action clickable while open, and applies default spacing to dropdown items.",
        "badge-ribbon-type":
          "NmorphBadge now supports a ribbon display type for diagonal corner labels with selectable corners, docs, and sandbox examples.",
        "badge-type-display-source":
          "NmorphBadge now uses the `type` prop as the primary display mode, including dot and tag modes, and forwards offset props to ribbon CSS variables.",
        "badge-dot-css-variable":
          "NmorphBadge dot sizing now comes from size variants and the --nmorph-badge-dot-size CSS variable instead of a dotSize prop.",
        "badge-hide-on-falsy-value":
          "NmorphBadge now accepts hideOnFalsyValue to hide the badge indicator when value is falsy, including 0.",
        "badge-ribbon-tilt":
          "NmorphBadge ribbon mode now supports flat corner placement through ribbonTilt, rounded ribbon edges, and expanded docs and sandbox examples.",
        "badge-ribbon-inner-radius-tiny":
          "NmorphBadge ribbon corners now use a subtle 4px radius only on the visible inner side, and tiny ribbons render with lighter, smaller text.",
        "file-upload-controlled-reset":
          "NmorphFileUpload now stays synchronized with modelValue, clears its native file input on reset/removal/unsupported type, and lets the same file be selected again without a :key reset.",
        "callout-size-props":
          "NmorphCallout now exposes size props for padding, border radius, accent strip width, title gap, and title/content font sizes.",
        "file-upload-truncate-grid":
          "NmorphFileUpload now keeps selected file names truncating correctly inside grid and dialog layouts without expanding the row.",
        "image-preview-closed-portal":
          "NmorphImagePreview now removes the closed preview portal from hit testing so dialogs with inline previews remain interactive.",
        "file-upload-preview-flex":
          "NmorphFileUpload now lays out selected image rows with flexible file info, fixed preview and remove controls, and no horizontal overflow in dialogs.",
        "dialog-indentation-03-padding":
          "NmorphDialog now uses indentation-03 for its outer padding.",
        "dialog-content-overflow-x":
          "NmorphDialog now hides horizontal overflow inside the content area while keeping vertical content scrolling available.",
        "card-content-class-prop":
          "NmorphCard now accepts contentClass so consumers can style the content wrapper without reaching through nested selectors.",
        "dialog-compact-section-padding":
          "NmorphDialog now uses 4px outer padding and separate 4px padding for the header and content sections.",
        "sandbox-component-examples":
          "Sandbox examples now demonstrate badge dot sizing through CSS variables and the checkbox group column state with checkbox design.",
        "notification-provider-z-index-stack":
          "NmorphNotificationProvider now follows the shared z-index stack by default so notifications stay above active overlays and dialogs.",
        "dialog-viewport-scroll":
          "NmorphDialog now stays within the viewport, keeps its header visible, and scrolls overflowing content inside the dialog body.",
        "sandbox-source-aliases":
          "Sandbox Nuxt dev/build now resolves nmorph runtime imports from library/src so examples reflect source changes without rebuilding dist.",
        "empty-border-box":
          "NmorphEmpty now includes its padding inside the component width, preventing empty-state content from pressing against grid or docs preview edges.",
        "empty-state-component":
          "Added NmorphEmpty for empty states, including typed props, slots, docs, and sandbox examples.",
        "card-padding-prop":
          "NmorphCard now accepts a cardPadding prop that forwards to the --card-padding CSS variable, with numeric values converted to pixels.",
        "card-fill-prop":
          "NmorphCard now fills the available width by default and can fit its content when fill is false.",
        "card-tag-prop":
          "NmorphCard now accepts a tag prop so the root element can render as div, article, section, or another HTML tag.",
        "css-variable-prop-overrides":
          "Component CSS variables can now be overridden through props across badges, tooltips, form controls, tables, progress, alerts, and related components.",
        "context-menu-neutral-hover":
          "NmorphContextMenu now derives the default option hover background from the base text color instead of the accent color, while custom colored items still use their own color.",
        "tooltip-z-index-stack":
          "NmorphTooltip now participates in the shared automatic z-index stack and supports an explicit zIndex override.",
        "notification-provider-first-animation":
          "NmorphNotificationProvider now keeps placement transition groups mounted so the first notification animates like the following ones.",
        "carousel-collapse-docs":
          "Carousel and Collapse are now covered by the component registry, docs pages, API tables, examples, and sandbox checks.",
        "time-picker-component":
          "Added NmorphTimePicker with typed exports, locale strings, docs overview, and sandbox examples.",
        "image-preview-overlay-fit":
          "NmorphImagePreview keeps its overlay content inside the preview portal and constrains opened images with contain sizing.",
        "image-preview-control-visibility":
          "NmorphImagePreview now lets consumers hide gallery navigation buttons and the bottom action bar independently.",
        "compact-sandbox-visual-fixes":
          "Fixed tag remove cursor, right-side number input action order, carousel looping, collapse reopening, and Windows scrollbar button styling.",
        "dev-open-workflow":
          "Root dev scripts now open docs and sandbox through a shared helper, and Nuxt dev configs stub Vue devtools API to avoid the devtools export error.",
        "context-menu-options-api":
          "NmorphContextMenu now accepts text, object, and component options with built-in item layout, hover states, disabled handling, and select events.",
        "context-menu-scroll-position":
          "NmorphContextMenu click triggers now stay anchored to the trigger while scrolling, pointer-opened menus close on scroll, and automatic menu width keeps items left-aligned.",
        "sandbox-nuxt-migration":
          "The old nuxt-sandbox workspace was removed and the main sandbox now runs on Nuxt with the context menu example wired through the same public API as the docs.",
        "context-menu-trigger-modes":
          "NmorphContextMenu now supports contextmenu, click, and both trigger modes, fixes uncontrolled usage without v-model, and documents the new trigger API.",
        "badge-min-width":
          "NmorphBadge now keeps a wider minimum content width so one-character badges stay readable in compact layouts.",
        "nuxt-hydration-warning-cleanup":
          "Nuxt docs integration now avoids theme switch hydration mismatches, duplicate vue-i18n registration warnings, and noisy dev hook timing logs.",
        "docs-route-lazy-overviews":
          "Docs component overviews now lazy-load per route, including example sources and icon data, so the initial docs bundle stays smaller.",
        "library-entrypoints-tree-shaking":
          "The library package now exposes separate icons and styles entrypoints, keeps CSS marked as side effects, and avoids forcing consumers to pull unused icons or styles.",
        "context-menu-component":
          "Added NmorphContextMenu based on NmorphDropdown, with pointer positioning, keyboard context menu support, Escape/outside-click closing, API docs, and sandbox examples.",
        "overlay-focus-management":
          "Overlay-based dialog, dropdown, select, and autocomplete flows now share Escape handling, ARIA roles, outside-click behavior, and focus trap support where needed.",
        "virtualization-keyboard-dynamic-height":
          "NmorphTable, NmorphSelect, and NmorphAutocomplete virtualization now support stronger keyboard navigation, dynamic item heights, and scroll position preservation.",
        "date-format-flexibility":
          "NmorphDatePicker and calendar utilities now support nullable models plus custom date formatting through Intl options, token patterns, or a formatter function.",
        "button-custom-color-hover":
          "NmorphButton now preserves a custom color prop, uses normal text color by default, and derives transparent hover color from the passed color instead of accent.",
        "css-shadow-token-cleanup":
          "Shared shadow tokens now centralize common inset/outset styles, reducing duplicated CSS across components and docs.",
        "image-preview-fullscreen-controls":
          "NmorphImagePreview now keeps the preview image visible in fullscreen mode, keeps gallery and zoom controls above the overlay, and closes from the backdrop or Escape.",
        "docs-example-source-files":
          "Docs attribute examples now use shared source `.example.vue` files, so the rendered preview and highlighted code stay in sync without duplicating templates and styles.",
        "docs-code-copy-fix":
          "Docs code blocks now keep the correct top spacing and copy the full example source through the clipboard API with a fallback path.",
        "callout-docs-bottom-spacing":
          "NmorphCallout no longer ships bottom margin in the library; docs apply their own callout spacing where notices need separation.",
        "callout-default-bottom-spacing":
          "NmorphCallout now has default bottom spacing, so stacked callouts and following content no longer touch each other.",
        "storybook-sass-modern-api":
          "Storybook and library dev configs now use the Dart Sass modern API instead of the deprecated legacy JS API.",
        "workspace-dev-script-fixes":
          "Docs and Storybook dev scripts now use local host/path helpers, include asset/raw import typings, and avoid pulling Storybook into the default dev run.",
        "ci-pnpm-publish":
          "CI build and publish jobs now install the workspace with pnpm and publish the library from the prepared package.",
        "nuxt-theme-first-paint":
          "Nuxt integration now applies the saved theme before first paint, injects SSR theme/common styles, and avoids the light/dark theme flash on reload.",
        "backtop-teleport-safe-area":
          "NmorphBacktop now teleports to body, supports z-index and teleport target props, respects mobile safe-area bottom, and avoids clipping inside scroll containers.",
        "ios-input-scrollbar-fixes":
          "Common styles now prevent iOS input auto-zoom and align native scrollbar color scheme/thumb colors with the active Nmorph theme.",
        "pnpm-turbo-docs-refresh":
          "The repo moved to pnpm workspaces with Turbo scripts, Sass uses the modern API, and docs received updated Guide/About content, mobile navigation, layout, search, and code highlighting fixes.",
        "virtualized-table-select-autocomplete":
          "NmorphTable, NmorphSelect, and NmorphAutocomplete now support virtualized large datasets with configurable item height and overscan.",
        "overlay-dropdown-teleport-placement":
          "NmorphOverlay and NmorphDropdown now render through body Teleport, recalculate placement after open, and support end alignment such as bottom-end.",
        "nuxt-ssr-theme-runtime":
          "Nuxt integration and theme/browser hooks were updated to keep SSR markup available while deferring browser-only work until the client.",
        "compact-control-visual-fixes":
          "Fixed compact radio, checkbox, pagination, icon, and color-picker sizing so disabled and extra-thin controls stay aligned and readable.",
        "pagination-basic-height":
          "NmorphPagination now uses the basic control height by default, so page controls align with pagination buttons.",
        "checkbox-radio-button-controls":
          "NmorphCheckbox and NmorphRadio controls now use button design by default, support the extra-thin height, and keep shared models synchronized across groups.",
        "avatar-image-preview-cleanup":
          "NmorphAvatar no longer renders a hidden preview trigger, and NmorphImagePreview removes the preview frame shadow.",
        "nuxt-i18n-merge":
          "The Nuxt module now merges Nmorph translations into an existing i18n instance automatically.",
        "avatar-preview-resolve":
          "NmorphAvatar now resolves NmorphImagePreview internally, so avatar preview works with direct component imports.",
        "backtop-contrast-icon":
          "NmorphBacktop now uses the contrast text color for the common design arrow icon.",
        "component-css-splitting":
          "Component chunks now import their own CSS, so direct component imports no longer require pulling the full library stylesheet.",
        "plugin-entry-styles-option":
          'Added the nmorph-ui-kit/plugin entry for plugin setup without component imports, and Nuxt can opt into the full stylesheet with `nmorph.styles: "all"`.',
        "remove-styled-components":
          "Removed styled-components from Nmorph UI components and replaced runtime-generated styled classes with stable Vue markup and SCSS.",
        "avatar-text-input-visual-fixes":
          "Aligned NmorphAvatar image radius with its frame and fixed raw SVG prepend icon rendering in NmorphTextInput.",
        "nuxt-module":
          "Added Nuxt module support through `nmorph-ui-kit/nuxt` with automatic plugin registration.",
        "image-preview-portal":
          "NmorphImagePreview now renders its overlay through body, so parent isolation and stacking contexts do not break the preview.",
        "text-input-prepend-icon":
          "NmorphTextInput now sizes and colors raw SVG prepend icons correctly.",
        "docs-actions-align":
          "Aligned docs example action buttons and removed the test coverage roadmap item.",
        "height-basic-name":
          "Renamed the shared component height value from `default` to `basic`, and updated component defaults and docs to use thick, basic, and thin.",
        "checkbox-radio-defaults":
          "NmorphCheckbox, NmorphCheckboxGroup, NmorphRadio, and NmorphRadioGroup now default to thin height; radio controls now render as round radio controls by default.",
        "overlay-z-index-stack":
          "Added a shared automatic z-index stack for overlays, dropdowns, selects, dialogs, date pickers, autocomplete, and image previews.",
        "overlay-z-index-props":
          "Nmorph overlay-based components now support `zIndex`, and the library install options can set the shared z-index base.",
        "text-input-clear-space":
          "NmorphTextInput now reserves space for the clear/password action button so placeholder text does not overlap it in narrow inputs.",
        "checkbox-height":
          "NmorphCheckbox and NmorphCheckboxGroup now support `height` with thin, basic, and thick component sizes.",
        "radio-height":
          "NmorphRadio and NmorphRadioGroup now support `height` with thin, basic, and thick component sizes.",
        "avatar-preview":
          "NmorphAvatar now supports image preview on click, including multiple gallery images through `src` or `previewSrc`.",
        "callout-spacing":
          "NmorphCallout no longer adds bottom margin by default.",
        "media-control-icons":
          "Added media control icons: play, pause, stop, record, and a square exit alternative.",
        "select-fill-options-width":
          "NmorphSelect now supports `fill` and `optionsWidth`, can stretch to container width, truncate long option labels, or expand dropdown options to fit content.",
        "select-loading-disabled":
          "NmorphSelect now disables the native input while loading and closes the dropdown when loading starts.",
        "dropdown-size-css-values":
          "NmorphDropdown width props now accept CSS string values and support min-width and max-width.",
        "form-control-transition-cleanup":
          "NmorphColorPicker and NmorphSwitch no longer animate background and shadow changes, so theme updates apply instantly.",
        "callout-status-types":
          "NmorphCallout title is now optional and the component supports success and error status colors.",
        "theme-runtime-api":
          "Added runtime theme APIs: `setThemeColors` and `applyTheme` update the managed Nmorph style tag without writing inline styles to html.",
        "theme-options-typing":
          "Cleaned up theme typings so install options and per-theme color options are typed separately, and missing theme config is handled safely.",
        "callout-component":
          "Added NmorphCallout to the library, docs, component overview, and sandbox.",
        "select-button-fill":
          "NmorphSelectButton now supports the `fill` prop and can stretch its items across the container width.",
        "badge-size":
          "NmorphBadge now supports the `size` prop with tiny, extra-small, and base variants.",
        "guide-css-variables-utilities":
          "Updated the Guide CSS variables reference and simplified utility class documentation to class names and purpose.",
        "docs-mobile-menu-fit-content":
          "Docs side menu now sizes to its content and the mobile header alignment was refined.",
        "avatar-name-initials":
          "NmorphAvatar now supports a `name` prop and renders generated initials when no image is available. Avatar docs were updated with API and usage examples.",
        "notification-provider-placement-per-notification":
          "NmorphNotificationProvider now supports `placement` on each notification, so one provider can render notifications in different screen positions.",
        "notification-provider-quantity-leave-style":
          "Fixed notification removal when `quantity` is exceeded: leaving alerts keep icon sizing, colors, and layout during the transition.",
        "button-transparent-hover-icons":
          "Transparent NmorphButton hover now highlights both text and icons with the accent color.",
        "badge-z-index":
          "NmorphBadge now supports a `zIndex` prop for controlling badge stacking order.",
        "color-picker-display-format":
          "NmorphColorPicker can display selected colors as hex, RGB, or HSL values through the `displayFormat` prop.",
        "file-upload-model-custom-data":
          "NmorphFileUpload now preserves custom file preview data in `v-model`, respects disabled state for selection and removal, and uses the icon-only remove button slot.",
        "slider-pointer-events":
          "NmorphSlider now uses pointer events, improving touch dragging and cleaning up document listeners on unmount.",
        "scroll-thumb-theme-color":
          "NmorphScroll thumb color now uses the theme text color by default and can be configured with `scrollThumb` / `--nmorph-scroll-thumb-color`.",
        "color-picker-fixed-value-width":
          "NmorphColorPicker now renders shown hex values with fixed-width formatting so equal-length values keep equal component width.",
        "scroll-default-height-100":
          'NmorphScroll now defaults to `height="100%"`, and the API docs plus descriptive copy were aligned with that behavior.',
        "scroll-typing-fixes":
          "Fixed TypeScript typings in NmorphScroll: container size and scroll coordinate access no longer produces `undefined` errors, and the public expose type for `moveTo` and `scrollDOMContainer` was cleaned up.",
        "notification-provider-close-animation":
          "NmorphNotificationProvider now keeps alert styles intact during close animation, preserves stacked layout, and avoids jarring reflow while notifications leave.",
        "notification-provider-uuid-ids":
          "useNmorphNotification now generates UUID-based notification ids to avoid collisions when multiple notifications are created in quick succession.",
        "button-icon-slots-breaking":
          "Breaking change: NmorphButton slot API was split. `icon` now renders a leading icon next to content, and icon-only buttons must use the new `icon-only` slot.",
        "otp-input-component":
          "Added NmorphOTPInput with documentation and sandbox examples. It reuses NmorphTextInput styling and supports paste, keyboard navigation, and completion events.",
        "form-autocomplete-forwarding":
          "NmorphFormItem now forwards autocomplete to nested form controls, and the affected component API docs were updated.",
        "text-input-composition-api":
          "NmorphTextInput now exposes focus, blur, and select methods and accepts additional native input attributes for composed controls such as OTP input.",
        "avatar-fallback-prop":
          "NmorphAvatar now accepts a fallback component prop with a default NmorphIconAvatar fallback, and the avatar API docs were updated.",
        "button-fill-transparent-color":
          "NmorphButton fill now reliably stretches to the container width, and transparent buttons support custom text and icon color through the color prop.",
        "badge-value-slot":
          "NmorphBadge now accepts `undefined` as `value`, hides itself when no value is provided, and supports a custom `value` slot for badge content. Docs and sandbox examples were added.",
        "scroll-height-100":
          'NmorphScroll now behaves correctly with `height="100%"` when the parent has an explicit height, and the docs now show both fixed and relative height examples.',
        "theme-config-contrast-types":
          "Theme config typings and docs were synchronized with runtime behavior: `focusText` is now correctly typed, and `placeholderText`, `semiContrastText`, and `contrastText` are documented in the theme example.",
        "select-button-no-theme-transition":
          "NmorphSelectButtonItem no longer animates background and box-shadow, so theme switching is instant and visually consistent with the rest of the library.",
        "radio-optional-inject-types":
          "Fixed NmorphRadio inject typings so standalone usage no longer causes TypeScript errors when group injections are absent.",
        "color-picker":
          "Added NmorphColorPicker component, a documentation page for it, and examples for height, value display, disabled state, and theme-accent default color.",
        "badge-tag-mode":
          "Added is-tag mode to NmorphBadge so it can render as a standalone badge without overlay positioning or a default slot.",
        "badge-undefined-hidden":
          "NmorphBadge now hides itself when value is undefined; dot mode still renders without a value.",
        "exit-users-icons":
          "Added NmorphIconExit and NmorphIconUsers to the icon set and the icon documentation page.",
        "form-boolean-compare":
          "Form validation rules now accept boolean compareValue values, and the form API docs were updated accordingly.",
        "image-src-optional":
          "Made NmorphImage src optional in the public typings and aligned the image API docs with the runtime behavior.",
        "select-button-keyboard-focus":
          "NmorphSelectButtonItem is now keyboard-accessible: Tab focuses each item, Space/Enter selects it, and a focus-visible outline is shown.",
        "tabindex-prop":
          "Added tabindex prop to INmorphCommonInputProps — all form controls (NmorphTextInput, NmorphSwitch, NmorphSlider, NmorphNumberInput, NmorphSelect, NmorphSelectButtonItem) now support tabindex.",
        "form-item-input-inheritance":
          "Form controls now inherit id and name from NmorphFormItem automatically, so labels and native form attributes stay linked without manual prop forwarding.",
        "text-input-autofill-styles":
          "Fixed NmorphTextInput autofill styling so browser autofill no longer overrides the neumorphic shadows and field colors.",
        "google-icon": "Added NmorphIconGoogle to the icon set.",
        "contrast-text-colors":
          "Added --nmorph-semi-contrast-text-color and --nmorph-contrast-text-color CSS variables to default light and dark themes.",
        "form-item-label-for":
          "NmorphFormItem label now has a correct for attribute linked to the input via inputId prop on NmorphTextInput.",
        "error-box-single-error":
          "NmorphErrorBox now shows only the most relevant error instead of all errors at once.",
        "validation-icon-fix":
          "Fixed NmorphValidationIcon not rendering: icon components were passed as strings instead of component objects.",
        "select-button-unselected-opacity":
          "NmorphSelectButton: unselected items now appear semi-transparent for clearer visual feedback.",
        "select-button":
          "Added new NmorphSelectButton component — a segmented button group with slot and options-based API.",
        "engines-range":
          "Relaxed package engines requirements to support modern Node and npm versions.",
        "skeleton-animation":
          "Fixed Skeleton loading animation: shimmer now works when loading is enabled.",
        "export-en-locale":
          "Added export of English locale messages from the package entry point.",
      },
    },
    "known-bugs": {
      title: "Known bugs",
      items: {},
    },
  },
  "guide-menu": {
    "quick-start": "Quick start",
    config: "Configuration",
    other: "Other",
  },
  overview: {
    "basic-usage": "Basic usage",
    basic: "Basic",
    off: "Off",
    on: "On",
    one: "One",
    two: "Two",
    three: "Three",
    four: "Four",
    disabled: "Disabled",
    "disabled-thin": "Disabled",
    thick: "Thick",
    default: "Default",
    thin: "Thin",
    "i-am-ripple": "I have ripple",
    "i-am-ripple-with-hover-bg": "I have ripple and hover background",
    "i-am-not-ripple": "I do not have ripple",
    circle: "Circle",
    round: "Round",
    square: "Square",
    transparent: "Transparent",
    date: "Date",
    dates: "Dates",
    "date-range": "Date range",
    summer: "Summer",
    "load-error": "Load error",
    "custom-loading-text": "Custom loading text",
    "download-in-progress": "Download in progress",
    show: "Show",
    edit: "Edit",
    check: "Check",
    "without-underline": "Without underline",
    underlined: "Underlined",
    "selected-page": "Selected page:",
    loading: "Loading...",
    "i-am-slot-prefix": "I am slot prefix",
    add: "Add",
    remove: "Remove",
    animated: "Animated",
    "loading-state": "Loading state",
    value: "Value:",
    "sort-values": "Sort values",
    "custom-label": "Custom label",
    "custom-content-for": "Custom content for",
    "tag-zero": "Tag zero",
    "tag-one": "Tag one",
    "tag-two": "Tag two",
    "i-am-disabled": "I am disabled",
    "enter-text": "Enter text",
    "model-text": "Model text:",
    "explore-components": "Explore components",
    button: {
      "style-type": {
        subtitle: "Use *default* or *transparent* to define the base style.",
      },
      loading: {
        subtitle: "Use *boolean* to enable or disable the loading icon.",
      },
      ripple: {
        subtitle:
          "Use *boolean* to enable or disable the ripple effect on click.",
      },
      height: {
        subtitle:
          "Set the height, available values are *thick*, *basic*, *thin*.",
      },
      disabled: {
        subtitle: "Use *boolean* to disable the button.",
      },
      "icon-slots": {
        subtitle:
          "The `icon` slot now renders a leading icon next to the content, while `icon-only` is the dedicated icon-only button mode.",
      },
      shape: {
        info: {
          title: "Info",
          content:
            "When using round or square, the size is changed using the --height variable.",
        },
        subtitle: "Use shape to change the border radius of the button.",
      },
      api: {
        type: "Native button type",
        text: "Button text",
        loading: "Enable/disable loader",
        "style-type": "Change button style",
        color: "Change text and icon color for a transparent button",
        "accent-bg-on-hover": "Enable/disable background color on hover",
        ripple: "Enable/disable ripple on click",
        fill: "Fill container with button",
        disabled: "Disable button",
        height: "Change button height",
        shape: "Change shape",
      },
      slot: {
        default: "Main button content",
        append: "Custom content on the right side of the main content",
        icon: "Leading icon displayed before the main content",
        "icon-only":
          "Dedicated icon-only button mode. Hides default, text, and append content",
      },
      variables: {
        height: "Button height",
      },
      exposes: {
        buttonDOMElement: "Original button DOM element",
      },
    },
    icon: {
      "search-icon": "Find icon",
      size: {
        subtitle: "Icon size. Defines both the height and width.",
      },
      "width-height": {
        subtitle: "Define the width and height of the icon.",
      },
      color: {
        subtitle:
          "Icon color. You can use custom colors or pass an available variable.",
      },
      api: {
        size: "Icon size. Defines height and width",
        width: "Sets the width of the icon",
        height: "Sets the height of the icon",
        color: "Defines the icon color",
        icon: "Sets the icon from the available icon list",
      },
      slot: {
        default: "Slot for customizing the icon's content",
      },
      variables: {
        color: "Defines the icon color",
      },
    },
    link: {
      type: {
        subtitle: "Color type: *accent*, *success*, *error*, *warning*.",
      },
      underline: {
        subtitle: "Underline the link.",
      },
      disabled: {
        subtitle: "Inactive state of the link.",
      },
      "icon-name": {
        subtitle: "Adds an icon before the link text by icon name.",
      },
      api: {
        type: "Color type",
        href: "Native href attribute",
        underline: "Show underline on hover",
        "icon-name": "Name from the icon list",
        target: "Native target attribute",
        disabled: "Disable the link",
        color: "Overrides the link color",
      },
      slot: {
        default: "Custom content of the link",
        prepend: "Add custom content at the beginning",
        icon: "Place for the icon",
      },
      variables: {
        "link-color": "Link color",
      },
    },
    scroll: {
      height: {
        subtitle:
          "The default value is `100%`. Use the *height* property to set the container's height. Fixed values like `300px` and relative values like `100%` are supported when the parent has an explicit height.",
      },
      "max-height": {
        subtitle:
          "Scroll is displayed only if the element's height exceeds the maximum height.",
      },
      "model-value": {
        subtitle: "Property for two-way data binding of the model.",
      },
      "horizontal-scroll": {
        subtitle:
          "If the element's width exceeds the scroll area width, a horizontal scrollbar appears.",
      },
      api: {
        height: "Sets the scroll container's height",
        "max-height": "Sets the scroll container's maximum height",
        "model-value":
          "Contains the current scroll position, used for two-way binding and scroll control",
        "scroll-y-prop":
          "Defines the vertical scroll behavior, e.g., *auto* or *hidden*",
        "scroll-x-prop":
          "Defines the horizontal scroll behavior, e.g., *auto* or *hidden*",
        "css-scroll-behavior":
          "Defines scroll animation behavior, e.g., *smooth* for smooth scrolling",
        "scroll-end-delay": "Delay before scroll ends in milliseconds",
        "update-only-on-scroll-end":
          "When set to *true*, updates the model value only after the scroll ends",
        "y-bar-width-in-px": "Vertical scrollbar width",
        "x-bar-width-in-px": "Horizontal scrollbar width",
        "y-gap-in-px": "Content gap for the vertical scrollbar",
        "x-gap-in-px": "Content gap for the horizontal scrollbar",
      },
      slot: {
        default: "Scroll content",
      },
      variables: {
        "thumb-color": "Thumb color. Defaults to --nmorph-scroll-thumb-color",
      },
      exposes: {
        scrollDOMContainer: "DOM element of the container",
        moveTo: "Function to set new coordinates",
      },
      events: {
        "update:model-value": "Event for intercepting two-way binding",
        "on-scroll-end": "Event triggered after scroll animation ends",
        "on-scroll": "Scroll event",
      },
    },
    avatar: {
      size: {
        subtitle: "Sets the size of the avatar, accepts a *number* type value.",
      },
      shape: {
        subtitle:
          "Defines the shape of the avatar. Can be *circle* or *square*.",
      },
      fit: {
        subtitle: "Defines how the image is displayed in the container.",
      },
      name: {
        subtitle:
          "Used to generate initials for the fallback when no image is available.",
      },
      preview: {
        subtitle:
          "Opens an image preview on avatar click. `src` and `previewSrc` can accept a string or an array of strings.",
      },
      api: {
        size: "Sets the size of the avatar",
        shape: "Defines the shape of the avatar",
        src: "Avatar image URL or preview gallery URLs",
        name: "Name used to generate fallback initials",
        preview: "Enables image preview on click",
        "preview-src": "Image URL or URL list used only by the preview",
        "preview-initial-index": "Initial image index for preview gallery",
        "preview-scale-step": "Scale step for preview zoom actions",
        "preview-min-scale-level": "Minimum preview scale level",
        "preview-max-scale-level": "Maximum preview scale level",
        "src-set": "List of image sources",
        alt: "Text description of the image",
        fit: "Defines how the image fills the container",
        "frame-border": "Defines the thickness of the frame",
        "image-padding": "Inner padding",
        fallback:
          "Component shown when the image cannot be loaded or src is not provided. Defaults to NmorphIconAvatar",
      },
      slot: {
        error: "Slot to display the load error",
      },
      events: {
        error: "Event for image load error",
        load: "Event for successful image load",
      },
    },
    badge: {
      value: {
        subtitle:
          "The displayed value on the badge, can be *string* or *number*. If omitted and `type` is not `dot`, the badge is not rendered.",
      },
      "value-slot": {
        subtitle:
          "Lets you fully replace the content inside the badge through the `value` slot. Slot props expose `value` and `displayValue`. Works in the default overlay mode.",
      },
      max: {
        subtitle:
          "Maximum value for the badge. If it's set as a number and exceeded, it's displayed as max+.",
      },
      type: {
        subtitle:
          "Switches between default, dot, tag, and ribbon badge display.",
      },
      "ribbon-corner": {
        subtitle: "Selects the corner used by the ribbon badge.",
      },
      "ribbon-tilt": {
        subtitle:
          "Controls whether the ribbon badge is tilted diagonally or placed flat in the selected corner.",
      },
      "is-dot": {
        subtitle:
          "Displays the badge as a small dot if set to *true*. Works even when `value` is omitted.",
      },
      "is-tag": {
        subtitle:
          "Displays the badge as a standalone element without the default slot. Offsets are ignored in this mode.",
      },
      hidden: {
        subtitle: "Controls the visibility of the badge.",
      },
      color: {
        subtitle: "Background color of the badge.",
      },
      size: {
        subtitle: "Controls the badge text size through font-size variables.",
      },
      offset: {
        subtitle:
          "Horizontal/vertical offset of the badge relative to its parent.",
      },
      api: {
        value:
          "The displayed value on the badge. If undefined and type is not dot, the badge is hidden",
        max: "Maximum value to display",
        type: "Sets the badge display type: default, dot, tag, or ribbon",
        "ribbon-corner": "Sets the ribbon corner when type is ribbon",
        "ribbon-tilt":
          "Tilts the ribbon diagonally when enabled, or keeps it flat in the selected corner when disabled",
        "is-dot": "Displays the badge as a dot",
        "is-tag":
          "Switches the badge to a standalone tag mode without absolute positioning or a default slot",
        hidden: "Hides the badge",
        "hide-on-falsy-value":
          "Hides the badge indicator when value is falsy, including 0 and an empty string.",
        color: "Sets the background color of the badge",
        size:
          "Sets the badge text size: tiny, extra-small, base, medium, large, or extra-large",
        "z-index": "Defines the stacking order of the badge",
        "offset-y":
          "Vertical offset of the badge. For ribbon, forwards to --nmorph-badge-ribbon-offset-y. Ignored when type is tag",
        "offset-x":
          "Horizontal offset of the badge. For ribbon, forwards to --nmorph-badge-ribbon-offset-x. Ignored when type is tag",
      },
      slot: {
        default:
          "Wrapped content the badge is attached to. Not used when `type` is `tag`.",
        value:
          "Custom content inside the badge instead of the plain `value`. Works only in overlay mode.",
      },
      variables: {
        "nmorph-badge-dot-size": "Width and height of the dot",
        "nmorph-badge-ribbon-height": "Height of the ribbon badge strip",
        "nmorph-badge-ribbon-width": "Width of the ribbon badge strip",
        "nmorph-badge-ribbon-corner-size":
          "Size of the corner zone used to position the ribbon strip",
        "nmorph-badge-ribbon-offset-x":
          "Manual horizontal offset for the ribbon corner zone",
        "nmorph-badge-ribbon-offset-y":
          "Manual vertical offset for the ribbon corner zone",
      },
    },
    card: {
      "shadow-type": {
        subtitle: "Defines the shadow type for the card.",
      },
      "card-padding": {
        subtitle:
          "Sets the card padding through the same CSS value used by the `--card-padding` variable.",
      },
      fill: {
        subtitle:
          "Controls whether the card stretches to the available width or fits its content.",
      },
      tag: {
        subtitle: "Changes the HTML tag used for the card root element.",
      },
      api: {
        "shadow-type": "Defines the visibility of the card's shadow.",
        "card-padding":
          "Overrides the card padding. Numbers are treated as pixel values.",
        "content-class": "Adds a custom class to the card content wrapper.",
        "combined-shadow-border-width":
          "Border width used only when shadow-type is combined.",
        fill: "When true, the card takes the available width. Set false to fit the content width.",
        tag: "HTML tag used for the card root element.",
      },
      slot: {
        header:
          "Card header. The header wrapper renders only when this slot is provided.",
        footer: "Card footer",
      },
      variables: {
        "card-padding": "Padding for all edges",
      },
    },
    empty: {
      "basic-usage": {
        subtitle:
          "Shows empty states with default content, custom icons, actions, and common or nmorph surfaces.",
      },
      api: {
        title: "Main empty state title.",
        description: "Secondary empty state message.",
        "icon-size": "Default icon size. Numbers are treated as pixel values.",
        "min-height":
          "Minimum empty state height. Numbers are treated as pixel values.",
        padding:
          "Inner empty state padding. Numbers are treated as pixel values.",
        design: "Visual design of the empty state surface.",
        "shadow-type": "Nmorph shadow used when design is nmorph.",
        "hide-icon":
          "Hides the default icon. The icon slot still renders when provided.",
        role: "ARIA role applied to the empty state container.",
        "aria-label": "Accessible label. Falls back to the title when omitted.",
      },
      slot: {
        icon: "Custom icon content.",
        title: "Custom title content.",
        description: "Custom description content.",
        action: "Action area below the message.",
      },
      variables: {
        "nmorph-empty-icon-size": "Default icon width and height.",
        "nmorph-empty-min-height": "Minimum empty state height.",
        "nmorph-empty-padding": "Inner empty state padding.",
      },
    },
    image: {
      fit: {
        subtitle:
          "Defines how the image fits into the container. Accepts values such as *fill*, *contain*, *cover*, *none*, *scale-down*.",
        info: {
          title: "Information",
          content:
            "To ensure the 'fit' property is displayed correctly, make sure the container has a fixed size.",
        },
      },
      "loading-text": {
        subtitle: "Text displayed during image loading.",
      },
      "load-failed-text": {
        subtitle: "Text displayed when the image fails to load.",
      },
      api: {
        fit: "Defines how the image should fit into the container.",
        "close-on-outside-click":
          "Closes the preview when clicking outside the container.",
        alt: "Text description for the image.",
        "loading-text": "Text displayed during image loading.",
        "load-failed-text": "Text displayed when the image fails to load.",
        "frame-border": "Defines the thickness of the frame.",
        "image-padding": "Defines the padding of the image.",
        src: "Image URL.",
        "src-set": "List of image sources.",
      },
      slot: {
        loading: "Slot for custom content displayed during image loading.",
        error: "Slot for custom content displayed when image loading fails.",
      },
      variables: {
        width: "Defines the width of the image.",
        height: "Defines the height of the image.",
        "background-color": "Defines the background color of the image.",
      },
      events: {
        error: "Image error event.",
        load: "Image load event.",
      },
      translates: {
        loadingText: "Loading ...",
        loadFailedText: "Failed to load image.",
      },
    },
    "tag-list": {
      api: {
        "model-value": "List of tags",
        design: "Defines the default visual style for tags in the list",
      },
      events: {
        "update:model-value": "Event for intercepting two-way binding",
        close: "Returns the value of the closed tag",
      },
    },
    "tag-item": {
      text: {
        subtitle: "Defines the text content displayed in the component.",
      },
      removable: {
        subtitle:
          "Defines whether the component can be removed by the user. Accepts *boolean*.",
        info: {
          title: "Information",
          content:
            "If you want the tag display to be handled automatically, you can wrap the component in NmorphTagList.",
        },
      },
      height: {
        subtitle: "Defines the height of the component.",
      },
      design: {
        subtitle:
          "If set to *common*, the component uses a plain token-backed background with contrast text and icons.",
      },
      api: {
        value: "Defines the identifier value for the component",
        text: "Sets the text displayed inside the component",
        removable:
          "Defines whether the component can be removed. Works automatically when wrapped in NmorphTagList",
        design: "Defines the style of the component",
        height: "Sets the height of the component",
      },
      events: {
        close: "Returns the value of the closed tag",
      },
    },
    carousel: {
      api: {
        loop: "Cycles from the last slide back to the first one, and from the first slide back to the last one",
      },
      events: {
        change: "Emits the active slide index",
      },
    },
    "carousel-item": {
      api: {
        name: "Unique slide name used by the carousel registry",
      },
    },
    collapse: {
      api: {
        "model-value": "Names of the currently opened panels",
        accordion: "Allows only one panel to be opened at a time",
      },
      events: {
        "update:model-value": "Event triggered when opened panels change",
      },
    },
    "collapse-item": {
      api: {
        name: "Unique panel name used in the collapse model",
        title: "Panel title text",
        disabled: "Disables the panel",
        block: "Prevents toggling the panel when set to true",
        height: "Sets the title height",
        "transition-speed":
          "Overrides the panel open and close transition speed. Numbers are treated as milliseconds",
      },
      slot: {
        default: "Panel content",
        title: "Custom panel title",
      },
      variables: {
        "transition-speed": "Panel content transition speed",
      },
    },
    skeleton: {
      animated: {
        subtitle:
          "Enables animation for the skeleton component if set to *true*.",
      },
      loading: {
        subtitle: "Controls the display of the skeleton.",
      },
      rows: {
        subtitle:
          "Defines the number of rows in the skeleton, typically for simulating text content.",
      },
      api: {
        animated: "Enables animation for the skeleton component",
        loading: "Defines whether the skeleton is displayed.",
        rows: "Sets the number of rows in the skeleton.",
        "loading-gradient": "Overrides the skeleton loading gradient",
      },
      slot: {
        template: "Slot for custom skeleton structure during loading.",
        default: "Default slot content when loading is complete.",
      },
      variables: {
        "loading-gradient":
          "Defines the gradient color used during the skeleton loading animation.",
      },
    },
    "skeleton-item": {
      api: {
        variant:
          "Defines the type of skeleton to display, such as text or circle.",
        design: "Defines the design of the skeleton item.",
        width: "Sets the width of the skeleton item.",
        height: "Sets the height of the skeleton item.",
      },
    },
    progress: {
      type: {
        subtitle:
          "Defines the type of progress indicator, such as *linear* or *circle*.",
      },
      color: {
        subtitle: "Sets the color of the progress indicator.",
      },
      percentage: {
        subtitle: "Defines the percentage of progress completed.",
        info: {
          title: "Information",
          content:
            "Ensure that the width of the wrapper container is set for proper display.",
        },
      },
      "value-inside": {
        subtitle: "Displays the progress text inside the bar if set to *true*.",
      },
      "value-right-side": {
        subtitle:
          "Shows or hides the percentage text next to the progress indicator.",
      },
      indeterminate: {
        subtitle:
          "Displays the indeterminate progress animation when set to *true*.",
      },
      "circle-size": {
        subtitle: "Defines the size of the circular progress indicator.",
      },
      api: {
        type: "Specifies the type of progress indicator",
        color: "Sets the color of the progress indicator",
        percentage: "Sets the percentage of progress",
        height:
          "Overrides the linear progress bar height. Numbers are treated as pixel values",
        "width-transition":
          "Overrides the width transition used by the linear progress bar",
        "indeterminate-animation":
          "Overrides the animation used by indeterminate progress",
        "value-inside": "Displays the progress text inside the bar",
        "value-right-side": "Shows or hides the percentage text on the right",
        indeterminate: "Enables the indeterminate progress animation",
        "circle-size": "Sets the size of the circular progress indicator",
      },
      slot: {
        "inner-text": "Slot for custom content inside the progress indicator.",
        "right-side":
          "Slot for custom content to the right of the progress indicator.",
        "circle-inner-part":
          "Slot for custom content inside the circular progress indicator.",
      },
      variables: {
        height: "Defines the width of the progress indicator.",
        "width-transition": "Sets the progress animation.",
        animation:
          "Controls the settings of the progress indicator's animation.",
      },
    },
    calendar: {
      type: {
        subtitle:
          "Defines the type of calendar, such as *date* or *dates* selection.",
      },
      "custom-content": {
        subtitle: "",
      },
      range: {
        subtitle: "Sets the boundaries of the displayed calendar.",
      },
      api: {
        "mark-today": "Highlights today's date",
        "initial-date": "Sets the initial date displayed in the calendar",
        "model-value": "Represents the selected date(s) in the calendar",
        type: "Defines the selection type in the calendar",
        "cell-height":
          "Overrides the height of each date cell. Numbers are treated as pixel values",
        range:
          "Enables range selection mode in the calendar, allowing date range selection in the calendar. Not the selected range, but the displayed calendar range.",
      },
      slot: {
        header: "Calendar header slot",
        content: "Calendar content slot",
      },
      variables: {
        "table-data-cell-height":
          "Defines the height of each date cell in the calendar",
      },
      translates: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday",
        jan: "January",
        feb: "February",
        mar: "March",
        apr: "April",
        may: "May",
        jun: "June",
        jul: "July",
        aug: "August",
        sep: "September",
        oct: "October",
        nov: "November",
        dec: "December",
      },
    },
    "image-preview": {
      "model-value": {
        subtitle: "Controls the visibility of the image preview.",
      },
      "initial-index": {
        subtitle:
          "Defines the initial index of the image when there are multiple images.",
      },
      src: {
        subtitle: "URL of the image for preview.",
      },
      api: {
        "model-value":
          "Boolean value that toggles the visibility of the image preview",
        alt: "Text describing the image when it cannot be loaded",
        "initial-index": "Index of the first image displayed in the image set",
        src: "URL of the image for preview",
        "scale-step": "Zoom (scaling) step for the image",
        "min-scale-level": "Defines the minimum scale level for the image",
        "max-scale-level": "Defines the maximum scale level for the image",
        "z-index":
          "Defines the overlay z-index. Uses the shared automatic z-index stack when omitted",
        "show-trigger":
          "Defines whether the default preview trigger is rendered",
        "show-navigation-buttons":
          "Defines whether gallery navigation buttons are rendered for image sets",
        "show-action-bar":
          "Defines whether the bottom rotate and zoom action bar is rendered",
        "trigger-view":
          "Defines whether the preview trigger renders one image or a thumbnail gallery",
        "trigger-limit":
          "Limits how many thumbnails are rendered by the gallery trigger",
        "trigger-gap":
          "Defines the gap between thumbnails in the gallery trigger",
        width:
          "Overrides the preview trigger width. Numbers are treated as pixel values",
        height:
          "Overrides the preview trigger height. Numbers are treated as pixel values",
        "navigation-button-margin":
          "Overrides the distance between gallery navigation buttons and the viewport edge",
      },
      slot: {
        loading: "Slot displayed while the preview image is loading",
        error: "Slot displayed when the preview image cannot be loaded",
      },
      variables: {
        width: "Defines the width of the image preview.",
        height: "Defines the height of the image preview.",
        "nmorph-image-preview-btn-margin":
          "Distance between gallery navigation buttons and the viewport edge",
        "nmorph-image-preview-trigger-gap":
          "Gap between thumbnails in the gallery trigger",
      },
      events: {
        "update:model-value": "Event for intercepting two-way binding",
      },
    },
    pagination: {
      "basic-usage": {
        subtitle: "",
      },
      api: {
        "total-elements-quantity": "Total number of elements for pagination.",
        "model-value": "Current active page number.",
        "elements-quantity-on-page":
          "Number of elements displayed on each page.",
        disabled: "Boolean value that disables the pagination component.",
        height: "Height of pagination controls.",
        "hide-on-single-page":
          "Hides the pagination component if there is only one page.",
        "max-visible-pages":
          "Defines how many pages are displayed in the pagination control.",
        "fast-forward-step":
          "Defines how many pages are skipped when fast-forwarding.",
      },
      slot: {},
      variables: {},
      events: {
        "update:model-value": "Event for intercepting two-way binding",
      },
    },
    table: {
      "basic-usage": {
        subtitle: "",
        "enable-row-highlight": "Enable row highlight on hover",
        "disable-row-highlight": "Disable row highlight on hover",
        "click-me-text": "Click me!",
        info: {
          title: "Important Information",
          content:
            "'bordered' property works only if 'design' property is set to 'common'. Additionally, sorting currently works only with two values: 'ascending' and 'descending'.\nPlease note that the table is under active development and may contain bugs.",
        },
      },
      api: {
        data: "Defines the data to be displayed in the table",
        "row-hover":
          "Boolean value that enables or disables hover effect on table rows",
        bordered:
          "Boolean value that enables or disables borders around table cells. Works only if 'design' property is set to 'common'",
        sort: "Defines the sorting behavior for table columns",
        design: "Table display style",
        virtual: "Enables virtual rendering for large table datasets",
        "virtual-height":
          "Sets the scroll viewport height for virtual table rows",
        "virtual-row-height":
          "Sets the expected height of one virtual table row",
        "virtual-overscan":
          "Sets how many extra rows are rendered before and after the visible area",
        "virtual-dynamic-height":
          "Allows virtual table rows to measure their own height dynamically",
        "border-color": "Overrides the table border color",
        "cell-height":
          "Overrides the data cell height. Numbers are treated as pixel values",
        "row-hover-background":
          "Overrides the background used for hovered and keyboard-active rows",
      },
      slot: {},
      variables: {
        "border-color": "Sets the table border color",
        "table-cell-height": "Defines the height of table cells",
        "table-background-row-hover":
          "Defines the background used for hovered and keyboard-active rows",
      },
    },
    "table-column": {
      api: {
        prop: "Specifies the property name from the data source to be displayed in this column",
        label: "Column header to be displayed in the table header",
        width: "Defines the column width in CSS value",
        alignment:
          "Sets text alignment in the column. Accepts 'left', 'center', or 'right'",
      },
    },
    "table-cell": {
      api: {
        row: "Required property. Passes the row index from the scope representing the current row being rendered.",
      },
      slot: {
        default:
          "The default slot is used to customize content inside each column cell. Provides access to the row data and other relevant properties from the scope.",
      },
    },
    tooltip: {
      text: {
        subtitle: "Content displayed inside the tooltip.",
        "hover-me": "Hover over me",
        "i-am-tooltip": "I am a tooltip",
        tooltip: "Tooltip",
        button: "Button",
      },
      position: {
        subtitle:
          "Defines the position of the tooltip relative to the target element. Accepts values such as 'top', 'bottom', 'left', 'right'.",
      },
      "force-coordinate": {
        subtitle:
          "Overrides the default positioning logic and allows specifying exact coordinates for the tooltip.",
      },
      api: {
        text: "Defines the text content of the tooltip",
        position:
          "Sets the position of the tooltip relative to the target element",
        "force-show": "Boolean value that forcibly shows the tooltip",
        "force-coordinate":
          "Allows manual control over the tooltip's coordinates",
        "z-index":
          "Overrides the shared automatic z-index used while the tooltip is visible",
        width:
          "Overrides the tooltip content width. Numbers are treated as pixel values",
        "max-width":
          "Overrides the tooltip content max width. Numbers are treated as pixel values",
        height:
          "Overrides the tooltip content height. Numbers are treated as pixel values",
      },
      slot: {},
      variables: {
        "max-width": "Sets the maximum width of the tooltip content",
        width:
          "Sets the width of the tooltip content. Controls the horizontal size of the tooltip",
        height:
          "Sets the height of the tooltip content. Controls the vertical size of the tooltip",
      },
      exposes: {
        tooltipBody: "Original DOM element of the tooltip body",
      },
    },
    alert: {
      "basic-usage": {
        title: "Any title",
        content: "Content for the alert",
        info: {
          title: "Additional Information",
          content:
            "To conveniently manage multiple alerts, use the 'NmorphNotificationProvider' component, which allows grouping and centrally managing alerts.",
        },
      },
      "use-provider": {
        subtitle:
          "To use the provider, you need to import the hook from the library.",
      },
      api: {
        id: "Unique identifier for the alert component",
        type: "Defines the alert type (e.g., success, error, warning, info)",
        closable:
          "Boolean value that defines whether the alert can be closed by the user",
        title: "Title displayed in the alert",
        content: "Content of the alert",
        fill: "Defines whether the alert should occupy the full width of its container",
        "max-width": "Maximum width of the alert component",
        "show-icon":
          "Boolean value that displays an icon based on the alert type",
        bordered: "Adds a border around the alert for emphasis",
        html: "Allows HTML content in the alert body. Use with caution to avoid XSS vulnerabilities",
        "close-icon-position": "Controls close icon alignment inside the alert",
        "background-color": "Overrides the alert background color",
      },
      slot: {
        icon: "Slot for customizing the icon displayed in the alert",
        title: "Slot for customizing the alert's title",
        default: "Slot for customizing the main content of the alert",
      },
      variables: {
        "background-color": "Alert background color",
        "nmorph-alert-close-align": "Close icon align-self value",
      },
      events: {
        close: "Event triggered when the alert is closed by the user",
      },
    },
    callout: {
      "basic-usage": {
        "no-title-content": "Useful content without a title.",
        "info-title": "Information",
        "info-content": "Useful content for the reader.",
        "warning-title": "Attention",
        "warning-content": "Important content for the reader.",
        "success-title": "Success",
        "success-content": "Successful content for the reader.",
        "error-title": "Error",
        "error-content": "Error content for the reader.",
      },
      api: {
        type: "Defines the callout type",
        title: "Title displayed in the callout",
        content: "Content displayed in the callout",
        color: "Overrides the callout accent color",
        padding: "Sets the callout inner spacing",
        "border-radius": "Sets the callout border radius",
        "accent-width": "Sets the width of the accent strip",
        "title-gap": "Sets the spacing between title and content",
        "title-font-size": "Sets the title font size",
        "content-font-size": "Sets the content font size",
      },
      variables: {
        "callout-color": "Callout accent color",
        "callout-padding": "Callout inner spacing",
        "callout-border-radius": "Callout border radius",
        "callout-accent-width": "Accent strip width",
        "callout-title-gap": "Spacing between title and content",
        "callout-title-font-size": "Title font size",
        "callout-content-font-size": "Content font size",
      },
    },
    dialog: {
      "basic-usage": {
        subtitle: "",
        "show-modal": "Show modal window",
      },
      api: {
        "model-value":
          "Boolean value that controls the visibility of the dialog window",
        title: "Defines the text of the dialog header",
        width: "Sets the width of the dialog window",
        "max-height":
          "Sets the maximum height of the dialog window before the content starts scrolling",
        "open-delay": "Delay in milliseconds before opening the dialog window",
        "close-delay": "Delay in milliseconds before closing the dialog window",
        "close-on-click-modal":
          "Boolean value that allows closing the dialog window by clicking outside",
        "show-close":
          "Boolean value that displays the close button in the dialog window",
        "z-index":
          "Defines the dialog overlay z-index. Uses the shared automatic z-index stack when omitted",
        "close-on-overlay":
          "Boolean value indicating whether the dialog window should be closed when clicking on the overlay area",
      },
      slot: {
        header: "Slot for customizing the content of the dialog header.",
        default: "Slot for defining the main content of the dialog window.",
      },
      events: {
        "on-close":
          "Event that triggers when the dialog window is closed by the user.",
        "update:model-value":
          "Event that triggers when the visibility of the dialog window changes.",
      },
      variables: {
        width: "Defines the width of the dialog component.",
        "nmorph-dialog-max-height":
          "Maximum dialog height before the content scrolls",
        "nmorph-dialog-max-width":
          "Maximum dialog width used to keep the dialog inside the viewport",
      },
    },
    divider: {
      direction: {
        subtitle:
          "Defines the direction of the divider. Accepts 'horizontal' or 'vertical'.",
      },
      api: {
        direction:
          "Defines the orientation of the divider: 'horizontal' or 'vertical'.",
      },
      slot: {},
      variables: {},
    },
    overlay: {
      "basic-usage": {
        subtitle: "",
        "show-default": "Show default",
        "show-transparent": "Show transparent",
      },
      api: {
        show: "Controls the visibility of the component",
        transparent:
          "Boolean value that makes the component's background transparent if enabled",
        "z-index":
          "Defines the overlay z-index. Uses the shared automatic z-index stack when omitted",
        "teleport-to":
          "Defines the target where the overlay content is teleported",
        "disabled-teleport":
          "Disables Teleport and renders the overlay in place",
      },
      slot: {
        default:
          "Default slot for customizing the content inside the component",
      },
      events: {
        "on-outside-click":
          "Event triggered when the user clicks outside the component",
      },
      variables: {},
    },
    "notification-provider": {
      notifications: {
        subtitle: "",
      },
      placement: {
        subtitle: "Defines the position of the notifications on the screen.",
      },
      "z-index": {
        subtitle: "Overrides the shared z-index stack used for notifications.",
      },
      quantity: {
        subtitle:
          "Limits the maximum number of notifications that can be displayed at the same time.",
      },
      api: {
        notifications:
          "Array containing the notifications. Each notification can override placement",
        placement:
          "Default position for notifications that do not define placement",
        "z-index":
          "Defines a fixed notification z-index. Uses one layer above the shared stack when omitted",
        quantity:
          "Maximum number of notifications that can be on the screen at the same time",
      },
      slot: {},
      variables: {},
    },
    tabs: {
      api: {
        "model-value": "Controls the active state of the component",
        stretch:
          "Boolean value that defines whether the component should stretch to fill available space",
        panes: "List of tab panes rendered by the tabs component",
      },
      slot: {
        default: "Slot for customizing the content inside each tab",
      },
      variables: {},
      events: {
        "update:model-value": "Event triggered when the active tab changes",
        "tab-change": "Event triggered when the tab changes",
      },
    },
    "tab-pane": {
      api: {
        label: "Label for the tab displayed in the tab navigation",
        name: "Unique identifier for the tab, used to control the active tab",
        disabled:
          "Boolean value indicating whether the tab is disabled and cannot be selected",
      },
      slot: {
        label: "Slot for customizing the tab label",
        default: "Slot for defining the main content of the tab",
      },
    },
    dropdown: {
      "basic-usage": {
        "first-menu": "First menu",
        "second-menu": "Second menu",
      },
      api: {
        open: "Boolean value controlling the visibility of the dropdown",
        "relative-element":
          "Defines the element relative to which the dropdown will be positioned",
        width: "Sets the width of the dropdown",
        "min-width": "Sets the minimum width of the dropdown",
        "max-width": "Sets the maximum width of the dropdown",
        "x-offset":
          "Horizontal offset in pixels for adjusting the dropdown position",
        "y-offset":
          "Vertical offset in pixels for adjusting the dropdown position",
        "fill-width":
          "Boolean value defining whether the dropdown should occupy the entire container width",
        "z-index":
          "Defines the dropdown overlay z-index. Uses the shared automatic z-index stack when omitted",
        placement:
          "Defines dropdown placement relative to the trigger element, including end alignment",
        "restore-focus":
          "Defines whether focus should return to the previously focused element after close",
        "hide-shadow":
          "Disables the default neumorphic shadow on the dropdown panel",
      },
      slot: {
        default: "Slot for customizing the content inside the dropdown",
      },
      variables: {},
      events: {
        "on-outside-click":
          "Event triggered when the user clicks outside the dropdown, which can be used to close it",
      },
    },
    "context-menu": {
      "basic-usage": {
        target: "Right-click this area",
      },
      api: {
        "model-value": "Controls the open state of the context menu",
        trigger:
          "Defines how the menu opens: right click, left click, both, touch long press, or manual exposed calls",
        options:
          "Menu options rendered as text, object options, or custom components",
        placement:
          "Defines context menu placement relative to the pointer position",
        width: "Sets the width of the context menu",
        "min-width": "Sets the minimum width of the context menu",
        "max-width": "Sets the maximum width of the context menu",
        "x-offset":
          "Horizontal offset in pixels for adjusting the context menu position",
        "y-offset":
          "Vertical offset in pixels for adjusting the context menu position",
        "fill-width":
          "Boolean value defining whether the context menu should use the pointer anchor width",
        "z-index":
          "Defines the context menu overlay z-index. Uses the shared automatic z-index stack when omitted",
        "close-on-escape":
          "Defines whether the context menu should close when Escape is pressed",
        "trap-focus":
          "Defines whether focus should be trapped inside the context menu",
        disabled: "Disables the context menu trigger",
        role: "Sets the aria role for the context menu panel",
        "aria-label": "Sets the aria-label for the context menu panel",
        "hide-shadow":
          "Disables the default neumorphic shadow on the context menu panel",
      },
      slot: {
        default: "Slot for the right-click target",
        menu: "Slot for customizing the context menu content",
      },
      variables: {},
      events: {
        "update:model-value": "Event triggered when the open state changes",
        open: "Event triggered when the context menu opens",
        close: "Event triggered when the context menu closes",
        "on-outside-click":
          "Event triggered when the user clicks outside the context menu",
        "on-escape-keydown":
          "Event triggered when the user presses Escape while the context menu is open",
      },
      exposes: {
        openAt: "Opens the context menu at viewport coordinates",
        openAtElement: "Opens the context menu anchored to an HTMLElement",
        close: "Closes the context menu",
      },
    },
    backtop: {
      "basic-usage": {
        info: {
          title: "Information",
          content: "Make sure the scroll container height is defined.",
        },
        "scroll-down": "Scroll down",
      },
      api: {
        right: "Sets the distance from the right edge of the screen",
        bottom: "Sets the distance from the bottom edge of the screen",
        "visibility-height":
          "Defines the scroll height at which the back-to-top button becomes visible. Accepts a number in pixels",
        design: "Defines the style of the button",
        "z-index": "Sets the z-index of the teleported back-to-top button",
        "teleport-to":
          "CSS selector where the back-to-top button is teleported",
        "teleport-disabled":
          "Disables teleporting and renders the button in place",
      },
      slot: {
        default: "Slot for customizing the content of the back-to-top button",
      },
      events: {
        click: "Event triggered when the user clicks the back-to-top button",
      },
      variables: {},
    },
    breadcrumb: {
      separator: {
        subtitle: "Defines the symbol used to separate navigation items.",
      },
      api: {
        separator: "Symbol separating the navigation items",
      },
    },
    "breadcrumb-item": {
      api: {
        to: "Specifies the target route for navigation. Accepts a path string or route object",
        replace:
          "Boolean value that determines whether the navigation should replace the current history entry instead of adding a new one",
      },
    },
    "otp-input": {
      length: {
        subtitle: "Defines how many cells are rendered for the code.",
      },
      mode: {
        subtitle:
          "Controls which characters are allowed: *numeric*, *text*, or *alphanumeric*.",
      },
      height: {
        subtitle: "Sets the size of each OTP cell.",
      },
      disabled: {
        subtitle: "Disables all OTP cells if set to *true*.",
      },
      api: {
        id: "Sets the id of the first OTP cell. The remaining cells receive suffixed ids automatically",
        name: "Sets the hidden input name. Inherits NmorphFormItem name or id when omitted",
        autocomplete:
          "Autocomplete token for OTP cells. Defaults to one-time-code and can also be inherited from NmorphFormItem",
        height: "Defines the size of each OTP cell",
        disabled: "Boolean value that disables the OTP input",
        tabindex:
          "Base tabindex for OTP cells. Following cells increment it automatically",
        "model-value": "Current OTP value as a combined string",
        length: "Number of OTP cells",
        mode: "Allowed input mode: numeric, text, or alphanumeric",
        autocapitalize: "Sets the native autocapitalize value for OTP cells",
        autofocus: "Automatically focuses the first OTP cell on mount",
      },
      slot: {},
      variables: {},
      events: {
        "update:model-value":
          "Event triggered when the combined OTP value changes",
        focus: "Event triggered when any OTP cell receives focus",
        blur: "Event triggered when focus leaves the entire OTP input",
        complete: "Event triggered when all OTP cells are filled",
      },
      exposes: {
        inputDOMRefs: "Array of original DOM elements for OTP cells",
        focus: "Focuses the first OTP cell or a specific cell by index",
        blur: "Blurs all OTP cells",
      },
    },
    "text-input": {
      height: {
        subtitle: "Sets the height of the input field.",
      },
      disabled: {
        subtitle: "Disables the input field if set to *true*.",
      },
      "type-password": {
        subtitle:
          "If set to *true*, the text in the input field will be hidden as a password.",
        toggle: "Toggle type",
      },
      "model-value": {
        subtitle: "Represents the value of the input field",
      },
      clearable: {
        subtitle:
          "If set to *true*, a button will appear to clear the input field.",
      },
      api: {
        id: "Sets the native input id. Inherits NmorphFormItem id when used inside a form item",
        name: "Sets the native input name. Inherits NmorphFormItem name or id when omitted",
        autocomplete:
          "Autocomplete value for the native input. Can also be inherited from NmorphFormItem",
        tabindex: "Native tabindex value for the input",
        height: "Defines the height of the input field",
        disabled: "Boolean value that disables the input field",
        placeholder: "Text displayed as a hint when the input field is empty",
        label: "Text label associated with the input field",
        "type-password":
          "Boolean value that turns the input field into a password field",
        "model-value": "Current value of the input field",
        clearable:
          "Boolean value that adds a button to clear the input field value",
        indentation:
          "Custom text indent for the native input. Defaults to automatic spacing based on the prepend-icon slot",
        "input-attrs":
          "Additional native attributes forwarded to the internal input element",
      },
      slot: {
        "prepend-icon":
          "Slot for adding an icon to the beginning of the input field",
      },
      variables: {
        "prepend-icon-indent":
          "Defines the indent for the icon before the input",
      },
      events: {
        "update:model-value":
          "Event triggered when the input field value changes",
        focus: "Event triggered when the input field gains focus",
        blur: "Event triggered when the input field loses focus",
        "on-enter": "Event triggered when the Enter key is pressed",
      },
      exposes: {
        inputDOMRef: "Original DOM element of the input field",
        focus: "Focuses the input field",
        blur: "Blurs the input field",
        select: "Selects the current input value",
      },
    },
    "color-picker": {
      height: {
        subtitle: "Sets the height of the color picker.",
      },
      disabled: {
        subtitle: "Disables the color picker if set to *true*.",
      },
      "model-value": {
        subtitle:
          "Controls the selected color. Accepts hex values like *#4a90e2*.",
      },
      "show-value": {
        subtitle:
          "Displays the selected hex value next to the swatch. If `modelValue` is omitted, the current theme accent color is used.",
      },
      "display-format": {
        subtitle: "Sets the format for the displayed color value.",
      },
      api: {
        id: "Sets the native input id. Inherits NmorphFormItem id when used inside a form item",
        name: "Sets the native input name. Inherits NmorphFormItem name or id when omitted",
        height: "Defines the height of the color picker",
        disabled: "Boolean value that disables the color picker",
        "model-value": "Current color value in hex format",
        "show-value":
          "Boolean value that displays the current color value near the swatch",
        "display-format": "Format of the displayed color value",
      },
      slot: {},
      variables: {},
      events: {
        "update:model-value": "Event triggered when the color value changes",
        focus: "Event triggered when the color picker gains focus",
        blur: "Event triggered when the color picker loses focus",
      },
      exposes: {
        inputDOMRef: "Original DOM element of the color input",
      },
    },
    switch: {
      height: {
        subtitle: "Defines the height of the switch component.",
      },
      disabled: {
        subtitle: "Disables the switch if set to *true*.",
      },
      "model-value": {
        subtitle: "Controls the on/off state of the switch.",
      },
      loading: {
        subtitle: "Displays the loading state on the switch if set to *true*.",
      },
      "active-value": {
        subtitle: "Specifies the value when the switch is on.",
      },
      "inactive-value": {
        subtitle: "Specifies the value when the switch is off.",
      },
      api: {
        id: "Sets the native input id. Inherits NmorphFormItem id when used inside a form item",
        name: "Sets the native input name. Inherits NmorphFormItem name or id when omitted",
        height: "Sets the height of the switch",
        disabled: "Boolean value that disables the switch component",
        "model-value": "Controls the state of the switch",
        loading: "Boolean value that shows a loading indicator on the switch",
        "active-value": "Value when the switch is on",
        "inactive-value": "Value when the switch is off",
        width:
          "Overrides the switch width. Numbers are treated as pixel values",
        offset:
          "Overrides the thumb offset. Numbers are treated as pixel values",
        "thumb-height":
          "Overrides the switch thumb size. Numbers are treated as pixel values",
      },
      slot: {
        "bg-on": "Slot for customizing the background when the switch is on",
        "bg-off": "Slot for customizing the background when the switch is off",
        "thumb-on": "Slot for customizing the thumb when the switch is on",
        "thumb-off": "Slot for customizing the thumb when the switch is off",
      },
      variables: {
        width: "Defines the width of the switch",
        height: "Defines the height of the switch",
        offset: "Specifies the offset of the switch thumb",
        "thumb-height": "Defines the height of the switch thumb",
      },
      events: {
        "update:model-value": "Event triggered when the switch state changes",
      },
      exposes: {
        inputDOMRef: "Original DOM element of the input field",
      },
    },
    checkbox: {
      id: {
        subtitle: "Unique identifier for the checkbox.",
      },
      disabled: {
        subtitle: "Disables the checkbox if set to *true*.",
      },
      "model-value": {
        subtitle: "Represents the checkbox state (checked or not).",
        label: "Label",
      },
      label: {
        subtitle: "Specifies the label text for the checkbox.",
      },
      design: {
        subtitle: "Defines the design style of the checkbox.",
      },
      height: {
        subtitle: "Sets the checkbox height.",
      },
      api: {
        id: "Unique identifier for the checkbox",
        disabled: "Boolean value that disables the checkbox",
        "model-value": "Checkbox state (checked or not)",
        label: "Label displayed next to the checkbox",
        design: "Defines the design style of the checkbox",
        height: "Defines the checkbox height",
      },
      slot: {
        default: "Slot for customizing the checkbox content",
        label: "Slot for customizing the checkbox label",
      },
      variables: {
        size: "Defines the size of the checkbox",
      },
      events: {
        "update:model-value": "Event triggered when the checkbox state changes",
      },
      exposes: {
        inputDOMRef: "Original DOM element of the input field",
      },
    },
    "checkbox-group": {
      api: {
        height: "Defines the height of checkboxes in the group",
        disabled: "Disables all checkboxes in the group",
        "model-value": "Array of selected values",
        options: "Checkbox options",
        design: "Design style of the checkbox group",
        direction: "Direction of the checkbox group layout",
      },
      slot: {
        default: "Slot for customizing the content of the checkbox group",
      },
      variables: {},
      events: {
        "update:model-value":
          "Event triggered when selected values in the checkbox group change",
      },
    },
    autocomplete: {
      "basic-usage": {
        placeholder: "Text...",
      },
      height: {
        subtitle: "Defines the height of the autocomplete input field.",
      },
      disabled: {
        subtitle: "Disables the autocomplete field.",
      },
      placeholder: {
        subtitle: "Text displayed when the input field is empty.",
      },
      clearable: {
        subtitle:
          "If set to *true*, a button will appear to clear the input field.",
      },
      list: {
        subtitle: "Sets the list of options for autocomplete suggestions.",
      },
      "action-callback": {
        subtitle: "Function called when typing in the input.",
      },
      api: {
        id: "Sets the id for the nested text input. Inherits NmorphFormItem id when used inside a form item",
        name: "Sets the name for the nested text input. Inherits NmorphFormItem name or id when omitted",
        autocomplete:
          "Autocomplete value passed to the nested text input. Can also be inherited from NmorphFormItem",
        height: "Height of the autocomplete input field",
        disabled: "Disables the autocomplete input field",
        "model-value": "Current value of the input field",
        placeholder: "Hint displayed when the input field is empty",
        clearable: "Boolean value that adds a button to clear the input value",
        list: "List of suggestions for input",
        "action-callback":
          "Callback function called when an option is selected",
        "z-index":
          "Defines the suggestions overlay z-index. Uses the shared automatic z-index stack when omitted",
        virtual: "Enables virtual rendering for large suggestion lists",
        "virtual-item-height": "Sets the expected height of one virtual item",
        "virtual-max-height": "Sets the maximum height of the virtual list",
        "virtual-overscan":
          "Sets how many extra items are rendered before and after the visible area",
      },
      slot: {
        loader: "Slot to add a custom loader while fetching data",
      },
      variables: {},
      events: {
        "update:model-value":
          "Event triggered when the autocomplete field value changes",
        select: "Event triggered when an item is selected from the suggestions",
      },
    },
    "file-upload": {
      "model-value": {},
      disabled: {
        subtitle: "Disables the file upload component",
      },
      multiple: {
        subtitle: "Allows uploading multiple files if set to *true*.",
      },
      "photo-with-preview": {
        subtitle:
          "If set to *true*, uploaded photos will be displayed with a preview.",
      },
      api: {
        "model-value":
          "Represents selected files. Setting it to [] clears the internal list and native file input.",
        disabled: "Boolean value that disables the file upload component",
        multiple: "Boolean value that allows multiple files to be selected",
        "allowed-types":
          "Defines the file types that can be uploaded. Leave empty to accept all files",
        "photo-with-preview": "Displays a preview of the uploaded images",
        fill: "Allows the upload button to fill its container",
      },
      slot: {
        trigger:
          "Slot for customizing the button that triggers the file upload",
      },
      variables: {},
      events: {
        "on-unsupported-file-type-error":
          "Event triggered when the user attempts to upload an unsupported file type",
        "update:model-value": "Event triggered when the file selection changes",
      },
      exposes: {
        inputDOMRef: "Original DOM element of the input field",
      },
      translates: {
        selectFile: "Select a file",
      },
    },
    "number-input": {
      "basic-usage": {},
      height: {
        subtitle: "Defines the height of the number input field.",
      },
      disabled: {
        subtitle: "Disables the number input field if set to *true*.",
      },
      "action-btn-position-right": {
        subtitle:
          "If set to *true*, the increment and decrement buttons are placed on the right.",
      },
      api: {
        id: "Sets the native input id. Inherits NmorphFormItem id when used inside a form item",
        name: "Sets the native input name. Inherits NmorphFormItem name or id when omitted",
        autocomplete:
          "Autocomplete value for the native number input. Can also be inherited from NmorphFormItem",
        height: "Height of the number input field",
        disabled: "Boolean value that disables the input field",
        "model-value": "Current value of the number input field",
        max: "Maximum allowed value",
        min: "Minimum allowed value",
        step: "Step for incrementing or decrementing the value",
        "action-btn-position-right":
          "Positions the action buttons on the right if set to *true*",
      },
      slot: {},
      variables: {},
      exposes: {
        inputDOMRef: "Original DOM element of the input field",
      },
      events: {
        "update:model-value":
          "Event triggered when the value of the number input field changes",
      },
    },
    "select-button": {
      height: {
        subtitle: "Sets the height of the component.",
      },
      disabled: {
        subtitle: "Disables the component.",
      },
      fill: {
        subtitle: "Makes the component occupy the full width of its container.",
      },
      api: {
        "model-value": "The selected value",
        height: "Height of the component",
        disabled: "Disables the component",
        fill: "Makes the component occupy the full width of its container",
        options: "List of options to render",
        "track-padding":
          "Overrides the inner padding around items. Numbers are treated as pixel values",
        "item-size":
          "Overrides each item size. Numbers are treated as pixel values",
        "item-font-size": "Overrides each item font size",
      },
      slot: {
        default: "Slot for NmorphSelectButtonItem elements",
      },
      variables: {
        "track-padding": "Inner padding around items",
        "item-size": "Select button item size",
        "item-font-size": "Select button item font size",
      },
      events: {
        "update:model-value": "Triggered when the selected value changes",
      },
    },
    select: {
      height: {
        subtitle: "Sets the height of the dropdown list.",
      },
      disabled: {
        subtitle: "Disables the component.",
      },
      "model-value": {
        subtitle: "Represents the selected value of the select component.",
        multiple: "Multiple values",
      },
      loading: {
        subtitle: "Displays a loading indicator if set to *true*.",
      },
      fill: {
        subtitle: "Makes the select occupy the full width of its container.",
      },
      "options-width": {
        subtitle:
          "Controls whether dropdown options keep the select width and truncate long labels or expand to fit content.",
      },
      api: {
        id: "Sets the id for the native select element. Inherits NmorphFormItem id when used inside a form item",
        name: "Sets the name for the native select element. Inherits NmorphFormItem name or id when omitted",
        autocomplete:
          "Autocomplete value for the native select element. Can also be inherited from NmorphFormItem",
        height: "Height of the dropdown list",
        disabled: "Disables the dropdown list",
        "no-element-placeholder":
          "Placeholder text displayed when no options are available",
        "value-required": "Requires selecting a value",
        options: "List of available options",
        "options-map": "Object for displaying options",
        "model-value": "Selected value of the dropdown list",
        loading: "Displays loading state",
        fill: "Makes the dropdown list occupy the full width of its container",
        "options-width": "Controls dropdown option width: truncate or auto",
        open: "Boolean value to control the visibility of the list",
        "z-index":
          "Defines the select dropdown z-index. Uses the shared automatic z-index stack when omitted",
        width:
          "Overrides the base select width. Numbers are treated as pixel values",
        virtual: "Enables virtual rendering for large option lists",
        "virtual-item-height": "Sets the expected height of one virtual option",
        "virtual-max-height":
          "Sets the maximum height of the virtual options list",
        "virtual-overscan":
          "Sets how many extra options are rendered before and after the visible area",
      },
      slot: {
        default: "Slot for customizing options in the dropdown list",
      },
      variables: {
        "base-width": "Sets the base width for the select component",
      },
      events: {
        "update:model-value": "Event triggered when the selected value changes",
      },
      translates: {
        noElementPlaceholder: "Choose value",
      },
    },
    "select-option": {
      api: {
        label:
          "Defines the label for the option displayed in the dropdown list",
        height: "Sets the height of the select option",
        disabled:
          "Boolean value indicating whether the option is disabled and cannot be selected",
        "hover-background": "Overrides the option hover background",
        "hover-color": "Overrides the option hover text and icon color",
      },
      slot: {
        default: "Slot for customizing the displayed content for this option",
      },
      variables: {
        "hover-bg": "Sets the background color when hovering over the option",
        "hover-color": "Defines the text color when hovering over the option",
      },
      events: {
        "change-value": "Event triggered when the option value changes",
      },
    },
    slider: {
      disabled: {
        subtitle: "Disables the slider if set to *true*.",
      },
      "show-tooltip": {
        subtitle:
          "If set to *true*, displays a tooltip with the current value.",
      },
      api: {
        id: "Sets the native range input id. Inherits NmorphFormItem id when used inside a form item",
        name: "Sets the native range input name. Inherits NmorphFormItem name or id when omitted",
        fill: "Boolean value allowing the slider to fill its container",
        disabled: "Disables the slider component",
        "model-value": "Current value of the slider",
        max: "Maximum value for the slider",
        min: "Minimum value for the slider",
        step: "Step for incrementing or decrementing the value",
        "show-tooltip":
          "Boolean value to control the visibility of the tooltip",
        "thumb-width": "Overrides the slider thumb width in pixels",
        "slider-height":
          "Overrides the slider hit area height. Numbers are treated as pixel values",
        "value-fixed-container-height":
          "Overrides the visual track container height. Numbers are treated as pixel values",
      },
      slot: {},
      variables: {
        "nmorph-slider-thumb-width": "Slider thumb width",
        "slider-height": "Defines the height of the slider",
        "value-fixed-container-height": "Sets the height of the container",
      },
      events: {
        "update:model-value": "Event triggered when the slider value changes",
      },
    },
    "date-picker": {
      height: {
        subtitle: "Sets the height of the date picker field.",
      },
      disabled: {
        subtitle: "Disables date selection if set to *true*.",
      },
      api: {
        id: "Sets the native input id. Inherits NmorphFormItem id when used inside a form item",
        name: "Sets the native input name. Inherits NmorphFormItem name or id when omitted",
        autocomplete:
          "Autocomplete value for the hidden native date input. Can also be inherited from NmorphFormItem",
        height: "Height of the date picker field",
        disabled: "Boolean value that disables the date picker",
        placeholder: "Text displayed when no date is selected",
        "model-value": "Currently selected date or date range",
        type: "Type of date selection, such as *single* or *range*",
        "text-separator":
          "Text for separating the start and end dates in range selection mode",
        "z-index":
          "Defines the date picker dropdown z-index. Uses the shared automatic z-index stack when omitted",
        width:
          "Overrides the date picker width. Numbers are treated as pixel values",
        "calendar-cell-height":
          "Overrides the calendar date cell height. Numbers are treated as pixel values",
      },
      slot: {},
      variables: {
        width: "Defines the width of the date picker component",
        "date-picker-calendar-cell-height": "Date picker calendar cell height",
      },
      events: {
        "update:model-value":
          "Event triggered when the selected date or date range changes",
      },
      translates: {
        pickADate: "Pick a date",
      },
    },
    "time-picker": {
      "basic-usage": {
        subtitle: "Basic time selection with HH:mm output.",
      },
      seconds: {
        subtitle: "Enable seconds and control minute/second step values.",
      },
      disabled: {
        subtitle: "Disables the time picker.",
      },
      api: {
        id: "Native input id",
        name: "Native input name",
        "model-value": "Selected time in HH:mm or HH:mm:ss format",
        height: "Sets the component height",
        disabled: "Disables the time picker",
        autocomplete: "Native autocomplete attribute",
        placeholder: "Placeholder text when no time is selected",
        "hour-step": "Step between selectable hour values",
        "minute-step": "Step between selectable minute values",
        "second-step": "Step between selectable second values",
        "show-seconds": "Shows the seconds column and emits HH:mm:ss values",
        "min-time": "Minimum selectable time",
        "max-time": "Maximum selectable time",
        clearable: "Shows the clear action when a value is selected",
        "z-index": "Dropdown z-index",
        width:
          "Overrides the time picker width. Numbers are treated as pixel values",
      },
      variables: {
        width: "Defines the width of the time picker",
      },
      events: {
        "update:model-value": "Event triggered when the selected time changes",
        focus: "Focus event",
        blur: "Blur event",
      },
      translates: {
        pickATime: "Pick a time",
      },
    },
    radio: {
      "basic-usage": {
        info: {
          title: "Radio Group usage",
          content:
            "Typically used in a group of radio buttons to allow the user to select one option from a set. Once a radio button is selected, it cannot be unselected by clicking it again—only by selecting another radio button in the group to change its state. For proper display, when using 'style-type' as 'button', a label (label) should be provided.",
        },
      },
      api: {
        disabled: "Boolean value that disables the radio button",
        label: "Label text displayed next to or inside the radio button",
        value: "Value assigned to the radio button",
        "style-type": "Defines the visual style of the radio button",
        height: "Defines the radio button height",
        checked: "Marks the radio button as selected",
      },
      slot: {
        label: "Slot for customizing the radio button label",
      },
      variables: {
        size: "Defines the size of the radio button",
      },
      exposes: {
        inputDOMRef: "Original DOM element of the input field",
      },
    },
    "radio-group": {
      api: {
        height: "Defines the height of radio buttons in the group",
        disabled: "Disables all radio buttons in the group",
        "model-value": "Selected value of the radio button group",
        options: "List of options to select from",
        "style-type": "Visual style of the radio buttons",
        direction: "Direction of the radio button layout",
      },
      slot: {
        default: "Slot for passing NmorphRadioButton",
      },
      variables: {},
      events: {
        "update:model-value": "Event triggered when the selected value changes",
      },
    },
    form: {
      "basic-usage": {
        subtitle: "Represents form values for all input elements.",
        "too-short": "Too short",
        "wrong-age": "Incorrect age",
        "you-cant-be-a-nobody": "You cannot be a nobody",
        "we-dont-have-kombucha": "We don't have Kombucha(",
        "ie-not-supported": "IE is not supported",
        "you-must-set-agreement": "You must accept the agreement",
        "value-must-greater-than-30": "Value must be greater than 30",
        "value-must-less-than-80": "Value must be less than 80",
        "pear-is-not-available": "Pear is unavailable",
        coffee: "Coffee",
        tea: "Tea",
        pear: "Pear",
        apple: "Apple",
        orange: "Orange",
        unknown: "Unknown",
        username: "Username",
        "years-old": "Years old",
        "preferred-drink": "Preferred drink",
        browsers: "Browsers",
        agreement: "Agreement",
        "number-value": "Numeric value",
        "choose-date": "Choose a date",
        food: "Food",
        "favorite-food": "Favorite food",
        photo: "Photo",
        "send-form": "Send form",
        "enter-username": "Enter username",
        "is-valid": "Form is valid: ",
        info: {
          title: "Typing Information",
          content:
            "For correct typing, you must import the type INmorphFromDataExpose.",
        },
      },
      "validate-immediately": {
        subtitle:
          "If set to *true*, the form will validate its fields immediately after rendering.",
      },
      api: {
        value: "Form values for input elements",
        "validate-immediately": "Boolean value controlling validation on load",
      },
      slot: {
        default: "Slot for passing NmorphFormItem",
      },
      variables: {},
      exposes: {
        "form-data": "Form data including validation",
      },
      explanation: `
        <div class="container">
          <p>
            <strong>Field metadata:</strong> <code>NmorphFormItem</code> passes its <code>id</code> and optional <code>name</code> to nested form controls automatically. Child components can still override these values via their own props.
            <br />
            <strong>Field binding:</strong> If a nested control does not receive <code>modelValue</code>, it uses the matching <code>NmorphForm</code> field value from <code>NmorphFormItem id</code>, writes changes back to that field, and validates it. Explicit <code>v-model</code> remains fully controlled by the parent.
            <br />
            <strong>Autocomplete:</strong> If a control supports <code>autocomplete</code>, <code>NmorphFormItem</code> can provide it too.
          </p>

          <h2>1. Rule Types</h2>
          <p>
            You can define validation rules based on the type of value you want to check:
          </p>

          <h3>Text Validation:</h3>
          <p>
            <strong>Rule properties:</strong> <code>pattern</code> (uses regular expressions), <code>error</code>
          </p>

          <h3>Number Validation:</h3>
          <p>
            <strong>Rule properties:</strong> <code>numberCompareType</code> (uses <code>NmorphNumberCompareOperator</code>), <code>compareValue</code>, <code>error</code>
          </p>

          <h3>Boolean Validation (radio button):</h3>
          <p>
            <strong>Rule properties:</strong> <code>booleanCompareType</code> (uses <code>NmorphBooleanCompareOperator</code>), <code>compareValue</code>, <code>error</code>
          </p>

          <h3>Array Validation (checkbox group):</h3>
          <p>
            <strong>Rule properties:</strong> <code>arrayCompareType</code> (uses <code>NmorphArrayValidationOperator</code>), <code>compareValue</code>, <code>error</code>
          </p>

          <h2>2. Enum Definitions</h2>
          <p>
            The following enums are used to define different types of validation operators:
          </p>

          <h3>NmorphArrayValidationOperator:</h3>
          <ul>
            <li>
              <strong>contains-one:</strong> The array must contain at least one of the specified values.
            </li>
            <li>
              <strong>not-contains:</strong> The array must not contain any of the specified values.
            </li>
            <li>
              <strong>full-eq:</strong> The array must be equal to the specified values, including order and length.
            </li>
          </ul>

          <h3>NmorphNumberCompareOperator:</h3>
          <ul>
            <li>
              <strong>eq:</strong> The value must equal the specified value.
            </li>
            <li>
              <strong>gte:</strong> The value must be greater than or equal to the specified value.
            </li>
            <li>
              <strong>lte:</strong> The value must be less than or equal to the specified value.
            </li>
            <li>
              <strong>gt:</strong> The value must be greater than the specified value.
            </li>
            <li>
              <strong>lt:</strong> The value must be less than the specified value.
            </li>
          </ul>

          <h3>NmorphBooleanCompareOperator:</h3>
          <ul>
            <li>
              <strong>eq:</strong> The boolean value must equal the specified value.
            </li>
            <li>
              <strong>not-eq:</strong> The boolean value must not equal the specified value.
            </li>
          </ul>

          <h2>3. Accessing Validation State</h2>
          <p>
            After calling the <code>useFieldValidation</code> function, the following parameters will be available:
          </p>
          <ul>
            <li>
              <strong>touched:</strong> Indicates whether the field has been touched.
            </li>
            <li>
              <strong>valid:</strong> Indicates whether the field is valid based on the defined rules.
            </li>
            <li>
              <strong>errors:</strong> An array containing error messages for the field.
            </li>
            <li>
              <strong>validate:</strong> Function that runs the validation process.
            </li>
          </ul>
        </div>
      `,
    },
    "form-item": {
      api: {
        id: "Unique field id used by the label and inherited by nested form controls",
        name: "Optional field name inherited by nested form controls. Defaults to id",
        autocomplete:
          "Optional autocomplete value inherited by nested form controls that support it",
        height: "Sets the height of the form item container",
        label:
          "Defines the label text associated with the form item, providing context to the user",
        "show-validation-icon":
          "Boolean value controlling the display of the validation icon for the form item",
        "static-error-box-space":
          "Defines static space for displaying the error field, ensuring consistency in space regardless of validation state",
        validate: "Defines validation rules for the form item",
      },
      slot: {
        default:
          "Slot for customizing the content of the form item, typically includes input elements or other form controls",
      },
    },
  },
};
