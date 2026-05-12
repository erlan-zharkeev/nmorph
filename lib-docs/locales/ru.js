export default {
  meta: {
    description:
      "Библиотека UI-компонентов для Vue 3 и Nuxt в стиле neumorphism/sceumorphism.",
  },
  guide: "Руководство",
  components: "Компоненты",
  about: "О проекте",
  search: "Поиск",
  attributes: "Атрибуты",
  slots: "Слоты",
  variables: "Переменные",
  exposes: "Expose",
  "right-aside-title": "Содержание",
  name: "Название",
  events: "События",
  translates: "Переводы",
  description: "Описание",
  text: "Текст",
  type: "Тип",
  default: "По умолчанию",
  loadingText: "Загрузка ...",
  basic: "Основное",
  data: "Данные",
  feedback: "Обратная связь",
  form: "Форма",
  navigation: "Навигация",
  other: "Прочее",
  attention: "Внимание",
  "top-bar": {
    menu: "Меню",
    nav: "Навигация",
    search: "Поиск",
    "search-shortcut": "Ctrl K",
  },
  "search-dialog": {
    placeholder: "Искать компоненты, гайд, API",
    empty: "Ничего не найдено",
    hint: "Открыть через Ctrl K",
    groups: {
      guide: "Гайд",
      component: "Компонент",
      api: "API",
      changelog: "Changelog",
      project: "Проект",
    },
  },
  "footer-bar": {
    license: "Распространяется по лицензии",
  },
  "unsupported-resolution": {
    title: "Разрешение не поддерживается",
    description:
      "Откройте документацию на устройстве с шириной экрана не меньше 320px.",
  },
  "guide-page": {
    title: "Гайд",
    "full-title": "Гайд по Nmorph UI Kit",
    "full-description":
      "Практическое руководство по установке Nmorph, подключению во Vue и Nuxt, настройке тем, работе с формами и overlay, а также подготовке интерфейсов с большим количеством компонентов к production.",
    "theme-customize": "Кастомизировать тему",
    "custom-theme-color": "Изменить базовый цвет",
    "custom-text-color": "Цвет текста",
    "custom-accent-color": "Цвет акцента",
    "enter-color": "Введите цвет",
    "get-started-btn": "Быстрый старт",
    explained:
      '<b class="main-section__subtitle">Neumorphism / Sceumorhism</b>',
    "apply-theme": "Применить тему",
    "main-content":
      '<p class="main-section__first-explained-content">Vue 3 и Nuxt&nbsp;ui-kit для создания уникального 3D&nbsp;дизайна в&nbsp;неу(о)морфическом стиле</p>',
    "quick-start": {
      installation: "Установка",
      "choose-package-manager":
        "Используйте <b>pnpm</b> для установки пакета и работы с monorepo.",
      plugin: "Подключение библиотеки",
      "alternative-plugin": "Алтернативый способ подключения",
      nuxt: "Подключение в Nuxt",
      usage: "Базовое использование",
    },
    config: {
      "add-config": "Пример добавления конфигурации библиотеки",
      available:
        "На данный момент доступны три настройки: theme, i18n и zIndex",
      theme: "Тема",
      i18n: "Интернационализация(i18n)",
      ls: "Сохранять текущую тему в local storage",
      "rest-themes": "Ваши кастомные темы",
      "default-theme": "Выбранная тема по умолчанию",
      "dark-shade":
        "Коэфициент глубины темной тени, работает только при динамическом подходе генерации тени",
      "light-shade":
        "Коэфициент глубины светлой тени, работает только при динамическом подходе генерации тени",
      "shadow-width": "Дальность отбрасываемой тени",
      "shadow-blur": "Размытие тени",
      "theme-explained":
        "Цвета темы передаются при подключении библиотеки. Минимально обычно достаточно main, text и accent для каждой темы.",
      "auto-generation":
        "Если в теме есть main, но нет darkShade и lightShade, Nmorph сгенерирует цвета теней автоматически. Передавайте darkShade и lightShade вручную, когда нужны точные значения.",
      "theme-runtime":
        "Используйте runtime API, когда цвета приходят из контролов, например из color picker. Runtime цвета обновляют style tag Nmorph и не записываются в inline style атрибут html.",
      "main-var":
        "Для автоматической генерации darkShade и lightShade. Достаточно передать только эту переменную.",
      "shade-var":
        "Будет автоматически высчитыватся если не мутировать их напрмяую и передать переменную main.",
      "i18n-content":
        "Для корректной работы i18n, убедитесь что подключаете i18n до подключения библиотеки. На данный момент доступны три локали en, zh, ru.<p>По умолчанию подключена локаль en. Импортируйте только те локали что будут нужны.</p><p>Если локалей нет то нужно добавить свои. Свойство locale будет перезаписывать locale из i18n переданного выше.</p>",
      "rewrite-translation":
        "Перезаписаваем переводы библиотеки. Имена сообщений переводов можно посмотреть в документации к компонентам",
      "other-messages": "Прочие переводы",
      "css-variables": "CSS-переменные",
      "css-variables-content":
        "Библиотека предоставляет следующие CSS-переменные, которые можно использовать в своих стилях.",
      "css-variables-theme-derived":
        "Переменные темы (задаются для каждой темы)",
      "css-variables-auto-generated":
        "Дополнительные переменные контрастности текста (настраиваются для каждой темы)",
      "css-variables-static":
        "Дополнительные цветовые переменные темы (задаются для каждой темы)",
      "css-var-main": "Основной цвет фона",
      "css-var-dark-shade": "Тёмный теневой оттенок",
      "css-var-light-shade": "Светлый теневой оттенок",
      "css-var-text": "Основной цвет текста",
      "css-var-scroll-thumb": "Цвет ползунка прокрутки",
      "css-var-scroll-color-scheme": "Цветовая схема нативного скролла",
      "css-var-accent": "Акцентный / брендовый цвет",
      "css-var-focus-text":
        "Цвет текста на сфокусированных/акцентных элементах",
      "css-var-placeholder": "Цвет текста-заглушки",
      "css-var-semi-contrast":
        "цвет текста +30% яркости — для второстепенного текста",
      "css-var-contrast": "цвет текста +70% яркости — для контрастного текста",
    },
    other: {
      "utils-classes": "Утилитные классы",
    },
  },
  "about-page": {
    eyebrow: "О проекте",
    lead:
      "Nmorph UI Kit — библиотека компонентов для Vue 3 и Nuxt, которая помогает собирать тактильные интерфейсы с мягкими тенями, понятными состояниями и единым API компонентов.",
    meta: {
      vue: "Vue 3",
      nuxt: "Nuxt",
      typescript: "TypeScript",
      license: "MIT лицензия",
    },
    "overview-title": "Что это",
    "overview-content":
      "Проект дает готовые блоки для продуктовых интерфейсов: формы, таблицы, компоненты отображения данных, навигацию, feedback-элементы, систему тем и примеры в документации. Один и тот же пакет можно использовать в обычных Vue-приложениях и в Nuxt через Nuxt module.",
    "features-title": "Что внутри",
    features: {
      components: {
        title: "Набор компонентов",
        text: "Переиспользуемые компоненты для форм, таблиц, overlay, навигации, feedback и базовых UI-сценариев.",
      },
      theme: {
        title: "Система тем",
        text: "CSS-переменные, светлая и темная темы, динамические тени и утилитные классы для единого оформления.",
      },
      nuxt: {
        title: "Поддержка Vue и Nuxt",
        text: "Прямое подключение через Vue plugin и Nuxt module для интеграции в Nuxt-приложения.",
      },
      typescript: {
        title: "Типизированный API",
        text: "Типизированные props, экспортируемые enum, вспомогательные типы и примеры, которые описывают публичный API компонентов.",
      },
    },
    "system-title": "Как устроена библиотека",
    system: {
      plugin: {
        title: "Жизненный цикл plugin",
        text: "NmorphLibrary подключает общие стили, мержит i18n messages, готовит CSS-переменные темы, отслеживает размеры браузера и предоставляет общий Nmorph instance для компонентов.",
      },
      themeEngine: {
        title: "Theme engine",
        text: "Цвета темы записываются в CSS-переменные документа, переключаются через атрибут nmorph-data-theme и могут генерировать shade tokens из main color, если они не переданы вручную.",
      },
      nuxtModule: {
        title: "Nuxt module",
        text: "Nuxt entry transpile-ит пакет, регистрирует universal plugin для SSR и client rendering, при необходимости добавляет полный stylesheet и мержит Nmorph messages в существующую Nuxt i18n настройку.",
      },
      styles: {
        title: "Стили и размеры",
        text: "Компоненты используют общую шкалу высот, типографику, radius tokens, shadow utilities и color variables, поэтому контролы можно смешивать без ручной подгонки.",
      },
      overlays: {
        title: "Overlay layer",
        text: "Dropdown, overlay, dialog, select, autocomplete, date picker и image preview используют общий layering model с Teleport, z-index allocation, outside click handling и placement helpers.",
      },
      forms: {
        title: "Form model",
        text: "Компоненты форм интегрируются с NmorphForm и validation hooks, поддерживают text, numeric, boolean и array fields, но при этом остаются удобными для прямого v-model.",
      },
      virtualization: {
        title: "Виртуализация",
        text: "Сценарии с большим количеством rows и options закрываются через virtual list mechanics для table, select и autocomplete: item height, overscan и scroll positioning контролируются явно.",
      },
      accessibility: {
        title: "Accessibility baseline",
        text: "Инпуты по возможности сохраняют native form elements, предоставляют фокусируемые controls, корректно передают disabled и loading states, а icon-only actions остаются semantic buttons.",
      },
    },
    "design-title": "Дизайн-подход",
    "design-content":
      "Nmorph использует неуморфический и скевоморфический визуальный язык: мягкие тени, inset-состояния, спокойные поверхности и акцентные цвета, чтобы элементы ощущались тактильными и при этом оставались понятными.",
    "status-title": "Статус проекта",
    "status-content":
      "Библиотека активно развивается и тестируется. Визуальные проблемы, ошибки интеграции и пробелы в API компонентов отслеживаются через issue board проекта.",
    "links-title": "Ссылки проекта",
    links: {
      guide: "Гайд",
      components: "Компоненты",
      changelog: "Changelog",
      repository: "Репозиторий",
      issues: "Issues",
    },
  },
  "changelog-page": {
    changelog: {
      title: "Changelog",
      items: {
        "context-menu-neutral-hover":
          "NmorphContextMenu теперь строит дефолтный hover background пункта от базового text color вместо accent color, а пункты с кастомным цветом продолжают использовать свой цвет.",
        "context-menu-options-api":
          "NmorphContextMenu теперь принимает options текстом, объектами и компонентами со встроенной раскладкой пунктов, hover states, disabled handling и select events.",
        "context-menu-scroll-position":
          "Click trigger у NmorphContextMenu теперь остается привязанным к trigger при скролле, меню от pointer закрывается на scroll, а автоматическая ширина держит пункты прижатыми влево.",
        "sandbox-nuxt-migration":
          "Старый nuxt-sandbox workspace удален, а основной sandbox теперь работает на Nuxt и использует для context menu тот же public API, что и документация.",
        "context-menu-trigger-modes":
          "NmorphContextMenu теперь поддерживает trigger modes contextmenu, click и both, корректно работает без v-model и документирует новый trigger API.",
        "badge-min-width":
          "NmorphBadge теперь держит более широкую минимальную ширину content, чтобы односимвольные badges оставались читаемыми в компактных layout.",
        "nuxt-hydration-warning-cleanup":
          "Nuxt docs integration теперь убирает hydration mismatches у theme switch, duplicate vue-i18n registration warnings и шумные dev hook timing logs.",
        "docs-route-lazy-overviews":
          "Component overviews в документации теперь lazy-load по route, включая sources примеров и icon data, поэтому initial docs bundle стал меньше.",
        "library-entrypoints-tree-shaking":
          "Library package теперь экспортирует отдельные entrypoints для icons и styles, оставляет CSS в side effects и не заставляет потребителей тянуть лишние иконки или стили.",
        "context-menu-component":
          "Добавлен NmorphContextMenu на базе NmorphDropdown: позиция по указателю, keyboard context menu, закрытие по Escape/outside-click, API docs и примеры в sandbox.",
        "overlay-focus-management":
          "Dialog, dropdown, select и autocomplete на базе overlay теперь используют общий Escape handling, ARIA roles, outside-click behavior и focus trap support там, где нужно.",
        "virtualization-keyboard-dynamic-height":
          "Виртуализация NmorphTable, NmorphSelect и NmorphAutocomplete получила усиленную keyboard navigation, dynamic item heights и сохранение scroll position.",
        "date-format-flexibility":
          "NmorphDatePicker и calendar utils теперь поддерживают nullable models и кастомное форматирование дат через Intl options, token patterns или formatter function.",
        "button-custom-color-hover":
          "NmorphButton теперь сохраняет custom color prop, по умолчанию использует обычный text color и строит hover color для transparent от переданного цвета вместо accent.",
        "css-shadow-token-cleanup":
          "Общие shadow tokens централизуют inset/outset styles и уменьшают дублирование CSS в компонентах и документации.",
        "image-preview-fullscreen-controls":
          "NmorphImagePreview теперь держит preview-картинку видимой в fullscreen mode, оставляет gallery и zoom controls поверх overlay и закрывается по backdrop или Escape.",
        "docs-example-source-files":
          "Примеры attributes в документации теперь используют общие source `.example.vue` файлы, поэтому preview и highlighted code остаются синхронизированными без копирования template и styles.",
        "docs-code-copy-fix":
          "Code blocks в документации теперь сохраняют правильный верхний отступ и копируют полный source примера через Clipboard API с fallback.",
        "callout-docs-bottom-spacing":
          "NmorphCallout no longer ships bottom margin in the library; docs apply their own callout spacing where notices need separation.",
        "callout-default-bottom-spacing":
          "У NmorphCallout теперь есть default bottom spacing, поэтому stacked callouts и следующий контент больше не прилегают друг к другу.",
        "storybook-sass-modern-api":
          "Storybook и library dev configs теперь используют Dart Sass modern API вместо deprecated legacy JS API.",
        "workspace-dev-script-fixes":
          "Docs and Storybook dev scripts now use local host/path helpers, include asset/raw import typings, and avoid pulling Storybook into the default dev run.",
        "ci-pnpm-publish":
          "CI build и publish jobs теперь устанавливают workspace через pnpm и публикуют библиотеку из подготовленного package.",
        "nuxt-theme-first-paint":
          "Nuxt integration теперь применяет сохраненную тему до первого paint, добавляет SSR theme/common styles и убирает мигание light/dark темы при reload.",
        "backtop-teleport-safe-area":
          "NmorphBacktop теперь телепортируется в body, поддерживает props для z-index и teleport target, учитывает mobile safe-area bottom и не обрезается внутри scroll containers.",
        "ios-input-scrollbar-fixes":
          "Common styles теперь предотвращают iOS input auto-zoom и синхронизируют native scrollbar color scheme/thumb colors с активной темой Nmorph.",
        "pnpm-turbo-docs-refresh":
          "Репозиторий переведен на pnpm workspaces с Turbo scripts, Sass использует modern API, а docs получили обновленные Guide/About, mobile navigation, layout, search и code highlighting fixes.",
        "virtualized-table-select-autocomplete":
          "NmorphTable, NmorphSelect и NmorphAutocomplete теперь поддерживают виртуализацию больших наборов данных с настройкой item height и overscan.",
        "overlay-dropdown-teleport-placement":
          "NmorphOverlay и NmorphDropdown теперь рендерятся через Teleport в body, пересчитывают позицию после открытия и поддерживают end-выравнивание вроде bottom-end.",
        "nuxt-ssr-theme-runtime":
          "Nuxt integration и theme/browser hooks обновлены так, чтобы SSR-разметка сохранялась, а browser-only работа откладывалась до клиента.",
        "compact-control-visual-fixes":
          "Исправлены размеры compact radio, checkbox, pagination, icon и color-picker, чтобы disabled и extra-thin controls оставались выровненными и читаемыми.",
        "pagination-basic-height":
          "NmorphPagination теперь по умолчанию использует высоту basic, поэтому элементы страниц выровнены с кнопками пагинации.",
        "checkbox-radio-button-controls":
          "NmorphCheckbox и NmorphRadio теперь по умолчанию используют button design, поддерживают высоту extra-thin и синхронизируют общий model между группами.",
        "avatar-image-preview-cleanup":
          "NmorphAvatar больше не рендерит скрытый preview trigger, а NmorphImagePreview убирает shadow у preview frame.",
        "nuxt-i18n-merge":
          "Nuxt module теперь автоматически мержит переводы Nmorph в существующий i18n instance.",
        "avatar-preview-resolve":
          "NmorphAvatar теперь сам подключает NmorphImagePreview, поэтому preview аватара работает при direct component imports.",
        "backtop-contrast-icon":
          "NmorphBacktop теперь использует contrast text color для стрелки в common design.",
        "component-css-splitting":
          "Component chunks теперь импортируют собственный CSS, поэтому direct component imports больше не требуют подключать полный stylesheet библиотеки.",
        "plugin-entry-styles-option":
          'Добавлен entry nmorph-ui-kit/plugin для настройки plugin без импорта компонентов; в Nuxt полный stylesheet можно включить через `nmorph.styles: "all"`.',
        "remove-styled-components":
          "Styled-components удалены из Nmorph UI компонентов; runtime-generated styled-классы заменены на стабильную Vue-разметку и SCSS.",
        "avatar-text-input-visual-fixes":
          "Радиус изображения NmorphAvatar выровнен с рамкой, а raw SVG prepend-иконки в NmorphTextInput теперь отображаются корректно.",
        "nuxt-module":
          "Добавлена поддержка Nuxt module через `nmorph-ui-kit/nuxt` с автоматической регистрацией plugin.",
        "image-preview-portal":
          "NmorphImagePreview теперь рендерит overlay через body, поэтому родительские isolation и stacking context не ломают preview.",
        "text-input-prepend-icon":
          "NmorphTextInput теперь корректно задает размер и цвет raw SVG prepend-иконкам.",
        "docs-actions-align":
          "Выровнены action-кнопки в примерах документации и удален roadmap-пункт про test coverage.",
        "height-basic-name":
          "Общее значение высоты компонентов переименовано с `default` на `basic`; defaults компонентов и документация обновлены на thick, basic и thin.",
        "checkbox-radio-defaults":
          "NmorphCheckbox, NmorphCheckboxGroup, NmorphRadio и NmorphRadioGroup теперь по умолчанию используют высоту thin; radio-контролы теперь по умолчанию отображаются круглыми radio.",
        "overlay-z-index-stack":
          "Добавлен общий автоматический стек z-index для оверлеев, dropdown, select, dialog, date picker, autocomplete и image preview.",
        "overlay-z-index-props":
          "Компоненты Nmorph на базе overlay теперь поддерживают `zIndex`, а install options библиотеки позволяют задать базовый z-index общего стека.",
        "text-input-clear-space":
          "NmorphTextInput теперь резервирует место под кнопку очистки/пароля, поэтому placeholder не перекрывается в узких инпутах.",
        "checkbox-height":
          "NmorphCheckbox и NmorphCheckboxGroup теперь поддерживают `height` с размерами thin, basic и thick.",
        "radio-height":
          "NmorphRadio и NmorphRadioGroup теперь поддерживают `height` с размерами thin, basic и thick.",
        "avatar-preview":
          "NmorphAvatar теперь поддерживает preview изображения по клику, включая галерею из нескольких изображений через `src` или `previewSrc`.",
        "callout-spacing":
          "NmorphCallout больше не добавляет нижний margin по умолчанию.",
        "media-control-icons":
          "Добавлены иконки управления медиа: play, pause, stop, record и квадратная альтернатива exit.",
        "select-fill-options-width":
          "NmorphSelect теперь поддерживает `fill` и `optionsWidth`: компонент может растягиваться на ширину контейнера, обрезать длинные option label или расширять dropdown-опции под контент.",
        "select-loading-disabled":
          "NmorphSelect теперь блокирует нативный input во время loading и закрывает dropdown при старте загрузки.",
        "dropdown-size-css-values":
          "Props ширины NmorphDropdown теперь принимают CSS-строки и поддерживают min-width и max-width.",
        "form-control-transition-cleanup":
          "NmorphColorPicker и NmorphSwitch больше не анимируют background и shadow, поэтому обновления темы применяются мгновенно.",
        "callout-status-types":
          "NmorphCallout теперь может рендериться без title и поддерживает статусы success и error с отдельными цветами.",
        "theme-runtime-api":
          "Добавлены runtime API темы: `setThemeColors` и `applyTheme` обновляют управляемый style tag Nmorph без записи inline styles в html.",
        "theme-options-typing":
          "Уточнены типы темы: install options и цвета отдельной темы типизированы раздельно, а отсутствие theme config обрабатывается безопасно.",
        "callout-component":
          "Добавлен NmorphCallout в библиотеку, документацию, overview компонентов и sandbox.",
        "select-button-fill":
          "NmorphSelectButton теперь поддерживает prop `fill` и может растягивать элементы на всю ширину контейнера.",
        "badge-size":
          "NmorphBadge теперь поддерживает prop `size` с вариантами tiny, extra-small и base.",
        "guide-css-variables-utilities":
          "Обновлен справочник CSS-переменных в Guide, а utility classes упрощены до имен классов и назначения.",
        "docs-mobile-menu-fit-content":
          "Боковое меню документации теперь подстраивает ширину под контент, а выравнивание мобильного header уточнено.",
        "avatar-name-initials":
          "NmorphAvatar теперь поддерживает prop `name` и рендерит сгенерированные инициалы, когда изображение недоступно. Документация Avatar обновлена API и примерами.",
        "notification-provider-placement-per-notification":
          "NmorphNotificationProvider теперь поддерживает `placement` на каждом уведомлении, поэтому один provider может рендерить уведомления в разных позициях экрана.",
        "notification-provider-quantity-leave-style":
          "Исправлено удаление уведомлений при превышении `quantity`: уходящие alerts сохраняют размеры иконок, цвета и верстку во время transition.",
        "button-transparent-hover-icons":
          "Transparent NmorphButton при hover теперь выделяет accent-цветом не только текст, но и иконки.",
        "badge-z-index":
          "NmorphBadge теперь поддерживает prop `zIndex` для управления порядком наложения бейджа.",
        "color-picker-display-format":
          "NmorphColorPicker умеет отображать выбранный цвет в hex, RGB или HSL через prop `displayFormat`.",
        "file-upload-model-custom-data":
          "NmorphFileUpload теперь сохраняет данные preview-файлов в `v-model`, учитывает disabled при выборе и удалении файлов и использует icon-only слот для кнопки удаления.",
        "slider-pointer-events":
          "NmorphSlider теперь использует pointer events, лучше работает с touch-перетаскиванием и очищает document listeners при unmount.",
        "scroll-thumb-theme-color":
          "Цвет ползунка NmorphScroll теперь по умолчанию использует цвет текста и настраивается через `scrollThumb` / `--nmorph-scroll-thumb-color`.",
        "color-picker-fixed-value-width":
          "NmorphColorPicker теперь отображает hex-значения с фиксированной шириной, чтобы значения одинаковой длины не меняли ширину компонента.",
        "scroll-default-height-100":
          'NmorphScroll теперь по умолчанию использует `height="100%"`, а API-документация и описания в docs синхронизированы с этим поведением.',
        "scroll-typing-fixes":
          "Исправлены TypeScript-типы в NmorphScroll: доступ к размерам и scroll-координатам контейнера больше не приводит к ошибкам `undefined`, а expose-тип для `moveTo` и `scrollDOMContainer` приведён в порядок.",
        "notification-provider-close-animation":
          "NmorphNotificationProvider теперь сохраняет стили alert во время анимации закрытия, оставляет уведомления в вертикальном стеке и убирает дерганый reflow при удалении.",
        "notification-provider-uuid-ids":
          "useNmorphNotification теперь генерирует UUID для id уведомлений, чтобы избежать коллизий при быстром создании нескольких уведомлений подряд.",
        "button-icon-slots-breaking":
          "Ломающее изменение: слот API у NmorphButton разделён. `icon` теперь рендерит ведущую иконку рядом с контентом, а для кнопок только с иконкой нужно использовать новый слот `icon-only`.",
        "otp-input-component":
          "Добавлен NmorphOTPInput с документацией и примерами в sandbox. Компонент использует стили NmorphTextInput и поддерживает paste, навигацию с клавиатуры и событие complete.",
        "form-autocomplete-forwarding":
          "NmorphFormItem теперь прокидывает autocomplete во вложенные form-контролы, а API-документация затронутых компонентов обновлена.",
        "text-input-composition-api":
          "NmorphTextInput теперь exposes-ит методы focus, blur и select, а также принимает дополнительные нативные input-атрибуты для составных контролов вроде OTP input.",
        "avatar-fallback-prop":
          "NmorphAvatar теперь принимает prop fallback с дефолтным NmorphIconAvatar, и avatar API-документация обновлена.",
        "button-fill-transparent-color":
          "NmorphButton с fill теперь стабильно растягивается на всю ширину контейнера, а transparent-кнопки поддерживают кастомный цвет текста и иконок через prop color.",
        "badge-value-slot":
          "NmorphBadge теперь принимает `undefined` в `value`, скрывается при отсутствии значения и поддерживает кастомный слот `value` для содержимого бейджа. Для этого добавлены примеры в docs и sandbox.",
        "scroll-height-100":
          'NmorphScroll теперь корректно работает с `height="100%"`, если у родителя задана явная высота, а в документации появились примеры и для фиксированной, и для относительной высоты.',
        "theme-config-contrast-types":
          "Типы и документация theme config синхронизированы с runtime-поведением: `focusText` теперь типизирован корректно, а `placeholderText`, `semiContrastText` и `contrastText` добавлены в пример темы.",
        "select-button-no-theme-transition":
          "NmorphSelectButtonItem больше не анимирует background и box-shadow, поэтому переключение темы теперь происходит мгновенно и визуально совпадает с остальной библиотекой.",
        "radio-optional-inject-types":
          "Исправлены inject-типы в NmorphRadio: standalone-использование больше не вызывает TypeScript-ошибки при отсутствии group-injection.",
        "color-picker":
          "Добавлен компонент NmorphColorPicker, страница документации для него и примеры высоты, отображения значения, disabled-состояния и дефолтного accent-цвета темы.",
        "badge-tag-mode":
          "Добавлен режим `is-tag` для NmorphBadge: теперь бейдж может рендериться как standalone-элемент без overlay-позиционирования и без default slot.",
        "badge-undefined-hidden":
          "NmorphBadge теперь не рендерится, если `value` равен `undefined`; режим точки (`is-dot`) по-прежнему работает без значения.",
        "exit-users-icons":
          "В набор иконок и на страницу документации иконок добавлены NmorphIconExit и NmorphIconUsers.",
        "form-boolean-compare":
          "Правила валидации формы теперь принимают boolean в `compareValue`; API-документация формы обновлена под это поведение.",
        "image-src-optional":
          "В публичных типах `NmorphImage` prop `src` стал опциональным, и документация image API приведена в соответствие с runtime-поведением.",
        "select-button-keyboard-focus":
          "NmorphSelectButtonItem теперь доступен с клавиатуры: Tab фокусирует каждый элемент, Space/Enter выбирают его, при фокусе отображается outline.",
        "tabindex-prop":
          "Добавлен prop tabindex в INmorphCommonInputProps — все элементы формы (NmorphTextInput, NmorphSwitch, NmorphSlider, NmorphNumberInput, NmorphSelect, NmorphSelectButtonItem) теперь поддерживают tabindex.",
        "form-item-input-inheritance":
          "Элементы формы теперь автоматически наследуют id и name из NmorphFormItem, поэтому label и нативные атрибуты формы связаны без ручного прокидывания prop.",
        "text-input-autofill-styles":
          "Исправлены стили autofill в NmorphTextInput: браузерный autofill больше не перебивает неоморфные тени и цвета поля.",
        "google-icon": "Добавлена иконка NmorphIconGoogle в набор иконок.",
        "contrast-text-colors":
          "Добавлены CSS-переменные --nmorph-semi-contrast-text-color и --nmorph-contrast-text-color в дефолтные светлую и тёмную темы.",
        "form-item-label-for":
          "NmorphFormItem: тег label теперь имеет правильный атрибут for, связанный с инпутом через prop inputId у NmorphTextInput.",
        "error-box-single-error":
          "NmorphErrorBox теперь показывает только одну актуальную ошибку вместо всех сразу.",
        "validation-icon-fix":
          "Исправлен NmorphValidationIcon: иконки передавались строками вместо компонентов и не отображались.",
        "select-button-unselected-opacity":
          "NmorphSelectButton: не выбранные элементы теперь полупрозрачные для лучшей визуальной обратной связи.",
        "select-button":
          "Добавлен новый компонент NmorphSelectButton — группа кнопок-переключателей с поддержкой слотов и prop options.",
        "engines-range":
          "Смягчены требования engines пакета для поддержки актуальных версий Node и npm.",
        "skeleton-animation":
          "Исправлена анимация загрузки Skeleton: shimmer работает при включенном loading.",
        "export-en-locale":
          "Добавлен экспорт английской локали из точки входа пакета.",
      },
    },
    "known-bugs": {
      title: "Известные баги",
      items: {},
    },
  },
  "guide-menu": {
    "quick-start": "Бытрый старт",
    config: "Конфигурация",
    other: "Прочее",
  },
  overview: {
    "basic-usage": "Основное использование",
    basic: "Основное",
    off: "Выкл",
    on: "Вкл",
    one: "Один",
    two: "Два",
    three: "Три",
    four: "Четыре",
    disabled: "Отключено",
    "disabled-thin": "Отключено",
    thick: "Толстый",
    default: "По умолчанию",
    thin: "Тонкий",
    "i-am-ripple": "Я с рябью",
    "i-am-ripple-with-hover-bg": "Я с рябью и с фоном при наведении",
    "i-am-not-ripple": "Я не с рябью",
    circle: "Круг",
    round: "Круглый",
    square: "Квадрат",
    transparent: "Прозрачный",
    date: "Дата",
    dates: "Даты",
    "date-range": "Диапазон дат",
    summer: "Лето",
    "load-error": "Ошибка загрузки",
    "custom-loading-text": "Пользовательский текст загрузки",
    "download-in-progress": "Загрузка в процессе",
    show: "Показать",
    edit: "Редактировать",
    check: "Проверить",
    "without-underline": "Без подчеркивания",
    underlined: "Подчеркнутый",
    "selected-page": "Выбранная страница:",
    loading: "Загрузка...",
    "i-am-slot-prefix": "Я префикс слота",
    add: "Добавить",
    remove: "Удалить",
    animated: "Анимированный",
    "loading-state": "Состояние загрузки",
    value: "значение:",
    "sort-values": "Сортировать значения",
    "custom-label": "Пользовательская метка",
    "custom-content-for": "пользовательский контент для",
    "tag-zero": "тег ноль",
    "tag-one": "тег один",
    "tag-two": "тег два",
    "i-am-disabled": "Я отключен",
    "enter-text": "Введите текст",
    "model-text": "Текст модели:",
    "explore-components": "Обзор компонентов",
    button: {
      "style-type": {
        subtitle:
          "Используйте *default* или *transparent* для определения базового стиля.",
      },
      loading: {
        subtitle:
          "Используйте *boolean*, чтобы включить или отключить значок загрузки.",
      },
      ripple: {
        subtitle:
          "Используйте *boolean*, чтобы включить или отключить эффект ряби при нажатии.",
      },
      height: {
        subtitle:
          "Установите высоту, доступны значения *thick*, *basic*, *thin*.",
      },
      disabled: {
        subtitle: "Используйте *boolean*, чтобы отключить кнопку.",
      },
      "icon-slots": {
        subtitle:
          "Слот `icon` теперь рендерит иконку слева от контента, а `icon-only` отвечает за отдельный режим кнопки только с иконкой.",
      },
      shape: {
        info: {
          title: "Информация",
          content:
            "При использовании round или square размер изменяется с помощью переменной --height.",
        },
        subtitle: "Используйте shape, чтобы изменить радиус границы кнопки.",
      },
      api: {
        type: "Нативный тип кнопки",
        text: "Текст кнопки",
        loading: "Включить/отключить загрузчик",
        "style-type": "Изменить стиль кнопки",
        color: "Изменить цвет текста и иконок для transparent-кнопки",
        "accent-bg-on-hover": "Включить/отключить цвет фона при наведении",
        ripple: "Включить/отключить рябь при нажатии",
        fill: "Заполнение контейнера кнопкой",
        disabled: "Отключить кнопку",
        height: "Изменить высоту кнопки",
        shape: "Изменить форму",
      },
      slot: {
        default: "Основное содержимое кнопки",
        append: "Пользовательское содержимое справа от основного контента",
        icon: "Иконка слева от основного контента",
        "icon-only":
          "Отдельный режим кнопки только с иконкой. Скрывает default, text и append контент",
      },
      variables: {
        height: "Высота кнопки",
      },
      exposes: {
        buttonDOMElement: "Оригинальный DOM элемент кнопки",
      },
    },
    icon: {
      "search-icon": "Найти иконку",
      size: {
        subtitle: "Размер иконки. Определяет одновременно высоту и ширину.",
      },
      "width-height": {
        subtitle: "Определите ширину и высоту иконки.",
      },
      color: {
        subtitle:
          "Цвет иконки. Вы можете использовать пользовательские цвета или передать доступную переменную.",
      },
      api: {
        size: "Размер иконки. Определяет высоту и ширину",
        width: "Устанавливает ширину иконки",
        height: "Устанавливает высоту иконки",
        color: "Определяет цвет иконки",
        icon: "Задает иконку из доступного списка иконок",
      },
      slot: {
        default: "Слот для настройки кастомного содержимого иконки",
      },
      variables: {
        color: "Определяет цвет иконки",
      },
    },
    link: {
      type: {
        subtitle: "Тип цвета: *accent*, *success*, *error*, *warning*.",
      },
      underline: {
        subtitle: "Подчеркивание ссылки.",
      },
      disabled: {
        subtitle: "Неактивное состояние ссылки.",
      },
      "icon-name": {
        subtitle: "Добавляет иконку перед текстом ссылки по имени иконки.",
      },
      api: {
        type: "Тип цвета",
        href: "Нативный атрибут href",
        underline: "Показывать подчеркивание при наведении",
        "icon-name": "Имя из списка иконок",
        target: "Нативный атрибут target",
        disabled: "Отключить ссылку",
      },
      slot: {
        default: "Кастомное содержимое ссылки",
        prepend: "Добавить пользовательское содержимое в начало",
        icon: "Место для иконки",
      },
      variables: {
        "link-color": "Цвет ссылки",
      },
    },
    scroll: {
      height: {
        subtitle:
          "По умолчанию используется `100%`. Используйте свойство *height*, чтобы задать высоту контейнера. Поддерживаются фиксированные значения вроде `300px` и `100%`, если у родителя есть явная высота.",
      },
      "max-height": {
        subtitle:
          "Прокрутка отображается только в случае, если высота элемента превышает максимальную высоту.",
      },
      "model-value": {
        subtitle: "Свойство для двухстороннего связывания модели.",
      },
      "horizontal-scroll": {
        subtitle:
          "Если ширина элемента превышает ширину области прокрутки, появляется горизонтальная полоса прокрутки.",
      },
      api: {
        height: "Задает высоту контейнера прокрутки",
        "max-height": "Устанавливает максимальную высоту контейнера прокрутки",
        "model-value":
          "Содержит текущую позицию прокрутки, используется для двусторонней привязки и управления прокруткой",
        "scroll-y-prop":
          "Определяет вертикальное поведение прокрутки, например *auto* или *hidden*",
        "scroll-x-prop":
          "Определяет горизонтальное поведение прокрутки, например *auto* или *hidden*",
        "css-scroll-behavior":
          "Определяет поведение анимации прокрутки, например *smooth* для плавной прокрутки",
        "scroll-end-delay": "Задержка до окончания прокрутки в миллисекундах",
        "update-only-on-scroll-end":
          "При установке в *true* обновляет значение модели только после завершения прокрутки",
        "y-bar-width-in-px": "Ширина вертикальной полосы прокрутки",
        "x-bar-width-in-px": "Ширина горизонтальной полосы прокрутки",
        "y-gap-in-px": "Отступ содержимого для вертикальной полосы прокрутки",
        "x-gap-in-px": "Отступ содержимого для горизонтальной полосы прокрутки",
      },
      slot: {
        default: "Содержимое прокрутки",
      },
      variables: {
        "thumb-color":
          "Цвет ползунка. По умолчанию --nmorph-scroll-thumb-color",
      },
      exposes: {
        scrollDOMContainer: "DOM элемент контейнера",
        moveTo: "Функция для передачи новых координат",
      },
      events: {
        "update:model-value": "Событие для перехвата двусторонней привязки",
        "on-scroll-end":
          "Событие, возникающее после окончания анимации прокрутки",
        "on-scroll": "Событие прокрутки",
      },
    },
    avatar: {
      size: {
        subtitle: "Задает размер аватара, принимает значение типа *number*.",
      },
      shape: {
        subtitle: "Определяет форму аватара. Может быть *circle* или *square*.",
      },
      fit: {
        subtitle: "Определяет, как изображение отображается в контейнере.",
      },
      name: {
        subtitle:
          "Используется для генерации инициалов фолбэка, когда изображение недоступно.",
      },
      preview: {
        subtitle:
          "Открывает preview изображения по клику на аватар. `src` и `previewSrc` могут принимать строку или массив строк.",
      },
      api: {
        size: "Задает размер аватара",
        shape: "Определяет форму аватара",
        src: "URL изображения аватара или URL галереи preview",
        name: "Имя для генерации инициалов фолбэка",
        preview: "Включает preview изображения по клику",
        "preview-src": "URL изображения или список URL только для preview",
        "preview-initial-index":
          "Начальный индекс изображения в preview-галерее",
        "preview-scale-step": "Шаг масштабирования в preview",
        "preview-min-scale-level": "Минимальный уровень масштаба preview",
        "preview-max-scale-level": "Максимальный уровень масштаба preview",
        "src-set": "Список источников изображения",
        alt: "Текстовое описание изображения",
        fit: "Определяет как изображение заполняет контейнер",
        "frame-border": "Определяет толшину рамки",
        "image-padding": "Внутренний отступ",
        fallback:
          "Компонент, который показывается, если изображение не загрузилось или src не передан. По умолчанию используется NmorphIconAvatar",
      },
      slot: {
        error: "Слот для отображения ошибки загрузки",
      },
      events: {
        error: "Событие ошибки загрузки изображения",
        load: "Событие успешной загрузки изображения",
      },
    },
    badge: {
      value: {
        subtitle:
          "Отображаемое значение на бейдже, может быть *string* или *number*. Если не передано и `is-dot` выключен, бейдж не рендерится.",
      },
      "value-slot": {
        subtitle:
          "Позволяет полностью заменить содержимое внутри бейджа через slot `value`. В slot props доступны `value` и `displayValue`. Работает в стандартном overlay-режиме.",
      },
      max: {
        subtitle:
          "Максимальное значение для бейджа. Если оно было задано как число и превышено, отображается как max+.",
      },
      "is-dot": {
        subtitle:
          "Отображает бейдж в виде маленькой точки, если установлено в *true*. Работает даже без `value`.",
      },
      "is-tag": {
        subtitle:
          "Отображает бейдж как обычный standalone-элемент без default slot. В этом режиме offset-ы игнорируются.",
      },
      hidden: {
        subtitle: "Управляет отображением бейджа.",
      },
      color: {
        subtitle: "Цвет фона бейджа.",
      },
      size: {
        subtitle:
          "Управляет размером текста бейджа через font-size переменные.",
      },
      offset: {
        subtitle:
          "Горизонтальное/вертикальное смещение бейджа относительно родительского элемента.",
      },
      api: {
        value:
          "Отображаемое значение в бейдже. Если `undefined` и `is-dot` выключен, бейдж скрывается",
        max: "Максимальное допустимое отображаемое значение",
        "is-dot": "Отображает бейдж в виде точки",
        "is-tag":
          "Переключает бейдж в standalone tag-режим без absolute-позиционирования и без default slot",
        hidden: "Скрывает бейдж",
        color: "Устанавливает цвет фона бейджа",
        size: "Устанавливает размер текста бейджа: tiny, extra-small или base",
        "z-index": "Определяет порядок наложения бейджа",
        "offset-y": "Вертикальное смещение бейджа. Игнорируется при is-tag",
        "offset-x": "Горизонтальное смещение бейджа. Игнорируется при is-tag",
      },
      slot: {
        default:
          "Контент, поверх которого отображается бейдж. Не используется при `is-tag`.",
        value:
          "Кастомное содержимое внутри бейджа вместо текстового `value`. Работает только в overlay-режиме.",
      },
      variables: {
        "dot-size": "Ширина и высота точки",
      },
    },
    card: {
      "shadow-type": {
        subtitle: "Определяет тип тени для карточки.",
      },
      api: {
        "shadow-type": "Определяет видимость тени карточки.",
      },
      slot: {
        header: "Заголовок карточки",
        footer: "Нижний колонтитул карточки",
      },
      variables: {
        "card-padding": "Отступ для всех краев",
      },
    },
    image: {
      fit: {
        subtitle:
          "Определяет, как изображение вписывается в контейнер. Принимает значения, такие как *fill*, *contain*, *cover*, *none*, *scale-down*.",
        info: {
          title: "Информация",
          content:
            "Чтобы свойство fit отображалось корректно, убедитесь, что у контейнера задан фиксированный размер.",
        },
      },
      "loading-text": {
        subtitle: "Текст, отображаемый во время загрузки изображения.",
      },
      "load-failed-text": {
        subtitle: "Текст, отображаемый при неудачной загрузке изображения.",
      },
      api: {
        fit: "Определяет, как изображение должно вписываться в контейнер.",
        "close-on-outside-click":
          "Закрывает предпросмотр при нажатии вне контейнера.",
        alt: "Текстовое описание для изображения.",
        "loading-text": "Текст, отображаемый во время загрузки изображения.",
        "load-failed-text":
          "Текст, отображаемый при неудачной загрузке изображения.",
        "frame-border": "Определяет толщину рамки",
        "image-padding": "Определяет отступ изображения",
        src: "URL изображения.",
        "src-set": "Список источников изображения.",
      },
      slot: {
        loading:
          "Слот для пользовательского содержимого, отображаемого во время загрузки изображения",
        error:
          "Слот для пользовательского содержимого, отображаемого при неудачной загрузке изображения",
      },
      variables: {
        width: "Определяет ширину изображения",
        height: "Определяет высоту изображения",
        "background-color": "Определяет цвет фона изображения",
      },
      events: {
        error: "Событие ошибки изображения",
        load: "Событие загрузки изображения",
      },
      translates: {
        loadingText: "Загрузка ...",
        loadFailedText: "Не удалось загрузить изображение",
      },
    },
    "tag-list": {
      api: {
        "model-value": "Список тэгов",
      },
      events: {
        "update:model-value": "Событие для перехвата двусторонней привязки",
        close: "Возвращает значение закрываемого тега",
      },
    },
    "tag-item": {
      text: {
        subtitle: "Определяет текстовое содержимое, отображаемое в компоненте.",
      },
      removable: {
        subtitle:
          "Определяет, может ли компонент быть удален пользователем. Принимает *boolean*.",
        info: {
          title: "Информация",
          content:
            "Если вы хотите, чтобы отображение тега обрабатывалось автоматически, можно обернуть компонент в NmorphTagList.",
        },
      },
      height: {
        subtitle: "Определяет высоту компонента.",
      },
      design: {
        subtitle:
          "Если установлено в *common*, компонент будет отображен с границей.",
      },
      api: {
        value: "Определяет значение-идентификатор для компонента",
        text: "Устанавливает текст, отображаемый внутри компонента",
        removable:
          "Определяет, может ли компонент быть удален. Работает автоматически при оборачивании в NmorphTagList",
        design: "Определяет стиль компонента",
        height: "Задает высоту компонента",
      },
      events: {
        close: "Возвращает значение закрытого тега",
      },
    },
    skeleton: {
      animated: {
        subtitle:
          "Включает анимацию для компонента скелетона, если установлено в *true*.",
      },
      loading: {
        subtitle: "Управляет отображением скелетона.",
      },
      rows: {
        subtitle:
          "Определяет количество строк в скелетоне, обычно для симуляции текстового содержимого.",
      },
      api: {
        animated: "Включает анимацию для компонента скелетона",
        loading: "Определяет, отображается ли скелетон.",
        rows: "Задает количество строк в скелетоне.",
      },
      slot: {
        template: "Слот для пользовательской структуры скелетона при загрузке.",
        default: "Содержимое слота по умолчанию, когда загрузка завершена.",
      },
      variables: {
        "loading-gradient":
          "Определяет цвет градиента, используемый во время анимации загрузки скелетона.",
      },
    },
    "skeleton-item": {
      api: {
        variant:
          "Определяет тип скелетона для отображения, например, текст или круг.",
        design: "Определяет дизайн элемента скелетона.",
        width: "Задает ширину элемента скелетона.",
        height: "Задает высоту элемента скелетона.",
      },
    },
    progress: {
      type: {
        subtitle:
          "Определяет тип индикатора прогресса, например, *linear* или *circle*.",
      },
      color: {
        subtitle: "Устанавливает цвет индикатора прогресса.",
      },
      percentage: {
        subtitle: "Определяет процент завершенного прогресса.",
        info: {
          title: "Информация",
          content:
            "Убедитесь, что задана ширина контейнера-обертки для корректного отображения.",
        },
      },
      "value-inside": {
        subtitle:
          "Отображает текст прогресса внутри полосы, если установлено в *true*.",
      },
      "value-right-side": {
        subtitle:
          "Показывает или скрывает текст с процентом рядом с индикатором прогресса.",
      },
      indeterminate: {
        subtitle:
          "Отображает анимацию неопределенного прогресса при значении *true*.",
      },
      "circle-size": {
        subtitle: "Определяет размер кругового индикатора прогресса.",
      },
      api: {
        type: "Указывает тип индикатора прогресса",
        color: "Задает цвет индикатора прогресса",
        percentage: "Устанавливает процентное значение прогресса",
        "value-inside": "Отображает текст прогресса внутри полосы",
        "value-right-side": "Показывает или скрывает текст с процентом справа",
        indeterminate: "Включает анимацию неопределенного прогресса",
        "circle-size": "Задает размер кругового индикатора прогресса",
      },
      slot: {
        "inner-text":
          "Слот для пользовательского контента внутри индикатора прогресса.",
        "right-side":
          "Слот для пользовательского контента справа от индикатора прогресса.",
        "circle-inner-part":
          "Слот для пользовательского контента внутри кругового индикатора.",
      },
      variables: {
        height: "Определяет ширину индикатора прогресса.",
        "width-transition": "Устанавливает анимацию прогресса.",
        animation: "Контролирует настройки анимации индикатора прогресса.",
      },
    },
    calendar: {
      type: {
        subtitle:
          "Определяет тип календаря, например, *date* или *dates* выбор.",
      },
      "custom-content": {
        subtitle: "",
      },
      range: {
        subtitle: "Устанавливает границы отображаемого календаря.",
      },
      api: {
        "mark-today": "Подсвечивает сегодняшнюю дату",
        "initial-date":
          "Устанавливает начальную дату, отображаемую в календаре",
        "model-value": "Представляет выбранную дату (даты) в календаре",
        type: "Определяет тип выбора в календаре",
        range:
          "Включает режим выбора диапазона в календаре, позволяя выбирать диапазон дат календаря. Не выбранный диапозон, а диапозон отображемого календаря",
      },
      slot: {
        header: "Слот заголовка календаря",
        content: "Слот содержимого календаря",
      },
      variables: {
        "table-data-cell-height":
          "Определяет высоту каждой ячейки даты в календаре",
      },
      translates: {
        sun: "воскресенье",
        mon: "понедельник",
        tue: "вторник",
        wed: "среда",
        thu: "четверг",
        fri: "пятница",
        sat: "суббота",
        jan: "январь",
        feb: "февраль",
        mar: "март",
        apr: "апрель",
        may: "май",
        jun: "июнь",
        jul: "июль",
        aug: "август",
        sep: "сентябрь",
        oct: "октябрь",
        nov: "ноябрь",
        dec: "декабрь",
      },
    },
    "image-preview": {
      "model-value": {
        subtitle: "Контролирует видимость предпросмотра изображения.",
      },
      "initial-index": {
        subtitle:
          "Определяет начальный индекс изображения, если присутствует несколько изображений.",
      },
      src: {
        subtitle: "URL-адрес изображения для предпросмотра.",
      },
      api: {
        "model-value":
          "Булево значение, которое переключает видимость предпросмотра изображения",
        alt: "Текст, описывающий изображение, когда оно не может быть загружено",
        "initial-index":
          "Индекс первого изображения, отображаемого в наборе изображений",
        src: "URL-адрес изображения для предпросмотра",
        "scale-step": "Шаг увеличения (масштабирования) изображения",
        "min-scale-level":
          "Определяет минимальный уровень масштабирования для изображения",
        "max-scale-level":
          "Определяет максимальный уровень масштабирования для изображения",
        "z-index":
          "Задает z-index оверлея. Если не передан, используется общий автоматический стек z-index",
        "show-trigger": "Определяет, рендерится ли стандартный trigger предпросмотра",
      },
      slot: {
        loading: "Слот, отображаемый во время загрузки изображения",
        error: "Слот, отображаемый если изображение не удалось загрузить",
      },
      variables: {
        width: "Определяет ширину предпросмотра изображения.",
        height: "Определяет высоту предпросмотра изображения.",
      },
      events: {
        "update:model-value": "Событие для перехвата двусторонней привязки",
      },
    },
    pagination: {
      "basic-usage": {
        subtitle: "",
      },
      api: {
        "total-elements-quantity": "Общее количество элементов для пагинации.",
        "model-value": "Текущий активный номер страницы.",
        "elements-quantity-on-page":
          "Количество элементов, отображаемых на каждой странице.",
        disabled: "Булево значение, отключающее компонент пагинации.",
        height: "Высота элементов управления пагинацией.",
        "hide-on-single-page":
          "Скрывает компонент пагинации, если есть только одна страница.",
        "max-visible-pages":
          "Определяет, сколько страниц отображается в элементе управления пагинацией.",
        "fast-forward-step":
          "Определяет, сколько страниц пропускается при быстрой перемотке вперед.",
      },
      slot: {},
      variables: {},
      events: {
        "update:model-value": "Событие для перехвата двухстороннего связывания",
      },
    },
    table: {
      "basic-usage": {
        subtitle: "",
        "enable-row-highlight": "Выделение строки при наведении",
        "disable-row-highlight": "Отключить выделение строки при наведении",
        "click-me-text": "Нажми на меня!",
        info: {
          title: "Важная информация",
          content:
            "Свойство 'bordered' работает только если свойство 'design' установлено в 'common'. Кроме того, сортировка в настоящее время работает только с двумя значениями: 'ascending' и 'descending'.\nОбратите внимание, что таблица находится в стадии активной разработки и может содержать ошибки.",
        },
      },
      api: {
        data: "Определяет данные, которые будут отображены в таблице",
        "row-hover":
          "Булево значение, которое включает или отключает эффект наведения на строки таблицы",
        bordered:
          "Булево значение, которое включает или отключает границы вокруг ячеек таблицы. Работает только если свойство 'design' установлено в 'common'",
        sort: "Определяет поведение сортировки для столбцов таблицы",
        design: "Стиль отображения таблицы",
        virtual: "Включает виртуальный рендеринг для больших наборов данных",
        "virtual-height": "Задает высоту области прокрутки виртуальной таблицы",
        "virtual-row-height": "Задает ожидаемую высоту одной виртуальной строки",
        "virtual-overscan":
          "Задает количество дополнительных строк до и после видимой области",
      },
      slot: {},
      variables: {
        "border-color": "Устанавливает цвет границы таблицы",
        "table-cell-height": "Определяет высоту ячеек таблицы",
      },
    },
    "table-column": {
      api: {
        prop: "Указывает имя свойства из источника данных, которое будет отображаться в этом столбце",
        label: "Заголовок для столбца, отображаемый в заголовке таблицы",
        width: "Определяет ширину столбца в значении CSS",
        alignment:
          "Устанавливает выравнивание текста в столбце. Принимает значения 'left', 'center' или 'right'",
      },
    },
    "table-cell": {
      api: {
        row: "Обязательное свойство. Передает индекс строки из области видимости, представляя текущую строку, которая рендерится.",
      },
      slot: {
        default:
          "Слот по умолчанию используется для настройки содержимого внутри каждой ячейки столбца. Обеспечивает доступ к данным строки и другим соответствующим свойствам области видимости",
      },
    },
    tooltip: {
      text: {
        subtitle: "Содержимое, отображаемое внутри подсказки.",
        "hover-me": "Наведи на меня",
        "i-am-tooltip": "Я подсказка",
        tooltip: "Подсказка",
        button: "Кнопка",
      },
      position: {
        subtitle:
          "Определяет позицию подсказки относительно целевого элемента. Принимает значения, такие как 'top', 'bottom', 'left', 'right'.",
      },
      "force-coordinate": {
        subtitle:
          "Переопределяет стандартную логику позиционирования и позволяет указать точные координаты для подсказки.",
      },
      api: {
        text: "Определяет текстовое содержимое подсказки",
        position:
          "Устанавливает положение подсказки относительно целевого элемента",
        "force-show":
          "Булево значение, которое принудительно показывает подсказку",
        "force-coordinate":
          "Позволяет вручную управлять координатами подсказки",
      },
      slot: {},
      variables: {
        "max-width": "Устанавливает максимальную ширину содержимого подсказки",
        width:
          "Устанавливает ширину содержимого подсказки. Позволяет контролировать горизонтальный размер подсказки",
        height:
          "Устанавливает высоту содержимого подсказки. Позволяет контролировать вертикальный размер подсказки",
      },
      exposes: {
        tooltipBody: "Оригинальный DOM-элемент тела tooltip",
      },
    },
    alert: {
      "basic-usage": {
        title: "Любой заголовок",
        content: "Контент для оповещения",
        info: {
          title: "Дополнительная информация",
          content:
            "Для удобного управления несколькими оповещениями используйте компонент 'NmorphNotificationProvider', который позволяет группировать и централизованно управлять оповещениями.",
        },
      },
      "use-provider": {
        subtitle:
          "Для использования провайдера необходимо импортировать хук из библиотеки.",
      },
      api: {
        id: "Уникальный идентификатор для компонента оповещения",
        type: "Определяет тип оповещения (например, success, error, warning, info)",
        closable:
          "Булево значение, определяющее, можно ли закрыть оповещение пользователем",
        title: "Заголовок отображаемый в оповещении",
        content: "Контент оповещения",
        fill: "Определяет, должно ли оповещение занимать всю ширину своего контейнера",
        "max-width": "Максимальная ширина компонента оповещения",
        "show-icon":
          "Булево значение, которое отображает иконку на основе типа оповещения",
        bordered: "Добавляет границу вокруг оповещения для выделения",
        html: "Позволяет использовать HTML-контент в теле оповещения. Используйте с осторожностью, чтобы избежать XSS-уязвимостей",
        "close-icon-position":
          "Управляет выравниванием иконки закрытия внутри alert",
      },
      slot: {
        icon: "Слот для кастомизации иконки, отображаемой в оповещении",
        title: "Слот для кастомизации заголовка оповещения",
        default: "Слот для кастомизации основного содержимого оповещения",
      },
      variables: {},
      events: {
        close:
          "Событие срабатывающее когда оповещение закрывается пользователем",
      },
    },
    callout: {
      "basic-usage": {
        "no-title-content": "Полезный контент без заголовка.",
        "info-title": "Информация",
        "info-content": "Полезный контент для читателя.",
        "warning-title": "Внимание",
        "warning-content": "Важный контент для читателя.",
        "success-title": "Успех",
        "success-content": "Успешный контент для читателя.",
        "error-title": "Ошибка",
        "error-content": "Контент ошибки для читателя.",
      },
      api: {
        type: "Определяет тип callout",
        title: "Заголовок, отображаемый в callout",
        content: "Контент, отображаемый в callout",
      },
    },
    dialog: {
      "basic-usage": {
        subtitle: "",
        "show-modal": "Показать модальное окно",
      },
      api: {
        "model-value":
          "Булево значение, которое управляет видимостью диалогового окна",
        title: "Определяет текст заголовка диалога",
        width: "Задает ширину диалогового окна",
        "open-delay":
          "Задержка в миллисекундах перед открытием диалогового окна",
        "close-delay":
          "Задержка в миллисекундах перед закрытием диалогового окна",
        "close-on-click-modal":
          "Булево значение, позволяющее закрыть диалоговое окно при клике снаружи",
        "show-close":
          "Булево значение, которое отображает кнопку закрытия в диалоговом окне",
        "z-index":
          "Задает z-index оверлея диалога. Если не передан, используется общий автоматический стек z-index",
        "close-on-overlay":
          "Булево значение, указывающее, следует ли закрывать диалоговое окно при клике на область оверлея",
      },
      slot: {
        header: "Слот для кастомизации содержимого заголовка диалогового окна.",
        default: "Слот для определения основного содержимого диалогового окна.",
      },
      events: {
        "on-close":
          "Событие всплывает, когда диалоговое окно закрывается пользователем.",
        "update:model-value":
          "Событие всплывает при изменении видимости диалогового окна.",
      },
      variables: {
        width: "Определяет ширину компонента диалогового окна.",
      },
    },
    divider: {
      direction: {
        subtitle:
          "Определяет направление разделителя. Принимает значения 'horizontal' или 'vertical'.",
      },
      api: {
        direction:
          "Определяет ориентацию разделителя: 'horizontal' или 'vertical'.",
      },
      slot: {},
      variables: {},
    },
    overlay: {
      "basic-usage": {
        subtitle: "",
        "show-default": "Показать по умолчанию",
        "show-transparent": "Показать прозрачный",
      },
      api: {
        show: "Управляет видимостью компонента",
        transparent:
          "Булево значение, которое делает фон компонента прозрачным, если включено",
        "z-index":
          "Задает z-index оверлея. Если не передан, используется общий автоматический стек z-index",
        "teleport-to":
          "Задает цель, куда будет телепортирован контент оверлея",
        "disabled-teleport":
          "Отключает Teleport и рендерит оверлей на месте",
      },
      slot: {
        default:
          "Слот по умолчанию для кастомизации содержимого внутри компонента",
      },
      events: {
        "on-outside-click":
          "Событие возникающее когда пользователь кликает вне компонента",
      },
      variables: {},
    },
    "notification-provider": {
      notifications: {
        subtitle: "",
      },
      placement: {
        subtitle: "Определяет позицию уведомлений на экране.",
      },
      "z-index": {
        subtitle:
          "Задает z-index для уведомлений, чтобы контролировать их порядок наложения.",
      },
      quantity: {
        subtitle:
          "Ограничивает максимальное количество уведомлений, которые могут отображаться одновременно.",
      },
      api: {
        notifications:
          "Массив, содержащий уведомления. Каждое уведомление может переопределить placement",
        placement:
          "Позиция по умолчанию для уведомлений без собственного placement",
        "z-index": "Определяет порядок наложения уведомлений",
        quantity:
          "Максимальное количество уведомлений, которое может быть на экране одновременно",
      },
      slot: {},
      variables: {},
    },
    tabs: {
      api: {
        "model-value": "Управляет активным состоянием компонента",
        stretch:
          "Булево значение, которое определяет, должен ли компонент растягиваться, чтобы заполнить доступное пространство",
        panes: "Список tab pane, которые рендерит компонент tabs",
      },
      slot: {
        default: "Слот для кастомизации содержимого внутри каждой вкладки",
      },
      variables: {},
      events: {
        "update:model-value": "Событие при изменении активной вкладки",
        "tab-change": "Событие всплывающее когда вкладка изменилась",
      },
    },
    "tab-pane": {
      api: {
        label: "Лэйбл для вкладки, отображаемый в навигации по вкладкам",
        name: "Уникальный идентификатор для вкладки, используется для управления активной вкладкой",
        disabled:
          "Булево значение, указывающее, отключена ли вкладка и не может быть выбрана",
      },
      slot: {
        label: "Слот для кастомизации лэйбла вкладки",
        default: "Слот для определения основного содержимого вкладки",
      },
    },
    dropdown: {
      "basic-usage": {
        "first-menu": "Первое меню",
        "second-menu": "Второе меню",
      },
      api: {
        open: "Булево значение, управляющее видимостью выпадающего списка",
        "relative-element":
          "Определяет элемент, относительно которого будет позиционироваться выпадающий список",
        width: "Указывает ширину выпадающего списка",
        "min-width": "Указывает минимальную ширину выпадающего списка",
        "max-width": "Указывает максимальную ширину выпадающего списка",
        "x-offset":
          "Горизонтальное смещение в пикселях для настройки позиции выпадающего списка",
        "y-offset":
          "Вертикальное смещение в пикселях для настройки позиции выпадающего списка",
        "fill-width":
          "Булево значение, определяющее, должен ли выпадающий список занимать всю ширину контейнера",
        "z-index":
          "Задает z-index оверлея выпадающего списка. Если не передан, используется общий автоматический стек z-index",
        placement:
          "Задает положение dropdown относительно trigger-элемента, включая выравнивание по краю",
      },
      slot: {
        default: "Слот для кастомизации содержимого внутри выпадающего списка",
      },
      variables: {},
      events: {
        "on-outside-click":
          "Событие всплывающее когда пользователь кликает вне выпадающего списка, что можно использовать для его закрытия",
      },
    },
    "context-menu": {
      "basic-usage": {
        target: "Кликните правой кнопкой по этой области",
      },
      api: {
        "model-value": "Управляет открытым состоянием контекстного меню",
        placement:
          "Задает положение контекстного меню относительно позиции указателя",
        width: "Указывает ширину контекстного меню",
        "min-width": "Указывает минимальную ширину контекстного меню",
        "max-width": "Указывает максимальную ширину контекстного меню",
        "x-offset":
          "Горизонтальное смещение в пикселях для настройки позиции контекстного меню",
        "y-offset":
          "Вертикальное смещение в пикселях для настройки позиции контекстного меню",
        "fill-width":
          "Булево значение, определяющее, должно ли контекстное меню использовать ширину якоря указателя",
        "z-index":
          "Задает z-index оверлея контекстного меню. Если не передан, используется общий автоматический стек z-index",
        "close-on-escape":
          "Определяет, должно ли контекстное меню закрываться при нажатии Escape",
        "trap-focus":
          "Определяет, должен ли фокус удерживаться внутри контекстного меню",
        disabled: "Отключает trigger контекстного меню",
        role: "Задает aria role для панели контекстного меню",
        "aria-label": "Задает aria-label для панели контекстного меню",
      },
      slot: {
        default: "Слот для области, по которой открывается контекстное меню",
        menu: "Слот для кастомизации содержимого контекстного меню",
      },
      variables: {},
      events: {
        "update:model-value": "Событие при изменении открытого состояния",
        open: "Событие при открытии контекстного меню",
        close: "Событие при закрытии контекстного меню",
        "on-outside-click":
          "Событие при клике вне контекстного меню",
        "on-escape-keydown":
          "Событие при нажатии Escape, когда контекстное меню открыто",
      },
    },
    backtop: {
      "basic-usage": {
        info: {
          title: "Информация",
          content: "Убедитесь, что высота контейнера прокрутки определена.",
        },
        "scroll-down": "Прокрутить вниз",
      },
      api: {
        right: "Задает расстояние от правого края экрана",
        bottom: "Задает расстояние от нижнего края экрана",
        "visibility-height":
          "Определяет высоту прокрутки, при которой кнопка возврата наверх становится видимой. Принимает число в пикселях",
        design: "Определяет стиль кнопки",
        "z-index": "Задает z-index телепортированной кнопки возврата наверх",
        "teleport-to": "CSS selector, в который телепортируется кнопка возврата наверх",
        "teleport-disabled": "Отключает teleport и рендерит кнопку на месте",
      },
      slot: {
        default: "Слот для кастомизации содержимого кнопки возврата наверх",
      },
      events: {
        click:
          "Событие которое вспылывает, когда пользователь кликает на кнопку возврата наверх",
      },
      variables: {},
    },
    breadcrumb: {
      separator: {
        subtitle:
          "Определяет символ, используемый для разделения элементов навигации.",
      },
      api: {
        separator: "Символ разделяющий элементы навигации",
      },
    },
    "breadcrumb-item": {
      api: {
        to: "Указывает целевой маршрут для навигации. Принимает строку пути или объект маршрута",
        replace:
          "Булево значение, определяющее, должна ли навигация заменять текущую запись в истории вместо добавления новой",
      },
    },
    "otp-input": {
      length: {
        subtitle: "Определяет, сколько ячеек будет отрисовано для кода.",
      },
      mode: {
        subtitle:
          "Управляет допустимыми символами: *numeric*, *text* или *alphanumeric*.",
      },
      height: {
        subtitle: "Устанавливает размер каждой OTP-ячейки.",
      },
      disabled: {
        subtitle: "Отключает все OTP-ячейки, если установлено в *true*.",
      },
      api: {
        id: "Устанавливает id первой OTP-ячейки. Остальные ячейки автоматически получают id с суффиксами",
        name: "Устанавливает name скрытого input. Если prop не передан, берется name или id из NmorphFormItem",
        autocomplete:
          "Autocomplete-значение для OTP-ячеек. По умолчанию используется one-time-code и также может наследоваться из NmorphFormItem",
        height: "Определяет размер каждой OTP-ячейки",
        disabled: "Булево значение, отключающее OTP input",
        tabindex:
          "Базовый tabindex для OTP-ячеек. Следующие ячейки получают увеличенное значение автоматически",
        "model-value": "Текущее значение OTP как объединенная строка",
        length: "Количество OTP-ячеек",
        mode: "Режим допустимого ввода: numeric, text или alphanumeric",
        autocapitalize:
          "Устанавливает нативное значение autocapitalize для OTP-ячеек",
        autofocus:
          "Автоматически фокусирует первую OTP-ячейку при монтировании",
      },
      slot: {},
      variables: {},
      events: {
        "update:model-value":
          "Событие всплывает при изменении объединенного OTP-значения",
        focus: "Событие всплывает, когда любая OTP-ячейка получает фокус",
        blur: "Событие всплывает, когда фокус покидает весь OTP input",
        complete: "Событие всплывает, когда заполнены все OTP-ячейки",
      },
      exposes: {
        inputDOMRefs: "Массив оригинальных DOM-элементов OTP-ячеек",
        focus: "Фокусирует первую OTP-ячейку или конкретную ячейку по индексу",
        blur: "Снимает фокус со всех OTP-ячеек",
      },
    },
    "text-input": {
      height: {
        subtitle: "Устанавливает высоту поля ввода.",
      },
      disabled: {
        subtitle: "Отключает поле ввода, если установлено в *true*.",
      },
      "type-password": {
        subtitle:
          "Если установлено в *true*, текст в поле ввода будет скрыт как пароль.",
        toggle: "Переключить тип",
      },
      "model-value": {
        subtitle: "Представляет значение поля ввода",
      },
      clearable: {
        subtitle:
          "Если установлено в *true*, появится кнопка для очистки поля ввода.",
      },
      api: {
        id: "Устанавливает id нативного input. Внутри NmorphFormItem наследует его id",
        name: "Устанавливает name нативного input. Если prop не передан, берется name или id из NmorphFormItem",
        autocomplete:
          "Autocomplete-значение для нативного input. Также может наследоваться из NmorphFormItem",
        tabindex: "Нативное tabindex-значение для input",
        height: "Определяет высоту текстового поля",
        disabled: "Булево значение, отключающее текстовое поле",
        placeholder:
          "Текст, отображаемый как подсказка, когда поле ввода пусто",
        label: "Текстовая метка, связанная с полем ввода",
        "type-password":
          "Булево значение, превращающее поле ввода в поле для пароля",
        "model-value": "Текущее значение поля ввода",
        clearable:
          "Булево значение, добавляющее кнопку для очистки значения поля ввода",
        indentation:
          "Пользовательский text-indent для нативного input. По умолчанию отступ выбирается автоматически на основе prepend-icon slot",
        "input-attrs":
          "Дополнительные нативные атрибуты, которые прокидываются во внутренний input",
      },
      slot: {
        "prepend-icon": "Слот для добавления иконки в начало поля ввода",
      },
      variables: {
        "prepend-icon-indent": "Определяет отступ для иконки перед вводом",
      },
      events: {
        "update:model-value":
          "Событие всплывает при изменении значения поля ввода",
        focus: "Событие всплывает, когда поле ввода получает фокус",
        blur: "Событие всплывает, когда поле ввода теряет фокус",
        "on-enter": "Событие всплывает при нажатии клавиши Enter",
      },
      exposes: {
        inputDOMRef: "Оригинальный элемент DOM поля ввода",
        focus: "Фокусирует поле ввода",
        blur: "Снимает фокус с поля ввода",
        select: "Выделяет текущее значение поля ввода",
      },
    },
    "color-picker": {
      height: {
        subtitle: "Устанавливает высоту color picker.",
      },
      disabled: {
        subtitle: "Отключает color picker, если установлено в *true*.",
      },
      "model-value": {
        subtitle:
          "Управляет выбранным цветом. Принимает hex-значения вроде *#4a90e2*.",
      },
      "show-value": {
        subtitle:
          "Показывает выбранное hex-значение рядом со swatch. Если `modelValue` не передан, используется текущий accent-цвет темы.",
      },
      "display-format": {
        subtitle: "Задает формат отображаемого значения цвета.",
      },
      api: {
        id: "Устанавливает id нативного input. Внутри NmorphFormItem наследует его id",
        name: "Устанавливает name нативного input. Если prop не передан, берется name или id из NmorphFormItem",
        height: "Определяет высоту color picker",
        disabled: "Булево значение, отключающее color picker",
        "model-value": "Текущее значение цвета в hex-формате",
        "show-value":
          "Булево значение, показывающее текущее значение цвета рядом с цветом",
        "display-format": "Формат отображаемого значения цвета",
      },
      slot: {},
      variables: {},
      events: {
        "update:model-value": "Событие всплывает при изменении значения цвета",
        focus: "Событие всплывает, когда color picker получает фокус",
        blur: "Событие всплывает, когда color picker теряет фокус",
      },
      exposes: {
        inputDOMRef: "Оригинальный DOM-элемент input с выбором цвета",
      },
    },
    switch: {
      height: {
        subtitle: "Определяет высоту компонента переключателя.",
      },
      disabled: {
        subtitle: "Отключает переключатель, если установлено в *true*.",
      },
      "model-value": {
        subtitle: "Управляет состоянием включено/выключено переключателя.",
      },
      loading: {
        subtitle:
          "Отображает состояние загрузки на переключателе, если установлено в *true*.",
      },
      "active-value": {
        subtitle: "Указывает значение, когда переключатель включен.",
      },
      "inactive-value": {
        subtitle: "Указывает значение, когда переключатель выключен.",
      },
      api: {
        id: "Устанавливает id нативного input. Внутри NmorphFormItem наследует его id",
        name: "Устанавливает name нативного input. Если prop не передан, берется name или id из NmorphFormItem",
        height: "Указывает высоту переключателя",
        disabled: "Булево значение, отключающее компонент переключателя",
        "model-value": "Управляет состоянием переключателя",
        loading:
          "Булево значение, показывающее индикатор загрузки на переключателе",
        "active-value": "Значение, когда переключатель включен",
        "inactive-value": "Значение, когда переключатель выключен",
      },
      slot: {
        "bg-on": "Слот для кастомизации фона, когда переключатель включен",
        "bg-off": "Слот для кастомизации фона, когда переключатель выключен",
        "thumb-on": "Слот для кастомизации кнопки, когда переключатель включен",
        "thumb-off":
          "Слот для кастомизации кнопки, когда переключатель выключен",
      },
      variables: {
        height: "Определяет высоту переключателя",
        offset: "Указывает смещение кнопки переключателя",
        "thumb-height": "Определяет высоту кнопки переключателя",
      },
      events: {
        "update:model-value":
          "Событие всплывает, когда переключатель изменяет свое состояние",
      },
      exposes: {
        inputDOMRef: "Оригинальный элемент DOM поля ввода",
      },
    },
    checkbox: {
      id: {
        subtitle: "Уникальный идентификатор для чекбокса.",
      },
      disabled: {
        subtitle: "Отключает чекбокс, если установлено в *true*.",
      },
      "model-value": {
        subtitle: "Представляет состояние чекбокса (отмечен или нет).",
        label: "Лэйбл",
      },
      label: {
        subtitle: "Указывает текст метки для чекбокса.",
      },
      design: {
        subtitle: "Определяет стиль дизайна чекбокса",
      },
      height: {
        subtitle: "Устанавливает высоту чекбокса.",
      },
      api: {
        id: "Уникальный идентификатор для чекбокса",
        disabled: "Булево значение, отключающее чекбокс",
        "model-value": "Состояние чекбокса (отмечен или нет)",
        label: "Лэйбл, отображаемый рядом с чекбоксом",
        design: "Определяет стиль дизайна чекбокса",
        height: "Определяет высоту чекбокса",
      },
      slot: {
        default: "Слот для кастомизации содержимого чекбокса",
        label: "Слот для кастомизации лэйбла чекбокса",
      },
      variables: {
        size: "Определяет размер чекбокса",
      },
      events: {
        "update:model-value":
          "Событие всплывает при изменении состояния чекбокса",
      },
      exposes: {
        inputDOMRef: "Оригинальный элемент DOM поля ввода",
      },
    },
    "checkbox-group": {
      api: {
        height: "Определяет высоту чекбоксов в группе",
        disabled: "Отключает все чекбоксы в группе",
        "model-value": "Массив выбранных значений",
        options: "Опции для чекбоксов",
        design: "Стиль дизайна группы чекбоксов",
        direction: "Направление расположения группы чекбоксов",
      },
      slot: {
        default: "Слот для кастомизации содержимого группы чекбоксов",
      },
      variables: {},
      events: {
        "update:model-value":
          "Событие всплывает при изменении выбранных значений в группе чекбоксов",
      },
    },
    autocomplete: {
      "basic-usage": {
        placeholder: "Teкст...",
      },
      height: {
        subtitle: "Определяет высоту поля ввода автодополнения.",
      },
      disabled: {
        subtitle: "Отключает поле автодополнения.",
      },
      placeholder: {
        subtitle: "Текст, отображаемый, когда поле ввода пустое.",
      },
      clearable: {
        subtitle:
          "Если установлено в *true*, будет отображаться кнопка для очистки поля ввода.",
      },
      list: {
        subtitle: "Задает список опций для предложений автодополнения.",
      },
      "action-callback": {
        subtitle: "Функция, вызываемая при вводе в инпут.",
      },
      api: {
        id: "Устанавливает id вложенного текстового input. Внутри NmorphFormItem наследует его id",
        name: "Устанавливает name вложенного текстового input. Если prop не передан, берется name или id из NmorphFormItem",
        autocomplete:
          "Autocomplete-значение, передаваемое во вложенный text input. Также может наследоваться из NmorphFormItem",
        height: "Высота поля ввода автодополнения",
        disabled: "Отключает поле ввода автодополнения",
        "model-value": "Текущее значение поля ввода",
        placeholder: "Подсказка, отображаемая, когда поле ввода пустое",
        clearable:
          "Булево значение, добавляющее кнопку для очистки значения поля",
        list: "Список предложений для ввода",
        "action-callback":
          "Функция обратного вызова, вызываемая при выборе опции",
        "z-index":
          "Задает z-index оверлея подсказок. Если не передан, используется общий автоматический стек z-index",
        virtual: "Включает виртуальный рендеринг для больших списков подсказок",
        "virtual-item-height":
          "Задает ожидаемую высоту одного виртуального элемента",
        "virtual-max-height": "Задает максимальную высоту виртуального списка",
        "virtual-overscan":
          "Задает количество дополнительных элементов до и после видимой области",
      },
      slot: {
        loader:
          "Слот для добавления кастомного загрузчика во время получения данных",
      },
      variables: {},
      events: {
        "update:model-value":
          "Событие всплывает при изменении значения поля автодополнения",
        select: "Событие всплывает при выборе элемента из предложенных",
      },
    },
    "file-upload": {
      "model-value": {},
      disabled: {
        subtitle: "Отключает компонент загрузки файлов",
      },
      multiple: {
        subtitle:
          "Позволяет загрузить несколько файлов, если установлено в *true*.",
      },
      "photo-with-preview": {
        subtitle:
          "Если установлено в *true*, загруженные фотографии будут отображаться с предварительным просмотром.",
      },
      api: {
        "model-value": "Представляет загруженные файлы",
        disabled: "Булево значение, отключающее компонент загрузки файлов",
        multiple: "Булево значение, позволяющее выбрать несколько файлов",
        "allowed-types": "Определяет типы файлов, которые можно загрузить",
        "photo-with-preview":
          "Отображает предварительный просмотр загруженных изображений",
        fill: "Позволяет кнопке загрузки заполнить свой контейнер",
      },
      slot: {
        trigger: "Слот для кастомизации кнопки, инициирующей загрузку файла",
      },
      variables: {},
      events: {
        "on-unsupported-file-type-error":
          "Событие всплывает, когда пользователь пытается загрузить неподдерживаемый тип файла",
        "update:model-value": "Событие всплывает при изменении выбора файлов",
      },
      exposes: {
        inputDOMRef: "Оригинальный элемент DOM поля ввода",
      },
      translates: {
        selectFile: "Выберите файл",
      },
    },
    "number-input": {
      "basic-usage": {},
      height: {
        subtitle: "Определяет высоту числового поля ввода.",
      },
      disabled: {
        subtitle: "Отключает числовое поле ввода, если установлено в *true*.",
      },
      "action-btn-position-right": {
        subtitle:
          "Если установлено в *true*, кнопки увеличения и уменьшения располагаются справа.",
      },
      api: {
        id: "Устанавливает id нативного input. Внутри NmorphFormItem наследует его id",
        name: "Устанавливает name нативного input. Если prop не передан, берется name или id из NmorphFormItem",
        autocomplete:
          "Autocomplete-значение для нативного number input. Также может наследоваться из NmorphFormItem",
        height: "Высота числового поля ввода",
        disabled: "Булево значение, отключающее поле ввода",
        "model-value": "Текущее значение числового поля ввода",
        max: "Максимально допустимое значение",
        min: "Минимально допустимое значение",
        step: "Шаг для увеличения или уменьшения значения",
        "action-btn-position-right":
          "Располагает кнопки действия справа, если установлено в *true*",
      },
      slot: {},
      variables: {},
      exposes: {
        inputDOMRef: "Оригинальный элемент DOM поля ввода",
      },
      events: {
        "update:model-value":
          "Событие всплывает при изменении значения числового поля ввода",
      },
    },
    "select-button": {
      height: {
        subtitle: "Устанавливает высоту компонента.",
      },
      disabled: {
        subtitle: "Отключает компонент.",
      },
      fill: {
        subtitle: "Растягивает компонент на всю ширину контейнера.",
      },
      api: {
        "model-value": "Выбранное значение",
        height: "Высота компонента",
        disabled: "Отключает компонент",
        fill: "Растягивает компонент на всю ширину контейнера",
        options: "Список опций для отображения",
      },
      slot: {
        default: "Слот для элементов NmorphSelectButtonItem",
      },
      events: {
        "update:model-value": "Срабатывает при изменении выбранного значения",
      },
    },
    select: {
      height: {
        subtitle: "Устанавливает высоту выпадающего списка.",
      },
      disabled: {
        subtitle: "Отключает компонент.",
      },
      "model-value": {
        subtitle: "Представляет выбранное значение компонента выбора.",
        multiple: "Несколько значений",
      },
      loading: {
        subtitle: "Отображает индикатор загрузки, если установлено в *true*.",
      },
      fill: {
        subtitle: "Растягивает select на всю ширину контейнера.",
      },
      "options-width": {
        subtitle:
          "Управляет шириной опций: сохранять ширину select и обрезать длинный текст или расширяться под контент.",
      },
      api: {
        id: "Устанавливает id нативного select. Внутри NmorphFormItem наследует его id",
        name: "Устанавливает name нативного select. Если prop не передан, берется name или id из NmorphFormItem",
        autocomplete:
          "Autocomplete-значение для нативного select. Также может наследоваться из NmorphFormItem",
        height: "Высота выпадающего списка",
        disabled: "Отключает выпадающий список",
        "no-element-placeholder":
          "Текст-заполнитель, отображаемый, когда опции нет",
        "value-required": "Требует выбора значения",
        options: "Список доступных опций",
        "options-map": "Объект для отображения опций",
        "model-value": "Выбранное значение выпадающего списка",
        loading: "Отображает состояние загрузки",
        fill: "Растягивает выпадающий список на всю ширину контейнера",
        "options-width":
          "Управляет шириной опций выпадающего списка: truncate или auto",
        open: "Булево значение для управления видимостью списка",
        "z-index":
          "Задает z-index выпадающего списка select. Если не передан, используется общий автоматический стек z-index",
        virtual: "Включает виртуальный рендеринг для больших списков опций",
        "virtual-item-height":
          "Задает ожидаемую высоту одной виртуальной опции",
        "virtual-max-height":
          "Задает максимальную высоту виртуального списка опций",
        "virtual-overscan":
          "Задает количество дополнительных опций до и после видимой области",
      },
      slot: {
        default: "Слот для настройки опций в выпадающем списке",
      },
      variables: {
        "base-width": "Задает базовую ширину для компонента выбора",
      },
      events: {
        "update:model-value":
          "Событие всплывает при изменении выбранного значения",
      },
      translates: {
        noElementPlaceholder: "Выберите значение",
      },
    },
    "select-option": {
      api: {
        label:
          "Определяет метку для опции, которая отображается в выпадающем списке",
        height: "Задает высоту опции выбора",
        disabled:
          "Булево значение, которое указывает, отключена ли опция и не может быть выбрана",
      },
      slot: {
        default: "Слот для настройки отображаемого контента для этой опции",
      },
      variables: {
        "hover-bg": "Устанавливает цвет фона при наведении на опцию",
        "hover-color": "Определяет цвет текста при наведении на опцию",
      },
      events: {
        "change-value": "Событие всплывает при изменении значения опции",
      },
    },
    slider: {
      disabled: {
        subtitle: "Отключает слайдер, если установлено в *true*.",
      },
      "show-tooltip": {
        subtitle:
          "Если установлено в *true*, отображает всплывающую подсказку с текущим значением.",
      },
      api: {
        id: "Устанавливает id нативного range input. Внутри NmorphFormItem наследует его id",
        name: "Устанавливает name нативного range input. Если prop не передан, берется name или id из NmorphFormItem",
        fill: "Булево значение, позволяющее слайдеру заполнить контейнер",
        disabled: "Отключает компонент слайдера",
        "model-value": "Текущее значение слайдера",
        max: "Максимальное значение для слайдера",
        min: "Минимальное значение для слайдера",
        step: "Шаг для увеличения или уменьшения значения",
        "show-tooltip":
          "Булево значение для управления видимостью всплывающей подсказки",
      },
      slot: {},
      variables: {
        "slider-height": "Определяет высоту слайдера",
        "value-fixed-container-height": "Устанавливает высоту контейнера",
      },
      events: {
        "update:model-value":
          "Событие всплывает при изменении значения слайдера",
      },
    },
    "date-picker": {
      height: {
        subtitle: "Устанавливает высоту поля выбора даты.",
      },
      disabled: {
        subtitle: "Отключает выбор даты, если установлено в *true*.",
      },
      api: {
        id: "Устанавливает id нативного input. Внутри NmorphFormItem наследует его id",
        name: "Устанавливает name нативного input. Если prop не передан, берется name или id из NmorphFormItem",
        autocomplete:
          "Autocomplete-значение для скрытого нативного date input. Также может наследоваться из NmorphFormItem",
        height: "Высота поля выбора даты",
        disabled: "Булево значение, отключающее выбор даты",
        placeholder: "Текст, отображаемый, когда дата не выбрана",
        "model-value": "Текущая выбранная дата или диапазон дат",
        type: "Тип выбора даты, например, *одиночный* или *диапазон*",
        "text-separator":
          "Текст для разделения начальной и конечной дат в режиме выбора диапазона",
        "z-index":
          "Задает z-index выпадающего календаря. Если не передан, используется общий автоматический стек z-index",
      },
      slot: {},
      variables: {
        width: "Определяет ширину компонента выбора даты",
      },
      events: {
        "update:model-value":
          "Событие всплывает, когда выбранная дата или диапазон дат изменяются",
      },
      translates: {
        pickADate: "Выберите дату",
      },
    },
    radio: {
      "basic-usage": {
        info: {
          title: "Использование Radio Group",
          content:
            "Обычно используется в группе радиокнопок, чтобы позволить пользователю выбрать один вариант из набора. После выбора радиокнопки она не может быть отменена повторным нажатием—только путем выбора другой радиокнопки в группе для изменения состояния. Для правильного отображения, при использовании 'style-type' как 'button', следует предоставить лэйбл (label).",
        },
      },
      api: {
        disabled: "Булево значение, отключающее радиокнопку",
        label: "Текст метки, отображаемый рядом или внутри радиокнопки",
        value: "Значение, присвоенное радиокнопке",
        "style-type": "Определяет визуальный стиль радиокнопки",
        height: "Определяет высоту радиокнопки",
        checked: "Отметить радиокнопку как выбранную",
      },
      slot: {
        label: "Слот для настройки лэйбла радиокнопки",
      },
      variables: {
        size: "Задает размер радиокнопки",
      },
      exposes: {
        inputDOMRef: "Оригинальный элемент DOM поля ввода",
      },
    },
    "radio-group": {
      api: {
        height: "Определяет высоту радиокнопок в группе",
        disabled: "Отключает все радиокнопки в группе",
        "model-value": "Выбранное значение группы радиокнопок",
        options: "Список опций для выбора",
        "style-type": "Визуальный стиль радиокнопок",
        direction: "Направление расположения радиокнопок",
      },
      slot: {
        default: "Слот для передачи NmorphRadioButton",
      },
      variables: {},
      events: {
        "update:model-value":
          "Событие всплывает при изменении выбранного значения",
      },
    },
    form: {
      "basic-usage": {
        subtitle: "Представляет значения формы для всех элементов ввода.",
        "too-short": "Слишком коротко",
        "wrong-age": "Неверный возраст",
        "you-cant-be-a-nobody": "Вы не можете быть пользователем",
        "we-dont-have-kombucha": "У нас нет Комбучи(",
        "ie-not-supported": "IE не поддерживается",
        "you-must-set-agreement": "Вы должны принять соглашение",
        "value-must-greater-than-30": "Значение должно быть больше 30",
        "value-must-less-than-80": "Значение должно быть меньше 80",
        "pear-is-not-available": "Груша недоступна",
        coffee: "Кофе",
        tea: "Чай",
        pear: "Груша",
        apple: "Яблоко",
        orange: "Апельсин",
        unknown: "Неизвестно",
        username: "Имя пользователя",
        "years-old": "Лет",
        "preferred-drink": "Предпочитаемый напиток",
        browsers: "Браузеры",
        agreement: "Соглашение",
        "number-value": "Числовое значение",
        "choose-date": "Выберите дату",
        food: "Еда",
        "favorite-food": "Любимая еда",
        photo: "Фото",
        "send-form": "Отправить форму",
        "enter-username": "Введите имя пользователя",
        "is-valid": "Форма валидна: ",
        info: {
          title: "Информация о типизации",
          content:
            "Для обеспечения правильной типизации необходимо импортировать тип INmorphFromDataExpose.",
        },
      },
      "validate-immediately": {
        subtitle:
          "Если установлено в *true*, форма будет проверять свои поля сразу после рендеринга.",
      },
      api: {
        value: "Значения формы для элементов ввода",
        "validate-immediately":
          "Булево значение, управляющее проверкой при загрузке",
      },
      slot: {
        default: "Слот для передачи NmorphFormItem",
      },
      variables: {},
      exposes: {
        "form-data": "Данные о форме включая валидацию",
      },
      explanation: `
        <div class="container">
          <p>
            <strong>Метаданные поля:</strong> <code>NmorphFormItem</code> автоматически передает свои <code>id</code> и опциональный <code>name</code> вложенным form-control. При необходимости дочерний компонент может переопределить эти значения своими prop.
            <br />
            <strong>Autocomplete:</strong> Если контрол поддерживает <code>autocomplete</code>, <code>NmorphFormItem</code> тоже может передать это значение вниз.
          </p>

          <h2>1. Типы правил</h2>
          <p>
            Вы можете определить правила валидации в зависимости от типа значения, которое хотите проверить:
          </p>

          <h3>Валидация текста:</h3>
          <p>
            <strong>Свойства правила:</strong> <code>pattern</code> (использует регулярные выражения), <code>error</code>
          </p>

          <h3>Валидация чисел:</h3>
          <p>
            <strong>Свойства правила:</strong> <code>numberCompareType</code> (использует <code>NmorphNumberCompareOperator</code>), <code>compareValue</code>, <code>error</code>
          </p>

          <h3>Валидация булевых значений (радиокнопка):</h3>
          <p>
            <strong>Свойства правила:</strong> <code>booleanCompareType</code> (использует <code>NmorphBooleanCompareOperator</code>), <code>compareValue</code>, <code>error</code>
          </p>

          <h3>Валидация массивов (группа чекбоксов):</h3>
          <p>
            <strong>Свойства правила:</strong> <code>arrayCompareType</code> (использует <code>NmorphArrayValidationOperator</code>), <code>compareValue</code>, <code>error</code>
          </p>

          <h2>2. Определение перечислений (Enum)</h2>
          <p>
            Следующие перечисления используются для определения различных типов операторов валидации:
          </p>

          <h3>NmorphArrayValidationOperator:</h3>
          <ul>
            <li>
              <strong>contains-one:</strong> Массив должен содержать хотя бы одно из указанных значений.
            </li>
            <li>
              <strong>not-contains:</strong> Массив не должен содержать ни одного из указанных значений.
            </li>
            <li>
              <strong>full-eq:</strong> Массив должен быть равен указанным значениям, включая порядок и длину.
            </li>
          </ul>

          <h3>NmorphNumberCompareOperator:</h3>
          <ul>
            <li>
              <strong>eq:</strong> Значение должно быть равно указанному значению.
            </li>
            <li>
              <strong>gte:</strong> Значение должно быть больше или равно указанному значению.
            </li>
            <li>
              <strong>lte:</strong> Значение должно быть меньше или равно указанному значению.
            </li>
            <li>
              <strong>gt:</strong> Значение должно быть больше указанного значения.
            </li>
            <li>
              <strong>lt:</strong> Значение должно быть меньше указанного значения.
            </li>
          </ul>

          <h3>NmorphBooleanCompareOperator:</h3>
          <ul>
            <li>
              <strong>eq:</strong> Булево значение должно быть равно указанному значению.
            </li>
            <li>
              <strong>not-eq:</strong> Булево значение не должно быть равно указанному значению.
            </li>
          </ul>

          <h2>3. Доступ к состоянию валидации</h2>
          <p>
            После вызова функции <code>useFieldValidation</code>, вам будут доступны следующие параметры:
          </p>
          <ul>
            <li>
              <strong>touched:</strong> Указывает, было ли поле затронуто.
            </li>
            <li>
              <strong>valid:</strong> Указывает, является ли поле допустимым на основе определенных правил.
            </li>
            <li>
              <strong>errors:</strong> Массив, содержащий сообщения об ошибках для поля.
            </li>
            <li>
              <strong>validate:</strong> Функция, которая запускает процесс валидации.
            </li>
          </ul>
        </div>
      `,
    },
    "form-item": {
      api: {
        id: "Уникальный id поля, который используется label и наследуется вложенными form-control",
        name: "Опциональный name поля, который наследуется вложенными form-control. По умолчанию равен id",
        autocomplete:
          "Опциональное autocomplete-значение, которое наследуется вложенными form-control, если они его поддерживают",
        height: "Устанавливает высоту контейнера элемента формы",
        label:
          "Определяет текст метки, связанный с элементом формы, предоставляя контекст пользователю",
        "show-validation-icon":
          "Булево значение, управляющее отображением иконки валидации для данного элемента формы",
        "static-error-box-space":
          "Определяет статическое пространство для отображения поля ошибки, обеспечивая единообразие пространства независимо от состояния валидации",
        validate: "Определяет правила валидации для элемента формы",
      },
      slot: {
        default:
          "Слот для настройки содержимого элемента формы, обычно включает элементы ввода или другие элементы управления формой",
      },
    },
  },
};
