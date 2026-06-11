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

export const textByLocale = (text: GuideLocaleText, locale: string) =>
  text[locale as keyof GuideLocaleText] || text.en;

export const guideGroups: { title: GuideLocaleText; pages: GuidePageSlug[] }[] =
  [
    {
      title: { en: "Start", zh: "开始", ru: "Старт" },
      pages: ["introduction", "installation", "vue", "nuxt"],
    },
    {
      title: { en: "System", zh: "系统", ru: "Система" },
      pages: ["theming", "icons", "forms", "overlays"],
    },
    {
      title: { en: "Production", zh: "生产", ru: "Продакшен" },
      pages: ["performance", "accessibility", "migration"],
    },
  ];

export const guidePages: GuidePage[] = [
  {
    slug: "introduction",
    title: { en: "Introduction", zh: "介绍", ru: "Введение" },
    description: {
      en: "What Nmorph UI Kit is, where it fits, and how the library is organized.",
      zh: "Nmorph UI Kit 是什么、适用于哪些场景，以及库的组织方式。",
      ru: "Что такое Nmorph UI Kit, где его использовать и как устроена библиотека.",
    },
    sections: [
      {
        title: { en: "Purpose", zh: "用途", ru: "Назначение" },
        paragraphs: [
          {
            en: "Nmorph UI Kit is a Vue 3 component library with Nuxt support. It is built around tactile neumorphic surfaces, compact product controls, and a consistent set of component props for common interface work.",
            zh: "Nmorph UI Kit 是支持 Nuxt 的 Vue 3 组件库。它围绕具有触感的新拟态表面、紧凑的产品控件，以及用于常见界面工作的统一组件 props 构建。",
            ru: "Nmorph UI Kit - библиотека компонентов для Vue 3 с поддержкой Nuxt. Она построена вокруг тактильных неуморфических поверхностей, компактных продуктовых контролов и единого набора props для типовых интерфейсных задач.",
          },
          {
            en: "The package contains basic elements, form controls, data display components, navigation, feedback components, overlays, providers, theme hooks, validation helpers, and a Nuxt module.",
            zh: "该包包含基础元素、表单控件、数据展示组件、导航、反馈组件、overlays、providers、主题 hooks、校验 helpers 和 Nuxt module。",
            ru: "В пакете есть базовые элементы, контролы форм, компоненты отображения данных, навигация, feedback-компоненты, overlay-слой, providers, theme hooks, validation helpers и Nuxt module.",
          },
        ],
      },
      {
        title: {
          en: "Component areas",
          zh: "组件分组",
          ru: "Группы компонентов",
        },
        paragraphs: [
          {
            en: "The documentation groups components by use case: Basic, Data, Feedback, Form, Navigation, Others, and Providers. This mirrors how the source is organized and makes the component list useful for implementation work.",
            zh: "文档按使用场景对组件分组：Basic、Data、Feedback、Form、Navigation、Others 和 Providers。这与源码组织方式一致，也让组件列表更适合实现工作。",
            ru: "Документация группирует компоненты по сценариям: Basic, Data, Feedback, Form, Navigation, Others и Providers. Это повторяет структуру исходников и делает список компонентов удобным для разработки.",
          },
        ],
        points: [
          {
            en: "Form: text input, OTP input, select, autocomplete, checkbox, radio, date picker, file upload, slider, number input, form validation.",
            zh: "Form：text input、OTP input、select、autocomplete、checkbox、radio、date picker、file upload、slider、number input、form validation。",
            ru: "Form: text input, OTP input, select, autocomplete, checkbox, radio, date picker, file upload, slider, number input, form validation.",
          },
          {
            en: "Data: table, pagination, badge, avatar, image preview, progress, skeleton, calendar, cards, tags.",
            zh: "Data：table、pagination、badge、avatar、image preview、progress、skeleton、calendar、cards、tags。",
            ru: "Data: table, pagination, badge, avatar, image preview, progress, skeleton, calendar, cards, tags.",
          },
          {
            en: "Overlay and navigation: dropdown, tooltip, dialog, overlay, tabs, breadcrumb, backtop.",
            zh: "Overlay 和 navigation：dropdown、tooltip、dialog、overlay、tabs、breadcrumb、backtop。",
            ru: "Overlay и navigation: dropdown, tooltip, dialog, overlay, tabs, breadcrumb, backtop.",
          },
        ],
      },
      {
        title: {
          en: "Design principles",
          zh: "设计原则",
          ru: "Принципы дизайна",
        },
        paragraphs: [
          {
            en: "The visual system relies on CSS variables, inset and outset shadows, restrained radii, and explicit states. Components are meant to feel dimensional while staying readable and predictable in repeated product workflows.",
            zh: "视觉系统依赖 CSS variables、inset/outset 阴影、克制的圆角和明确的状态。组件应有空间层次感，同时在重复的产品流程中保持可读且可预测。",
            ru: "Визуальная система опирается на CSS-переменные, inset/outset shadows, умеренные радиусы и явные состояния. Компоненты должны ощущаться объемными, но оставаться читаемыми и предсказуемыми в продуктовых сценариях.",
          },
        ],
      },
    ],
  },
  {
    slug: "installation",
    title: { en: "Installation", zh: "安装", ru: "Установка" },
    description: {
      en: "Install the package and choose a style-loading strategy.",
      zh: "安装包并选择样式加载策略。",
      ru: "Установите пакет и выберите способ подключения стилей.",
    },
    sections: [
      {
        title: { en: "Package", zh: "包", ru: "Пакет" },
        paragraphs: [
          {
            en: "Install the UI kit with your package manager. The library is designed for Vue 3 applications and Nuxt 3 projects.",
            zh: "使用你的包管理器安装 UI kit。该库面向 Vue 3 应用和 Nuxt 3 项目设计。",
            ru: "Установите UI kit через ваш package manager. Библиотека рассчитана на Vue 3 приложения и Nuxt 3 проекты.",
          },
        ],
        code: {
          language: "bash",
          content: "pnpm add @nmorph/nmorph-ui-kit",
        },
      },
      {
        title: { en: "Styles", zh: "样式", ru: "Стили" },
        paragraphs: [
          {
            en: "You can load the full stylesheet once, rely on component chunks importing their own CSS, or enable the full stylesheet through the Nuxt module. Full stylesheet loading is useful for utility classes and predictable global tokens.",
            zh: "你可以一次性加载完整 stylesheet，也可以依赖组件 chunks 自行导入 CSS，或通过 Nuxt module 启用完整 stylesheet。完整 stylesheet 适合 utility classes 和可预测的全局 tokens。",
            ru: "Можно подключить полный stylesheet один раз, полагаться на CSS отдельных component chunks или включить полный stylesheet через Nuxt module. Полный stylesheet удобен для utility classes и предсказуемых глобальных tokens.",
          },
        ],
        code: {
          language: "ts",
          content: 'import "@nmorph/nmorph-ui-kit/styles.css";',
        },
      },
      {
        title: { en: "Entries", zh: "入口", ru: "Точки входа" },
        paragraphs: [
          {
            en: "Use the component exports when you import components directly. Use the plugin entry when you only need to install Nmorph globally without pulling components into that file.",
            zh: "直接导入组件时使用 component exports。只需要全局安装 Nmorph、而不想在该文件中引入组件时，使用 plugin entry。",
            ru: "Используйте component exports для прямого импорта компонентов. Используйте plugin entry, когда нужно только установить Nmorph глобально и не импортировать компоненты в этом файле.",
          },
        ],
      },
    ],
  },
  {
    slug: "vue",
    title: { en: "Vue Setup", zh: "Vue 设置", ru: "Vue подключение" },
    description: {
      en: "Configure Nmorph in a regular Vue 3 application.",
      zh: "在普通 Vue 3 应用中配置 Nmorph。",
      ru: "Настройка Nmorph в обычном Vue 3 приложении.",
    },
    sections: [
      {
        title: {
          en: "Plugin setup",
          zh: "Plugin 设置",
          ru: "Подключение plugin",
        },
        paragraphs: [
          {
            en: "The Vue plugin installs translations, creates common CSS variables, initializes the theme, detects browser dimensions, and provides z-index helpers through the Nmorph instance.",
            zh: "Vue plugin 会安装翻译、创建通用 CSS variables、初始化主题、检测浏览器尺寸，并通过 Nmorph instance 提供 z-index helpers。",
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
        title: { en: "Options", zh: "选项", ru: "Опции" },
        paragraphs: [
          {
            en: "The plugin accepts theme, i18n, and zIndex options. Theme options control colors and shadow variables. i18n options can add or override library messages. zIndex sets the base stacking value used by components that need layers.",
            zh: "plugin 接受 theme、i18n 和 zIndex options。Theme options 控制颜色和阴影变量。i18n options 可新增或覆盖库消息。zIndex 设置需要层级组件使用的基础 stacking 值。",
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
        title: { en: "Direct imports", zh: "直接导入", ru: "Прямые импорты" },
        paragraphs: [
          {
            en: "Components can be imported directly from the package. This is the preferred style for local examples and for applications that want explicit component usage.",
            zh: "组件可以直接从包中导入。这是本地示例以及希望显式使用组件的应用的推荐方式。",
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
    title: { en: "Nuxt Setup", zh: "Nuxt 设置", ru: "Nuxt подключение" },
    description: {
      en: "Use the Nuxt module for automatic plugin setup and i18n merge.",
      zh: "使用 Nuxt module 自动设置 plugin 并合并 i18n。",
      ru: "Используйте Nuxt module для автоматического plugin setup и i18n merge.",
    },
    sections: [
      {
        title: { en: "Module", zh: "模块", ru: "Модуль" },
        paragraphs: [
          {
            en: "The Nuxt module transpiles the package, registers a universal plugin, installs Nmorph into the Vue app during SSR and on the client, and merges Nmorph messages into an existing Nuxt i18n instance when it is present.",
            zh: "Nuxt module 会 transpile 包、注册 universal plugin，在 SSR 和客户端期间将 Nmorph 安装到 Vue app，并在存在 Nuxt i18n instance 时合并 Nmorph messages。",
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
        title: { en: "Styles option", zh: "Styles 选项", ru: "Опция стилей" },
        paragraphs: [
          {
            en: 'Set `nmorph.styles` to `"all"` when you want Nuxt to add the full library stylesheet to `nuxt.options.css`. Leave it as `false` when you prefer component-level CSS imports.',
            ru: 'Установите `nmorph.styles` в `"all"`, если Nuxt должен добавить полный stylesheet библиотеки в `nuxt.options.css`. Оставьте `false`, если хотите полагаться на component-level CSS imports.',
          },
        ],
      },
      {
        title: { en: "SSR behavior", zh: "SSR 行为", ru: "SSR поведение" },
        paragraphs: [
          {
            en: "Static component markup renders on the server. Browser-only effects such as writing theme variables to `document`, reading `localStorage`, measuring element coordinates, and reacting to viewport changes are delayed until the client. Use Nuxt's `ClientOnly` only for examples that intentionally depend on open overlays or browser-only state.",
            zh: "静态组件标记会在服务器端渲染。写入 theme variables 到 `document`、读取 `localStorage`、测量元素坐标、响应 viewport 变化等 browser-only effects 会延迟到客户端。只有在示例明确依赖打开的 overlays 或 browser-only state 时，才使用 Nuxt 的 `ClientOnly`。",
            ru: "Статическая разметка компонентов рендерится на сервере. Browser-only effects вроде записи theme variables в `document`, чтения `localStorage`, измерения координат элементов и реакции на viewport откладываются до клиента. Используйте Nuxt `ClientOnly` только для примеров, которым намеренно нужен открытый overlay или browser-only state.",
          },
        ],
      },
    ],
  },
  {
    slug: "theming",
    title: { en: "Theming", zh: "主题", ru: "Темизация" },
    description: {
      en: "How colors, shadows, typography, and component sizes are produced.",
      zh: "颜色、阴影、排版和组件尺寸的生成方式。",
      ru: "Как создаются цвета, тени, типографика и размеры компонентов.",
    },
    sections: [
      {
        title: { en: "Theme variables", zh: "主题变量", ru: "Переменные темы" },
        paragraphs: [
          {
            en: "Nmorph writes theme variables to `:root` and switches the current palette with the `nmorph-data-theme` attribute on `html`. Common colors are shared, while light and dark palettes define `main`, `text`, `accent`, shade colors, placeholder, focus, and contrast text variables.",
            zh: "Nmorph 会将主题变量写入 `:root`，并通过 `html` 上的 `nmorph-data-theme` 属性切换当前色板。通用颜色是共享的，light/dark 色板则定义 `main`、`text`、`accent`、阴影色、placeholder、focus 和 contrast text 变量。",
            ru: "Nmorph записывает theme variables в `:root` и переключает текущую палитру через атрибут `nmorph-data-theme` на `html`. Common colors общие, а light/dark palettes задают `main`, `text`, `accent`, shade colors, placeholder, focus и contrast text variables.",
          },
        ],
      },
      {
        title: {
          en: "Dynamic shadows",
          zh: "动态阴影",
          ru: "Динамические тени",
        },
        paragraphs: [
          {
            en: "If a theme has `main` but no `darkShade` and `lightShade`, Nmorph generates both shade colors from the main color. This keeps inset and outset shadows usable for custom themes without forcing every color token to be provided manually.",
            zh: "如果主题提供了 `main`，但没有 `darkShade` 和 `lightShade`，Nmorph 会从主色生成这两个阴影色。这样自定义主题无需手动提供每个 color token，也能保持 inset/outset 阴影可用。",
            ru: "Если в теме есть `main`, но нет `darkShade` и `lightShade`, Nmorph генерирует оба shade color из main color. Это сохраняет inset/outset shadows рабочими для custom themes без ручного описания каждого token.",
          },
        ],
      },
      {
        title: {
          en: "Global tokens",
          zh: "全局 tokens",
          ru: "Глобальные tokens",
        },
        paragraphs: [
          {
            en: "Common styles define font sizes, line heights, border radii, component heights, indentation, transition duration, shadow width, and wrapper padding. Components consume the same variables instead of hardcoding dimensions.",
            zh: "Common styles 定义 font sizes、line heights、border radii、component heights、indentation、transition duration、shadow width 和 wrapper padding。组件使用同一组变量，而不是硬编码尺寸。",
            ru: "Common styles задают font sizes, line heights, border radii, component heights, indentation, transition duration, shadow width и wrapper padding. Компоненты используют одни и те же variables вместо локальных magic numbers.",
          },
        ],
        points: [
          {
            en: "`thick`, `basic`, and `thin` heights are shared by inputs and selection controls; `extra-thin` is reserved for plain selection controls.",
            zh: "`thick`、`basic` 和 `thin` 高度由 inputs 和 selection controls 共享；`extra-thin` 仅用于 plain selection controls。",
            ru: "`thick`, `basic` и `thin` используются inputs и selection controls; `extra-thin` доступен только для plain selection controls.",
          },
          {
            en: "`nmorph--shadow-outset`, `nmorph--shadow-inset`, and `nmorph--shadow-combined` are shared utility classes.",
            zh: "`nmorph--shadow-outset`、`nmorph--shadow-inset` 和 `nmorph--shadow-combined` 是共享 utility classes。",
            ru: "`nmorph--shadow-outset`, `nmorph--shadow-inset` и `nmorph--shadow-combined` - общие utility classes.",
          },
          {
            en: "Focus states switch to accent background and focus text color for readable active controls.",
            zh: "Focus 状态会切换到 accent 背景和 focus text color，使 active controls 保持可读。",
            ru: "Focus states переключаются на accent background и focus text color, чтобы активные контролы оставались читаемыми.",
          },
        ],
      },
    ],
  },
  {
    slug: "icons",
    title: { en: "Icons", zh: "图标", ru: "Иконки" },
    description: {
      en: "Use exported icons, raw SVG files, and NmorphIcon color behavior.",
      zh: "使用导出的图标、raw SVG 文件以及 NmorphIcon 的颜色行为。",
      ru: "Использование экспортируемых icons, raw SVG и поведения NmorphIcon color.",
    },
    sections: [
      {
        title: {
          en: "NmorphIcon wrapper",
          zh: "NmorphIcon 包裹层",
          ru: "NmorphIcon wrapper",
        },
        paragraphs: [
          {
            en: "`NmorphIcon` normalizes icon size and color through props so exported icons and most raw SVG icons follow the same theme tokens.",
            zh: "`NmorphIcon` 通过 props 统一图标尺寸和颜色，使导出的图标和大多数 raw SVG icons 遵循同一套 theme tokens。",
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
        title: {
          en: "Button and input icons",
          zh: "按钮和输入图标",
          ru: "Иконки в кнопках и inputs",
        },
        paragraphs: [
          {
            en: "Buttons expose `icon` and `icon-only` slots. Text inputs expose `prepend-icon`. The focused state changes icon color together with text, so SVGs should not hardcode fill/stroke when they need to follow the component state.",
            zh: "Buttons 暴露 `icon` 和 `icon-only` slots。Text inputs 暴露 `prepend-icon`。聚焦状态会让图标颜色随文本一起变化，因此需要跟随组件状态的 SVG 不应硬编码 fill/stroke。",
            ru: "Buttons имеют слоты `icon` и `icon-only`. Text inputs имеют `prepend-icon`. Focused state меняет цвет иконки вместе с текстом, поэтому SVG не должен жестко фиксировать fill/stroke, если должен следовать состоянию компонента.",
          },
        ],
      },
      {
        title: { en: "Raw SVG", zh: "Raw SVG", ru: "Raw SVG-иконки" },
        paragraphs: [
          {
            en: "The docs use raw SVG imports for GitHub and translation icons. Wrap raw SVG in `NmorphIcon` when it needs size and color behavior consistent with exported icons.",
            zh: "docs 中 GitHub 和翻译图标使用 raw SVG imports。当 raw SVG 需要与导出图标一致的尺寸和颜色行为时，请用 `NmorphIcon` 包裹。",
            ru: "В документации raw SVG imports используются для GitHub и translation icons. Оборачивайте raw SVG в `NmorphIcon`, если нужны размер и цвет как у экспортируемых иконок.",
          },
        ],
      },
    ],
  },
  {
    slug: "forms",
    title: { en: "Forms", zh: "表单", ru: "Формы" },
    description: {
      en: "Form controls, validation rules, selection groups, and practical structure.",
      zh: "表单控件、校验规则、选择组和实践结构。",
      ru: "Контролы форм, validation rules, groups и практическая структура.",
    },
    sections: [
      {
        title: { en: "Controls", zh: "控件", ru: "Контролы" },
        paragraphs: [
          {
            en: "Form components cover text input, OTP input, number input, select, autocomplete, checkbox, checkbox group, radio, radio group, select button, switch, slider, color picker, date picker, and file upload.",
            zh: "表单组件覆盖 text input、OTP input、number input、select、autocomplete、checkbox、checkbox group、radio、radio group、select button、switch、slider、color picker、date picker 和 file upload。",
            ru: "Form components включают text input, OTP input, number input, select, autocomplete, checkbox, checkbox group, radio, radio group, select button, switch, slider, color picker, date picker и file upload.",
          },
          {
            en: "Most controls share `thickness`, `disabled`, `id`, `name`, `autocomplete`, and `tabindex` patterns through common input props. Checkbox and radio controls also support `extra-thin` only when `design` is `plain`.",
            zh: "大多数控件通过 common input props 共享 `thickness`、`disabled`、`id`、`name`、`autocomplete` 和 `tabindex` 模式。Checkbox 和 radio controls 仅在 `design` 为 `plain` 时支持 `extra-thin`。",
            ru: 'Большинство контролов разделяют `thickness`, `disabled`, `id`, `name`, `autocomplete` и `tabindex` через common input props. Checkbox и radio поддерживают `extra-thin` только при `design="plain"`.',
          },
        ],
      },
      {
        title: { en: "Validation", zh: "校验", ru: "Валидация" },
        paragraphs: [
          {
            en: "`NmorphForm` uses validation helpers that support text patterns, number comparisons, boolean comparisons, and array rules. The form tracks touched state, validity, and errors per field.",
            zh: "`NmorphForm` 使用 validation helpers，支持文本模式、数字比较、boolean 比较和数组规则。表单会按字段追踪 touched state、validity 和 errors。",
            ru: "`NmorphForm` использует validation helpers для text patterns, number comparisons, boolean comparisons и array rules. Form отслеживает touched state, validity и errors по каждому field.",
          },
        ],
      },
      {
        title: { en: "Groups", zh: "分组", ru: "Группы" },
        paragraphs: [
          {
            en: "Checkbox and radio groups provide shared state to their child controls. Use groups for repeated options and standalone controls for single binary or exclusive choices.",
            zh: "Checkbox 和 radio groups 会向子控件提供共享状态。重复选项使用 groups，单个二元或互斥选择使用 standalone controls。",
            ru: "Checkbox и radio groups передают общее состояние дочерним controls. Используйте groups для повторяющихся options, а standalone controls - для одиночных binary или exclusive choices.",
          },
        ],
      },
    ],
  },
  {
    slug: "overlays",
    title: { en: "Overlays", zh: "覆盖层", ru: "Оверлеи" },
    description: {
      en: "Layered components, teleport, placement, and outside click behavior.",
      zh: "层级组件、teleport、placement 和 outside click 行为。",
      ru: "Layered components, teleport, placement и outside click behavior.",
    },
    sections: [
      {
        title: { en: "Layering", zh: "层级", ru: "Слои" },
        paragraphs: [
          {
            en: "Overlay-based components should not be trapped by parent stacking contexts. `NmorphOverlay` and `NmorphDropdown` render through Teleport to `body`, which lets dropdowns, dialogs, tooltips, and previews escape isolated or overflow-hidden containers.",
            zh: "基于 overlay 的组件不应被父级 stacking contexts 限制。`NmorphOverlay` 和 `NmorphDropdown` 通过 Teleport 渲染到 `body`，让 dropdowns、dialogs、tooltips 和 previews 能脱离 isolated 或 overflow-hidden 容器。",
            ru: "Overlay-based components не должны застревать в parent stacking contexts. `NmorphOverlay` и `NmorphDropdown` рендерятся через Teleport в `body`, поэтому dropdowns, dialogs, tooltips и previews выходят из isolated или overflow-hidden containers.",
          },
        ],
      },
      {
        title: { en: "Placement", zh: "定位", ru: "Позиционирование" },
        paragraphs: [
          {
            en: "`usePlacement` calculates coordinates from the trigger element and content size. It supports side placement and alignments such as `bottom-end`, recalculates after mount/open, reacts to resize and scroll, and flips when there is not enough viewport space.",
            zh: "`usePlacement` 根据 trigger 元素和内容尺寸计算坐标。它支持 side placement 和 `bottom-end` 等对齐方式，会在 mount/open 后重新计算，响应 resize/scroll，并在 viewport 空间不足时翻转。",
            ru: "`usePlacement` вычисляет координаты по trigger element и размеру content. Он поддерживает sides и alignments вроде `bottom-end`, пересчитывает позицию после mount/open, реагирует на resize и scroll и меняет side, если во viewport не хватает места.",
          },
        ],
      },
      {
        title: { en: "Outside click", zh: "外部点击", ru: "Клик снаружи" },
        paragraphs: [
          {
            en: "Outside click should close an overlay even when the trigger is inside isolated containers. Keep the trigger reference stable and prefer explicit `relativeElement` refs over late DOM lookups.",
            zh: "即使 trigger 位于 isolated containers 内，outside click 也应关闭 overlay。保持 trigger reference 稳定，并优先使用显式 `relativeElement` refs，而不是较晚的 DOM 查找。",
            ru: "Outside click должен закрывать overlay даже если trigger находится внутри isolated containers. Держите trigger reference стабильным и предпочитайте явные `relativeElement` refs поздним DOM lookups.",
          },
        ],
      },
    ],
  },
  {
    slug: "performance",
    title: { en: "Performance", zh: "性能", ru: "Производительность" },
    description: {
      en: "Bundle size, tree-shaking, virtual lists, and practical guidance for large option/data sets.",
      zh: "Bundle size、tree-shaking、virtual lists，以及大型 options/data sets 的实践建议。",
      ru: "Размер bundle, tree-shaking, virtual lists и практические рекомендации для больших option/data sets.",
    },
    sections: [
      {
        title: {
          en: "Bundle strategy",
          zh: "Bundle 策略",
          ru: "Bundle strategy",
        },
        paragraphs: [
          {
            en: "Nmorph is intentionally very small and supports tree-shaking. Import only the components, icons, and style entrypoints your screen uses so modern bundlers can remove unused exports from the final application bundle.",
            zh: "Nmorph 有意保持很小，并支持 tree-shaking。只导入当前屏幕使用的 components、icons 和 style entrypoints，这样现代 bundlers 可以从最终应用 bundle 中移除未使用的导出。",
            ru: "Nmorph специально сделан очень маленьким и поддерживает tree-shaking. Импортируйте только компоненты, иконки и style entrypoints, которые нужны экрану, чтобы современные сборщики могли убрать неиспользуемые экспорты из финального bundle приложения.",
          },
          {
            en: "CSS stays marked as side effects, so component styles remain reliable while JavaScript and icon exports can still be optimized by the bundler.",
            zh: "CSS 保持标记为 side effects，因此组件样式保持可靠，同时 JavaScript 和 icon exports 仍可被 bundler 优化。",
            ru: "CSS остается помеченным как side effects, поэтому стили компонентов подключаются надежно, а JavaScript и icon exports все еще могут оптимизироваться сборщиком.",
          },
        ],
      },
      {
        title: { en: "Virtualization", zh: "虚拟化", ru: "Виртуализация" },
        paragraphs: [
          {
            en: "Nmorph includes `useVirtualList`, used by large-data components to render only the visible slice. It tracks the scroll container, viewport height, item height, overscan, total height, and offset.",
            zh: "Nmorph 包含 `useVirtualList`，大型数据组件用它只渲染可见切片。它会追踪 scroll container、viewport height、item height、overscan、total height 和 offset。",
            ru: "Nmorph включает `useVirtualList`, который используется компонентами с большим количеством данных для рендера только видимого slice. Он отслеживает scroll container, viewport height, item height, overscan, total height и offset.",
          },
        ],
      },
      {
        title: {
          en: "Where to use it",
          zh: "使用场景",
          ru: "Где использовать",
        },
        paragraphs: [
          {
            en: "Enable virtualization for `NmorphTable`, `NmorphSelect`, and `NmorphAutocomplete` when rows or options are large enough to make DOM size noticeable. Keep item height accurate so keyboard navigation and scroll position stay predictable.",
            zh: "当 rows 或 options 足够多、DOM size 明显变大时，为 `NmorphTable`、`NmorphSelect` 和 `NmorphAutocomplete` 启用 virtualization。保持 item height 准确，这样 keyboard navigation 和 scroll position 才可预测。",
            ru: "Включайте virtualization для `NmorphTable`, `NmorphSelect` и `NmorphAutocomplete`, когда rows/options достаточно много и DOM size уже заметен. Держите item height точным, чтобы keyboard navigation и scroll position оставались предсказуемыми.",
          },
        ],
        points: [
          {
            en: "Use overscan to reduce visible pop-in during fast scroll.",
            zh: "使用 overscan 减少快速滚动时可见的 pop-in。",
            ru: "Используйте overscan, чтобы уменьшить visible pop-in при быстром scroll.",
          },
          {
            en: "Keep row and option templates stable in height.",
            zh: "保持 row 和 option templates 高度稳定。",
            ru: "Держите row и option templates стабильными по высоте.",
          },
          {
            en: "Disable virtualization for small lists where native rendering is simpler.",
            zh: "对于 native rendering 更简单的小列表，关闭 virtualization。",
            ru: "Отключайте virtualization для маленьких списков, где обычный render проще.",
          },
        ],
      },
      {
        title: { en: "SSR notes", zh: "SSR 注意事项", ru: "Заметки по SSR" },
        paragraphs: [
          {
            en: "Virtualization depends on client-side measurements. In Nuxt, expect the final visible slice to settle after mount when the scroll container size is known.",
            zh: "Virtualization 依赖客户端测量。在 Nuxt 中，最终可见切片会在 mount 后、scroll container 尺寸已知时稳定下来。",
            ru: "Virtualization зависит от client-side measurements. В Nuxt финальный visible slice стабилизируется после mount, когда известен размер scroll container.",
          },
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: { en: "Accessibility", zh: "无障碍", ru: "Доступность" },
    description: {
      en: "Current accessibility practices and what to verify in product usage.",
      zh: "当前无障碍实践，以及在产品使用中需要验证的内容。",
      ru: "Текущие accessibility practices и что проверять в продуктовой интеграции.",
    },
    sections: [
      {
        title: { en: "Native inputs", zh: "原生输入", ru: "Нативные инпуты" },
        paragraphs: [
          {
            en: "Inputs expose native attributes such as `id`, `name`, `autocomplete`, and `tabindex`. Use them consistently with labels and form context so screen readers and browser autofill can understand the field.",
            zh: "Inputs 暴露 `id`、`name`、`autocomplete` 和 `tabindex` 等原生属性。请与 labels 和 form context 一致使用，让 screen readers 和 browser autofill 能理解字段。",
            ru: "Inputs прокидывают native attributes: `id`, `name`, `autocomplete`, `tabindex`. Используйте их вместе с labels и form context, чтобы screen readers и browser autofill понимали поле.",
          },
        ],
      },
      {
        title: {
          en: "Keyboard and focus",
          zh: "键盘和焦点",
          ru: "Keyboard и focus",
        },
        paragraphs: [
          {
            en: "Interactive components need visible focus, predictable tab order, disabled states, and keyboard behavior for enter, escape, arrows, and selection. Components that open overlays should also return users to a stable trigger state after close.",
            zh: "交互组件需要可见 focus、可预测 tab order、disabled states，以及 enter、escape、arrows 和 selection 的键盘行为。打开 overlays 的组件在关闭后也应让用户回到稳定的 trigger state。",
            ru: "Interactive components должны иметь видимый focus, предсказуемый tab order, disabled states и keyboard behavior для enter, escape, arrows и selection. Компоненты с overlays после закрытия должны возвращать пользователя в стабильное trigger state.",
          },
        ],
      },
      {
        title: { en: "ARIA", zh: "ARIA", ru: "ARIA-атрибуты" },
        paragraphs: [
          {
            en: "The shared `INmorphA11yProps` shape includes role and aria label fields. Use explicit ARIA only when native semantics are not enough, and test components in the final page context.",
            zh: "共享的 `INmorphA11yProps` shape 包含 role 和 aria label 字段。只有在 native semantics 不足时才显式使用 ARIA，并在最终页面上下文中测试组件。",
            ru: "Общий `INmorphA11yProps` включает role и aria label fields. Используйте явный ARIA только когда native semantics недостаточно, и проверяйте компоненты в финальном контексте страницы.",
          },
        ],
      },
    ],
  },
  {
    slug: "migration",
    title: { en: "Migration", zh: "迁移", ru: "Миграция" },
    description: {
      en: "How to upgrade safely and where to look for breaking changes.",
      zh: "如何安全升级，以及在哪里查看 breaking changes。",
      ru: "Как безопасно обновляться и где искать breaking changes.",
    },
    sections: [
      {
        title: { en: "Before upgrade", zh: "升级前", ru: "Перед обновлением" },
        paragraphs: [
          {
            en: "Check the changelog first. Visual updates can change component height, shadow, icon color, overlay placement, or default design type even when the public prop name stays the same.",
            zh: "请先查看 changelog。即使公开 prop 名称不变，视觉更新也可能改变组件高度、阴影、图标颜色、overlay placement 或默认 design type。",
            ru: "Сначала проверяйте changelog. Визуальные обновления могут менять height, shadow, icon color, overlay placement или default design type даже когда имя публичного prop остается прежним.",
          },
        ],
      },
      {
        title: { en: "After upgrade", zh: "升级后", ru: "После обновления" },
        paragraphs: [
          {
            en: "Rebuild both the library consumer and the docs, then check dense form pages, tables, dropdowns near viewport edges, and any Nuxt pages that rely on SSR or `ClientOnly`.",
            zh: "重新构建 library consumer 和 docs，然后检查密集表单页面、表格、靠近 viewport 边缘的 dropdowns，以及任何依赖 SSR 或 `ClientOnly` 的 Nuxt 页面。",
            ru: "Пересоберите consumer и docs, затем проверьте плотные form pages, tables, dropdowns у краев viewport и Nuxt pages, завязанные на SSR или `ClientOnly`.",
          },
        ],
      },
      {
        title: {
          en: "Import strategy",
          zh: "导入策略",
          ru: "Стратегия импорта",
        },
        paragraphs: [
          {
            en: "If you switch between full stylesheet and component-level CSS, check direct component imports. Component chunks import their own CSS, while utility classes require the full stylesheet.",
            zh: "如果在 full stylesheet 和 component-level CSS 之间切换，请检查直接组件导入。Component chunks 会导入自己的 CSS，而 utility classes 需要完整 stylesheet。",
            ru: "Если переключаетесь между full stylesheet и component-level CSS, проверьте direct component imports. Component chunks импортируют свой CSS, а utility classes требуют полный stylesheet.",
          },
        ],
      },
    ],
  },
];

export const guidePageMap = Object.fromEntries(
  guidePages.map((page) => [page.slug, page]),
) as Record<GuidePageSlug, GuidePage>;
