export default {
  meta: {
    description: "Vue3的UI组件库，采用neumorphism/sceumorphism风格。"
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
  translates: "翻译",
  description: "描述",
  text: '文本',
  type: "类型",
  default: "默认",
  basic: "基础",
  data: "数据",
  feedback: "反馈",
  form: "表单",
  navigation: "导航",
  other: "其他",
  attention: "注意",
  "top-bar": {
    menu: "菜单",
    nav: "导航"
  },
  "footer-bar": {
    license: "许可协议"
  },
  "guide-page": {
    "theme-customize": "自定义主题",
    "custom-theme-color": "更改基础颜色",
    "custom-text-color": "文本颜色",
    "custom-accent-color": "强调颜色",
    "enter-color": "输入颜色",
    "get-started-btn": "快速开始",
    explained: "<b class=\"main-section__subtitle\">Neumorphism / Sceumorphism</b>",
    "apply-theme": "应用主题",
    "main-content":
      "<p class=\"main-section__first-explained-content\">Vue 3 UI 套件，用于创建独特的 3D 设计，以新拟态风格呈现</p>",
    "quick-start": {
      installation: "安装",
      "choose-package-manager":
        "选择您喜欢的包管理器。<br>我们推荐使用可靠的包管理器，如 <b>NPM</b>、<b>Yarn</b>、<b>Pnpm</b>",
      plugin: "库集成",
      "alternative-plugin": "替代集成方法",
      usage: "基础使用"
    },
    "config": {
      "add-config": "添加库配置的示例",
      "available": "目前可用的设置有两个：theme 和 i18n",
      "theme": "主题",
      "i18n": "国际化 (i18n)",
      "ls": "在 local storage 中保存当前主题",
      "rest-themes": "您的自定义主题",
      "default-theme": "选定的默认主题",
      "dark-shade": "深色阴影深度系数，仅在动态阴影生成方法下有效",
      "light-shade": "浅色阴影深度系数，仅在动态阴影生成方法下有效",
      "shadow-width": "阴影距离",
      "shadow-blur": "阴影模糊",
      "theme-explained": "您可以将自定义变量传递到 theme 对象中，以便进行详细的主题定制。<br />下面是默认主题对象的示例。",
      "auto-generation": "主题定制有两种方法。<ul><li>1) 自动生成阴影。只需将主颜色传递到主题对象中。然后，darkShade 和 lightShade 变量将自动生成。其他变量将不会受到影响，需要手动添加。您还可以使用 darkShadeGeneratorCoefficient 和 lightShadeGeneratorCoefficient 变量调整阴影深度系数。仅在此（动态）方法下，阴影才会受到影响。</li><li>2) 每个变量都必须为每个主题手动添加。</li>",
      "main-var": "要自动生成 darkShade 和 lightShade，只需传递此变量。",
      "shade-var": "如果不直接修改并通过 main 变量传递，它将自动计算。",
      "i18n-content": "为了确保 i18n 正常工作，请确保在库之前连接 i18n。目前提供三种语言环境：en、zh、ru。<p>默认语言环境为 en。仅导入您需要的语言环境。</p><p>如果缺少语言环境，则需要添加您自己的。locale 属性将覆盖上面传递的 i18n locale。</p>",
      "rewrite-translation": "重写库翻译。您可以在组件文档中查看翻译消息名称。",
      "other-messages": "其他翻译"
    },
    "other": {
      "utils-classes": "工具类"
    }
  },
  "about-page": {
    "alpha-test":"当前状态",
    "alpha-test-lib":
    "<p>图书馆的测试目前正在进行中。</p><p>由于开发仅由一名开发人员进行，因此修复可能的错误和测试需要花费大量时间。</p><p>如果您报告任何问题，我会很高兴。</p>",
    "get-started":"开始使用",
    "概述-内容": "<p>它是Vue3的UI组件库，使用非形态/skeuomorphic设计开发。</p><p>它提供了一组组件来创建一个独特的用户界面。</p><p>该项目是作为学生在前端开发方面的工作而创建的。</p>",
    "neumorphism": "什么是neomorphism/skeuomorphism？",
    "新形态-内容": "Neumorphism是一种结合了平面设计和skeuomorphism元素的设计风格。</p><p>它创造了体积感和柔和的阴影，使界面看起来好像可以触摸。</p><p>neumorphism基于柔和的颜色，浅色渐变和柔和的阴影，创造出压制或缩进元素的效果。</p>",
  },
  "changelog-page": {
    "roadmap": {
      "title": "路线图",
      "items": {
        "nuxt-support": "添加 Nuxt 支持。",
        "storybook-vr": "添加 Storybook 与视觉回归检查。",
        "accessibility": "改进可访问性：键盘导航、ARIA、焦点状态。",
        "test-coverage": "提升测试覆盖率：单元测试、集成测试与 e2e 测试。",
        "theming-v2": "准备 Theming v2，支持扩展设计令牌与预设。",
        "performance": "优化性能与打包体积。"
      }
    },
    "changelog": {
      "title": "变更日志",
      "version-label": "版本 v{version}",
      "items": {
        "skeleton-animation": "修复 Skeleton 加载动画：在 loading 启用时 shimmer 正常工作。"
      }
    },
    "known-bugs": {
      "title": "已知问题",
      "items": {
        "input-clearable": "Input 的 clearable 模式未显示清除图标。",
        "mobile-slider": "Input Slider 在移动设备上无法正常工作。"
      }
    }
  },
  "guide-menu": {
    "quick-start": "快速开始",
    "config": "配置",
    "other": "其他"
  },
  "overview": {
    "basic-usage": "基础使用",
    "one": "一",
    "two": "二",
    "three": "三",
    "four": "四",
    "disabled": "禁用",
    "disabled-thin": "禁用",
    "thick": "厚",
    "default": "默认",
    "thin": "薄",
    "i-am-ripple": "我有涟漪效果",
    "i-am-ripple-with-hover-bg": "我有涟漪效果和悬停背景",
    "i-am-not-ripple": "我没有涟漪效果",
    "circle": "圆形",
    "round": "圆角",
    "square": "方形",
    "transparent": "透明",
    "date": "日期",
    "dates": "日期",
    "date-range": "日期范围",
    "summer": "夏季",
    "load-error": "加载错误",
    "custom-loading-text": "自定义加载文本",
    "download-in-progress": "下载中",
    "show": "显示",
    "edit": "编辑",
    "check": "检查",
    "without-underline": "无下划线",
    "underlined": "带下划线",
    "selected-page": "选定页面：",
    "loading": "加载中...",
    "i-am-slot-prefix": "我是插槽前缀",
    "add": "添加",
    "remove": "移除",
    "animated": "动画",
    "loading-state": "加载状态",
    "value": "值：",
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
    "button": {
      "style-type": {
        "subtitle":
          "使用 *default* 或 *transparent* 来定义基本样式。"
      },
      "loading": {
        "subtitle":
          "使用 *boolean* 来启用或禁用加载图标。"
      },
      "ripple": {
        "subtitle":
          "使用 *boolean* 来启用或禁用点击时的涟漪效果。"
      },
      "height": {
        "subtitle":
          "设置高度，支持值 *thick*, *default*, *thin*。"
      },
      "disabled": {
        "subtitle": "使用 *boolean* 来禁用按钮。"
      },
      "shape": {
        "info": {
          "title": "信息",
          "content":
            "使用 round 或 square 时，大小通过变量 --height 改变。"
        },
        "subtitle": "使用 shape 来改变按钮的边框半径。"
      },
      "api": {
        "type": "原生按钮类型",
        "text": "按钮文本",
        "loading": "启用/禁用加载器",
        "style-type": "更改按钮样式",
        "accent-bg-on-hover": "启用/禁用悬停时的背景色",
        "ripple": "启用/禁用点击时的涟漪效果",
        "fill": "用按钮填充容器",
        "disabled": "禁用按钮",
        "height": "更改按钮高度",
        "shape": "更改形状"
      },
      "slot": {
        "default": "按钮内容",
        "append": "右侧的自定义内容",
        "icon": "图标位置"
      },
      "variables": {
        "height": "按钮高度"
      },
      "exposes": {
        "buttonDOMElement": "原始按钮 DOM 元素"
      }
    },
    "icon": {
      "search-icon": "查找图标",
      "size": {
        "subtitle": "图标大小。定义高度和宽度。"
      },
      "width-height": {
        "subtitle": "定义图标的宽度和高度。"
      },
      "color": {
        "subtitle":
          "图标颜色。您可以使用自定义颜色或传递可用的变量。"
      },
      "api": {
        "size": "图标大小。定义高度和宽度",
        "width": "设置图标的宽度",
        "height": "设置图标的高度",
        "color": "定义图标颜色",
        "icon": "从可用图标列表中设置图标"
      },
      "slot": {
        "default": "自定义图标内容的插槽"
      },
      "variables": {
        "color": "定义图标颜色"
      },
    },
    "link": {
      "type": {
        "subtitle": "颜色类型：*accent*, *success*, *error*, *warning*。"
      },
      "underline": {
        "subtitle": "链接下划线。"
      },
      "disabled": {
        "subtitle": "链接的非活动状态。"
      },
      "api": {
        "type": "颜色类型",
        "href": "原生 href 属性",
        "underline": "悬停时显示下划线",
        "icon-name": "图标列表中的名称",
        "target": "原生 target 属性",
        "disabled": "禁用链接"
      },
      "slot": {
        "default": "链接的自定义内容",
        "prepend": "在开头添加自定义内容",
        "icon": "图标位置"
      },
      "variables": {
        "link-color": "链接颜色"
      }
    },
    "scroll": {
      "height": {
        "subtitle":
          "使用 *height* 属性设置容器的高度。如果没有设置高度，滚动将不会被激活。"
      },
      "max-height": {
        "subtitle":
          "只有当元素的高度超过最大高度时，才会显示滚动条。"
      },
      "model-value": {
        "subtitle": "用于模型的双向数据绑定的属性。"
      },
      "horizontal-scroll": {
        "subtitle":
          "如果元素的宽度超过滚动区域的宽度，则会出现水平滚动条。"
      },
      "api": {
        "height": "设置滚动容器的高度",
        "max-height": "设置滚动容器的最大高度",
        "model-value":
          "包含当前滚动位置，用于双向绑定和滚动控制",
        "scroll-y-prop":
          "定义垂直滚动行为，例如 *auto* 或 *hidden*",
        "scroll-x-prop":
          "定义水平滚动行为，例如 *auto* 或 *hidden*",
        "css-scroll-behavior":
          "定义滚动动画行为，例如 *smooth* 以实现平滑滚动",
        "scroll-end-delay": "滚动结束前的延迟（毫秒）",
        "update-only-on-scroll-end":
          "设置为 *true* 时，仅在滚动结束后更新模型值",
        "y-bar-width-in-px": "垂直滚动条的宽度",
        "x-bar-width-in-px": "水平滚动条的宽度",
        "y-gap-in-px": "垂直滚动条的内容间距",
        "x-gap-in-px": "水平滚动条的内容间距"
      },
      "slot": {
        "default": "滚动内容"
      },
      "variables": {
        "thumb-color": "滚动条滑块颜色"
      },
      "exposes": {
        "scrollDOMContainer": "容器的 DOM 元素",
        "moveTo": "设置新坐标的函数"
      },
      "events": {
        "update:model-value": "拦截双向绑定的事件",
        "on-scroll-end":
          "滚动动画结束后的事件",
        "on-scroll": "滚动事件"
      }
    },
    "avatar": {
      "size": {
        "subtitle": "Sets the size of the avatar, accepts a *number* type value."
      },
      "shape": {
        "subtitle": "Defines the shape of the avatar. Can be *circle* or *square*."
      },
      "fit": {
        "subtitle": "Defines how the image is displayed in the container."
      },
      "api": {
        "size": "Sets the size of the avatar",
        "shape": "Defines the shape of the avatar",
        "src": "Avatar image URL",
        "src-set": "List of image sources",
        "alt": "Text description of the image",
        "fit": "Defines how the image fills the container",
        "frame-border": "Defines the thickness of the frame",
        "image-padding": "Inner padding"
      },
      "slot": {
        "error": "Slot to display the load error"
      },
      "events": {
        "error": "Event for image load error",
        "load": "Event for successful image load"
      }
    },
    "badge": {
      "value": {
        "subtitle":
          "The displayed value on the badge, can be *string* or *number*."
      },
      "max": {
        "subtitle":
          "Maximum value for the badge. If it's set as a number and exceeded, it's displayed as max+."
      },
      "is-dot": {
        "subtitle":
          "Displays the badge as a small dot if set to *true*."
      },
      "hidden": {
        "subtitle": "Controls the visibility of the badge."
      },
      "color": {
        "subtitle": "Background color of the badge."
      },
      "offset": {
        "subtitle":
          "Horizontal/vertical offset of the badge relative to its parent."
      },
      "api": {
        "value": "The displayed value on the badge",
        "max": "Maximum value to display",
        "is-dot": "Displays the badge as a dot",
        "hidden": "Hides the badge",
        "color": "Sets the background color of the badge",
        "offset-y": "Vertical offset of the badge",
        "offset-x": "Horizontal offset of the badge"
      },
      "slot": {
        "default": "Custom content for the badge"
      },
      "variables": {
        "dot-size": "Width and height of the dot"
      }
    },
    "card": {
      "shadow-type": {
        "subtitle": "Defines the shadow type for the card."
      },
      "api": {
        "shadow-type": "Defines the visibility of the card's shadow."
      },
      "slot": {
        "header": "Card header",
        "footer": "Card footer"
      },
      "variables": {
        "card-padding": "Padding for all edges"
      }
    },
    "image": {
      "fit": {
        "subtitle": "定义图像如何适应容器。接受的值包括 *fill*, *contain*, *cover*, *none*, *scale-down*。",
        "info": {
          "title": "信息",
          "content":
            "为了确保 'fit' 属性正确显示，请确保容器具有固定大小。"
        }
      },
      "loading-text": {
        "subtitle": "加载图像时显示的文本。"
      },
      "load-failed-text": {
        "subtitle": "图像加载失败时显示的文本。"
      },
      "api": {
        "fit": "定义图像如何适应容器。",
        "close-on-outside-click":
          "点击容器外部时关闭预览。",
        "alt": "图像的文本描述。",
        "loading-text": "加载图像时显示的文本。",
        "load-failed-text":
          "图像加载失败时显示的文本。",
        "frame-border": "定义边框的厚度。",
        "image-padding": "定义图像的内边距。",
        "src": "图像 URL。",
        "src-set": "图像源列表。"
      },
      "slot": {
        "loading": "自定义内容插槽，显示在图像加载时。",
        "error": "自定义内容插槽，显示在图像加载失败时。"
      },
      "variables": {
        "width": "定义图像的宽度。",
        "height": "定义图像的高度。",
        "background-color": "定义图像的背景颜色。"
      },
      "events": {
        "error": "图像错误事件。",
        "load": "图像加载事件。"
      },
      "translates": {
        "loadingText": "加载中 ...",
        "loadFailedText": "加载图像失败。"
      }
    },
    "tag-list": {
      "api": {
        "model-value": "标签列表"
      },
      "events": {
        "update:model-value": "拦截双向绑定的事件",
        "close": "返回关闭标签的值"
      }
    },
    "tag-item": {
      "text": {
        "subtitle": "定义组件中显示的文本内容。"
      },
      "removable": {
        "subtitle":
          "定义组件是否可以被用户删除。接受 *boolean*。",
        "info": {
          "title": "信息",
          "content":
            "如果你希望标签显示自动处理，可以将组件包装在 NmorphTagList 中。"
        }
      },
      "height": {
        "subtitle": "定义组件的高度。"
      },
      "design": {
        "subtitle":
          "如果设置为 *common*，组件将显示带有边框。"
      },
      "api": {
        "value": "定义组件的标识符值",
        "text": "设置组件内部显示的文本",
        "removable":
          "定义组件是否可以删除。将其包装在 NmorphTagList 中时自动工作。",
        "design": "定义组件的样式",
        "height": "设置组件的高度"
      },
      "events": {
        "close": "返回关闭标签的值"
      }
    },
    "skeleton": {
      "animated": {
        "subtitle":
          "如果设置为 *true*，启用骨架组件的动画。"
      },
      "loading": {
        "subtitle": "控制骨架的显示。"
      },
      "rows": {
        "subtitle":
          "定义骨架中的行数，通常用于模拟文本内容。"
      },
      "api": {
        "animated": "启用骨架组件的动画",
        "loading": "定义骨架是否显示。",
        "rows": "设置骨架中的行数。"
      },
      "slot": {
        "template": "加载期间自定义骨架结构的插槽。",
        "default": "加载完成后默认插槽内容。"
      },
      "variables": {
        "loading-gradient":
          "定义在骨架加载动画期间使用的渐变颜色。"
      }
    },
    "skeleton-item": {
      "api": {
        "variant":
        "定义要显示的骨架类型，例如文本或圆形。",
        "design": "定义骨架项的设计。",
        "width": "设置骨架项的宽度。"
      }
    },
    "progress": {
      "type": {
        "subtitle":
          "定义进度指示器的类型，例如 *linear* 或 *circle*。"
      },
      "color": {
        "subtitle": "设置进度指示器的颜色。"
      },
      "percentage": {
        "subtitle": "定义已完成的进度百分比。",
        "info": {
          "title": "信息",
          "content":
            "确保设置了包装容器的宽度，以便正确显示。"
        }
      },
      "value-inside": {
        "subtitle":
          "如果设置为 *true*，则在进度条内显示进度文本。"
      },
      "value-right-side": {
        "subtitle":
          "显示或隐藏进度指示器旁边的百分比文本。"
      },
      "indeterminate": {
        "subtitle":
          "当设置为 *true* 时，显示不确定的进度动画。"
      },
      "circle-size": {
        "subtitle": "定义圆形进度指示器的大小。"
      },
      "api": {
        "type": "指定进度指示器的类型",
        "color": "设置进度指示器的颜色",
        "percentage": "设置进度的百分比",
        "value-inside": "在进度条内显示进度文本",
        "value-right-side": "显示或隐藏右侧的百分比文本",
        "indeterminate": "启用不确定进度动画",
        "circle-size": "设置圆形进度指示器的大小"
      },
      "slot": {
        "inner-text":
          "进度指示器内部的自定义内容插槽。",
        "right-side":
          "进度指示器右侧的自定义内容插槽。",
        "circle-inner-part":
          "圆形进度指示器内部的自定义内容插槽。"
      },
      "variables": {
        "height": "定义进度指示器的宽度。",
        "width-transition": "设置进度动画。",
        "animation": "控制进度指示器动画的设置。"
      }
    },
    "calendar": {
      "type": {
        "subtitle":
          "定义日历的类型，例如 *date* 或 *dates* 选择。"
      },
      "custom-content": {
        "subtitle": ""
      },
      "range": {
        "subtitle": "设置显示日历的边界。"
      },
      "api": {
        "mark-today": "突出显示今天的日期",
        "initial-date":
          "设置日历中显示的初始日期",
        "model-value": "表示日历中选定的日期",
        "type": "定义日历中的选择类型",
        "range":
          "启用日历中的范围选择模式，允许选择日历中的日期范围。不是选定的范围，而是显示的日历范围。"
      },
      "slot": {
        "header": "日历标题插槽",
        "content": "日历内容插槽"
      },
      "variables": {
        "table-data-cell-height":
          "定义日历中每个日期单元格的高度"
      },
      "translates": {
        "sun": "星期日",
        "mon": "星期一",
        "tue": "星期二",
        "wed": "星期三",
        "thu": "星期四",
        "fri": "星期五",
        "sat": "星期六",
        "jan": "一月",
        "feb": "二月",
        "mar": "三月",
        "apr": "四月",
        "may": "五月",
        "jun": "六月",
        "jul": "七月",
        "aug": "八月",
        "sep": "九月",
        "oct": "十月",
        "nov": "十一月",
        "dec": "十二月"
      }
    },
    "image-preview": {
      "model-value": {
        "subtitle": "控制图像预览的可见性。"
      },
      "initial-index": {
        "subtitle":
          "定义多个图像时的初始图像索引。"
      },
      "src": {
        "subtitle": "图像预览的 URL 地址。"
      },
      "api": {
        "model-value":
          "切换图像预览可见性的布尔值",
        "alt": "图像无法加载时的文本描述",
        "initial-index":
          "显示的第一张图像的索引",
        "src": "图像预览的 URL 地址",
        "scale-step": "图像缩放步长",
        "min-scale-level":
          "定义图像的最小缩放级别",
        "max-scale-level":
          "定义图像的最大缩放级别"
      },
      "slot": {},
      "variables": {
        "width": "定义图像预览的宽度。",
        "height": "定义图像预览的高度。"
      },
      "events": {
        "update:model-value": "拦截双向绑定的事件"
      }
    },
    "pagination": {
      "basic-usage": {
        "subtitle": ""
      },
      "api": {
        "total-elements-quantity": "分页的元素总数。",
        "model-value": "当前活动的页码。",
        "elements-quantity-on-page":
          "每页显示的元素数量。",
        "disabled": "布尔值，禁用分页组件。",
        "hide-on-single-page":
          "如果只有一页，则隐藏分页组件。",
        "max-visible-pages":
          "定义在分页控件中显示的页面数量。",
        "fast-forward-step":
          "定义快进时跳过的页面数量。"
      },
      "slot": {},
      "variables": {},
      "events": {
        "update:model-value": "用于拦截双向绑定的事件"
      }
    },
    "table": {
      "basic-usage": {
        "subtitle": "",
        "enable-row-highlight": "启用行高亮显示（悬停时）",
        "disable-row-highlight": "禁用行高亮显示（悬停时）",
        "click-me-text": "点击我！",
        "info": {
          "title": "重要信息",
          "content":
            "'bordered' 属性仅在 'design' 属性设置为 'common' 时有效。此外，排序当前仅支持 'ascending' 和 'descending' 两个值。\n请注意，表格处于积极开发阶段，可能包含错误。"
        }
      },
      "api": {
        "data": "定义要显示在表格中的数据",
        "row-hover":
          "布尔值，启用或禁用表格行的悬停效果",
        "bordered":
          "布尔值，启用或禁用表格单元格的边框。仅在 'design' 属性设置为 'common' 时有效",
        "sort": "定义表格列的排序行为",
        "design": "表格的显示样式"
      },
      "slot": {},
      "variables": {
        "border-color": "设置表格的边框颜色",
        "table-cell-height": "定义表格单元格的高度"
      }
    },
    "table-column": {
      "api": {
        "prop": "指定数据源中的属性名称，将显示在此列中",
        "label": "在表格头部显示的列标题",
        "width": "定义列的宽度，采用 CSS 值",
        "alignment":
          "设置列中文本的对齐方式。接受 'left'、'center' 或 'right'"
      }
    },
    "table-cell": {
      "api": {
        "row": "必需属性。传递当前行的索引，表示正在渲染的行。"
      },
      "slot": {
        "default":
          "默认插槽用于定制每个列单元格中的内容。提供对行数据和其他相关属性的访问。"
      }
    },
    "tooltip": {
      "text": {
        "subtitle": "在提示框内显示的内容。",
        "hover-me": "悬停在我上面",
        "i-am-tooltip": "我是一个提示框",
        "tooltip": "提示框",
        "button": "按钮"
      },
      "position": {
        "subtitle": "定义提示框相对于目标元素的位置。接受值如 'top'、'bottom'、'left'、'right'。"
      },
      "force-coordinate": {
        "subtitle": "覆盖默认的定位逻辑，允许指定提示框的精确坐标。"
      },
      "api": {
        "text": "定义提示框的文本内容",
        "position": "设置提示框相对于目标元素的位置",
        "force-show": "强制显示提示框的布尔值",
        "force-coordinate": "允许手动控制提示框的坐标"
      },
      "slot": {},
      "variables": {
        "max-width": "设置提示框内容的最大宽度",
        "width": "设置提示框内容的宽度。控制提示框的水平大小",
        "height": "设置提示框内容的高度。控制提示框的垂直大小"
      }
    },
    "alert": {
      "basic-usage": {
        "title": "任意标题",
        "content": "警告的内容",
        "info": {
          "title": "附加信息",
          "content": "为了方便管理多个警告，使用 'NmorphNotificationProvider' 组件，可以将警告分组并集中管理。"
        }
      },
      "use-provider": {
        "subtitle": "要使用提供者，您需要从库中导入钩子。"
      },
      "api": {
        "id": "警告组件的唯一标识符",
        "type": "定义警告类型（例如，success，error，warning，info）",
        "closable": "布尔值，定义警告是否可以被用户关闭",
        "title": "警告中显示的标题",
        "content": "警告的内容",
        "fill": "定义警告是否应占据其容器的整个宽度",
        "max-width": "警告组件的最大宽度",
        "show-icon": "布尔值，基于警告类型显示图标",
        "bordered": "为警告添加边框以突出显示",
        "html": "允许在警告的正文中使用 HTML 内容。使用时请谨慎，以避免 XSS 漏洞"
      },
      "slot": {
        "icon": "自定义警告中显示图标的插槽",
        "title": "自定义警告标题的插槽",
        "default": "自定义警告主要内容的插槽"
      },
      "variables": {},
      "events": {
        "close": "当用户关闭警告时触发的事件"
      }
    },
    "dialog": {
      "basic-usage": {
        "subtitle": "",
        "show-modal": "显示模态窗口"
      },
      "api": {
        "model-value": "控制对话框可见性的布尔值",
        "title": "定义对话框的标题文本",
        "width": "设置对话框的宽度",
        "open-delay": "打开对话框前的延迟（毫秒）",
        "close-delay": "关闭对话框前的延迟（毫秒）",
        "close-on-click-modal": "布尔值，允许通过点击外部关闭对话框",
        "show-close": "布尔值，显示对话框中的关闭按钮",
        "z-index": "定义对话框的 z-index，用于控制覆盖层",
        "close-on-overlay": "布尔值，指示是否在点击覆盖区时关闭对话框"
      },
      "slot": {
        "header": "自定义对话框头部内容的插槽。",
        "default": "定义对话框主要内容的插槽。"
      },
      "events": {
        "on-close": "当用户关闭对话框时触发的事件。",
        "update:model-value": "当对话框的可见性发生变化时触发的事件。"
      },
      "variables": {
        "width": "定义对话框组件的宽度。"
      }
    },
    "divider": {
      "direction": {
        "subtitle": "定义分隔符的方向。接受 'horizontal' 或 'vertical'。"
      },
      "api": {
        "direction": "定义分隔符的方向：'horizontal' 或 'vertical'。"
      },
      "slot": {},
      "variables": {}
    },
    "overlay": {
      "basic-usage": {
        "subtitle": "",
        "show-default": "显示默认",
        "show-transparent": "显示透明"
      },
      "api": {
        "show": "控制组件的可见性",
        "transparent": "布尔值，启用时使组件背景透明"
      },
      "slot": {
        "default": "默认插槽，用于自定义组件内部的内容"
      },
      "events": {
        "on-outside-click": "当用户点击组件外部时触发的事件"
      },
      "variables": {}
    },
    "notification-provider": {
      "notifications": {
        "subtitle": ""
      },
      "placement": {
        "subtitle": "定义通知在屏幕上的位置。"
      },
      "z-index": {
        "subtitle": "设置通知的 z-index，以控制其堆叠顺序。"
      },
      "quantity": {
        "subtitle": "限制同时显示的最大通知数量。"
      },
      "api": {
        "notifications": "包含通知的数组",
        "placement": "指定通知将在屏幕上出现的位置",
        "z-index": "定义通知的堆叠顺序",
        "quantity": "同时可以在屏幕上显示的最大通知数量"
      },
      "slot": {},
      "variables": {}
    },
    "tabs": {
      "api": {
        "model-value": "控制组件的活动状态",
        "stretch": "布尔值，定义组件是否应拉伸以填充可用空间"
      },
      "slot": {
        "default": "插槽，用于自定义每个标签内的内容"
      },
      "variables": {},
      "events": {
        "update:model-value": "当活动标签变化时触发的事件",
        "tab-change": "当标签变化时触发的事件"
      }
    },
    "tab-pane": {
      "api": {
        "label": "在标签导航中显示的标签",
        "name": "标签的唯一标识符，用于控制活动标签",
        "disabled": "布尔值，指示标签是否禁用且无法选择"
      },
      "slot": {
        "label": "自定义标签的插槽",
        "default": "定义标签主要内容的插槽"
      }
    },
    "dropdown": {
      "basic-usage": {
        "first-menu": "第一个菜单",
        "second-menu": "第二个菜单"
      },
      "api": {
        "open": "控制下拉菜单可见性的布尔值",
        "relative-element": "定义下拉菜单相对于哪个元素定位",
        "width": "设置下拉菜单的宽度",
        "x-offset": "调整下拉菜单位置的水平偏移量（以像素为单位）",
        "y-offset": "调整下拉菜单位置的垂直偏移量（以像素为单位）",
        "fill-width": "布尔值，定义下拉菜单是否应占满整个容器宽度"
      },
      "slot": {
        "default": "自定义下拉菜单内部内容的插槽"
      },
      "variables": {},
      "events": {
        "on-outside-click": "当用户点击下拉菜单外部时触发的事件，可用于关闭它"
      }
    },
    "backtop": {
      "basic-usage": {
        "info": {
          "title": "信息",
          "content": "确保已定义滚动容器的高度。"
        },
        "scroll-down": "向下滚动"
      },
      "api": {
        "right": "设置距离屏幕右边缘的距离",
        "bottom": "设置距离屏幕下边缘的距离",
        "visibility-height": "定义返回顶部按钮在该滚动高度下变为可见。以像素为单位",
        "design": "定义按钮的样式"
      },
      "slot": {
        "default": "自定义返回顶部按钮内容的插槽"
      },
      "events": {
        "click": "当用户点击返回顶部按钮时触发的事件"
      },
      "variables": {}
    },
    "breadcrumb": {
      "separator": {
        "subtitle": "定义用于分隔导航项的符号。"
      },
      "api": {
        "separator": "分隔导航项的符号"
      }
    },
    "breadcrumb-item": {
      "api": {
        "to": "指定导航的目标路由。接受路径字符串或路由对象",
        "replace": "布尔值，决定导航是否应替换当前历史记录条目而不是添加新条目"
      }
    },
    "text-input": {
      "height": {
        "subtitle": "设置输入字段的高度。"
      },
      "disabled": {
        "subtitle": "如果设置为 *true*，则禁用输入字段。"
      },
      "type-password": {
        "subtitle": "如果设置为 *true*，则输入框中的文本将隐藏为密码。",
        "toggle": "切换类型"
      },
      "model-value": {
        "subtitle": "表示输入框的值"
      },
      "clearable": {
        "subtitle": "如果设置为 *true*，则会出现按钮以清空输入框。"
      },
      "api": {
        "height": "定义输入框的高度",
        "disabled": "布尔值，禁用输入框",
        "placeholder": "当输入框为空时显示的提示文本",
        "type-password": "布尔值，将输入框变为密码字段",
        "model-value": "当前输入框的值",
        "clearable": "布尔值，添加一个按钮来清空输入框的值"
      },
      "slot": {
        "prepend-icon": "插槽，用于在输入框前添加图标"
      },
      "variables": {
        "prepend-icon-indent": "定义图标前的缩进"
      },
      "events": {
        "update:model-value": "当输入框的值变化时触发的事件",
        "focus": "当输入框获得焦点时触发的事件",
        "blur": "当输入框失去焦点时触发的事件",
        "on-enter": "按下回车键时触发的事件"
      },
      "exposes": {
        "inputDOMRef": "输入框的原始 DOM 元素"
      }
    },
    "switch": {
      "height": {
        "subtitle": "定义开关组件的高度。"
      },
      "disabled": {
        "subtitle": "如果设置为 *true*，则禁用开关。"
      },
      "model-value": {
        "subtitle": "控制开关的开/关状态。"
      },
      "loading": {
        "subtitle": "如果设置为 *true*，则在开关上显示加载状态。"
      },
      "active-value": {
        "subtitle": "指定开关打开时的值。"
      },
      "inactive-value": {
        "subtitle": "指定开关关闭时的值。"
      },
      "api": {
        "height": "设置开关的高度",
        "disabled": "布尔值，禁用开关组件",
        "model-value": "控制开关的状态",
        "loading": "布尔值，显示开关上的加载指示器",
        "active-value": "开关打开时的值",
        "inactive-value": "开关关闭时的值"
      },
      "slot": {
        "bg-on": "插槽，用于自定义开关打开时的背景",
        "bg-off": "插槽，用于自定义开关关闭时的背景",
        "thumb-on": "插槽，用于自定义开关打开时的按钮",
        "thumb-off": "插槽，用于自定义开关关闭时的按钮"
      },
      "variables": {
        "height": "定义开关的高度",
        "offset": "指定开关按钮的偏移量",
        "thumb-height": "定义开关按钮的高度"
      },
      "events": {
        "update:model-value": "当开关状态改变时触发的事件"
      },
      "exposes": {
        "inputDOMRef": "输入框的原始 DOM 元素"
      }
    },
    "checkbox": {
      "id": {
        "subtitle": "复选框的唯一标识符。"
      },
      "disabled": {
        "subtitle": "如果设置为 *true*，则禁用复选框。"
      },
      "model-value": {
        "subtitle": "表示复选框的状态（选中或未选中）。",
        "label": "标签"
      },
      "label": {
        "subtitle": "指定复选框的标签文本。"
      },
      "design": {
        "subtitle": "定义复选框的设计风格。"
      },
      "api": {
        "id": "复选框的唯一标识符",
        "disabled": "布尔值，禁用复选框",
        "model-value": "复选框状态（选中或未选中）",
        "label": "显示在复选框旁边的标签",
        "design": "定义复选框的设计风格"
      },
      "slot": {
        "default": "自定义复选框内容的插槽",
        "label": "自定义复选框标签的插槽"
      },
      "variables": {
        "size": "定义复选框的大小"
      },
      "events": {
        "update:model-value": "当复选框状态改变时触发的事件"
      },
      "exposes": {
        "inputDOMRef": "输入字段的原始 DOM 元素"
      }
    },
    "checkbox-group": {
      "api": {
        "height": "复选框的宽度",
        "disabled": "禁用组中的所有复选框",
        "model-value": "选中值的数组",
        "options": "复选框选项",
        "design": "复选框组的设计风格",
        "direction": "复选框组的布局方向"
      },
      "slot": {
        "default": "自定义复选框组内容的插槽"
      },
      "variables": {},
      "events": {
        "update:model-value": "当复选框组中的选中值发生变化时触发的事件"
      }
    },
    "autocomplete": {
      "basic-usage": {
        "placeholder": "文本..."
      },
      "height": {
        "subtitle": "定义自动完成输入框的高度。"
      },
      "disabled": {
        "subtitle": "禁用自动完成输入框。"
      },
      "placeholder": {
        "subtitle": "当输入框为空时显示的文本。"
      },
      "clearable": {
        "subtitle": "如果设置为 *true*，则会出现一个按钮来清空输入框。"
      },
      "list": {
        "subtitle": "设置自动完成建议的选项列表。"
      },
      "action-callback": {
        "subtitle": "在输入时调用的函数。"
      },
      "api": {
        "height": "自动完成输入框的高度",
        "disabled": "禁用自动完成输入框",
        "model-value": "输入框的当前值",
        "placeholder": "当输入框为空时显示的提示文本",
        "clearable": "布尔值，添加按钮清除输入值",
        "list": "输入建议的列表",
        "action-callback": "当选择一个选项时调用的回调函数"
      },
      "slot": {
        "loader": "在获取数据时添加自定义加载器的插槽"
      },
      "variables": {},
      "events": {
        "update:model-value": "当自动完成字段值发生变化时触发的事件",
        "select": "当从建议中选择一个项时触发的事件"
      }
    },
    "file-upload": {
      "model-value": {},
      "disabled": {
        "subtitle": "禁用文件上传组件"
      },
      "multiple": {
        "subtitle": "如果设置为 *true*，允许上传多个文件。"
      },
      "photo-with-preview": {
        "subtitle": "如果设置为 *true*，上传的照片将显示预览。"
      },
      "api": {
        "model-value": "表示上传的文件",
        "disabled": "布尔值，禁用文件上传组件",
        "multiple": "布尔值，允许选择多个文件",
        "allowed-types": "定义可以上传的文件类型",
        "photo-with-preview": "显示上传图片的预览",
        "fill": "允许上传按钮填充其容器"
      },
      "slot": {
        "trigger": "用于自定义触发文件上传的按钮的插槽"
      },
      "variables": {},
      "events": {
        "on-unsupported-file-type-error": "当用户尝试上传不支持的文件类型时触发的事件",
        "update:model-value": "当文件选择发生变化时触发的事件"
      },
      "exposes": {
        "inputDOMRef": "输入框的原始 DOM 元素"
      },
      "translates": {
        "selectFile": "选择文件"
      }
    },
    "number-input": {
      "basic-usage": {},
      "height": {
        "subtitle": "定义数字输入框的高度。"
      },
      "disabled": {
        "subtitle": "如果设置为 *true*，则禁用数字输入框。"
      },
      "action-btn-position-right": {
        "subtitle": "如果设置为 *true*，增减按钮将位于右侧。"
      },
      "api": {
        "height": "数字输入框的高度",
        "disabled": "布尔值，禁用输入框",
        "model-value": "数字输入框的当前值",
        "max": "最大允许值",
        "min": "最小允许值",
        "step": "增加或减少值的步长",
        "action-btn-position-right": "如果设置为 *true*，则将操作按钮放置在右侧"
      },
      "slot": {},
      "variables": {},
      "exposes": {
        "inputDOMRef": "输入框的原始 DOM 元素"
      },
      "events": {
        "update:model-value": "当数字输入框的值变化时触发的事件"
      }
    },
    "select": {
      "height": {
        "subtitle": "设置下拉列表的高度。"
      },
      "disabled": {
        "subtitle": "禁用该组件。"
      },
      "model-value": {
        "subtitle": "表示选择组件的选中值。",
        "multiple": "多个值"
      },
      "loading": {
        "subtitle": "如果设置为 *true*，则显示加载指示器。"
      },
      "api": {
        "height": "下拉列表的高度",
        "disabled": "禁用下拉列表",
        "no-element-placeholder": "当没有选项时显示的占位文本",
        "value-required": "需要选择一个值",
        "options": "可用选项的列表",
        "options-map": "显示选项的对象",
        "model-value": "下拉列表的选中值",
        "loading": "显示加载状态",
        "open": "控制列表可见性的布尔值"
      },
      "slot": {
        "default": "自定义下拉列表选项的插槽"
      },
      "variables": {
        "base-width": "设置选择组件的基础宽度"
      },
      "events": {
        "update:model-value": "当选中的值发生变化时触发的事件"
      }
    },
    "select-option": {
      "api": {
        "label": "定义显示在下拉列表中的选项标签",
        "height": "设置选项的高度",
        "disabled": "布尔值，指示选项是否禁用，无法选择"
      },
      "slot": {
        "default": "用于自定义此选项显示内容的插槽"
      },
      "variables": {
        "hover-bg": "设置悬停时的背景色",
        "hover-color": "定义悬停时的文本颜色"
      },
      "events": {
        "change-value": "当选项值发生变化时触发的事件"
      }
    },
    "slider": {
      "disabled": {
        "subtitle": "如果设置为 *true*，禁用滑块。"
      },
      "show-tooltip": {
        "subtitle": "如果设置为 *true*，显示当前值的提示框。"
      },
      "api": {
        "fill": "布尔值，允许滑块填充其容器",
        "disabled": "禁用滑块组件",
        "model-value": "滑块的当前值",
        "max": "滑块的最大值",
        "min": "滑块的最小值",
        "step": "用于增加或减少值的步长",
        "show-tooltip": "布尔值，控制提示框的可见性"
      },
      "slot": {},
      "variables": {
        "slider-height": "定义滑块的高度",
        "value-fixed-container-height": "设置容器的高度"
      },
      "events": {
        "update:model-value": "当滑块值发生变化时触发的事件"
      }
    },
    "date-picker": {
      "height": {
        "subtitle": "设置日期选择字段的高度。"
      },
      "disabled": {
        "subtitle": "如果设置为 *true*，禁用日期选择。"
      },
      "api": {
        "height": "日期选择字段的高度",
        "disabled": "布尔值，禁用日期选择",
        "placeholder": "没有选择日期时显示的文本",
        "model-value": "当前选择的日期或日期范围",
        "type": "日期选择类型，例如 *单一* 或 *范围*",
        "text-separator": "范围选择模式中用于分隔开始和结束日期的文本"
      },
      "slot": {},
      "variables": {
        "width": "定义日期选择组件的宽度"
      },
      "events": {
        "update:model-value": "当选择的日期或日期范围发生变化时触发的事件"
      },
      "translates": {
        "pickADate": "选择日期"
      }
    },
    "radio": {
      "basic-usage": {
        "info": {
          "title": "Radio Group 使用方法",
          "content": "通常用于一组单选按钮中，让用户从多个选项中选择一个。选中单选按钮后，不能通过再次点击取消选中状态，只能通过选择该组中的其他单选按钮来改变状态。为确保正确显示，当 'style-type' 设置为 'button' 时，应提供标签（label）。"
        }
      },
      "api": {
        "disabled": "布尔值，禁用单选按钮",
        "label": "显示在单选按钮旁边或内部的标签文本",
        "value": "分配给单选按钮的值",
        "style-type": "定义单选按钮的视觉样式",
        "checked": "将单选按钮标记为选中"
      },
      "slot": {
        "label": "自定义单选按钮标签的插槽"
      },
      "variables": {
        "size": "定义单选按钮的大小"
      },
      "exposes": {
        "inputDOMRef": "输入字段的原始 DOM 元素"
      }
    },
    "radio-group": {
      "api": {
        "height": "单选按钮组的高度",
        "disabled": "禁用组中的所有单选按钮",
        "model-value": "单选按钮组的选中值",
        "options": "可供选择的选项列表",
        "style-type": "单选按钮的视觉样式",
        "direction": "单选按钮的布局方向"
      },
      "slot": {
        "default": "传递 NmorphRadioButton 的插槽"
      },
      "variables": {},
      "events": {
        "update:model-value": "当选中值发生变化时触发的事件"
      }
    },
    "form": {
      "basic-usage": {
        "subtitle": "表示所有输入元素的表单值。",
        "too-short": "太短",
        "wrong-age": "年龄不正确",
        "you-cant-be-a-nobody": "你不能是无名用户",
        "we-dont-have-kombucha": "我们没有康普茶(",
        "ie-not-supported": "IE 不支持",
        "you-must-set-agreement": "您必须接受协议",
        "value-must-greater-than-30": "值必须大于 30",
        "value-must-less-than-80": "值必须小于 80",
        "pear-is-not-available": "梨子不可用",
        "coffee": "咖啡",
        "tea": "茶",
        "pear": "梨",
        "apple": "苹果",
        "orange": "橙子",
        "unknown": "未知",
        "username": "用户名",
        "years-old": "岁",
        "preferred-drink": "首选饮料",
        "browsers": "浏览器",
        "agreement": "协议",
        "number-value": "数字值",
        "choose-date": "选择日期",
        "food": "食物",
        "favorite-food": "最喜欢的食物",
        "photo": "照片",
        "send-form": "发送表单",
        "enter-username": "输入用户名",
        "is-valid": "表单有效：",
        "info": {
          "title": "类型信息",
          "content": "为了正确的类型检查，您必须导入 INmorphFromDataExpose 类型。"
        }
      },
      "validate-immediately": {
        "subtitle": "如果设置为 *true*，表单将在渲染后立即验证其字段。"
      },
      "api": {
        "value": "输入元素的表单值",
        "validate-immediately": "布尔值，控制加载时验证"
      },
      "slot": {
        "default": "传递 NmorphFormItem 的插槽"
      },
      "variables": {},
      "exposes": {
        "form-data": "表单数据，包括验证"
      },
      "explanation": `
        <div class="container">
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
      `
    },
    "form-item": {
      "api": {
        "id": "表单项的唯一标识符",
        "height": "设置表单项容器的高度",
        "label": "定义与表单项关联的标签文本，为用户提供上下文",
        "show-validation-icon": "布尔值，控制显示该表单项的验证图标",
        "static-error-box-space": "定义用于显示错误字段的静态空间，无论验证状态如何，确保空间一致",
        "validate": "定义表单项的验证规则"
      },
      "slot": {
        "default": "用于自定义表单项内容的插槽，通常包括输入元素或其他表单控件"
      }
    }
  }
}
