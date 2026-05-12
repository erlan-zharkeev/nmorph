export type GuideLocaleText = {
  en: string;
  ru?: string;
  zh?: string;
};

export type GuidePageSlug =
  | "introduction"
  | "installation"
  | "vue"
  | "nuxt"
  | "theming"
  | "icons"
  | "forms"
  | "overlays"
  | "performance"
  | "accessibility"
  | "migration";

export type GuideSection = {
  title: GuideLocaleText;
  paragraphs: GuideLocaleText[];
  points?: GuideLocaleText[];
  code?: {
    language: string;
    content: string;
  };
};

export type GuidePage = {
  slug: GuidePageSlug;
  title: GuideLocaleText;
  description: GuideLocaleText;
  sections: GuideSection[];
};

export const textByLocale = (text: GuideLocaleText, locale: string) => text[locale as keyof GuideLocaleText] || text.en;

export const guideGroups: { title: GuideLocaleText; pages: GuidePageSlug[] }[] = [
  {
    title: { en: "Start", ru: "Старт" },
    pages: ["introduction", "installation", "vue", "nuxt"],
  },
  {
    title: { en: "System", ru: "Система" },
    pages: ["theming", "icons", "forms", "overlays"],
  },
  {
    title: { en: "Production", ru: "Production" },
    pages: ["performance", "accessibility", "migration"],
  },
];

export const guidePages: GuidePage[] = [
  {
    slug: "introduction",
    title: { en: "Introduction", ru: "Введение" },
    description: {
      en: "What Nmorph UI Kit is, where it fits, and how the library is organized.",
      ru: "Что такое Nmorph UI Kit, где его использовать и как устроена библиотека.",
    },
    sections: [
      {
        title: { en: "Purpose", ru: "Назначение" },
        paragraphs: [
          {
            en: "Nmorph UI Kit is a Vue 3 component library with Nuxt support. It is built around tactile neumorphic surfaces, compact product controls, and a consistent set of component props for common interface work.",
            ru: "Nmorph UI Kit - библиотека компонентов для Vue 3 с поддержкой Nuxt. Она построена вокруг тактильных неуморфических поверхностей, компактных продуктовых контролов и единого набора props для типовых интерфейсных задач.",
          },
          {
            en: "The package contains basic elements, form controls, data display components, navigation, feedback components, overlays, providers, theme hooks, validation helpers, and a Nuxt module.",
            ru: "В пакете есть базовые элементы, контролы форм, компоненты отображения данных, навигация, feedback-компоненты, overlay-слой, providers, theme hooks, validation helpers и Nuxt module.",
          },
        ],
      },
      {
        title: { en: "Component areas", ru: "Группы компонентов" },
        paragraphs: [
          {
            en: "The documentation groups components by use case: Basic, Data, Feedback, Form, Navigation, Others, and Providers. This mirrors how the source is organized and makes the component list useful for implementation work.",
            ru: "Документация группирует компоненты по сценариям: Basic, Data, Feedback, Form, Navigation, Others и Providers. Это повторяет структуру исходников и делает список компонентов удобным для разработки.",
          },
        ],
        points: [
          {
            en: "Form: text input, OTP input, select, autocomplete, checkbox, radio, date picker, file upload, slider, number input, form validation.",
            ru: "Form: text input, OTP input, select, autocomplete, checkbox, radio, date picker, file upload, slider, number input, form validation.",
          },
          {
            en: "Data: table, pagination, badge, avatar, image preview, progress, skeleton, calendar, cards, tags.",
            ru: "Data: table, pagination, badge, avatar, image preview, progress, skeleton, calendar, cards, tags.",
          },
          {
            en: "Overlay and navigation: dropdown, tooltip, dialog, overlay, tabs, breadcrumb, backtop.",
            ru: "Overlay и navigation: dropdown, tooltip, dialog, overlay, tabs, breadcrumb, backtop.",
          },
        ],
      },
      {
        title: { en: "Design principles", ru: "Принципы дизайна" },
        paragraphs: [
          {
            en: "The visual system relies on CSS variables, inset and outset shadows, restrained radii, and explicit states. Components are meant to feel dimensional while staying readable and predictable in repeated product workflows.",
            ru: "Визуальная система опирается на CSS-переменные, inset/outset shadows, умеренные радиусы и явные состояния. Компоненты должны ощущаться объемными, но оставаться читаемыми и предсказуемыми в продуктовых сценариях.",
          },
        ],
      },
    ],
  },
  {
    slug: "installation",
    title: { en: "Installation", ru: "Установка" },
    description: {
      en: "Install the package and choose a style-loading strategy.",
      ru: "Установите пакет и выберите способ подключения стилей.",
    },
    sections: [
      {
        title: { en: "Package", ru: "Пакет" },
        paragraphs: [
          {
            en: "Install the UI kit with your package manager. The library is designed for Vue 3 applications and Nuxt 3 projects.",
            ru: "Установите UI kit через ваш package manager. Библиотека рассчитана на Vue 3 приложения и Nuxt 3 проекты.",
          },
        ],
        code: {
          language: "bash",
          content: "pnpm add @nmorph/nmorph-ui-kit",
        },
      },
      {
        title: { en: "Styles", ru: "Стили" },
        paragraphs: [
          {
            en: "You can load the full stylesheet once, rely on component chunks importing their own CSS, or enable the full stylesheet through the Nuxt module. Full stylesheet loading is useful for utility classes and predictable global tokens.",
            ru: "Можно подключить полный stylesheet один раз, полагаться на CSS отдельных component chunks или включить полный stylesheet через Nuxt module. Полный stylesheet удобен для utility classes и предсказуемых глобальных tokens.",
          },
        ],
        code: {
          language: "ts",
          content: 'import "@nmorph/nmorph-ui-kit/styles.css";',
        },
      },
      {
        title: { en: "Entries", ru: "Entry points" },
        paragraphs: [
          {
            en: "Use the component exports when you import components directly. Use the plugin entry when you only need to install Nmorph globally without pulling components into that file.",
            ru: "Используйте component exports для прямого импорта компонентов. Используйте plugin entry, когда нужно только установить Nmorph глобально и не импортировать компоненты в этом файле.",
          },
        ],
      },
    ],
  },
  {
    slug: "vue",
    title: { en: "Vue Setup", ru: "Vue подключение" },
    description: {
      en: "Configure Nmorph in a regular Vue 3 application.",
      ru: "Настройка Nmorph в обычном Vue 3 приложении.",
    },
    sections: [
      {
        title: { en: "Plugin setup", ru: "Подключение plugin" },
        paragraphs: [
          {
            en: "The Vue plugin installs translations, creates common CSS variables, initializes the theme, detects browser dimensions, and provides z-index helpers through the Nmorph instance.",
            ru: "Vue plugin устанавливает переводы, создает общие CSS-переменные, инициализирует тему, отслеживает размеры браузера и предоставляет z-index helpers через Nmorph instance.",
          },
        ],
        code: {
          language: "ts",
          content:
            'import { createApp } from "vue";\nimport { NmorphLibrary } from "@nmorph/nmorph-ui-kit/plugin";\nimport "@nmorph/nmorph-ui-kit/styles.css";\nimport App from "./App.vue";\n\ncreateApp(App).use(NmorphLibrary).mount("#app");',
        },
      },
      {
        title: { en: "Options", ru: "Опции" },
        paragraphs: [
          {
            en: "The plugin accepts theme, i18n, and zIndex options. Theme options control colors and shadow variables. i18n options can add or override library messages. zIndex sets the base stacking value used by components that need layers.",
            ru: "Plugin принимает theme, i18n и zIndex options. Theme options управляют цветами и shadow variables. i18n options добавляют или переопределяют тексты библиотеки. zIndex задает базовое значение stacking для layer-компонентов.",
          },
        ],
        code: {
          language: "ts",
          content:
            'app.use(NmorphLibrary, {\n  theme: {\n    defaultTheme: "light",\n    themes: {\n      light: { main: "#e9ecec", text: "#687b9e", accent: "#4a90e2" },\n    },\n  },\n  zIndex: { base: 1000 },\n});',
        },
      },
      {
        title: { en: "Direct imports", ru: "Прямые импорты" },
        paragraphs: [
          {
            en: "Components can be imported directly from the package. This is the preferred style for local examples and for applications that want explicit component usage.",
            ru: "Компоненты можно импортировать напрямую из пакета. Это удобный вариант для локальных примеров и приложений, где важно явно видеть используемые компоненты.",
          },
        ],
        code: {
          language: "vue",
          content:
            '<script setup lang="ts">\nimport { NmorphButton, NmorphTextInput } from "@nmorph/nmorph-ui-kit";\n</script>\n\n<template>\n  <NmorphTextInput placeholder="Name" />\n  <NmorphButton text="Save" />\n</template>',
        },
      },
    ],
  },
  {
    slug: "nuxt",
    title: { en: "Nuxt Setup", ru: "Nuxt подключение" },
    description: {
      en: "Use the Nuxt module for automatic plugin setup and i18n merge.",
      ru: "Используйте Nuxt module для автоматического plugin setup и i18n merge.",
    },
    sections: [
      {
        title: { en: "Module", ru: "Module" },
        paragraphs: [
          {
            en: "The Nuxt module transpiles the package, registers a universal plugin, installs Nmorph into the Vue app during SSR and on the client, and merges Nmorph messages into an existing Nuxt i18n instance when it is present.",
            ru: "Nuxt module transpile-ит пакет, регистрирует universal plugin, устанавливает Nmorph в Vue app во время SSR и на клиенте, а также мержит Nmorph messages в существующий Nuxt i18n instance, если он есть.",
          },
        ],
        code: {
          language: "ts",
          content:
            'export default defineNuxtConfig({\n  modules: ["@nmorph/nmorph-ui-kit/nuxt"],\n  nmorph: {\n    styles: "all",\n  },\n});',
        },
      },
      {
        title: { en: "Styles option", ru: "Опция styles" },
        paragraphs: [
          {
            en: 'Set `nmorph.styles` to `"all"` when you want Nuxt to add the full library stylesheet to `nuxt.options.css`. Leave it as `false` when you prefer component-level CSS imports.',
            ru: 'Установите `nmorph.styles` в `"all"`, если Nuxt должен добавить полный stylesheet библиотеки в `nuxt.options.css`. Оставьте `false`, если хотите полагаться на component-level CSS imports.',
          },
        ],
      },
      {
        title: { en: "SSR behavior", ru: "SSR поведение" },
        paragraphs: [
          {
            en: "Static component markup renders on the server. Browser-only effects such as writing theme variables to `document`, reading `localStorage`, measuring element coordinates, and reacting to viewport changes are delayed until the client. Use Nuxt's `ClientOnly` only for examples that intentionally depend on open overlays or browser-only state.",
            ru: "Статическая разметка компонентов рендерится на сервере. Browser-only effects вроде записи theme variables в `document`, чтения `localStorage`, измерения координат элементов и реакции на viewport откладываются до клиента. Используйте Nuxt `ClientOnly` только для примеров, которым намеренно нужен открытый overlay или browser-only state.",
          },
        ],
      },
    ],
  },
  {
    slug: "theming",
    title: { en: "Theming", ru: "Темизация" },
    description: {
      en: "How colors, shadows, typography, and component sizes are produced.",
      ru: "Как создаются цвета, тени, типографика и размеры компонентов.",
    },
    sections: [
      {
        title: { en: "Theme variables", ru: "Theme variables" },
        paragraphs: [
          {
            en: "Nmorph writes theme variables to `:root` and switches the current palette with the `nmorph-data-theme` attribute on `html`. Common colors are shared, while light and dark palettes define `main`, `text`, `accent`, shade colors, placeholder, focus, and contrast text variables.",
            ru: "Nmorph записывает theme variables в `:root` и переключает текущую палитру через атрибут `nmorph-data-theme` на `html`. Common colors общие, а light/dark palettes задают `main`, `text`, `accent`, shade colors, placeholder, focus и contrast text variables.",
          },
        ],
      },
      {
        title: { en: "Dynamic shadows", ru: "Динамические тени" },
        paragraphs: [
          {
            en: "If a theme has `main` but no `darkShade` and `lightShade`, Nmorph generates both shade colors from the main color. This keeps inset and outset shadows usable for custom themes without forcing every color token to be provided manually.",
            ru: "Если в теме есть `main`, но нет `darkShade` и `lightShade`, Nmorph генерирует оба shade color из main color. Это сохраняет inset/outset shadows рабочими для custom themes без ручного описания каждого token.",
          },
        ],
      },
      {
        title: { en: "Global tokens", ru: "Глобальные tokens" },
        paragraphs: [
          {
            en: "Common styles define font sizes, line heights, border radii, component heights, indentation, transition duration, shadow width, and wrapper padding. Components consume the same variables instead of hardcoding dimensions.",
            ru: "Common styles задают font sizes, line heights, border radii, component heights, indentation, transition duration, shadow width и wrapper padding. Компоненты используют одни и те же variables вместо локальных magic numbers.",
          },
        ],
        points: [
          { en: "`thick`, `basic`, `thin`, and `extra-thin` heights are used by inputs and selection controls.", ru: "`thick`, `basic`, `thin` и `extra-thin` используются inputs и selection controls." },
          { en: "`nmorph--shadow-outset`, `nmorph--shadow-inset`, and `nmorph--shadow-combined` are shared utility classes.", ru: "`nmorph--shadow-outset`, `nmorph--shadow-inset` и `nmorph--shadow-combined` - общие utility classes." },
          { en: "Focus states switch to accent background and focus text color for readable active controls.", ru: "Focus states переключаются на accent background и focus text color, чтобы активные контролы оставались читаемыми." },
        ],
      },
    ],
  },
  {
    slug: "icons",
    title: { en: "Icons", ru: "Иконки" },
    description: {
      en: "Use exported icons, raw SVG files, and NmorphIcon color behavior.",
      ru: "Использование экспортируемых icons, raw SVG и поведения NmorphIcon color.",
    },
    sections: [
      {
        title: { en: "NmorphIcon wrapper", ru: "NmorphIcon wrapper" },
        paragraphs: [
          {
            en: "`NmorphIcon` normalizes icon size and color. It passes the icon color through CSS variables so exported icons and most raw SVG icons follow the same theme tokens.",
            ru: "`NmorphIcon` нормализует размер и цвет иконок. Цвет проходит через CSS variables, поэтому экспортируемые icons и большинство raw SVG работают с одними theme tokens.",
          },
        ],
        code: {
          language: "vue",
          content:
            '<script setup lang="ts">\nimport { NmorphIcon, NmorphIconSearch } from "@nmorph/nmorph-ui-kit";\n</script>\n\n<template>\n  <NmorphIcon color="var(--nmorph-accent-color)" size="large">\n    <NmorphIconSearch />\n  </NmorphIcon>\n</template>',
        },
      },
      {
        title: { en: "Button and input icons", ru: "Иконки в кнопках и inputs" },
        paragraphs: [
          {
            en: "Buttons expose `icon` and `icon-only` slots. Text inputs expose `prepend-icon`. The focused state changes icon color together with text, so SVGs should not hardcode fill/stroke when they need to follow the component state.",
            ru: "Buttons имеют слоты `icon` и `icon-only`. Text inputs имеют `prepend-icon`. Focused state меняет цвет иконки вместе с текстом, поэтому SVG не должен жестко фиксировать fill/stroke, если должен следовать состоянию компонента.",
          },
        ],
      },
      {
        title: { en: "Raw SVG", ru: "Raw SVG" },
        paragraphs: [
          {
            en: "The docs use raw SVG imports for GitLab and translation icons. Wrap raw SVG in `NmorphIcon` when it needs size and color behavior consistent with exported icons.",
            ru: "В документации raw SVG imports используются для GitLab и translation icons. Оборачивайте raw SVG в `NmorphIcon`, если нужны размер и цвет как у экспортируемых иконок.",
          },
        ],
      },
    ],
  },
  {
    slug: "forms",
    title: { en: "Forms", ru: "Формы" },
    description: {
      en: "Form controls, validation rules, selection groups, and practical structure.",
      ru: "Контролы форм, validation rules, groups и практическая структура.",
    },
    sections: [
      {
        title: { en: "Controls", ru: "Контролы" },
        paragraphs: [
          {
            en: "Form components cover text input, OTP input, number input, select, autocomplete, checkbox, checkbox group, radio, radio group, select button, switch, slider, color picker, date picker, and file upload.",
            ru: "Form components включают text input, OTP input, number input, select, autocomplete, checkbox, checkbox group, radio, radio group, select button, switch, slider, color picker, date picker и file upload.",
          },
          {
            en: "Most controls share `height`, `disabled`, `id`, `name`, `autocomplete`, and `tabindex` patterns through common input props. Selection controls also support `extra-thin` for compact screens and dense layouts.",
            ru: "Большинство контролов разделяют `height`, `disabled`, `id`, `name`, `autocomplete` и `tabindex` через common input props. Selection controls также поддерживают `extra-thin` для компактных экранов и плотных layout.",
          },
        ],
      },
      {
        title: { en: "Validation", ru: "Validation" },
        paragraphs: [
          {
            en: "`NmorphForm` uses validation helpers that support text patterns, number comparisons, boolean comparisons, and array rules. The form tracks touched state, validity, and errors per field.",
            ru: "`NmorphForm` использует validation helpers для text patterns, number comparisons, boolean comparisons и array rules. Form отслеживает touched state, validity и errors по каждому field.",
          },
        ],
      },
      {
        title: { en: "Groups", ru: "Groups" },
        paragraphs: [
          {
            en: "Checkbox and radio groups provide shared state to their child controls. Use groups for repeated options and standalone controls for single binary or exclusive choices.",
            ru: "Checkbox и radio groups передают общее состояние дочерним controls. Используйте groups для повторяющихся options, а standalone controls - для одиночных binary или exclusive choices.",
          },
        ],
      },
    ],
  },
  {
    slug: "overlays",
    title: { en: "Overlays", ru: "Overlays" },
    description: {
      en: "Layered components, teleport, placement, and outside click behavior.",
      ru: "Layered components, teleport, placement и outside click behavior.",
    },
    sections: [
      {
        title: { en: "Layering", ru: "Layering" },
        paragraphs: [
          {
            en: "Overlay-based components should not be trapped by parent stacking contexts. `NmorphOverlay` and `NmorphDropdown` render through Teleport to `body`, which lets dropdowns, dialogs, tooltips, and previews escape isolated or overflow-hidden containers.",
            ru: "Overlay-based components не должны застревать в parent stacking contexts. `NmorphOverlay` и `NmorphDropdown` рендерятся через Teleport в `body`, поэтому dropdowns, dialogs, tooltips и previews выходят из isolated или overflow-hidden containers.",
          },
        ],
      },
      {
        title: { en: "Placement", ru: "Placement" },
        paragraphs: [
          {
            en: "`usePlacement` calculates coordinates from the trigger element and content size. It supports side placement and alignments such as `bottom-end`, recalculates after mount/open, reacts to resize and scroll, and flips when there is not enough viewport space.",
            ru: "`usePlacement` вычисляет координаты по trigger element и размеру content. Он поддерживает sides и alignments вроде `bottom-end`, пересчитывает позицию после mount/open, реагирует на resize и scroll и меняет side, если во viewport не хватает места.",
          },
        ],
      },
      {
        title: { en: "Outside click", ru: "Outside click" },
        paragraphs: [
          {
            en: "Outside click should close an overlay even when the trigger is inside isolated containers. Keep the trigger reference stable and prefer explicit `relativeElement` refs over late DOM lookups.",
            ru: "Outside click должен закрывать overlay даже если trigger находится внутри isolated containers. Держите trigger reference стабильным и предпочитайте явные `relativeElement` refs поздним DOM lookups.",
          },
        ],
      },
    ],
  },
  {
    slug: "performance",
    title: { en: "Performance", ru: "Performance" },
    description: {
      en: "Virtual lists and practical guidance for large option/data sets.",
      ru: "Virtual lists и практические рекомендации для больших option/data sets.",
    },
    sections: [
      {
        title: { en: "Virtualization", ru: "Virtualization" },
        paragraphs: [
          {
            en: "Nmorph includes `useVirtualList`, used by large-data components to render only the visible slice. It tracks the scroll container, viewport height, item height, overscan, total height, and offset.",
            ru: "Nmorph включает `useVirtualList`, который используется компонентами с большим количеством данных для рендера только видимого slice. Он отслеживает scroll container, viewport height, item height, overscan, total height и offset.",
          },
        ],
      },
      {
        title: { en: "Where to use it", ru: "Где использовать" },
        paragraphs: [
          {
            en: "Enable virtualization for `NmorphTable`, `NmorphSelect`, and `NmorphAutocomplete` when rows or options are large enough to make DOM size noticeable. Keep item height accurate so keyboard navigation and scroll position stay predictable.",
            ru: "Включайте virtualization для `NmorphTable`, `NmorphSelect` и `NmorphAutocomplete`, когда rows/options достаточно много и DOM size уже заметен. Держите item height точным, чтобы keyboard navigation и scroll position оставались предсказуемыми.",
          },
        ],
        points: [
          { en: "Use overscan to reduce visible pop-in during fast scroll.", ru: "Используйте overscan, чтобы уменьшить visible pop-in при быстром scroll." },
          { en: "Keep row and option templates stable in height.", ru: "Держите row и option templates стабильными по высоте." },
          { en: "Disable virtualization for small lists where native rendering is simpler.", ru: "Отключайте virtualization для маленьких списков, где обычный render проще." },
        ],
      },
      {
        title: { en: "SSR notes", ru: "SSR notes" },
        paragraphs: [
          {
            en: "Virtualization depends on client-side measurements. In Nuxt, expect the final visible slice to settle after mount when the scroll container size is known.",
            ru: "Virtualization зависит от client-side measurements. В Nuxt финальный visible slice стабилизируется после mount, когда известен размер scroll container.",
          },
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: { en: "Accessibility", ru: "Accessibility" },
    description: {
      en: "Current accessibility practices and what to verify in product usage.",
      ru: "Текущие accessibility practices и что проверять в продуктовой интеграции.",
    },
    sections: [
      {
        title: { en: "Native inputs", ru: "Native inputs" },
        paragraphs: [
          {
            en: "Inputs expose native attributes such as `id`, `name`, `autocomplete`, and `tabindex`. Use them consistently with labels and form context so screen readers and browser autofill can understand the field.",
            ru: "Inputs прокидывают native attributes: `id`, `name`, `autocomplete`, `tabindex`. Используйте их вместе с labels и form context, чтобы screen readers и browser autofill понимали поле.",
          },
        ],
      },
      {
        title: { en: "Keyboard and focus", ru: "Keyboard и focus" },
        paragraphs: [
          {
            en: "Interactive components need visible focus, predictable tab order, disabled states, and keyboard behavior for enter, escape, arrows, and selection. Components that open overlays should also return users to a stable trigger state after close.",
            ru: "Interactive components должны иметь видимый focus, предсказуемый tab order, disabled states и keyboard behavior для enter, escape, arrows и selection. Компоненты с overlays после закрытия должны возвращать пользователя в стабильное trigger state.",
          },
        ],
      },
      {
        title: { en: "ARIA", ru: "ARIA" },
        paragraphs: [
          {
            en: "The shared `INmorphA11yProps` shape includes role and aria label fields. Use explicit ARIA only when native semantics are not enough, and test components in the final page context.",
            ru: "Общий `INmorphA11yProps` включает role и aria label fields. Используйте явный ARIA только когда native semantics недостаточно, и проверяйте компоненты в финальном контексте страницы.",
          },
        ],
      },
    ],
  },
  {
    slug: "migration",
    title: { en: "Migration", ru: "Migration" },
    description: {
      en: "How to upgrade safely and where to look for breaking changes.",
      ru: "Как безопасно обновляться и где искать breaking changes.",
    },
    sections: [
      {
        title: { en: "Before upgrade", ru: "Перед обновлением" },
        paragraphs: [
          {
            en: "Check the changelog first. Visual updates can change component height, shadow, icon color, overlay placement, or default design type even when the public prop name stays the same.",
            ru: "Сначала проверяйте changelog. Визуальные обновления могут менять height, shadow, icon color, overlay placement или default design type даже когда имя публичного prop остается прежним.",
          },
        ],
      },
      {
        title: { en: "After upgrade", ru: "После обновления" },
        paragraphs: [
          {
            en: "Rebuild both the library consumer and the docs, then check dense form pages, tables, dropdowns near viewport edges, and any Nuxt pages that rely on SSR or `ClientOnly`.",
            ru: "Пересоберите consumer и docs, затем проверьте плотные form pages, tables, dropdowns у краев viewport и Nuxt pages, завязанные на SSR или `ClientOnly`.",
          },
        ],
      },
      {
        title: { en: "Import strategy", ru: "Import strategy" },
        paragraphs: [
          {
            en: "If you switch between full stylesheet and component-level CSS, check direct component imports. Component chunks import their own CSS, while utility classes require the full stylesheet.",
            ru: "Если переключаетесь между full stylesheet и component-level CSS, проверьте direct component imports. Component chunks импортируют свой CSS, а utility classes требуют полный stylesheet.",
          },
        ],
      },
    ],
  },
];

export const guidePageMap = Object.fromEntries(guidePages.map((page) => [page.slug, page])) as Record<GuidePageSlug, GuidePage>;
