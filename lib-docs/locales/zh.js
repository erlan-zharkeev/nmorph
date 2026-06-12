export default {
  meta: {
    description:
      "适用于 Vue 3 和 Nuxt 的 UI 组件库，采用 neumorphism/sceumorphism 风格。",
  },
  guide: "指南",
  components: "组件",
  about: "关于项目",
  search: "搜索",
  attributes: "属性",
  slots: "插槽",
  variables: "变量",
  exposes: "公开",
  "right-aside-title": "目录",
  name: "名称",
  events: "事件",
  translates: "i18n 翻译",
  "translates-description":
    "可以通过这些 key 为库未内置支持的语言配置自定义文本。",
  description: "描述",
  text: "文本",
  type: "类型",
  default: "默认",
  loadingText: "加载中 ...",
  basic: "基础",
  data: "数据",
  feedback: "反馈",
  form: "表单",
  navigation: "导航",
  other: "其他",
  attention: "注意",
  "top-bar": {
    menu: "菜单",
    nav: "导航",
    search: "搜索",
    "search-shortcut": "Ctrl K",
  },
  "search-dialog": {
    placeholder: "搜索组件、指南、API",
    empty: "未找到结果",
    hint: "使用 Ctrl K 打开",
    groups: {
      guide: "指南",
      component: "组件",
      api: "API",
      changelog: "变更日志",
      project: "项目",
    },
  },
  "footer-bar": {
    license: "许可协议",
  },
  "unsupported-resolution": {
    title: "不支持当前分辨率",
    description: "请在屏幕宽度不小于 320px 的设备上打开文档。",
  },
  "guide-page": {
    title: "指南",
    "full-title": "Nmorph UI Kit 指南",
    "full-description":
      "安装 Nmorph、接入 Vue 和 Nuxt、配置主题、使用表单与 overlay，并为包含大量组件的界面做生产准备的实用指南。",
    "theme-customize": "自定义主题",
    "custom-theme-color": "更改基础颜色",
    "custom-text-color": "文本颜色",
    "custom-accent-color": "强调颜色",
    "enter-color": "输入颜色",
    "get-started-btn": "快速开始",
    explained:
      '<b class="main-section__subtitle">Neumorphism / Sceumorphism</b>',
    "apply-theme": "应用主题",
    "main-content":
      '<p class="main-section__first-explained-content">适用于 Vue 3 和 Nuxt 的 UI 套件，用于创建独特的 3D 新拟态设计</p>',
    "quick-start": {
      installation: "安装",
      "choose-package-manager": "使用 <b>pnpm</b> 安装包并在 monorepo 中工作。",
      plugin: "库集成",
      "alternative-plugin": "替代集成方法",
      nuxt: "Nuxt 集成",
      usage: "基础使用",
    },
    config: {
      "add-config": "添加库配置的示例",
      available: "目前可用的设置有三个：theme、i18n 和 zIndex",
      theme: "主题",
      i18n: "国际化 (i18n)",
      ls: "在 local storage 中保存当前主题",
      "rest-themes": "您的自定义主题",
      "default-theme": "选定的默认主题",
      "dark-shade": "深色阴影深度系数，仅在动态阴影生成方法下有效",
      "light-shade": "浅色阴影深度系数，仅在动态阴影生成方法下有效",
      "shadow-width": "阴影距离",
      "shadow-blur": "阴影模糊",
      "theme-explained":
        "在安装库时传入主题颜色。通常每个主题至少配置 main、text 和 accent。",
      "auto-generation":
        "如果主题有 main，但没有 darkShade 和 lightShade，Nmorph 会自动生成阴影颜色。需要精确值时，请手动传入 darkShade 和 lightShade。",
      "theme-runtime":
        "当颜色来自 color picker 等控件时，请使用 runtime API。Runtime 颜色会更新 Nmorph 管理的 style 标签，不会写入 html 的 inline style 属性。",
      "main-var": "要自动生成 darkShade 和 lightShade，只需传递此变量。",
      "shade-var": "如果不直接修改并通过 main 变量传递，它将自动计算。",
      "i18n-content":
        "为了确保 i18n 正常工作，请确保在库之前连接 i18n。目前提供三种语言环境：en、zh、ru。<p>默认语言环境为 en。仅导入您需要的语言环境。</p><p>如果缺少语言环境，则需要添加您自己的。locale 属性将覆盖上面传递的 i18n locale。</p>",
      "rewrite-translation": "重写库翻译。您可以在组件文档中查看翻译消息名称。",
      "other-messages": "其他翻译",
      "css-variables": "CSS 变量",
      "css-variables-content":
        "库会暴露主题和基础 CSS custom properties，供自定义样式使用。单个组件的定制通过 props 完成。",
      "css-variables-theme-derived": "主题派生变量（按主题设置）",
      "css-variables-auto-generated": "附加文字对比度变量（可按主题配置）",
      "css-variables-static": "附加主题颜色变量（按主题设置）",
      "css-var-main": "主背景色",
      "css-var-dark-shade": "深色阴影",
      "css-var-light-shade": "浅色阴影",
      "css-var-text": "主文字颜色",
      "css-var-scroll-thumb": "滚动条滑块颜色",
      "css-var-scroll-color-scheme": "原生滚动条配色方案",
      "css-var-accent": "强调色 / 品牌色",
      "css-var-focus-text": "聚焦/强调元素上的文字颜色",
      "css-var-placeholder": "占位符文字颜色",
      "css-var-semi-contrast": "文字颜色 +30% 亮度 — 用于次要文字",
      "css-var-contrast": "文字颜色 +70% 亮度 — 用于高对比度文字",
    },
    other: {
      "utils-classes": "工具类",
    },
  },
  "about-page": {
    eyebrow: "关于项目",
    lead: "Nmorph UI Kit 是一个适用于 Vue 3 和 Nuxt 的组件库，用于构建带有柔和阴影、清晰状态和一致组件 API 的触感界面。",
    meta: {
      vue: "Vue 3",
      nuxt: "Nuxt",
      typescript: "TypeScript",
      lightweight: "极小体积",
      treeShaking: "Tree-shaking",
      license: "MIT 许可证",
    },
    "overview-title": "项目简介",
    "overview-content":
      "该项目为产品界面提供现成的构建块：表单控件、数据展示组件、导航、反馈组件、主题工具和文档示例。同一个包既可以用于普通 Vue 应用，也可以通过 Nuxt module 用于 Nuxt 项目。",
    "features-title": "提供能力",
    features: {
      components: {
        title: "组件集合",
        text: "用于表单、表格、overlay、导航、反馈和常见 UI 场景的可复用组件。",
      },
      bundle: {
        title: "轻量 bundle",
        text: "该包有意保持小体积并支持 tree-shaking：只导入需要的组件、图标和样式入口，现代构建工具可以移除未使用的导出。",
      },
      theme: {
        title: "主题系统",
        text: "CSS 变量、明暗主题、动态阴影和工具类，帮助保持统一样式。",
      },
      nuxt: {
        title: "Vue 和 Nuxt 支持",
        text: "支持直接 Vue plugin 接入，也提供 Nuxt module 以便集成到 Nuxt 应用。",
      },
      typescript: {
        title: "类型化 API",
        text: "类型化 props、导出的 option objects、辅助类型和示例，用于说明组件公开 API。",
      },
    },
    "system-title": "库的内部结构",
    system: {
      plugin: {
        title: "Plugin 生命周期",
        text: "NmorphLibrary 会安装通用样式、合并 i18n 文案、准备主题 CSS 变量、监听浏览器尺寸，并向组件提供共享的 Nmorph instance。",
      },
      themeEngine: {
        title: "主题引擎",
        text: "主题颜色会写入文档 CSS 变量，通过 nmorph-data-theme 属性切换，并可在未提供阴影 token 时从 main color 自动生成。",
      },
      nuxtModule: {
        title: "Nuxt module",
        text: "Nuxt entry 会 transpile 包、为 SSR 和客户端渲染注册 universal plugin、可选加入完整 stylesheet，并把 Nmorph messages 合并到已有 Nuxt i18n 配置中。",
      },
      styles: {
        title: "样式和尺寸",
        text: "组件共享高度尺度、排版类、圆角 token、阴影工具类和颜色变量，因此不同控件可以组合使用而不需要额外微调。",
      },
      overlays: {
        title: "Overlay layer",
        text: "Dropdown、overlay、dialog、select、autocomplete、date picker 和 image preview 共享基于 Teleport、z-index、outside click 与 placement helpers 的层级模型。",
      },
      forms: {
        title: "表单模型",
        text: "表单组件可接入 NmorphForm 和 validation hooks，支持 text、numeric、boolean 与 array 字段，同时保留直接 v-model 的用法。",
      },
      virtualization: {
        title: "虚拟滚动",
        text: "大量 rows 和 options 的场景通过 table、select、autocomplete 的 virtual list 机制处理，可明确控制 item height、overscan 和 scroll position。",
      },
      accessibility: {
        title: "无障碍基础",
        text: "输入类组件尽量保留 native form elements，暴露可聚焦控件，保持 disabled 与 loading 状态，并让 icon-only actions 继续使用 semantic buttons。",
      },
    },
    "design-title": "设计方式",
    "design-content":
      "Nmorph 使用 neumorphism 和 skeuomorphism 风格：柔和阴影、内嵌状态、克制的表面和强调色，让控件有触感，同时保持功能清晰。",
    "status-title": "项目状态",
    "status-content":
      "该库正在持续开发和测试。视觉问题、集成问题和组件 API 缺口会通过项目 issue board 跟踪。",
    "links-title": "项目链接",
    links: {
      guide: "指南",
      components: "组件",
      changelog: "变更日志",
      repository: "仓库",
      issues: "问题",
    },
  },
  "changelog-page": {
    changelog: {
      title: "变更日志",
      items: {
        "media-tile-aspect-design":
          "NmorphMediaTile 现在提供 design 和 aspect props，包括用于按父容器尺寸填充通话卡片的 aspect=\"fill\"，同时保留默认的 16:9 video layout。",
        "carousel-seamless-loop":
          "NmorphCarousel 现在通过边缘 clone slides 实现无缝前后循环，并修正 left/right controls 与 sandbox 箭头样式。",
        "notification-provider-layering":
          "NmorphNotificationProvider 现在默认 teleport 到 body，并使用共享 z-index manager，让 notifications 稳定显示在 docs shell 和 overlays 之上。",
        "docs-api-example-polish":
          "Docs API tables 现在会让 slots、exposes、events 和 translations 保持在容器内，同时优化 dropdown spacing、stacked tabs、borderless stepper arrows 和 icon currentColor。",
        "media-tile-stable-src-object-binding":
          "NmorphMediaTile 现在会立即把 srcObject streams 绑定到 WebRTC media elements，将未静音的 remote audio 保持在稳定的独立 audio element 中，让配对 video output 保持 muted，并在 development 中报告 autoplay failures。",
        "pagination-fixed-container-sizing":
          "NmorphPagination 现在可以通过 width 和 min-width 预留固定容器，docs loading 示例也会在内容到达前保持稳定的 skeleton card 空间。",
        "table-plain-bordered-contract":
          "NmorphTable 现在把 bordered 类型限制为仅 plain design 可用，并让 plain bordered tables 使用更干净的单线边框和完整的圆角。",
        "drawer-animation-sandbox-example":
          "NmorphDrawer 现在支持打开和关闭动画，sandbox 也加入了与 lib docs 相同的 drawer 示例。",
        "image-preview-docs-polish":
          "NmorphImagePreview 会在组件挂载期间按每张 preview 图片保存 scale 和 rotation，docs 将 Guide Step 拆为独立页面，并优化了 overlay、table、translations 和 icon 示例。",
        "media-tile-src-object-audio-output":
          "NmorphMediaTile 现在会为 srcObject 中未静音的 MediaStream audio 创建独立 audio element，让 video 保持 muted 以稳定 autoplay，同时把 sinkId 应用于两个元素、分别调用 play，并监听 addtrack/removetrack。",
        "hydration-navigation-stability":
          "Docs hydration 更稳定：API table column slots 不再渲染在 table body 内，theme switcher 使用一致的 SSR default，右侧 Contents 也改为通过组件 metadata 注册，而不是只在客户端扫描 DOM。",
        "media-preview-state-polish":
          "NmorphVideoPreview 现在把 loading/error state 作为 overlay 渲染，避免页面 reload 时出现布局伪影，audio/video play controls 也移除了额外的发光 shadow。",
        "file-card-loading-layout":
          "Compact loading NmorphFileCard 现在为 actions 预留更干净的空间，保留 inset card surface，docs 中的 loading file card 也会显示在独立行。",
        "docs-guide-shell-polish":
          "Lib docs 现在在 main shell 中显示 first-load progress card，更多页面使用 paper cards，guide 增加 copy buttons 与多个 package manager 的安装 snippets，并优化 icon/list examples。",
        "card-paper-surface":
          "NmorphCard 现在通过 paper 支持内置纸张纹理，docs 中的卡片示例也统一使用相同的 paper 强度，保持一致的触感表面。",
        "media-tile-audio-sink":
          "NmorphMediaTile 现在会在 videoOff 的 audio-only 流中继续播放 remote audio，视频可见时避免重复播放，遵守 muted，并在浏览器支持 setSinkId 时可通过 sinkId 路由媒体输出。",
        "docs-paper-shell":
          "Lib docs 现在为主 shell、header、footer、overview、guide、about、changelog 和示例统一使用 paper 卡片，search 也改为真正的按钮并让 Ctrl K 对齐更稳定。",
        "component-api-docs-refresh":
          "刷新了 Card paper、Image frame border 与 loading states、MediaTile sinkId、Pagination loading、Scroll、Tooltip、Guide 以及相关组件 props 的 API 表格和示例。",
        "interaction-polish":
          "优化了 scroll、pagination、carousel、guide、tooltip、stepper、time picker、file upload 和 media previews 的交互细节，并更新为填充式 hand icon。",
        "docs-layout-refresh":
          "Docs 现在使用共享的 NmorphLayout shell，包含浮动 header/footer 卡片、对齐的 aside/content 间距、GitHub topbar 图标，以及选择结果后会关闭的 overlay search dialog。",
        "overview-preview-polish":
          "组件 overview cards 现在使用更丰富的视觉 preview、更紧凑的示例 padding、可见的共享 code scroll、更清晰的高亮 snippets，以及更新后的 media/file-card artwork。",
        "loading-icon-states":
          "NmorphImage 现在在图片加载时渲染 loader icon；loadingText 已标记为 deprecated，推荐使用 loading slot，docs examples 也不再显示文本 loading states。",
        "media-gallery-trigger-api":
          "NmorphMediaGallery trigger cards 现在支持 content-aware triggerLayout modes、triggerClass/triggerStyle trigger container、thumbnail fit controls、item aspectRatio、itemClass/itemStyle、trigger item callbacks，并会从点击的卡片 index 打开 preview。",
        "scroll-progress-polish":
          "NmorphScroll 现在避免嵌套 horizontal scroll 同时驱动外层 vertical scroll，docs scroll examples 统一使用 y-gap，NmorphProgress indeterminate 从边缘开始而不会从中心跳动。",
        "audio-backtop-polish":
          "NmorphAudioPreview 现在使用更实的 play surface 和更清晰的 external-link action，NmorphBacktop plain controls 则不再渲染额外 border。",
        "avatar-borderless-prop":
          'NmorphAvatar 现在支持通过 borderless 渲染无边框 plain 头像，同时 design="plain" 默认仍保留 border。',
        "badge-tag-value-slot":
          'NmorphBadge type="tag" 现在支持 value slot，可用于紧凑图标徽标，同时保留文本 fallback 行为。',
        "preview-borderless-controls":
          "NmorphImagePreview 和 NmorphMediaGallery 的预览控件现在使用无边框 plain 按钮，并采用与 Backtop 相同的 overlay 背景。",
        "image-preview-plain-surface":
          "NmorphImagePreview 和 NmorphMediaGallery 现在使用 plain image surface 渲染预览图片，避免多余的 nmorph 边缘。",
        "hand-icon-outline":
          "NmorphIconHand 现在使用更细的纯描边手形图标，不再使用填充形状。",
        "button-borderless-prop":
          'NmorphButton 现在支持通过 borderless 渲染无边框 plain 按钮，同时 design="plain" 默认仍保留 border。',
        "media-tile-show-status":
          "NmorphMediaTile 现在支持 show-status，可隐藏右下角状态 overlay，同时不改变 video-off fallback 行为。",
        "select-button-custom-thickness":
          "NmorphSelectButton 现在使用单一 custom-thickness prop 覆盖当前 thickness，替代单独公开的 item 尺寸 props。",
        "speaker-icons":
          "新增 NmorphIconMuteSpeaker，NmorphIconSpeaker 保留在公开图标集中，并继续保留 NmorphIconSpeakerOff 作为兼容 alias。",
        "media-tile-plain-avatar":
          "NmorphMediaTile fallback avatar 现在使用 plain avatar surface，让 call tile 视觉更干净。",
        "component-thickness-api":
          "Breaking: Button、form controls、selection controls、Pagination、CollapseItem、TagItem 以及相关 option data 的尺寸预设 prop 现在从 height 改名为 thickness。",
        "thin-input-centering":
          "Thin native input 的文本现在使用组件高度作为 line box，让视觉垂直居中更稳定，同时不改变 swipe、click 或 layout 行为。",
        "design-api-plain":
          'Breaking: Empty、Backtop、SkeletonItem、Table、TagList 和 TagItem 的 surface design value 现在使用 design="plain"，替代 design="common"。',
        "selection-design-api":
          'Breaking: NmorphButton、NmorphCheckbox、NmorphCheckboxGroup、NmorphRadio 和 NmorphRadioGroup 现在使用 design="nmorph | plain" 定义视觉设计。',
        "form-control-design-api":
          "Breaking: input-like form controls 不再暴露 design prop；design 只保留在 Checkbox、CheckboxGroup、Radio 和 RadioGroup 这类 selection controls 上。",
        "control-typography-contract":
          "共享的组件 height classes 现在定义 control font size 和 line height，让 thin/basic/thick 在紧凑控件中保持一致。",
        "typography-system":
          "新增 foundation typography tokens、NmorphText 和 role-based component text styles，让库内文本尺寸更一致。",
        "plain-surface-contract":
          "Plain buttons、dropdowns、selection controls 和 data surfaces 现在使用可见 border。",
        "component-css-vars-private-api":
          "Breaking: component-level CSS variables 现在是 private internals。组件定制迁移到显式 props，public CSS variables 保留给 theme 和 foundation tokens。",
        "stepper-single-item-click":
          "NmorphStepper 在 single-item non-interactive stepper 的 pointerup 上不再抛错，同时保留 swipe 行为和 drag 后的 click suppression。",
        "attachment-preview-primitives":
          "新增 NmorphVideoPreview、NmorphAudioPreview 和 NmorphFileCard，作为视频、音频、文档与未知文件的可复用附件 UI 基础组件。",
        "file-upload-attachment-previews":
          "NmorphFileUpload 现在会为上传的视频和音频渲染类型化预览，为 PDF、Office 和未知文件渲染文档/文件卡片，并继续保留图片预览。",
        "attachment-rendering-notes":
          "补充了 K-Room 附件渲染方案文档，包括应用层附件路由、Nmorph UI 基础组件、消息附件数据结构，以及与现有图片的兼容性。",
        "emoji-picker-lazy-locales":
          "新增可选的 NmorphEmojiPicker en、ru、zh locale 文件，并支持懒加载包导入，让宿主应用只加载所需的 emoji 数据集。",
        "image-preview-keyboard-navigation":
          "NmorphImagePreview 现在在预览打开时支持 ArrowLeft 和 ArrowRight 键盘导航，并支持图片集合循环切换。",
        "icon-wrapper-centering":
          "当外部类调整图标包裹层尺寸时，NmorphIcon 现在会居中内部图标内容。",
        "scroll-runtime-skin":
          "NmorphScroll 的 runtime common styles 重新包含 inset 轨道外观，并隐藏原生滚动条按钮，以支持仅安装 plugin 的使用方式。",
        "tag-list-common-color-api":
          "NmorphTagList 和 NmorphTagItem 现在为 common 背景暴露 color prop，支持 v-model:selected-value 和标签值点击事件，自动选择可读的文字/关闭图标颜色，并移除 common tags 的边框。",
        "tag-list-custom-content":
          "NmorphTagItem 现在支持用于自定义内容的 default slot，NmorphTagList 可转发 item scoped slot，同时保留既有 text、click、close 和 v-model 行为。",
        "realtime-ui-components-api":
          "新增适合触控的 tooltip 触发方式、面向通话的 media 与 audio meter 组件、toggle 按钮状态、公开 styling props、类型化 select modes、更丰富的 context menu items，以及向后兼容的 typo aliases。",
        "context-menu-repeat-right-click":
          "NmorphContextMenu 现在只会在 trigger 内重复右键时重新定位已打开的菜单，外部右键不再移动菜单。",
        "text-input-prepend-placeholder-color":
          "NmorphTextInput prepend 图标现在默认匹配 placeholder 颜色，并在输入框聚焦时一起切换到 focus text 颜色。",
        "form-item-model-binding":
          "NmorphFormItem 现在提供 field context，使嵌套表单控件在省略 modelValue 时可通过 id 绑定字段；显式 v-model 仍保持受控。",
        "file-upload-form-rules":
          "NmorphFileUpload 现在参与 NmorphForm rules，会在接收前拒绝无效文件、更新表单字段错误，并清理托管的 preview URLs。",
        "form-controls-visual-polish":
          "优化了表单控件尺寸和表面，包括 checkbox/radio content 高度、select 圆角、text input 背景、autofill 样式以及 card padding 传递。",
        "dev-open-opt-in-browser":
          "Workspace dev scripts 默认不再打开浏览器标签；需要自动启动 docs 或 sandbox 时请传入 --open。",
        "component-types-split":
          "组件 prop、emit、slot 和共享库类型现在拆分到专门的 type modules 中，生成的声明文件更易使用。",
        "file-upload-type-helpers":
          "NmorphFileUpload 和表单校验现在共享文件类型匹配 helpers，使 MIME、extension、accept 和 image-preview 检查保持一致。",
        "image-preview-lazy-portal":
          "NmorphImagePreview 现在只在打开时挂载 preview portal，因此包含大量预览的页面不会在 body 中堆积隐藏 portals。",
        "image-preview-gallery-trigger":
          "NmorphImagePreview 现在支持 gallery trigger，可在打开 overlay 前渲染多个缩略图。",
        "button-multiline-height":
          "NmorphButton 现在将 height prop 作为普通按钮的最小高度，使多行内容可扩展而不被裁切，同时图标按钮保持固定。",
        "context-menu-open-controls":
          "NmorphContextMenu 现在支持 click、both、longpress 和 manual triggers，暴露 openAt/openAtElement/close，并将 pointer 菜单保持在 viewport 内。",
        "tag-list-common-design":
          'NmorphTagList 现在接受 design="common"，可渲染由 token 支撑的 plain 标签，使用对比文字和图标，而不是 neumorphic inset 表面。',
        "badge-larger-sizes":
          "NmorphBadge size 现在包含 medium、large 和 extra-large 变体，用于更大的 tags、dots 和 ribbons。",
        "style-utils-unification":
          "统一了组件间的 modifier 规范化和 CSS size helpers，使 boolean modifiers 与数值 CSS 值走同一条代码路径。",
        "virtual-list-style-helpers":
          "Select、Autocomplete、Table 和 VirtualList 现在共享 option-height 与 virtual-list style helpers，使滚动表面更一致。",
        "dialog-overlay-close-api":
          "NmorphDialog 现在文档化 close-on-overlay，保留 close-on-click-modal 作为兼容 alias，并在 header 中使用可访问的关闭按钮。",
        "component-local-style-split":
          "Avatar、Image、TextInput 和 Scroll 的布局样式已从 common injected CSS 移入各自组件文件，使组件 ownership 更清晰。",
        "new-components-suite":
          "新增 NmorphTextarea、NmorphDrawer、NmorphLayout、NmorphSpace、NmorphQRCode 和 NmorphVirtualList 到库导出。",
        "new-components-docs-sandbox":
          "为新组件新增文档页面、API 表格、overview 示例和 sandbox demos。",
        "expanded-icon-set":
          "新增更多 NmorphIcon 导出，覆盖 chevrons、clipboard states、data/server、drag handles、filters、mail、shields、save、undo 和 redo 操作。",
        "component-polish-round":
          "优化现有 form、data 和 navigation 组件，包括 option heights、pagination controls、avatar rendering、switch/button states 和 Backtop 行为。",
        "docs-api-inline-descriptions":
          "Docs API tables 现在可在缺少 i18n key 时使用 inline descriptions，避免新组件页面出现 missing-translation 噪音。",
        "link-icon-name-prop":
          "NmorphLink 现在接受 iconName/icon-name，可在链接文本前渲染库图标，并已为新 prop 补充文档和测试。",
        "link-anchor-attrs":
          'NmorphLink 现在会把 rel、referrerpolicy、download、aria-label 和 title 转发到内部 anchor，并将 target="blank" 渲染为 _blank。',
        "callout-rich-link-slots":
          "NmorphCallout 现在支持 header/title/default slots 来安全渲染 rich content，也可以把 root 渲染为带 href、target、rel 和 referrerpolicy 的外部链接。",
        "file-card-embedded-surface":
          "NmorphFileCard 现在支持用于嵌入附件的 soft/plain surface，并可关闭 extension badge 和图标背景。",
        "attachment-preview-embedded-controls":
          "NmorphAudioPreview 和 NmorphVideoPreview 现在支持用于嵌入附件的 soft/plain surface，并在媒体图标上显示 play/pause；PDF FileCard 预览会在文件图标上显示眼睛操作。",
        "file-card-audio-media-preview":
          "NmorphFileCard 现在可以通过 media-preview 从 previewSrc 渲染嵌入式音频和视频预览，同时保留统一的 file-card 标题、类型/大小 metadata、surface 和下载操作。",
        "notification-duration-value-toggle":
          "NmorphNotificationProvider 的 duration indicator 现在支持 showDurationValue: false，仅显示进度条倒计时。",
        "video-preview-overlay-actions":
          "NmorphVideoPreview 现在通过 showPreviewAction/showFullscreenAction props 与 preview/fullscreen events 暴露 preview 和 fullscreen overlay actions。",
        "attachment-actions-polish":
          "Attachment previews 现在让文件图标保持弱化，play/pause 与 PDF eye controls 使用 contrast color，显示单一 upload action loader，并平衡 compact video FileCard 的垂直 padding。",
        "file-card-sandbox-all-types":
          "sandbox data 页面现在包含 NmorphFileCard 示例，覆盖 documents、images、audio、video、archives、loading、error 和 long filenames。",
        "file-card-image-media-preview":
          'NmorphFileCard 现在支持从 previewSrc 使用 media-preview="image"，并提供 compact visual thumbnails、共享 soft/plain surfaces、文件标题 overlays、size badges 和一致的 download actions。',
        "media-gallery-mixed-preview":
          "新增 NmorphMediaGallery，用于 fullscreen mixed image/video galleries，支持 typed items、active index control、keyboard navigation、video pause-on-change/close 行为和 sandbox examples。",
        "preview-portal-shared-flow":
          "NmorphImagePreview 和 NmorphMediaGallery 现在共享同一个 preview portal flow，因此 backdrop clicks、Escape closing、navigation arrows、image action bar controls 以及同步的 video play/pause overlays 行为一致。",
        "media-gallery-file-card-triggers":
          "NmorphMediaGallery 现在可以自行渲染 image/video trigger grid，并带有 FileCard 风格的文件名、大小标签、play overlay、preview、fullscreen 和 download actions。",
        "file-card-preview-mode":
          "NmorphFileCard 的 image 和 video previews 现在默认打开内部 NmorphMediaGallery，并可通过 preview-mode 使用 emit-only 或禁用 preview trigger。",
        "sandbox-media-downloads":
          "Sandbox media examples 现在为 audio 和 video 使用 download-safe href，让 download action 保存文件，而不是打开 cross-origin preview URL。",
        "media-card-visibility-sizing":
          "NmorphFileCard 和 NmorphMediaGallery 现在暴露 height 与 overlay visibility props，使 media cards、gallery triggers、info labels、actions 和 playback buttons 可按布局调整。",
        "file-card-actions-slot-align":
          "NmorphFileCard custom actions 现在在 visual、compact 和 regular cards 中使用同一个右上 action area，同时保留 PDF preview 和 default actions。",
        "video-playback-full-buffer":
          "NmorphVideoPreview 和 NmorphMediaGallery 现在只在视频完全缓冲后显示 play/pause overlays。",
        "divider-vertical-visibility":
          "NmorphDivider vertical dividers 现在会在 flex 和 grid layout 中拉伸。",
        "divider-original-styling":
          "NmorphDivider 已恢复原来的 theme shadow styling，同时保留 vertical divider 拉伸修复。",
        "guide-component":
          "新增 NmorphGuide 和 NmorphGuideStep，用于基于 tooltip 的协调式 walkthroughs，支持图片、分组 targets 和 previous/next controls。",
        "stepper-component":
          "新增 NmorphStepper，这是一个受控 horizontal stepper，一次显示一个 item，支持基于 transform 的 previous/next 移动、wheel、swipe、keyboard 和 indicator slots。",
        "audio-meter-equal-bars":
          "NmorphAudioMeter 现在在 silence 和 signal 状态下保持 bar 高度一致，同时保留 active color 与 opacity 行为。",
        "avatar-loader-text-color":
          "NmorphAvatar loading 图标现在继承 default text color，而不是强制使用 accent color。",
        "avatar-initials-text-color":
          "NmorphAvatar fallback initials 现在使用默认 text color，而不是 accent color。",
        "badge-flat-ribbon-radius":
          "NmorphBadge flat corner ribbons 现在渲染时没有圆角外边缘，而 corner ribbons 保留可见的 inner radius。",
        "empty-padding-token":
          "NmorphEmpty 现在拥有有效的默认 padding token，文本会留在内容区域内，docs 示例在窄屏下也会自动换行布局。",
        "docs-collapse-title-scope":
          "文档中的 Collapse 示例现在会保留可点击的 item title，同时 source code accordion 仍会隐藏自己的内部 title。",
        "sandbox-table-border-color":
          "Sandbox 表格示例不再应用 accent border override，因此视觉上更接近默认的 Nmorph table surface。",
        "docs-skeleton-loading-example":
          "Skeleton loading 文档示例现在会正确导入 NmorphSkeletonItem，因此启用 loading 时会渲染 loading placeholder。",
        "docs-css-type-links":
          "Docs API tables 现在会将 Width、Height、Padding、Color、Background 和 Transition-duration 等 CSS value types 链接到 MDN。",
        "docs-api-type-links":
          "Docs API tables 现在会自动链接已知的 attribute、expose 和 event 类型，过期的 component links 也会指向正确的元素 anchors。",
        "docs-example-english-source":
          "Docs 示例 source blocks 现在使用简单英文示例文本，而不是复制 runtime i18n expressions。",
        "nuxt-build-dir-isolation":
          "Docs 和 sandbox Nuxt production builds 现在写入 .nuxt-build，因此 build commands 不再覆盖正在运行的 dev-server metadata。",
        "dropdown-hide-shadow-prop":
          "NmorphDropdown 和 NmorphContextMenu 现在支持 hide-shadow，可渲染没有默认 neumorphic 阴影的菜单面板。",
        "backtop-teleport-styles":
          "NmorphBacktop 现在会把定位 CSS variables 保留在 teleport 后的按钮上，文档示例也加入了固定滚动区域，因此按钮可以正常出现。",
        "docs-void-expose-types":
          "Docs API tables 现在会把没有参数和返回值的 expose 方法显示为 void，而不是 () => void。",
        "docs-left-aside-scroll":
          "Docs 组件导航现在会在组件页面之间切换时恢复左侧 sidebar 的滚动位置。",
        "form-menu-option-height":
          "Autocomplete、Select slot options 和 TimePicker menu options 现在会让选项高度与控件 height 保持一致。",
        "file-upload-all-file-types":
          "NmorphFileUpload 现在默认接受所有文件，会按 MIME 或扩展名匹配 restricted types，并且只为图片文件渲染 image preview。",
        "pin-icon": "新增 NmorphIconPin 图标。",
        "card-header-slot-wrapper":
          "NmorphCard 现在只在提供 header slot 时渲染 header wrapper。",
        "card-combined-border-style":
          "NmorphCard 现在只为 combined shadow cards 转发 --nmorph-card-combined-border-width。",
        "send-icons":
          "新增 NmorphIconSend 和 NmorphIconSendFilled 纸飞机图标。",
        "message-action-icons":
          "新增用于聊天消息操作的 NmorphIconReply、NmorphIconReplyFilled、NmorphIconForward 和 NmorphIconForwardFilled。",
        "smile-icon": "新增 NmorphIconSmile，用于 emoji 图片和反应。",
        "scroll-gap-defaults":
          "NmorphScroll 现在默认将 xGapInPx 和 yGapInPx 设为 0，因此自定义滚动条默认贴边显示。",
        "image-preview-click-through":
          "NmorphImagePreview 现在会让预览空白区域关闭 overlay，而不是阻止 outside click。",
        "docs-localhost-open":
          "根 docs dev 脚本现在会在 127.0.0.1 打开 lib-docs，而不是 LAN 地址。",
        "autocomplete-close-clear-spacing":
          "NmorphAutocomplete 现在关闭时不会重新聚焦自身，打开列表时 clear action 仍可点击，并为 dropdown items 应用默认间距。",
        "badge-ribbon-type":
          "NmorphBadge 现在支持 ribbon 显示类型，用于可选择角落的斜向角标，并已添加 docs 和 sandbox 示例。",
        "badge-type-display-source":
          "NmorphBadge 现在使用 `type` prop 作为主要显示模式，包括 dot 和 tag，并将 offset props 转发到 ribbon CSS variables。",
        "badge-dot-css-variable":
          "NmorphBadge dot 尺寸现在来自 size variants 和 --nmorph-badge-dot-size CSS variable，不再使用 dotSize prop。",
        "badge-hide-on-falsy-value":
          "NmorphBadge 现在支持 hideOnFalsyValue，可在 value 为 falsy（包括 0）时隐藏 badge indicator。",
        "badge-ribbon-tilt":
          "NmorphBadge ribbon mode 现在支持通过 ribbonTilt 平放在角落、圆角 ribbon 边缘，并扩展了 docs 和 sandbox 示例。",
        "badge-ribbon-inner-radius-tiny":
          "NmorphBadge ribbon 现在仅在可见的内侧使用轻微 4px 圆角，tiny ribbons 会以更轻、更小的文字渲染。",
        "file-upload-controlled-reset":
          "NmorphFileUpload 现在会与 modelValue 同步内部文件列表，在重置、删除或 unsupported type 时清空原生 file input，并允许无需 :key reset 再次选择同一个文件。",
        "callout-size-props":
          "NmorphCallout 现在支持用于 padding、border radius、accent strip 宽度、title gap 以及 title/content 字号的 size props。",
        "file-upload-truncate-grid":
          "NmorphFileUpload 现在可在 grid 和 dialog layouts 中正确截断已选文件名，不再撑开整行。",
        "image-preview-closed-portal":
          "NmorphImagePreview 现在会让关闭状态的 preview portal 退出 hit testing，因此带 inline preview 的 dialog 仍可交互。",
        "file-upload-preview-flex":
          "NmorphFileUpload 现在使用 flexible file info 和固定的 preview/remove controls 布局已选图片行，避免在 dialog 中产生水平 overflow。",
        "dialog-indentation-03-padding":
          "NmorphDialog 现在使用 indentation-03 作为外层 padding。",
        "dialog-content-overflow-x":
          "NmorphDialog 现在会隐藏 content area 的水平 overflow，同时保留垂直内容滚动。",
        "card-content-class-prop":
          "NmorphCard 现在支持 contentClass，可直接为内容 wrapper 添加 class，无需穿透嵌套选择器。",
        "dialog-compact-section-padding":
          "NmorphDialog 现在使用 4px 外层 padding，并为 header 和 content 分别设置 4px padding。",
        "sandbox-component-examples":
          "Sandbox examples 现在通过 CSS variables 演示 badge dot 尺寸，并以 checkbox design 展示 checkbox group column 状态。",
        "notification-provider-z-index-stack":
          "NmorphNotificationProvider 现在默认跟随共享 z-index 栈，因此通知会显示在活动 overlay 和 dialog 之上。",
        "dialog-viewport-scroll":
          "NmorphDialog 现在会保持在 viewport 内，header 始终可见，并在 dialog body 内滚动溢出内容。",
        "sandbox-source-aliases":
          "Sandbox Nuxt dev/build 现在会从 library/src 解析 nmorph runtime imports，因此示例无需重建 dist 也能反映源码变更。",
        "empty-border-box":
          "NmorphEmpty 现在会把 padding 计入组件宽度，避免 empty state 内容贴近 grid 或 docs preview 的边缘。",
        "empty-state-component":
          "新增 NmorphEmpty 用于空状态，包含 typed props、slots、docs 和 sandbox examples。",
        "card-padding-prop":
          "NmorphCard 现在接受 cardPadding prop，并转发到 --card-padding CSS 变量；数值会转换为像素。",
        "card-fill-prop":
          "NmorphCard 默认填满可用宽度，并可在 fill 为 false 时贴合内容宽度。",
        "card-tag-prop":
          "NmorphCard 现在接受 tag prop，使根元素可渲染为 div、article、section 或其他 HTML 标签。",
        "css-variable-prop-overrides":
          "CSS variable overrides can now be passed through props for badges, tooltips, form controls, tables, progress, alerts, and related components.",
        "context-menu-neutral-hover":
          "NmorphContextMenu 现在会从基础 text color 推导默认选项 hover background，而不是使用 accent color；自定义颜色的选项仍使用自己的颜色。",
        "tooltip-z-index-stack":
          "NmorphTooltip 现在参与共享的自动 z-index stack，并支持显式 zIndex 覆盖。",
        "notification-provider-first-animation":
          "NmorphNotificationProvider 现在保持 placement transition groups 挂载，因此第一条 notification 会像后续通知一样动画显示。",
        "carousel-collapse-docs":
          "Carousel 和 Collapse 现在已加入组件 registry、文档页面、API tables、examples 和 sandbox checks。",
        "time-picker-component":
          "新增 NmorphTimePicker，包含 typed exports、locale strings、docs overview 和 sandbox examples。",
        "image-preview-overlay-fit":
          "NmorphImagePreview 会把 overlay content 保持在 preview portal 内，并用 contain sizing 限制打开后的图片。",
        "image-preview-control-visibility":
          "NmorphImagePreview 现在支持分别隐藏图库导航按钮和底部操作栏。",
        "compact-sandbox-visual-fixes":
          "修复 tag 删除按钮 cursor、number input 右侧按钮顺序、carousel loop、collapse 重新打开，以及 Windows scrollbar buttons。",
        "dev-open-workflow":
          "Root dev scripts 现在通过共享 helper 打开 docs 和 sandbox，Nuxt dev configs 也 stub Vue devtools API 以避免 devtools export error。",
        "context-menu-options-api":
          "NmorphContextMenu 现在支持文本、对象和组件 options，并内置菜单项布局、hover states、disabled handling 与 select events。",
        "context-menu-scroll-position":
          "NmorphContextMenu 的 click trigger 现在滚动时保持绑定到触发元素，指针打开的菜单会在 scroll 时关闭，自动宽度也会让菜单项左对齐。",
        "sandbox-nuxt-migration":
          "旧的 nuxt-sandbox workspace 已移除，主 sandbox 现在运行在 Nuxt 上，并通过与文档相同的 public API 展示 context menu。",
        "context-menu-trigger-modes":
          "NmorphContextMenu 现在支持 contextmenu、click 和 both trigger modes，修复无 v-model 的 uncontrolled 用法，并补充新 trigger API 文档。",
        "badge-min-width":
          "NmorphBadge 现在保持更宽的最小内容宽度，使单字符 badges 在紧凑布局中更易读。",
        "nuxt-hydration-warning-cleanup":
          "Nuxt docs integration 现在避免 theme switch hydration mismatches、duplicate vue-i18n registration warnings 和 noisy dev hook timing logs。",
        "docs-route-lazy-overviews":
          "文档 component overviews 现在按 route lazy-load，包括示例 source 与 icon data，因此 initial docs bundle 更小。",
        "library-entrypoints-tree-shaking":
          "库 package 现在提供独立 icons 与 styles entrypoints，CSS 保持 side effects 标记，避免消费者拉取未使用的图标或样式。",
        "context-menu-component":
          "新增基于 NmorphDropdown 的 NmorphContextMenu，支持指针定位、键盘 context menu、Escape/outside-click 关闭、API 文档和 sandbox 示例。",
        "overlay-focus-management":
          "基于 overlay 的 dialog、dropdown、select 与 autocomplete 现在共享 Escape handling、ARIA roles、outside-click behavior 和必要的 focus trap support。",
        "virtualization-keyboard-dynamic-height":
          "NmorphTable、NmorphSelect 与 NmorphAutocomplete 的虚拟化增强了键盘导航、dynamic item heights 和 scroll position 保留。",
        "date-format-flexibility":
          "NmorphDatePicker 与 calendar utilities 现在支持 nullable models，并可通过 Intl options、token patterns 或 formatter function 自定义日期格式。",
        "button-custom-color-hover":
          "NmorphButton 现在会保留 custom color prop，默认使用普通 text color，并从传入颜色推导 transparent hover color，而不是使用 accent。",
        "css-shadow-token-cleanup":
          "共享 shadow tokens 现在集中管理常用 inset/outset styles，减少组件和文档中的重复 CSS。",
        "image-preview-fullscreen-controls":
          "NmorphImagePreview 现在会在 fullscreen mode 中保持 preview 图片可见，让 gallery 和 zoom controls 位于 overlay 之上，并支持通过 backdrop 或 Escape 关闭。",
        "docs-example-source-files":
          "文档 attributes 示例现在使用共享的 `.example.vue` source 文件，因此 preview 与 highlighted code 会保持同步，不再复制 template 和 styles。",
        "docs-code-copy-fix":
          "文档 code blocks 现在保留正确的顶部间距，并通过 Clipboard API 复制完整示例 source，且带有 fallback。",
        "callout-docs-bottom-spacing":
          "NmorphCallout 不再在库内附带 bottom margin；docs 会在需要分隔 notices 的地方应用自己的 callout spacing。",
        "callout-default-bottom-spacing":
          "NmorphCallout 现在带有默认 bottom spacing，连续 callout 与后续内容不再贴在一起。",
        "storybook-sass-modern-api":
          "Storybook 和 library dev configs 现在使用 Dart Sass modern API，不再使用 deprecated legacy JS API。",
        "workspace-dev-script-fixes":
          "Docs 和 Storybook dev scripts 现在使用本地 host/path helpers，包含 asset/raw import typings，并避免将 Storybook 拉入默认 dev run。",
        "ci-pnpm-publish":
          "CI build 与 publish jobs 现在通过 pnpm 安装 workspace，并从准备好的 package 发布库。",
        "nuxt-theme-first-paint":
          "Nuxt 集成现在会在首次绘制前应用已保存的主题，注入 SSR theme/common styles，并避免 reload 时 light/dark 主题闪烁。",
        "backtop-teleport-safe-area":
          "NmorphBacktop 现在会 Teleport 到 body，支持 z-index 与 teleport target props，适配移动端 safe-area bottom，并避免在 scroll containers 内被裁切。",
        "ios-input-scrollbar-fixes":
          "Common styles 现在会阻止 iOS input auto-zoom，并让原生 scrollbar color scheme/thumb colors 与当前 Nmorph 主题保持一致。",
        "pnpm-turbo-docs-refresh":
          "仓库已迁移到 pnpm workspaces 与 Turbo scripts，Sass 使用 modern API，docs 也更新了 Guide/About、移动端导航、layout、search 和 code highlighting。",
        "virtualized-table-select-autocomplete":
          "NmorphTable、NmorphSelect 和 NmorphAutocomplete 现在支持大数据集虚拟化，可配置 item height 和 overscan。",
        "overlay-dropdown-teleport-placement":
          "NmorphOverlay 和 NmorphDropdown 现在通过 body Teleport 渲染，打开后会重新计算位置，并支持 bottom-end 等 end 对齐方式。",
        "nuxt-ssr-theme-runtime":
          "Nuxt 集成和 theme/browser hooks 已更新，可保留 SSR 标记，并将 browser-only 工作延后到客户端执行。",
        "compact-control-visual-fixes":
          "修复了 compact radio、checkbox、pagination、icon 和 color-picker 尺寸，使 disabled 与 extra-thin 控件保持对齐和可读。",
        "pagination-basic-height":
          "NmorphPagination 现在默认使用 basic 控件高度，因此页码控件会与分页按钮对齐。",
        "checkbox-radio-button-controls":
          "NmorphCheckbox 和 NmorphRadio 现在默认使用 button design，支持 extra-thin 高度，并会同步多个分组共享的 model。",
        "avatar-image-preview-cleanup":
          "NmorphAvatar 不再渲染隐藏的 preview trigger，NmorphImagePreview 也移除了 preview frame 阴影。",
        "nuxt-i18n-merge":
          "Nuxt module 现在会自动将 Nmorph 翻译合并到已有的 i18n instance 中。",
        "avatar-preview-resolve":
          "NmorphAvatar 现在会内部解析 NmorphImagePreview，因此直接导入组件时 avatar preview 也能正常工作。",
        "backtop-contrast-icon":
          "NmorphBacktop 的 common design 箭头图标现在使用 contrast text color。",
        "component-css-splitting":
          "组件 chunk 现在会导入自己的 CSS，直接导入单个组件时不再需要引入完整的库样式表。",
        "plugin-entry-styles-option":
          '新增 nmorph-ui-kit/plugin entry，可在不导入组件的情况下安装 plugin；Nuxt 可通过 `nmorph.styles: "all"` 选择完整样式表。',
        "remove-styled-components":
          "已从 Nmorph UI 组件中移除 styled-components，并用稳定的 Vue 标记和 SCSS 替代运行时生成的 styled 类。",
        "avatar-text-input-visual-fixes":
          "NmorphAvatar 图片圆角已与边框对齐，NmorphTextInput 中的 raw SVG prepend 图标也能正确渲染。",
        "nuxt-module":
          "新增 Nuxt module 支持，可通过 `nmorph-ui-kit/nuxt` 自动注册 plugin。",
        "image-preview-portal":
          "NmorphImagePreview 现在会通过 body 渲染 overlay，父级 isolation 和 stacking context 不再破坏 preview。",
        "text-input-prepend-icon":
          "NmorphTextInput 现在会正确设置 raw SVG prepend 图标的尺寸和颜色。",
        "docs-actions-align":
          "已对齐文档示例的 action 按钮，并移除 test coverage 路线图项。",
        "height-basic-name":
          "共享组件高度值从 `default` 重命名为 `basic`，并将组件默认值和文档更新为 thick、basic、thin。",
        "checkbox-radio-defaults":
          "NmorphCheckbox、NmorphCheckboxGroup、NmorphRadio 和 NmorphRadioGroup 现在默认使用 thin 高度；radio 控件现在默认渲染为圆形 radio。",
        "overlay-z-index-stack":
          "为 overlay、dropdown、select、dialog、date picker、autocomplete 和 image preview 新增共享的自动 z-index 栈。",
        "overlay-z-index-props":
          "基于 overlay 的 Nmorph 组件现在支持 `zIndex`，库安装选项也可以设置共享 z-index 栈的基准值。",
        "text-input-clear-space":
          "NmorphTextInput 现在会为清除/密码按钮预留空间，窄输入框中 placeholder 不再被遮挡。",
        "checkbox-height":
          "NmorphCheckbox 和 NmorphCheckboxGroup 现在支持 `height`，可使用 thin、basic 和 thick 组件尺寸。",
        "radio-height":
          "NmorphRadio 和 NmorphRadioGroup 现在支持 `height`，可使用 thin、basic 和 thick 组件尺寸。",
        "avatar-preview":
          "NmorphAvatar 现在支持点击预览图片，并可通过 `src` 或 `previewSrc` 传入多张图库图片。",
        "callout-spacing": "NmorphCallout 默认不再添加底部 margin。",
        "media-control-icons":
          "新增媒体控制图标：play、pause、stop、record，以及方形 exit 替代图标。",
        "select-fill-options-width":
          "NmorphSelect 现在支持 `fill` 和 `optionsWidth`，可撑满容器宽度、截断过长的 option label，或让 dropdown 选项按内容自动扩展。",
        "select-loading-disabled":
          "NmorphSelect 现在会在 loading 时禁用原生 input，并在开始 loading 时关闭 dropdown。",
        "dropdown-size-css-values":
          "NmorphDropdown 的宽度 props 现在支持 CSS 字符串，并新增 min-width 与 max-width。",
        "form-control-transition-cleanup":
          "NmorphColorPicker 和 NmorphSwitch 不再为 background 与 shadow 变化添加动画，因此主题更新会立即生效。",
        "callout-status-types":
          "NmorphCallout 的 title 现在可选，并支持 success 与 error 状态颜色。",
        "theme-runtime-api":
          "新增 runtime 主题 API：`setThemeColors` 和 `applyTheme` 会更新 Nmorph 管理的 style 标签，不会向 html 写入 inline styles。",
        "theme-options-typing":
          "整理了主题类型：安装选项与单个主题的颜色选项分开类型化，并安全处理缺失的 theme config。",
        "callout-component":
          "新增 NmorphCallout，并加入库导出、文档、组件概览和 sandbox。",
        "select-button-fill":
          "NmorphSelectButton 现在支持 `fill` prop，可让选项撑满容器宽度。",
        "badge-size":
          "NmorphBadge 现在支持 `size` prop，提供 tiny、extra-small 和 base 三种尺寸。",
        "guide-css-variables-utilities":
          "更新 Guide 中的 CSS 变量参考，并将 utility classes 简化为类名和用途说明。",
        "docs-mobile-menu-fit-content":
          "文档侧边菜单现在会按内容自适应宽度，移动端 header 对齐也已调整。",
        "avatar-name-initials":
          "NmorphAvatar 现在支持 `name` prop，并在没有可用图片时渲染生成的首字母。Avatar 文档已补充 API 和示例。",
        "notification-provider-placement-per-notification":
          "NmorphNotificationProvider 现在支持在每条通知上设置 `placement`，一个 provider 即可在不同屏幕位置渲染通知。",
        "notification-provider-quantity-leave-style":
          "修复超过 `quantity` 时的通知移除：离场 alert 在过渡期间会保留图标尺寸、颜色和布局。",
        "button-transparent-hover-icons":
          "Transparent NmorphButton 悬停时现在会用 accent 色同时高亮文本和图标。",
        "badge-z-index":
          "NmorphBadge 现在支持通过 `zIndex` prop 控制徽标层级。",
        "color-picker-display-format":
          "NmorphColorPicker 现在可通过 `displayFormat` prop 将所选颜色显示为 hex、RGB 或 HSL。",
        "file-upload-model-custom-data":
          "NmorphFileUpload 现在会在 `v-model` 中保留文件预览数据，选择和移除文件时会遵守 disabled 状态，并使用 icon-only 删除按钮插槽。",
        "slider-pointer-events":
          "NmorphSlider 现在使用 pointer events，改善触摸拖动并在卸载时清理 document listeners。",
        "scroll-thumb-theme-color":
          "NmorphScroll 滑块颜色现在默认使用主题文字颜色，并可通过 `scrollThumb` / `--nmorph-scroll-thumb-color` 配置。",
        "color-picker-fixed-value-width":
          "NmorphColorPicker 现在以固定宽度格式显示 hex 值，相同长度的值不会改变组件宽度。",
        "scroll-default-height-100":
          'NmorphScroll 现在默认使用 `height="100%"`，API 文档和说明文案也已与这一行为保持一致。',
        "scroll-typing-fixes":
          "修复了 NmorphScroll 的 TypeScript 类型：访问容器尺寸和滚动坐标时不再出现 `undefined` 错误，`moveTo` 与 `scrollDOMContainer` 的公开 expose 类型也已整理。",
        "notification-provider-close-animation":
          "NmorphNotificationProvider 现在会在关闭动画期间保留 alert 样式、维持垂直堆叠布局，并避免通知移除时出现突兀的重排。",
        "notification-provider-uuid-ids":
          "useNmorphNotification 现在会为通知生成基于 UUID 的 id，避免短时间内连续创建多个通知时发生冲突。",
        "button-icon-slots-breaking":
          "破坏性变更：NmorphButton 的插槽 API 已拆分。`icon` 现在用于在内容左侧渲染前置图标，纯图标按钮必须使用新的 `icon-only` 插槽。",
        "otp-input-component":
          "新增 NmorphOTPInput，并补充了文档与 sandbox 示例。该组件复用了 NmorphTextInput 的样式，并支持粘贴、键盘导航和 complete 事件。",
        "form-autocomplete-forwarding":
          "NmorphFormItem 现在会把 autocomplete 透传给内部表单控件，相关组件的 API 文档也已同步更新。",
        "text-input-composition-api":
          "NmorphTextInput 现在公开 focus、blur、select 方法，并支持向内部 input 透传额外的原生属性，便于组合式控件如 OTP input 使用。",
        "avatar-fallback-prop":
          "NmorphAvatar 现支持 fallback 组件 prop，默认回退为 NmorphIconAvatar，avatar API 文档也已同步更新。",
        "button-fill-transparent-color":
          "NmorphButton 的 fill 现在会稳定撑满容器宽度，transparent 按钮也支持通过 color prop 自定义文字和图标颜色。",
        "badge-value-slot":
          "NmorphBadge 现在允许 `value` 为 `undefined`，在没有值时会隐藏自身，并支持通过 `value` 插槽自定义徽标内容。文档和 sandbox 已新增对应示例。",
        "scroll-height-100":
          '当父级具有明确高度时，NmorphScroll 现在可以正确处理 `height="100%"`，文档中也补充了固定高度与相对高度的示例。',
        "theme-config-contrast-types":
          "theme config 的类型与文档已和运行时行为保持一致：`focusText` 现在具有正确类型，`placeholderText`、`semiContrastText` 和 `contrastText` 也已加入主题示例。",
        "select-button-no-theme-transition":
          "NmorphSelectButtonItem 不再对 background 和 box-shadow 做过渡动画，因此切换主题时会像库中的其他组件一样立即完成。",
        "radio-optional-inject-types":
          "修复了 NmorphRadio 的 inject 类型：当未处于 radio group 中时，独立使用不会再触发 TypeScript 错误。",
        "color-picker":
          "新增 NmorphColorPicker 组件、对应文档页面，以及高度、数值显示、disabled 状态和主题 accent 默认色的示例。",
        "badge-tag-mode":
          "为 NmorphBadge 新增 `is-tag` 模式，可将徽标作为独立元素渲染，而不是绝对定位的覆盖层。",
        "badge-undefined-hidden":
          "NmorphBadge 在 `value` 为 `undefined` 时将不再渲染；`is-dot` 点状模式仍可在无值时显示。",
        "exit-users-icons":
          "图标集和图标文档页新增了 NmorphIconExit 与 NmorphIconUsers。",
        "form-boolean-compare":
          "表单校验规则现在支持在 `compareValue` 中传入 boolean，表单 API 文档也已同步更新。",
        "image-src-optional":
          "NmorphImage 的 `src` 在公开类型中已改为可选，image API 文档也已与运行时行为保持一致。",
        "select-button-keyboard-focus":
          "NmorphSelectButtonItem 现在支持键盘操作：Tab 可聚焦每个选项，Space/Enter 可选中，聚焦时显示 outline 轮廓。",
        "tabindex-prop":
          "在 INmorphCommonInputProps 中新增 tabindex prop——所有表单控件（NmorphTextInput、NmorphSwitch、NmorphSlider、NmorphNumberInput、NmorphSelect、NmorphSelectButtonItem）现均支持 tabindex。",
        "form-item-input-inheritance":
          "表单控件现在会自动继承 NmorphFormItem 的 id 和 name，因此无需手动透传 prop 也能正确关联 label 与原生表单属性。",
        "text-input-autofill-styles":
          "修复了 NmorphTextInput 的 autofill 样式，浏览器自动填充不再覆盖新拟态阴影和字段颜色。",
        "google-icon": "新增 NmorphIconGoogle 图标。",
        "contrast-text-colors":
          "在默认浅色和深色主题中新增 --nmorph-semi-contrast-text-color 和 --nmorph-contrast-text-color CSS 变量。",
        "form-item-label-for":
          "NmorphFormItem 的 label 标签现通过 NmorphTextInput 的 inputId prop 正确关联到输入框。",
        "error-box-single-error":
          "NmorphErrorBox 现在只显示最相关的一条错误，而不是所有错误。",
        "validation-icon-fix":
          "修复 NmorphValidationIcon 不渲染的问题：图标组件被错误地以字符串形式传递。",
        "select-button-unselected-opacity":
          "NmorphSelectButton：未选中项现在呈半透明状态，视觉反馈更清晰。",
        "select-button":
          "新增 NmorphSelectButton 组件——支持插槽和 options prop 的分段按钮组。",
        "engines-range":
          "放宽了包的 engines 要求，以支持较新的 Node 与 npm 版本。",
        "skeleton-animation":
          "修复 Skeleton 加载动画：在 loading 启用时 shimmer 正常工作。",
        "export-en-locale": "在包入口新增英文语言包的导出。",
      },
    },
    "known-bugs": {
      title: "已知问题",
      items: {},
    },
  },
  "guide-menu": {
    "quick-start": "快速开始",
    config: "配置",
    other: "其他",
  },
  overview: {
    "basic-usage": "基础使用",
    basic: "基础",
    off: "关",
    on: "开",
    one: "一",
    two: "二",
    three: "三",
    four: "四",
    disabled: "禁用",
    "disabled-thin": "禁用",
    thick: "厚",
    default: "默认",
    thin: "薄",
    "i-am-ripple": "我有涟漪效果",
    "i-am-ripple-with-hover-bg": "我有涟漪效果和悬停背景",
    "i-am-not-ripple": "我没有涟漪效果",
    circle: "圆形",
    round: "圆角",
    square: "方形",
    transparent: "透明",
    date: "日期",
    dates: "日期",
    "date-range": "日期范围",
    summer: "夏季",
    "load-error": "加载错误",
    show: "显示",
    edit: "编辑",
    check: "检查",
    "without-underline": "无下划线",
    underlined: "带下划线",
    "selected-page": "选定页面：",
    loading: "加载中...",
    "i-am-slot-prefix": "我是插槽前缀",
    add: "添加",
    remove: "移除",
    animated: "动画",
    "loading-state": "加载状态",
    value: "值：",
    "sort-values": "排序值",
    "custom-label": "自定义标签",
    "custom-content-for": "自定义内容为",
    "tag-zero": "标签零",
    "tag-one": "标签一",
    "tag-two": "标签二",
    "i-am-disabled": "我被禁用",
    "enter-text": "输入文本",
    "model-text": "模型文本：",
    "explore-components": "探索组件",
    button: {
      design: {
        subtitle: "使用 *nmorph* 或 *plain* 定义视觉样式。",
      },
      borderless: {
        subtitle: "移除 plain 按钮的可见边框，同时保留 plain 表面。",
      },
      loading: {
        subtitle: "使用 *boolean* 来启用或禁用加载图标。",
      },
      ripple: {
        subtitle: "使用 *boolean* 来启用或禁用点击时的涟漪效果。",
      },
      thickness: {
        subtitle: "设置厚度，支持值 *thick*, *basic*, *thin*。",
      },
      disabled: {
        subtitle: "使用 *boolean* 来禁用按钮。",
      },
      "icon-slots": {
        subtitle:
          "`icon` 插槽现在会把图标渲染在内容左侧，`icon-only` 则专门用于纯图标按钮模式。",
      },
      shape: {
        info: {
          title: "信息",
          content: "使用 round 或 square 时，大小遵循所选 thickness。",
        },
        subtitle: "使用 shape 来改变按钮的边框半径。",
      },
      api: {
        type: "原生按钮类型",
        text: "按钮文本",
        loading: "启用/禁用加载器",
        design: "更改按钮样式",
        borderless: "当 design 为 plain 时移除可见边框",
        color: "更改 plain 按钮的文字和图标颜色",
        "accent-bg-on-hover": "启用/禁用悬停时的背景色",
        ripple: "启用/禁用点击时的涟漪效果",
        fill: "用按钮填充容器",
        disabled: "禁用按钮",
        thickness: "更改按钮厚度",
        shape: "更改形状",
      },
      slot: {
        default: "按钮的主要内容",
        append: "主要内容右侧的自定义内容",
        icon: "显示在主要内容左侧的前置图标",
        "icon-only": "纯图标按钮模式。会隐藏 default、text 和 append 内容",
      },
      variables: {
        height: "Button height",
      },
      exposes: {
        buttonDOMElement: "原始按钮 DOM 元素",
      },
    },
    icon: {
      "search-icon": "查找图标",
      size: {
        subtitle: "图标大小。定义高度和宽度。",
      },
      "width-height": {
        subtitle: "定义图标的宽度和高度。",
      },
      color: {
        subtitle: "图标颜色。您可以使用自定义颜色或传递可用的变量。",
      },
      api: {
        size: "图标大小。定义高度和宽度",
        width: "设置图标的宽度",
        height: "设置图标的高度",
        color: "定义图标颜色",
        icon: "从可用图标列表中设置图标",
      },
      slot: {
        default: "自定义图标内容的插槽",
      },
      variables: {
        color: "定义图标颜色",
      },
    },
    link: {
      type: {
        subtitle: "颜色类型：*accent*, *success*, *error*, *warning*。",
      },
      underline: {
        subtitle: "链接下划线。",
      },
      disabled: {
        subtitle: "链接的非活动状态。",
      },
      "icon-name": {
        subtitle: "通过图标名称在链接文本前添加图标。",
      },
      api: {
        type: "颜色类型",
        href: "原生 href 属性",
        underline: "悬停时显示下划线",
        "icon-name": "图标列表中的名称",
        target: "原生 target 属性",
        rel: "anchor 的原生 rel 属性",
        referrerpolicy: "anchor 的原生 referrerpolicy 属性",
        download: "anchor 的原生 download 属性",
        "aria-label": "内部链接的可访问名称",
        title: "anchor 的原生 title 属性",
        disabled: "禁用链接",
        color: "Overrides the link color",
      },
      slot: {
        default: "链接的自定义内容",
        prepend: "在开头添加自定义内容",
        icon: "图标位置",
      },
      variables: {
        "link-color": "链接颜色",
      },
    },
    scroll: {
      height: {
        subtitle:
          "默认值是 `100%`。使用 *height* 属性设置容器高度。支持 `300px` 这类固定值，也支持在父级有明确高度时使用 `100%`。",
      },
      "max-height": {
        subtitle: "只有当元素的高度超过最大高度时，才会显示滚动条。",
      },
      "model-value": {
        subtitle: "用于模型的双向数据绑定的属性。",
      },
      "horizontal-scroll": {
        subtitle: "如果元素的宽度超过滚动区域的宽度，则会出现水平滚动条。",
      },
      api: {
        height: "设置滚动容器的高度",
        "max-height": "设置滚动容器的最大高度",
        "model-value": "包含当前滚动位置，用于双向绑定和滚动控制",
        "scroll-y-prop": "定义垂直滚动行为，例如 *auto* 或 *hidden*",
        "scroll-x-prop": "定义水平滚动行为，例如 *auto* 或 *hidden*",
        "css-scroll-behavior": "定义滚动动画行为，例如 *smooth* 以实现平滑滚动",
        "scroll-end-delay": "滚动结束前的延迟（毫秒）",
        "update-only-on-scroll-end":
          "设置为 *true* 时，仅在滚动结束后更新模型值",
        "y-bar-width-in-px": "垂直滚动条的宽度",
        "x-bar-width-in-px": "水平滚动条的宽度",
        "y-gap-in-px": "垂直滚动条的内容间距",
        "x-gap-in-px": "水平滚动条的内容间距",
      },
      slot: {
        default: "滚动内容",
      },
      variables: {
        "thumb-color": "滚动条滑块颜色。默认使用 --nmorph-scroll-thumb-color",
      },
      exposes: {
        scrollDOMContainer: "容器的 DOM 元素",
        moveTo: "设置新坐标的函数",
      },
      events: {
        "update:model-value": "拦截双向绑定的事件",
        "on-scroll-end": "滚动动画结束后的事件",
        "on-scroll": "滚动事件",
      },
    },
    avatar: {
      size: {
        subtitle: "设置头像尺寸，接受 *number* 类型值。",
      },
      shape: {
        subtitle: "定义头像形状，可为 *circle* 或 *square*。",
      },
      fit: {
        subtitle: "定义图片在容器中的显示方式。",
      },
      name: {
        subtitle: "用于在没有图片时生成 fallback 首字母。",
      },
      preview: {
        subtitle:
          "点击头像时打开图片预览。`src` 和 `previewSrc` 可传入字符串或字符串数组。",
      },
      api: {
        size: "Sets the size of the avatar",
        shape: "Defines the shape of the avatar",
        design: "定义头像的视觉样式",
        borderless: "当 design 为 plain 时移除可见边框",
        src: "头像图片 URL 或预览图库 URL",
        name: "Name used to generate fallback initials",
        preview: "启用点击图片预览",
        "preview-src": "仅用于预览的图片 URL 或 URL 列表",
        "preview-initial-index": "预览图库的初始图片索引",
        "preview-scale-step": "预览缩放步长",
        "preview-min-scale-level": "预览最小缩放级别",
        "preview-max-scale-level": "预览最大缩放级别",
        "src-set": "List of image sources",
        alt: "Text description of the image",
        fit: "定义图片如何填充容器",
        "frame-border": "Defines the thickness of the frame",
        "image-padding": "Inner padding",
        fallback:
          "图片加载失败或未提供 src 时显示的组件。默认使用 NmorphIconAvatar",
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
          "徽标上显示的值，可以是 *string* 或 *number*。如果未传入且没有 `value` slot，非 dot 徽标不会渲染。",
      },
      "value-slot": {
        subtitle:
          "通过 `value` slot 完全替换徽标内部内容。Slot props 暴露 `value` 和 `displayValue`，适用于 default、ribbon 和 tag 模式。",
      },
      max: {
        subtitle: "徽标最大值。若设置为数字且实际值超过该值，将显示为 max+。",
      },
      type: {
        subtitle: "在 default、dot、tag 和 ribbon badge 显示之间切换。",
      },
      "ribbon-corner": {
        subtitle: "选择 diagonal ribbon badge 使用的角落。",
      },
      "ribbon-tilt": {
        subtitle: "控制 ribbon badge 是斜向显示，还是平放在选定角落。",
      },
      "is-dot": {
        subtitle: "设为 *true* 时将徽标显示为小圆点，即使省略 `value` 也生效。",
      },
      "is-tag": {
        subtitle:
          "将徽标显示为不依附 default slot 的独立元素；此模式会忽略 offset。",
      },
      hidden: {
        subtitle: "Controls the visibility of the badge.",
      },
      color: {
        subtitle: "Background color of the badge.",
      },
      size: {
        subtitle: "通过 font-size 变量控制徽标文字大小。",
      },
      offset: {
        subtitle: "徽标相对父元素的水平/垂直偏移。",
      },
      api: {
        value: "徽标显示的值。如果为 undefined 且 type 不是 dot，则隐藏徽标",
        max: "Maximum value to display",
        type: "设置 badge 显示类型：default、dot、tag 或 ribbon",
        "ribbon-corner": "当 type 为 ribbon 时设置 ribbon 角落",
        "ribbon-tilt": "启用时让 ribbon 斜向显示，禁用时平放在选定角落",
        "is-dot": "Displays the badge as a dot",
        "is-tag":
          "将徽标切换为独立 tag 模式，不使用 absolute positioning 或 default slot",
        hidden: "Hides the badge",
        "hide-on-falsy-value":
          "当 value 为 falsy 时隐藏徽标指示器，包括 0 和空字符串。",
        color: "Sets the background color of the badge",
        size: "设置徽标文字大小：tiny、extra-small、base、medium、large 或 extra-large",
        "z-index": "Defines the stacking order of the badge",
        "offset-y":
          "徽标垂直偏移。对于 ribbon，用于控制 ribbon 位置。type 为 tag 时忽略",
        "offset-x":
          "徽标水平偏移。对于 ribbon，用于控制 ribbon 位置。type 为 tag 时忽略",
      },
      slot: {
        default: "徽标附着的包裹内容。`type` 为 `tag` 时不使用。",
        value:
          "徽标内的自定义内容，用于替代纯 `value`。仅在 overlay 模式下生效。",
      },
      variables: {
        "nmorph-badge-dot-size": "Width and height of the dot",
        "nmorph-badge-ribbon-height": "ribbon badge 条带高度",
        "nmorph-badge-ribbon-width": "ribbon badge 条带宽度",
        "nmorph-badge-ribbon-corner-size": "用于定位 ribbon 条带的角落区域尺寸",
        "nmorph-badge-ribbon-offset-x": "ribbon 角落区域的手动水平偏移",
        "nmorph-badge-ribbon-offset-y": "ribbon 角落区域的手动垂直偏移",
      },
    },
    card: {
      "shadow-type": {
        subtitle: "Defines the shadow type for the card.",
      },
      "card-padding": {
        subtitle: "Sets the card padding.",
      },
      paper: {
        subtitle:
          "添加柔和的纸张纹理。0 会禁用效果，数值越大效果越强。",
      },
      fill: {
        subtitle: "控制卡片是拉伸到可用宽度，还是贴合自身内容。",
      },
      tag: {
        subtitle: "更改卡片根元素使用的 HTML 标签。",
      },
      api: {
        "shadow-type": "定义卡片阴影的可见性。",
        "card-padding": "覆盖卡片 padding。数字会按像素处理。",
        "content-class": "为卡片内容包裹层添加自定义 class。",
        paper: "纸张纹理强度。0 禁用效果，数值越高越明显。",
        "combined-shadow-border-width":
          "仅在 shadow-type 为 combined 时使用的边框宽度。",
        fill: "为 true 时卡片占用可用宽度。设为 false 时贴合内容宽度。",
        tag: "HTML tag used for the card root element.",
      },
      slot: {
        header: "卡片头部。只有提供该 slot 时才渲染 header wrapper。",
        footer: "Card footer",
      },
      variables: {
        "card-padding": "Padding for all edges",
      },
    },
    empty: {
      "basic-usage": {
        subtitle:
          "展示带默认内容、自定义图标、操作区以及 plain 或 nmorph 表面的空状态。",
      },
      api: {
        title: "Main empty state title.",
        description: "Secondary empty state message.",
        "icon-size": "默认图标尺寸。数字会按像素处理。",
        "min-height": "空状态最小高度。数字会按像素处理。",
        padding: "空状态内部 padding。数字会按像素处理。",
        design: "空状态表面的视觉设计。",
        "shadow-type": "design 为 nmorph 时使用的 Nmorph 阴影。",
        "hide-icon": "隐藏默认图标。提供 icon slot 时仍会渲染。",
        role: "应用到空状态容器的 ARIA role。",
        "aria-label": "无障碍标签。省略时回退为 title。",
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
          "定义图像如何适应容器。接受的值包括 *fill*, *contain*, *cover*, *none*, *scale-down*。",
        info: {
          title: "信息",
          content: "为了确保 'fit' 属性正确显示，请确保容器具有固定大小。",
        },
      },
      "loading-text": {
        subtitle: "图像加载期间显示的加载图标。",
      },
      "load-failed-text": {
        subtitle: "图像加载失败时显示的文本。",
      },
      api: {
        fit: "定义图像如何适应容器。",
        "close-on-outside-click": "点击容器外部时关闭预览。",
        alt: "图像的文本描述。",
        "loading-text":
          "已弃用。图像加载现在显示加载图标；如需自定义内容，请使用 loading 插槽。",
        "load-failed-text": "图像加载失败时显示的文本。",
        "frame-border": "定义边框的厚度。",
        "image-padding": "定义图像的内边距。",
        src: "图像 URL。",
        "src-set": "图像源列表。",
      },
      slot: {
        loading: "自定义内容插槽，显示在图像加载时。",
        error: "自定义内容插槽，显示在图像加载失败时。",
      },
      variables: {
        width: "定义图像的宽度。",
        height: "定义图像的高度。",
        "background-color": "定义图像的背景颜色。",
      },
      events: {
        error: "图像错误事件。",
        load: "图像加载事件。",
      },
      translates: {
        loadFailedText: "加载图像失败。",
      },
    },
    layout: {
      "basic-usage": {
        subtitle: "让 header、aside、main 和 footer 区域在示例卡片内撑满宽度。",
      },
    },
    "tag-list": {
      "basic-usage": {
        subtitle:
          "展示可移除标签、可选择的 plain 标签，以及带自定义内容的紧凑行。",
      },
      api: {
        "model-value": "标签列表",
        design: "定义列表中标签的默认视觉样式",
      },
      events: {
        "update:model-value": "拦截双向绑定的事件",
        close: "返回关闭标签的值",
      },
    },
    "tag-item": {
      text: {
        subtitle: "定义组件中显示的文本内容。",
      },
      removable: {
        subtitle: "定义组件是否可以被用户删除。接受 *boolean*。",
        info: {
          title: "信息",
          content:
            "如果你希望标签显示自动处理，可以将组件包装在 NmorphTagList 中。",
        },
      },
      thickness: {
        subtitle: "定义组件的厚度。",
      },
      design: {
        subtitle:
          "如果设置为 *plain*，组件将使用普通 token 背景，并使用高对比度文本和图标。",
      },
      api: {
        value: "定义组件的标识符值",
        text: "设置组件内部显示的文本",
        removable:
          "定义组件是否可以删除。将其包装在 NmorphTagList 中时自动工作。",
        design: "定义组件的样式",
        thickness: "设置组件的厚度",
      },
      events: {
        close: "返回关闭标签的值",
      },
    },
    carousel: {
      api: {
        loop: "从最后一张循环到第一张，也可以从第一张循环到最后一张",
      },
      events: {
        change: "返回当前激活 slide 的索引",
      },
    },
    "carousel-item": {
      api: {
        name: "carousel registry 使用的唯一 slide 名称",
      },
    },
    collapse: {
      "basic-usage": {
        subtitle: "展示普通、禁用和自定义标题面板，并在标题右侧显示 chevron。",
      },
      api: {
        "model-value": "当前打开的面板名称",
        accordion: "同一时间只允许打开一个面板",
      },
      events: {
        "update:model-value": "打开的面板变化时触发",
      },
    },
    "collapse-item": {
      api: {
        name: "collapse model 使用的唯一面板名称",
        title: "面板标题文本",
        disabled: "禁用面板",
        block: "设置为 true 时禁止切换面板",
        thickness: "设置标题厚度",
        "transition-speed":
          "覆盖面板打开和关闭的 transition 速度。数字会按毫秒处理",
      },
      variables: {
        "transition-speed": "Panel content transition speed",
      },
      slot: {
        default: "面板内容",
        title: "自定义面板标题",
      },
    },
    "emoji-picker": {
      "basic-usage": {
        subtitle: "展示带搜索和已选值的 emoji 选择器。",
      },
    },
    "audio-preview": {
      "basic-usage": {
        subtitle: "展示带名称、时长和默认操作的内嵌音频预览。",
      },
    },
    "audio-meter": {
      "basic-usage": {
        subtitle: "请求麦克风并把实时音量传给 bars、line 和 ring 变体。",
      },
    },
    "media-gallery": {
      "basic-usage": {
        subtitle:
          "展示包含图片和视频的混合画廊，带更精致的 trigger cards 和 preview overlay。",
      },
    },
    "media-tile": {
      "basic-usage": {
        subtitle: "展示通话 UI 中的视频 tile、fallback tile 和 loading 状态。",
      },
    },
    "video-preview": {
      "basic-usage": {
        subtitle: "展示带 poster、metadata 和内部 preview overlay 的视频预览。",
      },
    },
    "file-card": {
      "basic-usage": {
        subtitle:
          "展示 document、image-preview 和 loading 文件卡片的响应式一行。",
      },
    },
    guide: {
      "basic-usage": {
        subtitle: "展示绑定到包装目标元素的两步 guide。",
      },
    },
    "guide-step": {
      "basic-usage": {
        subtitle:
          "展示 guide step 如何包装目标元素并提供 fallback 卡片内容。",
      },
    },
    stepper: {
      "basic-usage": {
        subtitle: "展示带自定义 indicator slot 的受控 step navigation。",
      },
    },
    text: {
      "basic-usage": {
        subtitle:
          "展示 typography variants、color roles 和 truncation 的紧凑堆叠。",
      },
    },
    skeleton: {
      animated: {
        subtitle: "如果设置为 *true*，启用骨架组件的动画。",
      },
      loading: {
        subtitle: "控制骨架的显示。",
      },
      rows: {
        subtitle: "定义骨架中的行数，通常用于模拟文本内容。",
      },
      api: {
        animated: "启用骨架组件的动画",
        loading: "定义骨架是否显示。",
        rows: "设置骨架中的行数。",
        "loading-gradient": "Overrides the skeleton loading gradient",
      },
      slot: {
        template: "加载期间自定义骨架结构的插槽。",
        default: "加载完成后默认插槽内容。",
      },
      variables: {
        "loading-gradient": "定义在骨架加载动画期间使用的渐变颜色。",
      },
    },
    "skeleton-item": {
      api: {
        variant: "定义要显示的骨架类型，例如文本或圆形。",
        design: "定义骨架项的设计。",
        width: "设置骨架项的宽度。",
        height: "设置骨架项的高度。",
      },
    },
    progress: {
      type: {
        subtitle: "定义进度指示器的类型，例如 *linear* 或 *circle*。",
      },
      color: {
        subtitle: "设置进度指示器的颜色。",
      },
      percentage: {
        subtitle: "定义已完成的进度百分比。",
        info: {
          title: "信息",
          content: "确保设置了包装容器的宽度，以便正确显示。",
        },
      },
      "value-inside": {
        subtitle: "如果设置为 *true*，则在进度条内显示进度文本。",
      },
      "value-right-side": {
        subtitle: "显示或隐藏进度指示器旁边的百分比文本。",
      },
      indeterminate: {
        subtitle: "当设置为 *true* 时，显示不确定的进度动画。",
      },
      "circle-size": {
        subtitle: "定义圆形进度指示器的大小。",
      },
      api: {
        type: "指定进度指示器的类型",
        color: "设置进度指示器的颜色",
        percentage: "设置进度的百分比",
        height: "覆盖线性 progress bar 高度。数字会按像素处理",
        "width-transition": "覆盖线性 progress bar 使用的 width transition",
        "indeterminate-animation": "覆盖 indeterminate progress 使用的动画",
        "value-inside": "在进度条内显示进度文本",
        "value-right-side": "显示或隐藏右侧的百分比文本",
        indeterminate: "启用不确定进度动画",
        "circle-size": "设置圆形进度指示器的大小",
      },
      slot: {
        "inner-text": "进度指示器内部的自定义内容插槽。",
        "right-side": "进度指示器右侧的自定义内容插槽。",
        "circle-inner-part": "圆形进度指示器内部的自定义内容插槽。",
      },
      variables: {
        height: "定义进度指示器的宽度。",
        "width-transition": "设置进度动画。",
        animation: "控制进度指示器动画的设置。",
      },
    },
    calendar: {
      type: {
        subtitle: "定义日历的类型，例如 *date* 或 *dates* 选择。",
      },
      "custom-content": {
        subtitle: "",
      },
      range: {
        subtitle: "设置显示日历的边界。",
      },
      api: {
        "mark-today": "突出显示今天的日期",
        "initial-date": "设置日历中显示的初始日期",
        "model-value": "表示日历中选定的日期",
        type: "定义日历中的选择类型",
        "cell-height": "覆盖每个日期单元格的高度。数字会按像素处理",
        range:
          "启用日历中的范围选择模式，允许选择日历中的日期范围。不是选定的范围，而是显示的日历范围。",
      },
      slot: {
        header: "日历标题插槽",
        content: "日历内容插槽",
      },
      variables: {
        "table-data-cell-height": "定义日历中每个日期单元格的高度",
      },
      translates: {
        sun: "星期日",
        mon: "星期一",
        tue: "星期二",
        wed: "星期三",
        thu: "星期四",
        fri: "星期五",
        sat: "星期六",
        jan: "一月",
        feb: "二月",
        mar: "三月",
        apr: "四月",
        may: "五月",
        jun: "六月",
        jul: "七月",
        aug: "八月",
        sep: "九月",
        oct: "十月",
        nov: "十一月",
        dec: "十二月",
      },
    },
    "image-preview": {
      "model-value": {
        subtitle: "控制图像预览的可见性。",
      },
      "initial-index": {
        subtitle: "定义多个图像时的初始图像索引。",
      },
      src: {
        subtitle: "图像预览的 URL 地址。",
      },
      api: {
        "model-value": "切换图像预览可见性的布尔值",
        alt: "图像无法加载时的文本描述",
        "initial-index": "显示的第一张图像的索引",
        src: "图像预览的 URL 地址",
        "scale-step": "图像缩放步长",
        "min-scale-level": "定义图像的最小缩放级别",
        "max-scale-level": "定义图像的最大缩放级别",
        "z-index": "定义覆盖层的 z-index。未传入时使用共享的自动 z-index 栈",
        "show-trigger": "定义是否渲染默认的预览触发器",
        "show-navigation-buttons": "定义图像组是否渲染图库导航按钮",
        "show-action-bar": "定义是否渲染底部旋转和缩放操作栏",
        "trigger-view": "定义 preview trigger 渲染单张图片还是缩略图画廊",
        "trigger-limit": "限制 gallery trigger 渲染的缩略图数量",
        "trigger-gap": "定义 gallery trigger 中缩略图之间的间距",
        width: "覆盖 preview trigger 宽度。数字会按像素处理",
        height: "覆盖 preview trigger 高度。数字会按像素处理",
        "navigation-button-margin":
          "覆盖画廊导航按钮与 viewport 边缘之间的距离",
      },
      slot: {
        loading: "预览图像加载时显示的插槽",
        error: "预览图像加载失败时显示的插槽",
      },
      variables: {
        width: "定义图像预览的宽度。",
        height: "定义图像预览的高度。",
        "nmorph-image-preview-btn-margin":
          "画廊导航按钮与 viewport 边缘之间的距离",
        "nmorph-image-preview-trigger-gap":
          "gallery trigger 中缩略图之间的间距",
      },
      events: {
        "update:model-value": "拦截双向绑定的事件",
      },
    },
    pagination: {
      "basic-usage": {
        subtitle: "",
      },
      api: {
        "total-elements-quantity": "分页的元素总数。",
        "model-value": "当前活动的页码。",
        "elements-quantity-on-page": "每页显示的元素数量。",
        disabled: "布尔值，禁用分页组件。",
        thickness: "分页控件的厚度。",
        "hide-on-single-page": "如果只有一页，则隐藏分页组件。",
        "max-visible-pages": "定义在分页控件中显示的页面数量。",
        "fast-forward-step": "定义快进时跳过的页面数量。",
        "fixed-container": "根据 max-visible-pages 预留稳定的分页容器宽度。",
        width: "定义分页容器的固定宽度。",
        "min-width": "定义分页容器的最小宽度。",
      },
      slot: {},
      variables: {},
      events: {
        "update:model-value": "用于拦截双向绑定的事件",
      },
    },
    table: {
      "basic-usage": {
        subtitle: "",
        "enable-row-highlight": "启用行高亮显示（悬停时）",
        "disable-row-highlight": "禁用行高亮显示（悬停时）",
        "click-me-text": "点击我！",
      },
      api: {
        data: "定义要显示在表格中的数据",
        "row-hover": "布尔值，启用或禁用表格行的悬停效果",
        bordered: "为 plain 表格设计启用单元格边框。",
        sort: "定义表格列的排序行为",
        design: "表格的显示样式",
        virtual: "为大量表格数据启用虚拟渲染",
        "virtual-height": "设置虚拟表格行的滚动视口高度",
        "virtual-row-height": "设置单个虚拟表格行的预期高度",
        "virtual-overscan": "设置可见区域前后额外渲染的行数",
        "virtual-dynamic-height": "允许 virtual table 行动态测量自身高度",
        "border-color": "Overrides the table border color",
        "cell-height": "覆盖数据单元格高度。数字会按像素处理",
        "row-hover-background": "覆盖 hover 和 keyboard-active 行使用的背景",
      },
      slot: {},
      variables: {
        "border-color": "设置表格的边框颜色",
        "table-cell-height": "定义表格单元格的高度",
        "table-background-row-hover":
          "定义 hover 和 keyboard-active 行使用的背景",
      },
    },
    "table-column": {
      api: {
        prop: "指定数据源中的属性名称，将显示在此列中",
        label: "在表格头部显示的列标题",
        width: "定义列的宽度，采用 CSS 值",
        alignment: "设置列中文本的对齐方式。接受 'left'、'center' 或 'right'",
      },
    },
    "table-cell": {
      api: {
        row: "必需属性。传递当前行的索引，表示正在渲染的行。",
      },
      slot: {
        default:
          "默认插槽用于定制每个列单元格中的内容。提供对行数据和其他相关属性的访问。",
      },
    },
    tooltip: {
      text: {
        subtitle: "在提示框内显示的内容。",
        "hover-me": "悬停在我上面",
        "i-am-tooltip": "我是一个提示框",
        tooltip: "提示框",
        button: "按钮",
      },
      position: {
        subtitle:
          "定义提示框相对于目标元素的位置。接受值如 'top'、'bottom'、'left'、'right'。",
      },
      "force-coordinate": {
        subtitle: "覆盖默认的定位逻辑，允许指定提示框的精确坐标。",
      },
      api: {
        text: "定义提示框的文本内容",
        position: "设置提示框相对于目标元素的位置",
        "force-show": "强制显示提示框的布尔值",
        "force-coordinate": "允许手动控制提示框的坐标",
        "z-index": "覆盖提示框可见时使用的共享自动 z-index",
        width: "覆盖 tooltip 内容宽度。数字会按像素处理",
        "max-width": "覆盖 tooltip 内容最大宽度。数字会按像素处理",
        height: "覆盖 tooltip 内容高度。数字会按像素处理",
      },
      slot: {},
      variables: {
        "max-width": "设置提示框内容的最大宽度",
        width: "设置提示框内容的宽度。控制提示框的水平大小",
        height: "设置提示框内容的高度。控制提示框的垂直大小",
      },
      exposes: {
        tooltipBody: "tooltip 内容区域的原始 DOM 元素",
      },
    },
    alert: {
      "basic-usage": {
        title: "任意标题",
        content: "警告的内容",
        info: {
          title: "附加信息",
          content:
            "为了方便管理多个警告，使用 'NmorphNotificationProvider' 组件，可以将警告分组并集中管理。",
        },
      },
      "use-provider": {
        subtitle: "要使用提供者，您需要从库中导入钩子。",
      },
      api: {
        id: "警告组件的唯一标识符",
        type: "定义警告类型（例如，success，error，warning，info）",
        closable: "布尔值，定义警告是否可以被用户关闭",
        title: "警告中显示的标题",
        content: "警告的内容",
        fill: "定义警告是否应占据其容器的整个宽度",
        "max-width": "警告组件的最大宽度",
        "show-icon": "布尔值，基于警告类型显示图标",
        bordered: "为警告添加边框以突出显示",
        html: "允许在警告的正文中使用 HTML 内容。使用时请谨慎，以避免 XSS 漏洞",
        "close-icon-position": "控制 alert 内关闭图标的对齐方式",
        "background-color": "Overrides the alert background color",
      },
      slot: {
        icon: "自定义警告中显示图标的插槽",
        title: "自定义警告标题的插槽",
        default: "自定义警告主要内容的插槽",
      },
      variables: {
        "background-color": "Alert background color",
        "nmorph-alert-close-align": "Close icon align-self value",
      },
      events: {
        close: "当用户关闭警告时触发的事件",
      },
    },
    callout: {
      "basic-usage": {
        "no-title-content": "没有标题的有用内容。",
        "info-title": "信息",
        "info-content": "给读者的有用内容。",
        "warning-title": "注意",
        "warning-content": "给读者的重要内容。",
        "success-title": "成功",
        "success-content": "给读者的成功内容。",
        "error-title": "错误",
        "error-content": "给读者的错误内容。",
      },
      api: {
        type: "定义 callout 类型",
        title: "在 callout 中显示的标题",
        content: "在 callout 中显示的内容",
        as: "根元素标签",
        href: "as 为 a 时的原生 anchor href",
        target: "as 为 a 时的原生 anchor target",
        rel: "as 为 a 时的原生 anchor rel",
        referrerpolicy: "as 为 a 时的原生 anchor referrerpolicy",
        download: "as 为 a 时的原生 anchor download",
        "aria-label": "根链接的可访问名称",
        color: "Overrides the callout accent color",
        padding: "Sets the callout inner spacing",
        "border-radius": "Sets the callout border radius",
        "accent-width": "Sets the width of the accent strip",
        "title-gap": "设置 title 与 content 之间的间距",
        "title-font-size": "Sets the title font size",
        "content-font-size": "Sets the content font size",
      },
      slot: {
        header: "自定义 header 内容",
        title: "自定义 title 内容",
        default: "自定义 body 内容",
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
        "show-modal": "显示模态窗口",
      },
      api: {
        "model-value": "控制对话框可见性的布尔值",
        title: "定义对话框的标题文本",
        width: "设置对话框的宽度",
        "max-height": "设置对话框窗口的最大高度，超过后内容会在内部滚动",
        "open-delay": "打开对话框前的延迟（毫秒）",
        "close-delay": "关闭对话框前的延迟（毫秒）",
        "close-on-click-modal": "布尔值，允许通过点击外部关闭对话框",
        "show-close": "布尔值，显示对话框中的关闭按钮",
        "z-index":
          "定义对话框覆盖层的 z-index。未传入时使用共享的自动 z-index 栈",
        "close-on-overlay": "布尔值，指示是否在点击覆盖区时关闭对话框",
      },
      slot: {
        header: "自定义对话框头部内容的插槽。",
        default: "定义对话框主要内容的插槽。",
      },
      events: {
        "on-close": "当用户关闭对话框时触发的事件。",
        "update:model-value": "当对话框的可见性发生变化时触发的事件。",
      },
      variables: {
        width: "定义对话框组件的宽度。",
        "nmorph-dialog-max-height": "内容开始滚动前的对话框最大高度",
        "nmorph-dialog-max-width": "用于让对话框保持在 viewport 内的最大宽度",
      },
    },
    divider: {
      direction: {
        subtitle:
          "定义分隔符的方向。Vertical dividers 会在 flex 和 grid layout 中拉伸。",
      },
      api: {
        direction:
          "定义分隔符的方向：'horizontal' 或 'vertical'。Vertical dividers 会沿可用的 cross-axis 尺寸拉伸。",
      },
      slot: {},
      variables: {},
    },
    overlay: {
      "basic-usage": {
        subtitle: "",
        "show-default": "显示默认",
        "show-transparent": "显示透明",
      },
      api: {
        show: "控制组件的可见性",
        transparent: "布尔值，启用时使组件背景透明",
        "z-index": "定义覆盖层的 z-index。未传入时使用共享的自动 z-index 栈",
        "teleport-to": "定义覆盖层内容 Teleport 的目标位置",
        "disabled-teleport": "禁用 Teleport，并在当前位置渲染覆盖层",
      },
      slot: {
        default: "默认插槽，用于自定义组件内部的内容",
      },
      events: {
        "on-outside-click": "当用户点击组件外部时触发的事件",
      },
      variables: {},
    },
    "notification-provider": {
      notifications: {
        subtitle: "",
      },
      placement: {
        subtitle: "定义通知在屏幕上的位置。",
      },
      "z-index": {
        subtitle: "覆盖通知使用的共享 z-index 栈。",
      },
      quantity: {
        subtitle: "限制同时显示的最大通知数量。",
      },
      api: {
        notifications: "包含通知的数组。每条通知都可以覆盖 placement",
        placement: "未定义 placement 的通知所使用的默认位置",
        "z-index": "定义固定的通知 z-index。未传入时使用共享的自动 z-index 栈",
        "teleport-to": "定义固定通知层 Teleport 的目标位置",
        "disabled-teleport": "禁用 Teleport，并在当前位置渲染通知层",
        quantity: "同时可以在屏幕上显示的最大通知数量",
      },
      slot: {},
      variables: {},
    },
    tabs: {
      api: {
        "model-value": "控制组件的活动状态",
        stretch: "布尔值，定义组件是否应拉伸以填充可用空间",
        panes: "tabs 组件渲染的 tab pane 列表",
      },
      slot: {
        default: "插槽，用于自定义每个标签内的内容",
      },
      variables: {},
      events: {
        "update:model-value": "当活动标签变化时触发的事件",
        "tab-change": "当标签变化时触发的事件",
      },
    },
    "tab-pane": {
      api: {
        label: "在标签导航中显示的标签",
        name: "标签的唯一标识符，用于控制活动标签",
        disabled: "布尔值，指示标签是否禁用且无法选择",
      },
      slot: {
        label: "自定义标签的插槽",
        default: "定义标签主要内容的插槽",
      },
    },
    dropdown: {
      "basic-usage": {
        "first-menu": "第一个菜单",
        "second-menu": "第二个菜单",
      },
      api: {
        open: "控制下拉菜单可见性的布尔值",
        "relative-element": "定义下拉菜单相对于哪个元素定位",
        width: "设置下拉菜单的宽度",
        "min-width": "设置下拉菜单的最小宽度",
        "max-width": "设置下拉菜单的最大宽度",
        "x-offset": "调整下拉菜单位置的水平偏移量（以像素为单位）",
        "y-offset": "调整下拉菜单位置的垂直偏移量（以像素为单位）",
        "fill-width": "布尔值，定义下拉菜单是否应占满整个容器宽度",
        "z-index":
          "定义下拉菜单覆盖层的 z-index。未传入时使用共享的自动 z-index 栈",
        placement: "定义下拉菜单相对于触发元素的位置，包括边缘对齐",
        "restore-focus": "定义关闭后是否将焦点返回到之前聚焦的元素",
        "hide-shadow": "禁用下拉菜单面板的默认 neumorphic 阴影",
      },
      slot: {
        default: "自定义下拉菜单内部内容的插槽",
      },
      variables: {},
      events: {
        "on-outside-click": "当用户点击下拉菜单外部时触发的事件，可用于关闭它",
      },
    },
    "context-menu": {
      "basic-usage": {
        target: "右键点击此区域",
      },
      api: {
        "model-value": "控制上下文菜单的打开状态",
        trigger:
          "定义菜单打开方式：右键、左键、两者、触控长按或手动 exposed 调用",
        options: "以文本、对象选项或自定义组件渲染的菜单选项",
        placement: "定义上下文菜单相对于指针位置的放置方式",
        width: "设置上下文菜单的宽度",
        "min-width": "设置上下文菜单的最小宽度",
        "max-width": "设置上下文菜单的最大宽度",
        "x-offset": "调整上下文菜单位置的水平偏移量（以像素为单位）",
        "y-offset": "调整上下文菜单位置的垂直偏移量（以像素为单位）",
        "fill-width": "布尔值，定义上下文菜单是否使用指针锚点宽度",
        "z-index":
          "定义上下文菜单覆盖层的 z-index。未传入时使用共享的自动 z-index 栈",
        "close-on-escape": "定义按下 Escape 时是否关闭上下文菜单",
        "trap-focus": "定义焦点是否应限制在上下文菜单内",
        disabled: "禁用上下文菜单触发",
        role: "设置上下文菜单面板的 aria role",
        "aria-label": "设置上下文菜单面板的 aria-label",
        "hide-shadow": "禁用上下文菜单面板的默认 neumorphic 阴影",
      },
      slot: {
        default: "右键目标区域的插槽",
        menu: "自定义上下文菜单内容的插槽",
      },
      variables: {},
      events: {
        "update:model-value": "打开状态变化时触发的事件",
        open: "上下文菜单打开时触发的事件",
        close: "上下文菜单关闭时触发的事件",
        "on-outside-click": "用户点击上下文菜单外部时触发的事件",
        "on-escape-keydown": "上下文菜单打开时用户按下 Escape 触发的事件",
      },
      exposes: {
        openAt: "在 viewport 坐标处打开 context menu",
        openAtElement: "打开锚定到 HTMLElement 的 context menu",
        close: "Closes the context menu",
      },
    },
    backtop: {
      "basic-usage": {
        info: {
          title: "信息",
          content: "确保已定义滚动容器的高度。",
        },
        "scroll-down": "向下滚动",
      },
      api: {
        right: "设置距离屏幕右边缘的距离",
        bottom: "设置距离屏幕下边缘的距离",
        "visibility-height":
          "定义返回顶部按钮在该滚动高度下变为可见。以像素为单位",
        design: "定义按钮的样式",
        "z-index": "设置传送后的返回顶部按钮的 z-index",
        "teleport-to": "返回顶部按钮传送到的 CSS 选择器",
        "teleport-disabled": "禁用 teleport 并在原位置渲染按钮",
      },
      slot: {
        default: "自定义返回顶部按钮内容的插槽",
      },
      events: {
        click: "当用户点击返回顶部按钮时触发的事件",
      },
      variables: {},
    },
    breadcrumb: {
      separator: {
        subtitle: "定义用于分隔导航项的符号。",
      },
      api: {
        separator: "分隔导航项的符号",
      },
    },
    "breadcrumb-item": {
      api: {
        to: "指定导航的目标路由。接受路径字符串或路由对象",
        replace: "布尔值，决定导航是否应替换当前历史记录条目而不是添加新条目",
      },
    },
    "otp-input": {
      length: {
        subtitle: "定义验证码要渲染多少个输入单元。",
      },
      mode: {
        subtitle:
          "控制允许输入的字符类型：*numeric*、*text* 或 *alphanumeric*。",
      },
      thickness: {
        subtitle: "设置每个 OTP 单元的尺寸。",
      },
      disabled: {
        subtitle: "如果设置为 *true*，则禁用所有 OTP 单元。",
      },
      api: {
        id: "设置第一个 OTP 单元的 id，其余单元会自动附加后缀 id",
        name: "设置隐藏 input 的 name。未传入时会继承 NmorphFormItem 的 name 或 id",
        autocomplete:
          "OTP 单元的 autocomplete 值。默认是 one-time-code，也可以从 NmorphFormItem 继承",
        thickness: "定义每个 OTP 单元的尺寸",
        disabled: "布尔值，禁用 OTP 输入组件",
        tabindex: "OTP 单元的基础 tabindex，后续单元会自动递增",
        "model-value": "当前合并后的 OTP 字符串值",
        length: "OTP 单元数量",
        mode: "允许的输入模式：numeric、text 或 alphanumeric",
        autocapitalize: "设置 OTP 单元的原生 autocapitalize 值",
        autofocus: "在挂载后自动聚焦第一个 OTP 单元",
      },
      slot: {},
      variables: {},
      events: {
        "update:model-value": "当合并后的 OTP 值变化时触发的事件",
        focus: "当任意 OTP 单元获得焦点时触发的事件",
        blur: "当焦点离开整个 OTP 输入组件时触发的事件",
        complete: "当所有 OTP 单元都填写完成时触发的事件",
      },
      exposes: {
        inputDOMRefs: "OTP 单元原始 DOM 元素数组",
        focus: "聚焦第一个 OTP 单元或按索引聚焦指定单元",
        blur: "让所有 OTP 单元失去焦点",
      },
    },
    "text-input": {
      thickness: {
        subtitle: "设置输入字段的厚度。",
      },
      disabled: {
        subtitle: "如果设置为 *true*，则禁用输入字段。",
      },
      "type-password": {
        subtitle: "如果设置为 *true*，则输入框中的文本将隐藏为密码。",
        toggle: "切换类型",
      },
      "model-value": {
        subtitle: "表示输入框的值",
      },
      clearable: {
        subtitle: "如果设置为 *true*，则会出现按钮以清空输入框。",
      },
      api: {
        id: "设置原生 input 的 id。在 NmorphFormItem 内部使用时会继承其 id",
        name: "设置原生 input 的 name。未传入时会继承 NmorphFormItem 的 name 或 id",
        autocomplete:
          "原生 input 的 autocomplete 值。也可以从 NmorphFormItem 继承",
        tabindex: "原生 input 的 tabindex 值",
        thickness: "定义输入框的厚度",
        disabled: "布尔值，禁用输入框",
        placeholder: "当输入框为空时显示的提示文本",
        label: "与输入框关联的文本标签",
        "type-password": "布尔值，将输入框变为密码字段",
        "model-value": "当前输入框的值",
        clearable: "布尔值，添加一个按钮来清空输入框的值",
        indentation:
          "原生 input 的自定义 text-indent。默认会根据 prepend-icon 插槽自动计算",
        "input-attrs": "透传给内部 input 元素的额外原生属性",
      },
      slot: {
        "prepend-icon": "插槽，用于在输入框前添加图标",
      },
      variables: {
        "prepend-icon-indent": "定义图标前的缩进",
      },
      events: {
        "update:model-value": "当输入框的值变化时触发的事件",
        focus: "当输入框获得焦点时触发的事件",
        blur: "当输入框失去焦点时触发的事件",
        "on-enter": "按下回车键时触发的事件",
      },
      exposes: {
        inputDOMRef: "输入框的原始 DOM 元素",
        focus: "聚焦输入框",
        blur: "让输入框失去焦点",
        select: "选中当前输入值",
      },
    },
    "color-picker": {
      thickness: {
        subtitle: "设置颜色选择器的厚度。",
      },
      disabled: {
        subtitle: "如果设置为 *true*，则禁用颜色选择器。",
      },
      "model-value": {
        subtitle: "控制所选颜色。接受类似 *#4a90e2* 的十六进制值。",
      },
      "show-value": {
        subtitle:
          "在色块旁显示当前的十六进制颜色值。如果未传入 `modelValue`，则使用当前主题的 accent 颜色。",
      },
      "display-format": {
        subtitle: "设置显示的颜色值格式。",
      },
      api: {
        id: "设置原生 input 的 id。在 NmorphFormItem 内部使用时会继承其 id",
        name: "设置原生 input 的 name。未传入时会继承 NmorphFormItem 的 name 或 id",
        thickness: "定义颜色选择器的厚度",
        disabled: "布尔值，禁用颜色选择器",
        "model-value": "当前的十六进制颜色值",
        "show-value": "布尔值，在色块旁显示当前颜色值",
        "display-format": "显示颜色值的格式",
      },
      slot: {},
      variables: {},
      events: {
        "update:model-value": "当颜色值变化时触发的事件",
        focus: "当颜色选择器获得焦点时触发的事件",
        blur: "当颜色选择器失去焦点时触发的事件",
      },
      exposes: {
        inputDOMRef: "颜色 input 的原始 DOM 元素",
      },
    },
    switch: {
      height: {
        subtitle: "定义开关组件的高度。",
      },
      disabled: {
        subtitle: "如果设置为 *true*，则禁用开关。",
      },
      "model-value": {
        subtitle: "控制开关的开/关状态。",
      },
      loading: {
        subtitle: "如果设置为 *true*，则在开关上显示加载状态。",
      },
      "active-value": {
        subtitle: "指定开关打开时的值。",
      },
      "inactive-value": {
        subtitle: "指定开关关闭时的值。",
      },
      api: {
        id: "设置原生 input 的 id。在 NmorphFormItem 内部使用时会继承其 id",
        name: "设置原生 input 的 name。未传入时会继承 NmorphFormItem 的 name 或 id",
        height: "设置开关的高度",
        disabled: "布尔值，禁用开关组件",
        "model-value": "控制开关的状态",
        loading: "布尔值，显示开关上的加载指示器",
        "active-value": "开关打开时的值",
        "inactive-value": "开关关闭时的值",
        width: "覆盖 switch 宽度。数字会按像素处理",
        offset: "覆盖 thumb 偏移。数字会按像素处理",
        "thumb-height": "覆盖 switch thumb 尺寸。数字会按像素处理",
      },
      slot: {
        "bg-on": "插槽，用于自定义开关打开时的背景",
        "bg-off": "插槽，用于自定义开关关闭时的背景",
        "thumb-on": "插槽，用于自定义开关打开时的按钮",
        "thumb-off": "插槽，用于自定义开关关闭时的按钮",
      },
      variables: {
        width: "Defines the width of the switch",
        height: "定义开关的高度",
        offset: "指定开关按钮的偏移量",
        "thumb-height": "定义开关按钮的高度",
      },
      events: {
        "update:model-value": "当开关状态改变时触发的事件",
      },
      exposes: {
        inputDOMRef: "输入框的原始 DOM 元素",
      },
    },
    checkbox: {
      id: {
        subtitle: "复选框的唯一标识符。",
      },
      disabled: {
        subtitle: "如果设置为 *true*，则禁用复选框。",
      },
      "model-value": {
        subtitle: "表示复选框的状态（选中或未选中）。",
        label: "标签",
      },
      label: {
        subtitle: "指定复选框的标签文本。",
      },
      design: {
        subtitle: "定义复选框的视觉样式。",
      },
      thickness: {
        subtitle: "设置复选框厚度。",
      },
      api: {
        id: "复选框的唯一标识符",
        disabled: "布尔值，禁用复选框",
        "model-value": "复选框状态（选中或未选中）",
        label: "显示在复选框旁边的标签",
        design: "定义复选框的视觉样式",
        thickness: "定义复选框厚度",
      },
      slot: {
        default: "自定义复选框内容的插槽",
        label: "自定义复选框标签的插槽",
      },
      variables: {
        size: "定义复选框的大小",
      },
      events: {
        "update:model-value": "当复选框状态改变时触发的事件",
      },
      exposes: {
        inputDOMRef: "输入字段的原始 DOM 元素",
      },
    },
    "checkbox-group": {
      api: {
        thickness: "定义组内复选框的厚度",
        disabled: "禁用组中的所有复选框",
        "model-value": "选中值的数组",
        options: "复选框选项",
        design: "复选框组的视觉样式",
        direction: "复选框组的布局方向",
      },
      slot: {
        default: "自定义复选框组内容的插槽",
      },
      variables: {},
      events: {
        "update:model-value": "当复选框组中的选中值发生变化时触发的事件",
      },
    },
    autocomplete: {
      "basic-usage": {
        placeholder: "文本...",
      },
      thickness: {
        subtitle: "定义自动完成输入框的厚度。",
      },
      disabled: {
        subtitle: "禁用自动完成输入框。",
      },
      placeholder: {
        subtitle: "当输入框为空时显示的文本。",
      },
      clearable: {
        subtitle: "如果设置为 *true*，则会出现一个按钮来清空输入框。",
      },
      list: {
        subtitle: "设置自动完成建议的选项列表。",
      },
      "action-callback": {
        subtitle: "在输入时调用的函数。",
      },
      api: {
        id: "设置内部文本输入框的 id。在 NmorphFormItem 内部使用时会继承其 id",
        name: "设置内部文本输入框的 name。未传入时会继承 NmorphFormItem 的 name 或 id",
        autocomplete:
          "传递给内部文本输入框的 autocomplete 值。也可以从 NmorphFormItem 继承",
        thickness: "自动完成输入框的厚度",
        disabled: "禁用自动完成输入框",
        "model-value": "输入框的当前值",
        placeholder: "当输入框为空时显示的提示文本",
        clearable: "布尔值，添加按钮清除输入值",
        list: "输入建议的列表",
        "action-callback": "当选择一个选项时调用的回调函数",
        "z-index":
          "定义建议列表覆盖层的 z-index。未传入时使用共享的自动 z-index 栈",
        virtual: "为大量建议列表启用虚拟渲染",
        "virtual-item-height": "设置单个虚拟项的预期高度",
        "virtual-max-height": "设置虚拟列表的最大高度",
        "virtual-overscan": "设置可见区域前后额外渲染的项数",
      },
      slot: {
        loader: "在获取数据时添加自定义加载器的插槽",
      },
      variables: {},
      events: {
        "update:model-value": "当自动完成字段值发生变化时触发的事件",
        select: "当从建议中选择一个项时触发的事件",
      },
    },
    "file-upload": {
      "model-value": {},
      disabled: {
        subtitle: "禁用文件上传组件",
      },
      multiple: {
        subtitle: "如果设置为 *true*，允许上传多个文件。",
      },
      "photo-with-preview": {
        subtitle: "如果设置为 *true*，上传的照片将显示预览。",
      },
      api: {
        "model-value":
          "表示已选择的文件。传入 [] 会清空内部列表和原生 file input。",
        disabled: "布尔值，禁用文件上传组件",
        multiple: "布尔值，允许选择多个文件",
        "allowed-types": "定义可以上传的文件类型。留空时接受所有文件",
        "photo-with-preview": "显示上传图片的预览",
        fill: "允许上传按钮填充其容器",
      },
      slot: {
        trigger: "用于自定义触发文件上传的按钮的插槽",
      },
      variables: {},
      events: {
        "on-unsupported-file-type-error":
          "当用户尝试上传不支持的文件类型时触发的事件",
        "update:model-value": "当文件选择发生变化时触发的事件",
      },
      exposes: {
        inputDOMRef: "输入框的原始 DOM 元素",
      },
      translates: {
        selectFile: "选择文件",
      },
    },
    "number-input": {
      "basic-usage": {},
      thickness: {
        subtitle: "定义数字输入框的厚度。",
      },
      disabled: {
        subtitle: "如果设置为 *true*，则禁用数字输入框。",
      },
      "action-btn-position-right": {
        subtitle: "如果设置为 *true*，增减按钮将位于右侧。",
      },
      api: {
        id: "设置原生 input 的 id。在 NmorphFormItem 内部使用时会继承其 id",
        name: "设置原生 input 的 name。未传入时会继承 NmorphFormItem 的 name 或 id",
        autocomplete:
          "原生 number input 的 autocomplete 值。也可以从 NmorphFormItem 继承",
        thickness: "数字输入框的厚度",
        disabled: "布尔值，禁用输入框",
        "model-value": "数字输入框的当前值",
        max: "最大允许值",
        min: "最小允许值",
        step: "增加或减少值的步长",
        "action-btn-position-right":
          "如果设置为 *true*，则将操作按钮放置在右侧",
      },
      slot: {},
      variables: {},
      exposes: {
        inputDOMRef: "输入框的原始 DOM 元素",
      },
      events: {
        "update:model-value": "当数字输入框的值变化时触发的事件",
      },
    },
    "select-button": {
      thickness: {
        subtitle: "设置组件的厚度。",
      },
      disabled: {
        subtitle: "禁用组件。",
      },
      fill: {
        subtitle: "使组件占满容器宽度。",
      },
      api: {
        "model-value": "选中的值",
        thickness: "组件厚度",
        "custom-thickness": "使用自定义 CSS 尺寸覆盖当前 thickness",
        disabled: "禁用组件",
        fill: "使组件占满容器宽度",
        options: "渲染的选项列表",
      },
      slot: {
        default: "用于放置 NmorphSelectButtonItem 元素的插槽",
      },
      variables: {},
      events: {
        "update:model-value": "当选中值改变时触发",
      },
    },
    select: {
      thickness: {
        subtitle: "设置下拉列表的厚度。",
      },
      disabled: {
        subtitle: "禁用该组件。",
      },
      "model-value": {
        subtitle: "表示选择组件的选中值。",
        multiple: "多个值",
      },
      loading: {
        subtitle: "如果设置为 *true*，则显示加载指示器。",
      },
      fill: {
        subtitle: "使 select 占满容器宽度。",
      },
      "options-width": {
        subtitle:
          "控制下拉选项保持 select 宽度并截断长文本，或根据内容自动扩展。",
      },
      api: {
        id: "设置原生 select 的 id。在 NmorphFormItem 内部使用时会继承其 id",
        name: "设置原生 select 的 name。未传入时会继承 NmorphFormItem 的 name 或 id",
        autocomplete:
          "原生 select 的 autocomplete 值。也可以从 NmorphFormItem 继承",
        thickness: "下拉列表的厚度",
        disabled: "禁用下拉列表",
        "no-element-placeholder": "当没有选项时显示的占位文本",
        "value-required": "需要选择一个值",
        options: "可用选项的列表",
        "options-map": "显示选项的对象",
        "model-value": "下拉列表的选中值",
        loading: "显示加载状态",
        fill: "使下拉列表占满容器宽度",
        "options-width": "控制下拉选项宽度：truncate 或 auto",
        open: "控制列表可见性的布尔值",
        "z-index":
          "定义 select 下拉列表的 z-index。未传入时使用共享的自动 z-index 栈",
        width: "覆盖基础 select 宽度。数字会按像素处理",
        virtual: "为大量选项列表启用虚拟渲染",
        "virtual-item-height": "设置单个虚拟选项的预期高度",
        "virtual-max-height": "设置虚拟选项列表的最大高度",
        "virtual-overscan": "设置可见区域前后额外渲染的选项数",
      },
      slot: {
        default: "自定义下拉列表选项的插槽",
      },
      variables: {
        "base-width": "设置选择组件的基础宽度",
      },
      events: {
        "update:model-value": "当选中的值发生变化时触发的事件",
      },
      translates: {
        noElementPlaceholder: "选择值",
      },
    },
    "select-option": {
      api: {
        label: "定义显示在下拉列表中的选项标签",
        thickness: "设置 select option 的 thickness 预设",
        disabled: "布尔值，指示选项是否禁用，无法选择",
        "hover-background": "Overrides the option hover background",
        "hover-color": "覆盖 option hover 时的文本和图标颜色",
      },
      slot: {
        default: "用于自定义此选项显示内容的插槽",
      },
      variables: {
        "hover-bg": "设置悬停时的背景色",
        "hover-color": "定义悬停时的文本颜色",
      },
      events: {
        "change-value": "当选项值发生变化时触发的事件",
      },
    },
    slider: {
      disabled: {
        subtitle: "如果设置为 *true*，禁用滑块。",
      },
      "show-tooltip": {
        subtitle: "如果设置为 *true*，显示当前值的提示框。",
      },
      api: {
        id: "设置原生 range input 的 id。在 NmorphFormItem 内部使用时会继承其 id",
        name: "设置原生 range input 的 name。未传入时会继承 NmorphFormItem 的 name 或 id",
        fill: "布尔值，允许滑块填充其容器",
        disabled: "禁用滑块组件",
        "model-value": "滑块的当前值",
        max: "滑块的最大值",
        min: "滑块的最小值",
        step: "用于增加或减少值的步长",
        "show-tooltip": "布尔值，控制提示框的可见性",
        "thumb-width": "覆盖 slider thumb 的像素宽度",
        "slider-height": "覆盖 slider hit area 高度。数字会按像素处理",
        "value-fixed-container-height":
          "覆盖 visual track container 高度。数字会按像素处理",
      },
      slot: {},
      variables: {
        "nmorph-slider-thumb-width": "Slider thumb width",
        "slider-height": "定义滑块的高度",
        "value-fixed-container-height": "设置容器的高度",
      },
      events: {
        "update:model-value": "当滑块值发生变化时触发的事件",
      },
    },
    "date-picker": {
      thickness: {
        subtitle: "设置日期选择字段的厚度。",
      },
      disabled: {
        subtitle: "如果设置为 *true*，禁用日期选择。",
      },
      api: {
        id: "设置原生 input 的 id。在 NmorphFormItem 内部使用时会继承其 id",
        name: "设置原生 input 的 name。未传入时会继承 NmorphFormItem 的 name 或 id",
        autocomplete:
          "隐藏原生 date input 的 autocomplete 值。也可以从 NmorphFormItem 继承",
        thickness: "日期选择字段的厚度",
        disabled: "布尔值，禁用日期选择",
        placeholder: "没有选择日期时显示的文本",
        "model-value": "当前选择的日期或日期范围",
        type: "日期选择类型，例如 *单一* 或 *范围*",
        "text-separator": "范围选择模式中用于分隔开始和结束日期的文本",
        "z-index":
          "定义日期选择下拉层的 z-index。未传入时使用共享的自动 z-index 栈",
        width: "覆盖 date picker 宽度。数字会按像素处理",
        "calendar-cell-height":
          "覆盖 calendar date cell 高度。数字会按像素处理",
      },
      slot: {},
      variables: {
        width: "定义日期选择组件的宽度",
        "date-picker-calendar-cell-height": "Date picker calendar cell height",
      },
      events: {
        "update:model-value": "当选择的日期或日期范围发生变化时触发的事件",
      },
      translates: {
        pickADate: "选择日期",
      },
    },
    "time-picker": {
      "basic-usage": {
        subtitle: "基础时间选择，输出 HH:mm 格式。",
      },
      seconds: {
        subtitle: "启用秒数，并控制分钟和秒的步长。",
      },
      disabled: {
        subtitle: "禁用时间选择器。",
      },
      api: {
        id: "原生 input id",
        name: "原生 input name",
        "model-value": "选中的时间，格式为 HH:mm 或 HH:mm:ss",
        thickness: "设置组件厚度",
        disabled: "禁用时间选择器",
        autocomplete: "原生 autocomplete 属性",
        placeholder: "未选择时间时显示的占位文本",
        "hour-step": "可选小时值之间的步长",
        "minute-step": "可选分钟值之间的步长",
        "second-step": "可选秒值之间的步长",
        "show-seconds": "显示秒列并返回 HH:mm:ss 值",
        "min-time": "最小可选时间",
        "max-time": "最大可选时间",
        clearable: "选择值后显示清除按钮",
        "z-index": "下拉层级 z-index",
        width: "覆盖 time picker 宽度。数字会按像素处理",
      },
      variables: {
        width: "Defines the width of the time picker",
      },
      events: {
        "update:model-value": "选中时间变化时触发",
        focus: "聚焦事件",
        blur: "失焦事件",
      },
      translates: {
        pickATime: "选择时间",
      },
    },
    radio: {
      "basic-usage": {
        info: {
          title: "Radio Group 使用方法",
          content:
            "通常用于一组单选按钮中，让用户从多个选项中选择一个。选中单选按钮后，不能通过再次点击取消选中状态，只能通过选择该组中的其他单选按钮来改变状态。为确保正确显示，当 'design' 设置为 'button' 时，应提供标签（label）。",
        },
      },
      api: {
        disabled: "布尔值，禁用单选按钮",
        label: "显示在单选按钮旁边或内部的标签文本",
        value: "分配给单选按钮的值",
        design: "定义单选按钮的视觉样式",
        thickness: "定义单选按钮厚度",
        checked: "将单选按钮标记为选中",
      },
      slot: {
        label: "自定义单选按钮标签的插槽",
      },
      variables: {
        size: "定义单选按钮的大小",
      },
      exposes: {
        inputDOMRef: "输入字段的原始 DOM 元素",
      },
    },
    "radio-group": {
      api: {
        thickness: "定义组内单选按钮的厚度",
        disabled: "禁用组中的所有单选按钮",
        "model-value": "单选按钮组的选中值",
        options: "可供选择的选项列表",
        design: "单选按钮的视觉样式",
        direction: "单选按钮的布局方向",
      },
      slot: {
        default: "传递 NmorphRadioButton 的插槽",
      },
      variables: {},
      events: {
        "update:model-value": "当选中值发生变化时触发的事件",
      },
    },
    form: {
      "basic-usage": {
        subtitle: "表示所有输入元素的表单值。",
        "too-short": "太短",
        "wrong-age": "年龄不正确",
        "you-cant-be-a-nobody": "你不能是无名用户",
        "we-dont-have-kombucha": "我们没有康普茶(",
        "ie-not-supported": "IE 不支持",
        "you-must-set-agreement": "您必须接受协议",
        "value-must-greater-than-30": "值必须大于 30",
        "value-must-less-than-80": "值必须小于 80",
        "pear-is-not-available": "梨子不可用",
        coffee: "咖啡",
        tea: "茶",
        pear: "梨",
        apple: "苹果",
        orange: "橙子",
        unknown: "未知",
        username: "用户名",
        "years-old": "岁",
        "preferred-drink": "首选饮料",
        browsers: "浏览器",
        agreement: "协议",
        "number-value": "数字值",
        "choose-date": "选择日期",
        food: "食物",
        "favorite-food": "最喜欢的食物",
        photo: "照片",
        "send-form": "发送表单",
        "enter-username": "输入用户名",
        "is-valid": "表单有效：",
        info: {
          title: "类型信息",
          content:
            "为了正确的类型检查，您必须导入 INmorphFormDataExpose 类型。",
        },
      },
      "validate-immediately": {
        subtitle: "如果设置为 *true*，表单将在渲染后立即验证其字段。",
      },
      api: {
        value: "输入元素的表单值",
        "validate-immediately": "布尔值，控制加载时验证",
      },
      slot: {
        default: "传递 NmorphFormItem 的插槽",
      },
      variables: {},
      exposes: {
        "form-data": "表单数据，包括验证",
      },
      explanation: `
        <div class="container">
          <p>
            <strong>字段元数据：</strong><code>NmorphFormItem</code> 会自动将自身的 <code>id</code> 和可选的 <code>name</code> 传递给嵌套的表单控件。子组件仍然可以通过自己的 prop 覆盖这些值。
            <br />
            <strong>Autocomplete：</strong> 如果控件支持 <code>autocomplete</code>，<code>NmorphFormItem</code> 也可以把它向下传递。
          </p>

          <h2>1. 规则类型</h2>
          <p>
            您可以根据要检查的值类型定义验证规则：
          </p>

          <h3>文本验证：</h3>
          <p>
            <strong>规则属性：</strong> <code>pattern</code>（使用正则表达式）， <code>error</code>
          </p>

          <h3>数字验证：</h3>
          <p>
            <strong>规则属性：</strong> <code>numberCompareType</code>（使用 <code>NmorphNumberCompareOperator</code>）， <code>compareValue</code>，<code>error</code>
          </p>

          <h3>布尔值验证（单选按钮）：</h3>
          <p>
            <strong>规则属性：</strong> <code>booleanCompareType</code>（使用 <code>NmorphBooleanCompareOperator</code>）， <code>compareValue</code>，<code>error</code>
          </p>

          <h3>数组验证（复选框组）：</h3>
          <p>
            <strong>规则属性：</strong> <code>arrayCompareType</code>（使用 <code>NmorphArrayValidationOperator</code>）， <code>compareValue</code>，<code>error</code>
          </p>

          <h2>2. 枚举定义</h2>
          <p>
            以下枚举用于定义不同类型的验证操作符：
          </p>

          <h3>NmorphArrayValidationOperator:</h3>
          <ul>
            <li>
              <strong>contains-one:</strong> 数组必须包含至少一个指定的值。
            </li>
            <li>
              <strong>not-contains:</strong> 数组不能包含任何指定的值。
            </li>
            <li>
              <strong>full-eq:</strong> 数组必须等于指定的值，包括顺序和长度。
            </li>
          </ul>

          <h3>NmorphNumberCompareOperator:</h3>
          <ul>
            <li>
              <strong>eq:</strong> 值必须等于指定值。
            </li>
            <li>
              <strong>gte:</strong> 值必须大于或等于指定值。
            </li>
            <li>
              <strong>lte:</strong> 值必须小于或等于指定值。
            </li>
            <li>
              <strong>gt:</strong> 值必须大于指定值。
            </li>
            <li>
              <strong>lt:</strong> 值必须小于指定值。
            </li>
          </ul>

          <h3>NmorphBooleanCompareOperator:</h3>
          <ul>
            <li>
              <strong>eq:</strong> 布尔值必须等于指定值。
            </li>
            <li>
              <strong>not-eq:</strong> 布尔值必须不等于指定值。
            </li>
          </ul>

          <h2>3. 访问验证状态</h2>
          <p>
            调用 <code>useFieldValidation</code> 后，您将可以访问以下参数：
          </p>
          <ul>
            <li>
              <strong>touched:</strong> 指示字段是否已被触碰。
            </li>
            <li>
              <strong>valid:</strong> 指示字段是否有效，基于已定义的规则。
            </li>
            <li>
              <strong>errors:</strong> 包含字段错误消息的数组。
            </li>
            <li>
              <strong>validate:</strong> 启动验证过程的函数。
            </li>
          </ul>
        </div>
      `,
    },
    "form-item": {
      api: {
        id: "字段的唯一 id，供 label 使用并由嵌套表单控件继承",
        name: "可选的字段 name，会被嵌套表单控件继承。默认等于 id",
        autocomplete: "可选的 autocomplete 值，会被支持它的嵌套表单控件继承",
        height: "设置表单项容器的高度",
        label: "定义与表单项关联的标签文本，为用户提供上下文",
        "show-validation-icon": "布尔值，控制显示该表单项的验证图标",
        "static-error-box-space":
          "定义用于显示错误字段的静态空间，无论验证状态如何，确保空间一致",
        validate: "定义表单项的验证规则",
      },
      slot: {
        default: "用于自定义表单项内容的插槽，通常包括输入元素或其他表单控件",
      },
    },
  },
};
