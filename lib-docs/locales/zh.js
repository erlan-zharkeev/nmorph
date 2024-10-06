export default {
  "guide": "指南",
  "components": "组件",
  "about": "关于",
  "search": "搜索",
  "attributes": "属性",
  "slots": "插槽",
  "variables": "变量",
  "exposes": "暴露",
  "right-aside-title": "内容",
  "name": "名称",
  "events": "事件",
  "description": "描述",
  "type": "类型",
  "default": "默认",
  "basic": "基础",
  "data": "数据",
  "feedback": "反馈",
  "form": "表单",
  "navigation": "导航",
  "other": "其他",
  "overview": {
    "button": {
      "style-type": {
        "subtitle": "使用 *default* 或 *transparent* 定义基本样式"
      },
      "loading": {
        "subtitle": "使用 *boolean* 启用或禁用加载图标"
      },
      "ripple": {
        "subtitle": "使用 *boolean* 启用或禁用点击时的波纹效果"
      },
      "height": {
        "subtitle": "设置高度，可用值 *thick*，*default*，*thin*"
      },
      "disabled": {
        "subtitle": "使用 *boolean* 禁用按钮"
      },
      "shape": {
        "info": {
          "title": "信息",
          "content": "使用圆形或方形时，通过 --height 变量更改大小"
        },
        "subtitle": "使用 shape 改变按钮的边框半径"
      },
      "api": {
        "type": "原生按钮类型",
        "text": "按钮文本",
        "loading": "启用/禁用按钮内的加载器",
        "style-type": "更改按钮样式",
        "accent-bg-on-hover": "启用/禁用悬停时的背景色",
        "ripple": "启用/禁用点击时的波纹效果",
        "fill": "按钮填充容器",
        "disabled": "禁用按钮",
        "height": "更改按钮高度",
        "shape": "改变形状",
        "icon": "从图标列表中设置图标"
      },
      "slot": {
        "default": "自定义按钮内容",
        "append": "追加自定义内容"
      },
      "variables": {
        "height": "定义按钮高度"
      },
      "exposes": {
        "buttonDOMElement": "原始按钮 DOM 元素"
      }
    },
    "icon": {
      "search-icon": "搜索图标",
      "size": {
        "subtitle": "设置图标大小"
      },
      "width-height": {
        "subtitle": "设置宽度/高度"
      },
      "color": {
        "subtitle": "设置颜色，可使用自定义颜色或传递可用变量"
      },
      "api": {
        "size": "图标大小",
        "width": "图标宽度",
        "height": "图标高度",
        "color": "图标颜色",
        "icon": "图标列表"
      },
      "slot": {
        "default": "默认图标内容"
      },
      "variables": {
        "color": "图标颜色"
      }
    },
    "link": {
      "type": {
        "subtitle": "选择颜色类型：*accent*，*success*，*error*，*warning*"
      },
      "underline": {
        "subtitle": "链接下划线"
      },
      "disabled": {
        "subtitle": "链接的禁用状态"
      },
      "icon-name": {
        "subtitle": "带有图标的链接"
      },
      "api": {
        "type": "颜色类型",
        "href": "原生 href 属性",
        "underline": "悬停时显示下划线",
        "icon-name": "图标列表",
        "target": "原生 target 属性",
        "disabled": "禁用链接"
      },
      "slot": {
        "default": "自定义链接内容",
        "prepend": "前置自定义内容"
      },
      "variables": {
        "link-color": "链接颜色"
      }
    },
    "scroll": {
      "height": {
        "subtitle": "使用 *height* 属性设置容器的高度，如果未设置高度，则不会激活滚动"
      },
      "max-height": {
        "subtitle": "仅当元素高度超过最大高度时显示滚动条。"
      },
      "value": {
        "subtitle": "绑定并更新模型值以更改滚动位置"
      },
      "horizontal-scroll": {
        "subtitle": "如果元素宽度超过滚动条宽度，则会出现水平滚动条"
      },
      "api": {
        "height": "设置滚动容器的高度，支持静态和动态值",
        "max-height": "指定滚动容器的最大高度，限制其垂直尺寸",
        "model-value": "保存当前滚动位置，用于双向绑定和滚动控制",
        "scroll-y-prop": "确定垂直滚动行为，例如自动或隐藏",
        "scroll-x-prop": "设置水平滚动行为，控制水平滚动的可见性和功能",
        "css-scroll-behavior": "定义滚动的动画行为，例如平滑滚动效果",
        "scroll-end-delay": "滚动结束延迟，单位毫秒",
        "update-only-on-scroll-end": "如果设置为 true，则仅在滚动结束后更新 model-value",
        "y-bar-width-in-px": "Y 轴滚动条宽度",
        "x-bar-width-in-px": "X 轴滚动条宽度",
        "y-gap-in-px": "Y 轴滚动条内容间距",
        "x-gap-in-px": "X 轴滚动条内容间距",
        "role": "视图角色",
        "aria-label": "视图的 aria-label",
        "aria-orientation": "视图的 aria-orientation"
      },
      "slot": {
        "default": "滚动内容"
      },
      "variables": {
        "thumb-color": "滚动条颜色"
      },
      "exposes": {
        "scrollDOMContainer": "容器元素",
        "moveTo": "传递新坐标的函数"
      },
      "events": {
        "update:model-value": "拦截双向绑定的事件",
        "on-scroll-end": "滚动动画结束后触发事件",
        "on-scroll": "滚动事件"
      }
    },
    "avatar": {
      "size": {
        "subtitle": "指定头像大小，仅接受 *number*。"
      },
      "shape": {
        "subtitle": "确定头像的形状。可以是 *circle* 或 *square*。"
      },
      "fit": {
        "subtitle": "定义图片如何适应容器。"
      },
      "api": {
        "size": "指定头像的大小。",
        "shape": "定义头像的形状。",
        "src": "头像图片的 URL。",
        "src-set": "图片源列表。",
        "alt": "图片的文本描述。",
        "fit": "指定图片如何填充容器。"
      },
      "slot": {
        "error": "用于显示加载错误的插槽"
      },
      "events": {
        "error": "原生 img 错误事件",
        "load": "原生 img 加载事件"
      }
    },
    "badge": {
      "value": {
        "subtitle": "徽章上显示的值，可以是 *string* 或 *number*。"
      },
      "max": {
        "subtitle": "徽章的最大值。如果超出，将显示为 *max+*。"
      },
      "is-dot": {
        "subtitle": "如果设置为 *true*，徽章将显示为一个小点。"
      },
      "hidden": {
        "subtitle": "控制徽章是否隐藏。"
      },
      "color": {
        "subtitle": "徽章的背景颜色。"
      },
      "offset": {
        "subtitle": "徽章相对于其父元素的水平/垂直偏移。"
      },
      "api": {
        "value": "徽章上显示的值。",
        "max": "可显示的最大值。",
        "is-dot": "将徽章显示为一个小点。",
        "hidden": "隐藏徽章。",
        "color": "设置徽章的背景颜色。",
        "offset-y": "徽章的垂直位置偏移。",
        "offset-x": "徽章的水平位置偏移。"
      },
      "slot": {
        "default": "徽章的相关内容"
      },
      "variables": {
        "dot-size": "宽度和高度"
      }
    },
    "card": {
      "shadow-type": {
        "subtitle": "指定卡片的阴影效果类型。接受 *always*、*hover* 或 *never*。"
      },
      "api": {
        "shadow-type": "定义卡片的阴影可见性。"
      },
      "slot": {
        "header": "卡片头部",
        "footer": "卡片尾部"
      },
      "variables": {
        "card-padding": "所有边的缩进"
      }
    },
    "image": {
      "fit": {
        "subtitle": "定义图片如何适应其容器。接受 *fill*、*contain*、*cover*、*none*、*scale-down*。",
        "info": {
          "title": "信息",
          "content": "为正确显示 fit 属性，请确保已限制包装器的大小"
        }
      },
      "close-on-outside-click": {
        "subtitle": "如果设置为 *true*，点击外部时关闭图片预览。"
      },
      "alt": {
        "subtitle": "当图片无法显示时的替代文本。"
      },
      "loading-text": {
        "subtitle": "图片加载时显示的文本。"
      },
      "load-failed-text": {
        "subtitle": "图片加载失败时显示的文本。"
      },
      "api": {
        "fit": "指定图片如何适应其容器。",
        "close-on-outside-click": "点击外部时关闭预览。",
        "alt": "图片的文本描述。",
        "loading-text": "图片加载时显示的文本。",
        "load-failed-text": "图片加载失败时显示的文本。",
        "frame-border": "定义边框厚度",
        "image-padding": "定义图片的内边距",
        "src": "图片的 URL。",
        "src-set": "图片源列表。"
      },
      "slot": {
        "loading": "用于在图片加载期间显示自定义内容的插槽。",
        "error": "用于在图片加载失败时显示自定义内容的插槽。"
      },
      "variables": {
        "width": "定义图片的宽度。",
        "height": "定义图片的高度。",
        "background-color": "定义图片的背景颜色"
      },
      "events": {
        "error": "原生错误事件",
        "load": "原生加载事件"
      }
    },
    "tag-list": {
      "api": {
        "model-value": "标签元素对象列表",
      },
      "events": {
        "update:model-value": "拦截双向绑定的事件",
        "close": "返回关闭的标签值",
      }
    },
    "tag-item": {
      "value": {
        "subtitle": "分配给组件的值，通常为 *string* 或 *number*。"
      },
      "text": {
        "subtitle": "定义组件中显示的文本内容。"
      },
      "removable": {
        "subtitle": "确定用户是否可以删除组件。仅接受 *boolean*。",
        "info": {
          "title": "信息",
          "content": "如果你希望标签的渲染自动处理，可以将组件包裹在 NmorphTagList 中。"
        }
      },
      "height": {
        "subtitle": "指定组件的高度。"
      },
      "design": {
        "subtitle": "如果设置为 *common*，则组件将使用边框进行渲染"
      },
      "api": {
        "value": "定义组件的值。",
        "text": "设置组件内部显示的文本。",
        "removable": "指示是否可以删除组件。自动在 NmorphTagList 中使用时生效。",
        "design": "指定组件样式",
        "height": "定义组件高度"
      },
      "events": {
        "close": "返回关闭的标签值"
      }
    },
    "skeleton": {
      "animated": {
        "subtitle": "启用动画效果时，将组件设置为 *true*。"
      },
      "loading": {
        "subtitle": "控制是否显示骨架组件，通常基于加载状态。"
      },
      "rows": {
        "subtitle": "指定骨架组件的行数，通常用于模拟文本内容。"
      },
      "api": {
        "animated": "切换骨架组件的动画。",
        "loading": "根据加载状态确定是否显示骨架组件。",
        "rows": "定义骨架布局的行数。"
      },
      "slot": {
        "template": "加载时用于自定义骨架结构的插槽。",
        "default": "非加载时的默认插槽内容。"
      },
      "variables": {
        "loading-gradient": "定义骨架加载动画期间使用的渐变颜色。"
      }
    },
    "skeleton-item": {
      "api": {
        "variant": "定义要渲染的骨架类型，例如文本或圆形。",
        "design": "设置骨架项目的设计，例如颜色或边框。",
        "width": "指定骨架项目的宽度。"
      }
    }
  }
};
