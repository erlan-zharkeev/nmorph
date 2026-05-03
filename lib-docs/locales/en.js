export default {
  meta: {
    description: "Library of UI components for Vue 3 in the neumorphism/sceumorphism style."
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
  text: 'Text',
  type: "Type",
  default: "Default",
  basic: "Basic",
  data: "Data",
  feedback: "Feedback",
  form: "Form",
  navigation: "Navigation",
  other: "Other",
  attention: "Attention",
  "top-bar": {
    menu: "Menu",
    nav: "Navigation",
  },
  "footer-bar": {
    license: "Licensed under",
  },
  "guide-page": {
    "theme-customize": "Customize theme",
    "custom-theme-color": "Change base color",
    "custom-text-color": "Text color",
    "custom-accent-color": "Accent color",
    "enter-color": "Enter color",
    "get-started-btn": "Quick start",
    explained: "<b class=\"main-section__subtitle\">Neumorphism / Sceumorphism</b>",
    "apply-theme": "Apply theme",
    "main-content":
      "<p class=\"main-section__first-explained-content\">Vue 3 UI kit for creating unique 3D designs in neumorphic style</p>",
    "quick-start": {
      installation: "Installation",
      "choose-package-manager":
        "Choose any package manager you prefer.<br>We recommend using reliable ones like <b>NPM</b>, <b>Yarn</b>, <b>Pnpm</b>",
      plugin: "Library integration",
      "alternative-plugin": "Alternative integration method",
      usage: "Basic usage"
    },
    "config": {
      "add-config": "Example of adding library configuration",
      "available": "Currently, there are two available settings: theme and i18n",
      "theme": "Theme",
      "i18n": "Internationalization (i18n)",
      "ls": "Save current theme in local storage",
      "rest-themes": "Your custom themes",
      "default-theme": "Selected default theme",
      "dark-shade": "Dark shadow depth coefficient, works only with dynamic shadow generation approach",
      "light-shade": "Light shadow depth coefficient, works only with dynamic shadow generation approach",
      "shadow-width": "Shadow distance",
      "shadow-blur": "Shadow blur",
      "theme-explained": "You can pass your custom variables into the theme object for detailed theme customization.<br />Below is an example of the default theme object.",
      "auto-generation": "There are two approaches to theme customization.<ul><li>1) Automatic shadow generation. You only need to pass the main color into the theme object. Then, the darkShade and lightShade variables will be generated automatically. Other variables will not be affected and should be added manually. You can also adjust shadow depth coefficients using darkShadeGeneratorCoefficient and lightShadeGeneratorCoefficient variables. These will affect shadows only with this (dynamic) approach.</li><li>2) Each variable must be manually added for each theme.</li>",
      "main-var": "To automatically generate darkShade and lightShade, just pass this variable.",
      "shade-var": "Will be automatically calculated if not mutated directly and passed via the main variable.",
      "i18n-content": "For proper i18n functionality, ensure that you connect i18n before the library. Currently, three locales are available: en, zh, ru.<p>The default locale is en. Import only the locales you need.</p><p>If the locales are missing, you need to add your own. The locale property will overwrite the locale from i18n passed above.</p>",
      "rewrite-translation": "Rewrite library translations. You can find translation message names in the component documentation.",
      "other-messages": "Other translations",
      "css-variables": "CSS Variables",
      "css-variables-content": "The library exposes the following CSS custom properties that you can use in your own styles.",
      "css-variables-theme-derived": "Theme-derived variables (set per theme)",
      "css-variables-auto-generated": "Additional text contrast variables (configurable per theme)",
      "css-variables-static": "Static variables (same across themes)",
      "css-var-main": "Main background color",
      "css-var-dark-shade": "Dark shadow shade",
      "css-var-light-shade": "Light shadow shade",
      "css-var-text": "Primary text color",
      "css-var-accent": "Accent / brand color",
      "css-var-focus-text": "Text color on focused/accent elements",
      "css-var-placeholder": "Placeholder text color",
      "css-var-semi-contrast": "text color +30% brightness — for secondary text",
      "css-var-contrast": "text color +70% brightness — for high-contrast text"
    },
    "other": {
      "utils-classes": "Utility classes"
    },
  },
  "about-page": {
    "alpha-test": "Current status",
    "alpha-test-lib":
    "<p>Testing of the library is currently underway.</p><p>Since the development is carried out by only one developer, fixing possible bugs and testing takes a lot of time.</p><p>I will be glad if you report any problems.</p>",
    "get-started": "Get started",
    "overview-content":
          "<p>It is a library of UI components for Vue 3, developed using a non-morphic/skeuomorphic design.</p><p>It provides a set of components to create a unique user interface.</p><p>The project was created as a student's work on frontend development.</p>",
    neumorphism: "What is neomorphism/skeuomorphism?",
    "neumorphism-content":
          "Neumorphism is a design style that combines elements of flat design and skeuomorphism.</p><p>It creates a sense of volume and soft shadows, making the interface look as if it can be touched.</p><p>The neumorphism is based on pastel colors, light gradients and soft shadows, creating the effect of pressed or indented elements.</p>",
  },
  "changelog-page": {
    "roadmap": {
      "title": "Roadmap",
      "items": {
        "nuxt-support": "Add Nuxt support.",
        "storybook-vr": "Add Storybook and visual regression checks.",
        "accessibility": "Improve accessibility: keyboard navigation, ARIA, focus states.",
        "test-coverage": "Increase test coverage: unit, integration, and e2e tests.",
        "theming-v2": "Prepare Theming v2 with extended design tokens and presets.",
        "performance": "Optimize performance and bundle size."
      }
    },
    "changelog": {
      "title": "Changelog",
      "items": {
        "button-icon-slot-docs": "Clarified NmorphButton icon slot behavior: it currently works as icon-only, and a cleaner icon-plus-content API is planned for a future major release.",
        "select-button-keyboard-focus": "NmorphSelectButtonItem is now keyboard-accessible: Tab focuses each item, Space/Enter selects it, and a focus-visible outline is shown.",
        "tabindex-prop": "Added tabindex prop to INmorphCommonInputProps — all form controls (NmorphTextInput, NmorphSwitch, NmorphSlider, NmorphNumberInput, NmorphSelect, NmorphSelectButtonItem) now support tabindex.",
        "form-item-input-inheritance": "Form controls now inherit id and name from NmorphFormItem automatically, so labels and native form attributes stay linked without manual prop forwarding.",
        "text-input-autofill-styles": "Fixed NmorphTextInput autofill styling so browser autofill no longer overrides the neumorphic shadows and field colors.",
        "google-icon": "Added NmorphIconGoogle to the icon set.",
        "contrast-text-colors": "Added --nmorph-semi-contrast-text-color and --nmorph-contrast-text-color CSS variables to default light and dark themes.",
        "form-item-label-for": "NmorphFormItem label now has a correct for attribute linked to the input via inputId prop on NmorphTextInput.",
        "error-box-single-error": "NmorphErrorBox now shows only the most relevant error instead of all errors at once.",
        "form-item-margin": "Reduced NmorphFormItem vertical margin from indentation-03 to indentation-02.",
        "css-variables-docs": "Added CSS variables reference section to the Guide page.",
        "validation-icon-fix": "Fixed NmorphValidationIcon not rendering: icon components were passed as strings instead of component objects.",
        "select-button-unselected-opacity": "NmorphSelectButton: unselected items now appear semi-transparent for clearer visual feedback.",
        "select-button": "Added new NmorphSelectButton component — a segmented button group with slot and options-based API.",
        "engines-range": "Relaxed package engines requirements to support modern Node and npm versions.",
        "skeleton-animation": "Fixed Skeleton loading animation: shimmer now works when loading is enabled.",
        "icon-search-and-copy": "Fixed icon display and input-related behavior on the icon page.",
        "export-en-locale": "Added export of English locale messages from the package entry point."
      }
    },
    "known-bugs": {
      "title": "Known bugs",
      "items": {
        "mobile-slider": "Input Slider does not work on mobile devices.",
        "text-input-clear-overlap": "NmorphTextInput: the clear button may overlap the placeholder text when the input width is small."
      }
    }
  },
  "guide-menu": {
    "quick-start": "Quick start",
    "config": "Configuration",
    "other": "Other"
  },
  "overview": {
    "basic-usage": "Basic usage",
    "off": "Off",
    "on": "On",
    "one": "One",
    "two": "Two",
    "three": "Three",
    "four": "Four",
    "disabled": "Disabled",
    "disabled-thin": "Disabled",
    "thick": "Thick",
    "default": "Default",
    "thin": "Thin",
    "i-am-ripple": "I have ripple",
    "i-am-ripple-with-hover-bg": "I have ripple and hover background",
    "i-am-not-ripple": "I do not have ripple",
    "circle": "Circle",
    "round": "Round",
    "square": "Square",
    "transparent": "Transparent",
    "date": "Date",
    "dates": "Dates",
    "date-range": "Date range",
    "summer": "Summer",
    "load-error": "Load error",
    "custom-loading-text": "Custom loading text",
    "download-in-progress": "Download in progress",
    "show": "Show",
    "edit": "Edit",
    "check": "Check",
    "without-underline": "Without underline",
    "underlined": "Underlined",
    "selected-page": "Selected page:",
    "loading": "Loading...",
    "i-am-slot-prefix": "I am slot prefix",
    "add": "Add",
    "remove": "Remove",
    "animated": "Animated",
    "loading-state": "Loading state",
    "value": "Value:",
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
    "button": {
      "style-type": {
        "subtitle":
          "Use *default* or *transparent* to define the base style."
      },
      "loading": {
        "subtitle":
          "Use *boolean* to enable or disable the loading icon."
      },
      "ripple": {
        "subtitle":
          "Use *boolean* to enable or disable the ripple effect on click."
      },
      "height": {
        "subtitle":
          "Set the height, available values are *thick*, *default*, *thin*."
      },
      "disabled": {
        "subtitle": "Use *boolean* to disable the button."
      },
      "shape": {
        "info": {
          "title": "Info",
          "content":
            "When using round or square, the size is changed using the --height variable."
        },
        "subtitle": "Use shape to change the border radius of the button."
      },
      "api": {
        "type": "Native button type",
        "text": "Button text",
        "loading": "Enable/disable loader",
        "style-type": "Change button style",
        "accent-bg-on-hover": "Enable/disable background color on hover",
        "ripple": "Enable/disable ripple on click",
        "fill": "Fill container with button",
        "disabled": "Disable button",
        "height": "Change button height",
        "shape": "Change shape"
      },
      "slot": {
        "default": "Button content",
        "append": "Custom content on the right",
        "icon": "Icon-only slot. When provided, the button renders only the icon and hides text, default, and append content"
      },
      "variables": {
        "height": "Button height"
      },
      "exposes": {
        "buttonDOMElement": "Original button DOM element"
      }
    },
    "icon": {
      "search-icon": "Find icon",
      "size": {
        "subtitle": "Icon size. Defines both the height and width."
      },
      "width-height": {
        "subtitle": "Define the width and height of the icon."
      },
      "color": {
        "subtitle":
          "Icon color. You can use custom colors or pass an available variable."
      },
      "api": {
        "size": "Icon size. Defines height and width",
        "width": "Sets the width of the icon",
        "height": "Sets the height of the icon",
        "color": "Defines the icon color",
        "icon": "Sets the icon from the available icon list"
      },
      "slot": {
        "default": "Slot for customizing the icon's content"
      },
      "variables": {
        "color": "Defines the icon color"
      },
    },
    "link": {
      "type": {
        "subtitle": "Color type: *accent*, *success*, *error*, *warning*."
      },
      "underline": {
        "subtitle": "Underline the link."
      },
      "disabled": {
        "subtitle": "Inactive state of the link."
      },
      "api": {
        "type": "Color type",
        "href": "Native href attribute",
        "underline": "Show underline on hover",
        "icon-name": "Name from the icon list",
        "target": "Native target attribute",
        "disabled": "Disable the link"
      },
      "slot": {
        "default": "Custom content of the link",
        "prepend": "Add custom content at the beginning",
        "icon": "Place for the icon"
      },
      "variables": {
        "link-color": "Link color"
      }
    },
    "scroll": {
      "height": {
        "subtitle":
          "Use the *height* property to set the container's height. Without setting a height, scrolling will not be activated."
      },
      "max-height": {
        "subtitle":
          "Scroll is displayed only if the element's height exceeds the maximum height."
      },
      "model-value": {
        "subtitle": "Property for two-way data binding of the model."
      },
      "horizontal-scroll": {
        "subtitle":
          "If the element's width exceeds the scroll area width, a horizontal scrollbar appears."
      },
      "api": {
        "height": "Sets the scroll container's height",
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
        "x-gap-in-px": "Content gap for the horizontal scrollbar"
      },
      "slot": {
        "default": "Scroll content"
      },
      "variables": {
        "thumb-color": "Thumb color"
      },
      "exposes": {
        "scrollDOMContainer": "DOM element of the container",
        "moveTo": "Function to set new coordinates"
      },
      "events": {
        "update:model-value": "Event for intercepting two-way binding",
        "on-scroll-end":
          "Event triggered after scroll animation ends",
        "on-scroll": "Scroll event"
      },
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
        "subtitle": "Defines how the image fits into the container. Accepts values such as *fill*, *contain*, *cover*, *none*, *scale-down*.",
        "info": {
          "title": "Information",
          "content":
            "To ensure the 'fit' property is displayed correctly, make sure the container has a fixed size."
        }
      },
      "loading-text": {
        "subtitle": "Text displayed during image loading."
      },
      "load-failed-text": {
        "subtitle": "Text displayed when the image fails to load."
      },
      "api": {
        "fit": "Defines how the image should fit into the container.",
        "close-on-outside-click":
          "Closes the preview when clicking outside the container.",
        "alt": "Text description for the image.",
        "loading-text": "Text displayed during image loading.",
        "load-failed-text":
          "Text displayed when the image fails to load.",
        "frame-border": "Defines the thickness of the frame.",
        "image-padding": "Defines the padding of the image.",
        "src": "Image URL.",
        "src-set": "List of image sources."
      },
      "slot": {
        "loading": "Slot for custom content displayed during image loading.",
        "error": "Slot for custom content displayed when image loading fails."
      },
      "variables": {
        "width": "Defines the width of the image.",
        "height": "Defines the height of the image.",
        "background-color": "Defines the background color of the image."
      },
      "events": {
        "error": "Image error event.",
        "load": "Image load event."
      },
      "translates": {
        "loadingText": "Loading ...",
        "loadFailedText": "Failed to load image."
      }
    },
    "tag-list": {
      "api": {
        "model-value": "List of tags"
      },
      "events": {
        "update:model-value": "Event for intercepting two-way binding",
        "close": "Returns the value of the closed tag"
      }
    },
    "tag-item": {
      "text": {
        "subtitle": "Defines the text content displayed in the component."
      },
      "removable": {
        "subtitle":
          "Defines whether the component can be removed by the user. Accepts *boolean*.",
        "info": {
          "title": "Information",
          "content":
            "If you want the tag display to be handled automatically, you can wrap the component in NmorphTagList."
        }
      },
      "height": {
        "subtitle": "Defines the height of the component."
      },
      "design": {
        "subtitle":
          "If set to *common*, the component will be displayed with a border."
      },
      "api": {
        "value": "Defines the identifier value for the component",
        "text": "Sets the text displayed inside the component",
        "removable":
          "Defines whether the component can be removed. Works automatically when wrapped in NmorphTagList",
        "design": "Defines the style of the component",
        "height": "Sets the height of the component"
      },
      "events": {
        "close": "Returns the value of the closed tag"
      }
    },
    "skeleton": {
      "animated": {
        "subtitle":
          "Enables animation for the skeleton component if set to *true*."
      },
      "loading": {
        "subtitle": "Controls the display of the skeleton."
      },
      "rows": {
        "subtitle":
          "Defines the number of rows in the skeleton, typically for simulating text content."
      },
      "api": {
        "animated": "Enables animation for the skeleton component",
        "loading": "Defines whether the skeleton is displayed.",
        "rows": "Sets the number of rows in the skeleton."
      },
      "slot": {
        "template": "Slot for custom skeleton structure during loading.",
        "default": "Default slot content when loading is complete."
      },
      "variables": {
        "loading-gradient":
          "Defines the gradient color used during the skeleton loading animation."
      }
    },
    "skeleton-item": {
      "api": {
        "variant":
          "Defines the type of skeleton to display, such as text or circle.",
        "design": "Defines the design of the skeleton item.",
        "width": "Sets the width of the skeleton item."
      }
    },
    "progress": {
      "type": {
        "subtitle":
          "Defines the type of progress indicator, such as *linear* or *circle*."
      },
      "color": {
        "subtitle": "Sets the color of the progress indicator."
      },
      "percentage": {
        "subtitle": "Defines the percentage of progress completed.",
        "info": {
          "title": "Information",
          "content":
            "Ensure that the width of the wrapper container is set for proper display."
        }
      },
      "value-inside": {
        "subtitle":
          "Displays the progress text inside the bar if set to *true*."
      },
      "value-right-side": {
        "subtitle":
          "Shows or hides the percentage text next to the progress indicator."
      },
      "indeterminate": {
        "subtitle":
          "Displays the indeterminate progress animation when set to *true*."
      },
      "circle-size": {
        "subtitle": "Defines the size of the circular progress indicator."
      },
      "api": {
        "type": "Specifies the type of progress indicator",
        "color": "Sets the color of the progress indicator",
        "percentage": "Sets the percentage of progress",
        "value-inside": "Displays the progress text inside the bar",
        "value-right-side": "Shows or hides the percentage text on the right",
        "indeterminate": "Enables the indeterminate progress animation",
        "circle-size": "Sets the size of the circular progress indicator"
      },
      "slot": {
        "inner-text":
          "Slot for custom content inside the progress indicator.",
        "right-side":
          "Slot for custom content to the right of the progress indicator.",
        "circle-inner-part":
          "Slot for custom content inside the circular progress indicator."
      },
      "variables": {
        "height": "Defines the width of the progress indicator.",
        "width-transition": "Sets the progress animation.",
        "animation": "Controls the settings of the progress indicator's animation."
      }
    },
    "calendar": {
      "type": {
        "subtitle":
          "Defines the type of calendar, such as *date* or *dates* selection."
      },
      "custom-content": {
        "subtitle": ""
      },
      "range": {
        "subtitle": "Sets the boundaries of the displayed calendar."
      },
      "api": {
        "mark-today": "Highlights today's date",
        "initial-date":
          "Sets the initial date displayed in the calendar",
        "model-value": "Represents the selected date(s) in the calendar",
        "type": "Defines the selection type in the calendar",
        "range":
          "Enables range selection mode in the calendar, allowing date range selection in the calendar. Not the selected range, but the displayed calendar range."
      },
      "slot": {
        "header": "Calendar header slot",
        "content": "Calendar content slot"
      },
      "variables": {
        "table-data-cell-height":
          "Defines the height of each date cell in the calendar"
      },
      "translates": {
        "sun": "Sunday",
        "mon": "Monday",
        "tue": "Tuesday",
        "wed": "Wednesday",
        "thu": "Thursday",
        "fri": "Friday",
        "sat": "Saturday",
        "jan": "January",
        "feb": "February",
        "mar": "March",
        "apr": "April",
        "may": "May",
        "jun": "June",
        "jul": "July",
        "aug": "August",
        "sep": "September",
        "oct": "October",
        "nov": "November",
        "dec": "December"
      }
    },
    "image-preview": {
      "model-value": {
        "subtitle": "Controls the visibility of the image preview."
      },
      "initial-index": {
        "subtitle":
          "Defines the initial index of the image when there are multiple images."
      },
      "src": {
        "subtitle": "URL of the image for preview."
      },
      "api": {
        "model-value":
          "Boolean value that toggles the visibility of the image preview",
        "alt": "Text describing the image when it cannot be loaded",
        "initial-index":
          "Index of the first image displayed in the image set",
        "src": "URL of the image for preview",
        "scale-step": "Zoom (scaling) step for the image",
        "min-scale-level":
          "Defines the minimum scale level for the image",
        "max-scale-level":
          "Defines the maximum scale level for the image"
      },
      "slot": {},
      "variables": {
        "width": "Defines the width of the image preview.",
        "height": "Defines the height of the image preview."
      },
      "events": {
        "update:model-value": "Event for intercepting two-way binding"
      }
    },
    "pagination": {
      "basic-usage": {
        "subtitle": ""
      },
      "api": {
        "total-elements-quantity": "Total number of elements for pagination.",
        "model-value": "Current active page number.",
        "elements-quantity-on-page":
          "Number of elements displayed on each page.",
        "disabled": "Boolean value that disables the pagination component.",
        "hide-on-single-page":
          "Hides the pagination component if there is only one page.",
        "max-visible-pages":
          "Defines how many pages are displayed in the pagination control.",
        "fast-forward-step":
          "Defines how many pages are skipped when fast-forwarding."
      },
      "slot": {},
      "variables": {},
      "events": {
        "update:model-value": "Event for intercepting two-way binding"
      }
    },
    "table": {
      "basic-usage": {
        "subtitle": "",
        "enable-row-highlight": "Enable row highlight on hover",
        "disable-row-highlight": "Disable row highlight on hover",
        "click-me-text": "Click me!",
        "info": {
          "title": "Important Information",
          "content":
            "'bordered' property works only if 'design' property is set to 'common'. Additionally, sorting currently works only with two values: 'ascending' and 'descending'.\nPlease note that the table is under active development and may contain bugs."
        }
      },
      "api": {
        "data": "Defines the data to be displayed in the table",
        "row-hover":
          "Boolean value that enables or disables hover effect on table rows",
        "bordered":
          "Boolean value that enables or disables borders around table cells. Works only if 'design' property is set to 'common'",
        "sort": "Defines the sorting behavior for table columns",
        "design": "Table display style"
      },
      "slot": {},
      "variables": {
        "border-color": "Sets the table border color",
        "table-cell-height": "Defines the height of table cells"
      }
    },
    "table-column": {
      "api": {
        "prop": "Specifies the property name from the data source to be displayed in this column",
        "label": "Column header to be displayed in the table header",
        "width": "Defines the column width in CSS value",
        "alignment":
          "Sets text alignment in the column. Accepts 'left', 'center', or 'right'"
      }
    },
    "table-cell": {
      "api": {
        "row": "Required property. Passes the row index from the scope representing the current row being rendered."
      },
      "slot": {
        "default":
          "The default slot is used to customize content inside each column cell. Provides access to the row data and other relevant properties from the scope."
      }
    },
    "tooltip": {
      "text": {
        "subtitle": "Content displayed inside the tooltip.",
        "hover-me": "Hover over me",
        "i-am-tooltip": "I am a tooltip",
        "tooltip": "Tooltip",
        "button": "Button"
      },
      "position": {
        "subtitle": "Defines the position of the tooltip relative to the target element. Accepts values such as 'top', 'bottom', 'left', 'right'."
      },
      "force-coordinate": {
        "subtitle": "Overrides the default positioning logic and allows specifying exact coordinates for the tooltip."
      },
      "api": {
        "text": "Defines the text content of the tooltip",
        "position": "Sets the position of the tooltip relative to the target element",
        "force-show": "Boolean value that forcibly shows the tooltip",
        "force-coordinate": "Allows manual control over the tooltip's coordinates"
      },
      "slot": {},
      "variables": {
        "max-width": "Sets the maximum width of the tooltip content",
        "width": "Sets the width of the tooltip content. Controls the horizontal size of the tooltip",
        "height": "Sets the height of the tooltip content. Controls the vertical size of the tooltip"
      }
    },
    "alert": {
      "basic-usage": {
        "title": "Any title",
        "content": "Content for the alert",
        "info": {
          "title": "Additional Information",
          "content": "To conveniently manage multiple alerts, use the 'NmorphNotificationProvider' component, which allows grouping and centrally managing alerts."
        }
      },
      "use-provider": {
        "subtitle": "To use the provider, you need to import the hook from the library."
      },
      "api": {
        "id": "Unique identifier for the alert component",
        "type": "Defines the alert type (e.g., success, error, warning, info)",
        "closable": "Boolean value that defines whether the alert can be closed by the user",
        "title": "Title displayed in the alert",
        "content": "Content of the alert",
        "fill": "Defines whether the alert should occupy the full width of its container",
        "max-width": "Maximum width of the alert component",
        "show-icon": "Boolean value that displays an icon based on the alert type",
        "bordered": "Adds a border around the alert for emphasis",
        "html": "Allows HTML content in the alert body. Use with caution to avoid XSS vulnerabilities"
      },
      "slot": {
        "icon": "Slot for customizing the icon displayed in the alert",
        "title": "Slot for customizing the alert's title",
        "default": "Slot for customizing the main content of the alert"
      },
      "variables": {},
      "events": {
        "close": "Event triggered when the alert is closed by the user"
      }
    },
    "dialog": {
      "basic-usage": {
        "subtitle": "",
        "show-modal": "Show modal window"
      },
      "api": {
        "model-value": "Boolean value that controls the visibility of the dialog window",
        "title": "Defines the text of the dialog header",
        "width": "Sets the width of the dialog window",
        "open-delay": "Delay in milliseconds before opening the dialog window",
        "close-delay": "Delay in milliseconds before closing the dialog window",
        "close-on-click-modal": "Boolean value that allows closing the dialog window by clicking outside",
        "show-close": "Boolean value that displays the close button in the dialog window",
        "z-index": "Defines the z-index for controlling the overlay of the dialog window",
        "close-on-overlay": "Boolean value indicating whether the dialog window should be closed when clicking on the overlay area"
      },
      "slot": {
        "header": "Slot for customizing the content of the dialog header.",
        "default": "Slot for defining the main content of the dialog window."
      },
      "events": {
        "on-close": "Event that triggers when the dialog window is closed by the user.",
        "update:model-value": "Event that triggers when the visibility of the dialog window changes."
      },
      "variables": {
        "width": "Defines the width of the dialog component."
      }
    },
    "divider": {
      "direction": {
        "subtitle": "Defines the direction of the divider. Accepts 'horizontal' or 'vertical'."
      },
      "api": {
        "direction": "Defines the orientation of the divider: 'horizontal' or 'vertical'."
      },
      "slot": {},
      "variables": {}
    },
    "overlay": {
      "basic-usage": {
        "subtitle": "",
        "show-default": "Show default",
        "show-transparent": "Show transparent"
      },
      "api": {
        "show": "Controls the visibility of the component",
        "transparent": "Boolean value that makes the component's background transparent if enabled"
      },
      "slot": {
        "default": "Default slot for customizing the content inside the component"
      },
      "events": {
        "on-outside-click": "Event triggered when the user clicks outside the component"
      },
      "variables": {}
    },
    "notification-provider": {
      "notifications": {
        "subtitle": ""
      },
      "placement": {
        "subtitle": "Defines the position of the notifications on the screen."
      },
      "z-index": {
        "subtitle": "Sets the z-index for the notifications to control their stacking order."
      },
      "quantity": {
        "subtitle": "Limits the maximum number of notifications that can be displayed at the same time."
      },
      "api": {
        "notifications": "Array containing the notifications",
        "placement": "Specifies where the notifications will appear on the screen",
        "z-index": "Defines the stacking order of the notifications",
        "quantity": "Maximum number of notifications that can be on the screen at the same time"
      },
      "slot": {},
      "variables": {}
    },
    "tabs": {
      "api": {
        "model-value": "Controls the active state of the component",
        "stretch": "Boolean value that defines whether the component should stretch to fill available space"
      },
      "slot": {
        "default": "Slot for customizing the content inside each tab"
      },
      "variables": {},
      "events": {
        "update:model-value": "Event triggered when the active tab changes",
        "tab-change": "Event triggered when the tab changes"
      }
    },
    "tab-pane": {
      "api": {
        "label": "Label for the tab displayed in the tab navigation",
        "name": "Unique identifier for the tab, used to control the active tab",
        "disabled": "Boolean value indicating whether the tab is disabled and cannot be selected"
      },
      "slot": {
        "label": "Slot for customizing the tab label",
        "default": "Slot for defining the main content of the tab"
      }
    },
    "dropdown": {
      "basic-usage": {
        "first-menu": "First menu",
        "second-menu": "Second menu"
      },
      "api": {
        "open": "Boolean value controlling the visibility of the dropdown",
        "relative-element": "Defines the element relative to which the dropdown will be positioned",
        "width": "Sets the width of the dropdown",
        "x-offset": "Horizontal offset in pixels for adjusting the dropdown position",
        "y-offset": "Vertical offset in pixels for adjusting the dropdown position",
        "fill-width": "Boolean value defining whether the dropdown should occupy the entire container width"
      },
      "slot": {
        "default": "Slot for customizing the content inside the dropdown"
      },
      "variables": {},
      "events": {
        "on-outside-click": "Event triggered when the user clicks outside the dropdown, which can be used to close it"
      }
    },
    "backtop": {
      "basic-usage": {
        "info": {
          "title": "Information",
          "content": "Make sure the scroll container height is defined."
        },
        "scroll-down": "Scroll down"
      },
      "api": {
        "right": "Sets the distance from the right edge of the screen",
        "bottom": "Sets the distance from the bottom edge of the screen",
        "visibility-height": "Defines the scroll height at which the back-to-top button becomes visible. Accepts a number in pixels",
        "design": "Defines the style of the button"
      },
      "slot": {
        "default": "Slot for customizing the content of the back-to-top button"
      },
      "events": {
        "click": "Event triggered when the user clicks the back-to-top button"
      },
      "variables": {}
    },
    "breadcrumb": {
      "separator": {
        "subtitle": "Defines the symbol used to separate navigation items."
      },
      "api": {
        "separator": "Symbol separating the navigation items"
      }
    },
    "breadcrumb-item": {
      "api": {
        "to": "Specifies the target route for navigation. Accepts a path string or route object",
        "replace": "Boolean value that determines whether the navigation should replace the current history entry instead of adding a new one"
      }
    },
    "text-input": {
      "height": {
        "subtitle": "Sets the height of the input field."
      },
      "disabled": {
        "subtitle": "Disables the input field if set to *true*."
      },
      "type-password": {
        "subtitle": "If set to *true*, the text in the input field will be hidden as a password.",
        "toggle": "Toggle type"
      },
      "model-value": {
        "subtitle": "Represents the value of the input field"
      },
      "clearable": {
        "subtitle": "If set to *true*, a button will appear to clear the input field."
      },
      "api": {
        "id": "Sets the native input id. Inherits NmorphFormItem id when used inside a form item",
        "name": "Sets the native input name. Inherits NmorphFormItem name or id when omitted",
        "height": "Defines the height of the input field",
        "disabled": "Boolean value that disables the input field",
        "placeholder": "Text displayed as a hint when the input field is empty",
        "type-password": "Boolean value that turns the input field into a password field",
        "model-value": "Current value of the input field",
        "clearable": "Boolean value that adds a button to clear the input field value"
      },
      "slot": {
        "prepend-icon": "Slot for adding an icon to the beginning of the input field"
      },
      "variables": {
        "prepend-icon-indent": "Defines the indent for the icon before the input"
      },
      "events": {
        "update:model-value": "Event triggered when the input field value changes",
        "focus": "Event triggered when the input field gains focus",
        "blur": "Event triggered when the input field loses focus",
        "on-enter": "Event triggered when the Enter key is pressed"
      },
      "exposes": {
        "inputDOMRef": "Original DOM element of the input field"
      }
    },
    "switch": {
      "height": {
        "subtitle": "Defines the height of the switch component."
      },
      "disabled": {
        "subtitle": "Disables the switch if set to *true*."
      },
      "model-value": {
        "subtitle": "Controls the on/off state of the switch."
      },
      "loading": {
        "subtitle": "Displays the loading state on the switch if set to *true*."
      },
      "active-value": {
        "subtitle": "Specifies the value when the switch is on."
      },
      "inactive-value": {
        "subtitle": "Specifies the value when the switch is off."
      },
      "api": {
        "id": "Sets the native input id. Inherits NmorphFormItem id when used inside a form item",
        "name": "Sets the native input name. Inherits NmorphFormItem name or id when omitted",
        "height": "Sets the height of the switch",
        "disabled": "Boolean value that disables the switch component",
        "model-value": "Controls the state of the switch",
        "loading": "Boolean value that shows a loading indicator on the switch",
        "active-value": "Value when the switch is on",
        "inactive-value": "Value when the switch is off"
      },
      "slot": {
        "bg-on": "Slot for customizing the background when the switch is on",
        "bg-off": "Slot for customizing the background when the switch is off",
        "thumb-on": "Slot for customizing the thumb when the switch is on",
        "thumb-off": "Slot for customizing the thumb when the switch is off"
      },
      "variables": {
        "height": "Defines the height of the switch",
        "offset": "Specifies the offset of the switch thumb",
        "thumb-height": "Defines the height of the switch thumb"
      },
      "events": {
        "update:model-value": "Event triggered when the switch state changes"
      },
      "exposes": {
        "inputDOMRef": "Original DOM element of the input field"
      }
    },
    "checkbox": {
      "id": {
        "subtitle": "Unique identifier for the checkbox."
      },
      "disabled": {
        "subtitle": "Disables the checkbox if set to *true*."
      },
      "model-value": {
        "subtitle": "Represents the checkbox state (checked or not).",
        "label": "Label"
      },
      "label": {
        "subtitle": "Specifies the label text for the checkbox."
      },
      "design": {
        "subtitle": "Defines the design style of the checkbox."
      },
      "api": {
        "id": "Unique identifier for the checkbox",
        "disabled": "Boolean value that disables the checkbox",
        "model-value": "Checkbox state (checked or not)",
        "label": "Label displayed next to the checkbox",
        "design": "Defines the design style of the checkbox"
      },
      "slot": {
        "default": "Slot for customizing the checkbox content",
        "label": "Slot for customizing the checkbox label"
      },
      "variables": {
        "size": "Defines the size of the checkbox"
      },
      "events": {
        "update:model-value": "Event triggered when the checkbox state changes"
      },
      "exposes": {
        "inputDOMRef": "Original DOM element of the input field"
      }
    },
    "checkbox-group": {
      "api": {
        "height": "Width of the checkboxes",
        "disabled": "Disables all checkboxes in the group",
        "model-value": "Array of selected values",
        "options": "Checkbox options",
        "design": "Design style of the checkbox group",
        "direction": "Direction of the checkbox group layout"
      },
      "slot": {
        "default": "Slot for customizing the content of the checkbox group"
      },
      "variables": {},
      "events": {
        "update:model-value": "Event triggered when selected values in the checkbox group change"
      }
    },
    "autocomplete": {
      "basic-usage": {
        "placeholder": "Text..."
      },
      "height": {
        "subtitle": "Defines the height of the autocomplete input field."
      },
      "disabled": {
        "subtitle": "Disables the autocomplete field."
      },
      "placeholder": {
        "subtitle": "Text displayed when the input field is empty."
      },
      "clearable": {
        "subtitle": "If set to *true*, a button will appear to clear the input field."
      },
      "list": {
        "subtitle": "Sets the list of options for autocomplete suggestions."
      },
      "action-callback": {
        "subtitle": "Function called when typing in the input."
      },
      "api": {
        "id": "Sets the id for the nested text input. Inherits NmorphFormItem id when used inside a form item",
        "name": "Sets the name for the nested text input. Inherits NmorphFormItem name or id when omitted",
        "height": "Height of the autocomplete input field",
        "disabled": "Disables the autocomplete input field",
        "model-value": "Current value of the input field",
        "placeholder": "Hint displayed when the input field is empty",
        "clearable": "Boolean value that adds a button to clear the input value",
        "list": "List of suggestions for input",
        "action-callback": "Callback function called when an option is selected"
      },
      "slot": {
        "loader": "Slot to add a custom loader while fetching data"
      },
      "variables": {},
      "events": {
        "update:model-value": "Event triggered when the autocomplete field value changes",
        "select": "Event triggered when an item is selected from the suggestions"
      }
    },
    "file-upload": {
      "model-value": {},
      "disabled": {
        "subtitle": "Disables the file upload component"
      },
      "multiple": {
        "subtitle": "Allows uploading multiple files if set to *true*."
      },
      "photo-with-preview": {
        "subtitle": "If set to *true*, uploaded photos will be displayed with a preview."
      },
      "api": {
        "model-value": "Represents the uploaded files",
        "disabled": "Boolean value that disables the file upload component",
        "multiple": "Boolean value that allows multiple files to be selected",
        "allowed-types": "Defines the file types that can be uploaded",
        "photo-with-preview": "Displays a preview of the uploaded images",
        "fill": "Allows the upload button to fill its container"
      },
      "slot": {
        "trigger": "Slot for customizing the button that triggers the file upload"
      },
      "variables": {},
      "events": {
        "on-unsupported-file-type-error": "Event triggered when the user attempts to upload an unsupported file type",
        "update:model-value": "Event triggered when the file selection changes"
      },
      "exposes": {
        "inputDOMRef": "Original DOM element of the input field"
      },
      "translates": {
        "selectFile": "Select a file"
      }
    },
    "number-input": {
      "basic-usage": {},
      "height": {
        "subtitle": "Defines the height of the number input field."
      },
      "disabled": {
        "subtitle": "Disables the number input field if set to *true*."
      },
      "action-btn-position-right": {
        "subtitle": "If set to *true*, the increment and decrement buttons are placed on the right."
      },
      "api": {
        "id": "Sets the native input id. Inherits NmorphFormItem id when used inside a form item",
        "name": "Sets the native input name. Inherits NmorphFormItem name or id when omitted",
        "height": "Height of the number input field",
        "disabled": "Boolean value that disables the input field",
        "model-value": "Current value of the number input field",
        "max": "Maximum allowed value",
        "min": "Minimum allowed value",
        "step": "Step for incrementing or decrementing the value",
        "action-btn-position-right": "Positions the action buttons on the right if set to *true*"
      },
      "slot": {},
      "variables": {},
      "exposes": {
        "inputDOMRef": "Original DOM element of the input field"
      },
      "events": {
        "update:model-value": "Event triggered when the value of the number input field changes"
      }
    },
    "select-button": {
      "height": {
        "subtitle": "Sets the height of the component."
      },
      "disabled": {
        "subtitle": "Disables the component."
      },
      "api": {
        "model-value": "The selected value",
        "height": "Height of the component",
        "disabled": "Disables the component",
        "options": "List of options to render"
      },
      "slot": {
        "default": "Slot for NmorphSelectButtonItem elements"
      },
      "events": {
        "update:model-value": "Triggered when the selected value changes"
      }
    },
    "select": {
      "height": {
        "subtitle": "Sets the height of the dropdown list."
      },
      "disabled": {
        "subtitle": "Disables the component."
      },
      "model-value": {
        "subtitle": "Represents the selected value of the select component.",
        "multiple": "Multiple values"
      },
      "loading": {
        "subtitle": "Displays a loading indicator if set to *true*."
      },
      "api": {
        "id": "Sets the id for the native select element. Inherits NmorphFormItem id when used inside a form item",
        "name": "Sets the name for the native select element. Inherits NmorphFormItem name or id when omitted",
        "height": "Height of the dropdown list",
        "disabled": "Disables the dropdown list",
        "no-element-placeholder": "Placeholder text displayed when no options are available",
        "value-required": "Requires selecting a value",
        "options": "List of available options",
        "options-map": "Object for displaying options",
        "model-value": "Selected value of the dropdown list",
        "loading": "Displays loading state",
        "open": "Boolean value to control the visibility of the list"
      },
      "slot": {
        "default": "Slot for customizing options in the dropdown list"
      },
      "variables": {
        "base-width": "Sets the base width for the select component"
      },
      "events": {
        "update:model-value": "Event triggered when the selected value changes"
      }
    },
    "select-option": {
      "api": {
        "label": "Defines the label for the option displayed in the dropdown list",
        "height": "Sets the height of the select option",
        "disabled": "Boolean value indicating whether the option is disabled and cannot be selected"
      },
      "slot": {
        "default": "Slot for customizing the displayed content for this option"
      },
      "variables": {
        "hover-bg": "Sets the background color when hovering over the option",
        "hover-color": "Defines the text color when hovering over the option"
      },
      "events": {
        "change-value": "Event triggered when the option value changes"
      }
    },
    "slider": {
      "disabled": {
        "subtitle": "Disables the slider if set to *true*."
      },
      "show-tooltip": {
        "subtitle": "If set to *true*, displays a tooltip with the current value."
      },
      "api": {
        "id": "Sets the native range input id. Inherits NmorphFormItem id when used inside a form item",
        "name": "Sets the native range input name. Inherits NmorphFormItem name or id when omitted",
        "fill": "Boolean value allowing the slider to fill its container",
        "disabled": "Disables the slider component",
        "model-value": "Current value of the slider",
        "max": "Maximum value for the slider",
        "min": "Minimum value for the slider",
        "step": "Step for incrementing or decrementing the value",
        "show-tooltip": "Boolean value to control the visibility of the tooltip"
      },
      "slot": {},
      "variables": {
        "slider-height": "Defines the height of the slider",
        "value-fixed-container-height": "Sets the height of the container"
      },
      "events": {
        "update:model-value": "Event triggered when the slider value changes"
      }
    },
    "date-picker": {
      "height": {
        "subtitle": "Sets the height of the date picker field."
      },
      "disabled": {
        "subtitle": "Disables date selection if set to *true*."
      },
      "api": {
        "id": "Sets the native input id. Inherits NmorphFormItem id when used inside a form item",
        "name": "Sets the native input name. Inherits NmorphFormItem name or id when omitted",
        "height": "Height of the date picker field",
        "disabled": "Boolean value that disables the date picker",
        "placeholder": "Text displayed when no date is selected",
        "model-value": "Currently selected date or date range",
        "type": "Type of date selection, such as *single* or *range*",
        "text-separator": "Text for separating the start and end dates in range selection mode"
      },
      "slot": {},
      "variables": {
        "width": "Defines the width of the date picker component"
      },
      "events": {
        "update:model-value": "Event triggered when the selected date or date range changes"
      },
      "translates": {
        "pickADate": "Pick a date"
      }
    },
    "radio": {
      "basic-usage": {
        "info": {
          "title": "Radio Group usage",
          "content": "Typically used in a group of radio buttons to allow the user to select one option from a set. Once a radio button is selected, it cannot be unselected by clicking it again—only by selecting another radio button in the group to change its state. For proper display, when using 'style-type' as 'button', a label (label) should be provided."
        }
      },
      "api": {
        "disabled": "Boolean value that disables the radio button",
        "label": "Label text displayed next to or inside the radio button",
        "value": "Value assigned to the radio button",
        "style-type": "Defines the visual style of the radio button",
        "checked": "Marks the radio button as selected"
      },
      "slot": {
        "label": "Slot for customizing the radio button label"
      },
      "variables": {
        "size": "Defines the size of the radio button"
      },
      "exposes": {
        "inputDOMRef": "Original DOM element of the input field"
      }
    },
    "radio-group": {
      "api": {
        "height": "Height of the radio button group",
        "disabled": "Disables all radio buttons in the group",
        "model-value": "Selected value of the radio button group",
        "options": "List of options to select from",
        "style-type": "Visual style of the radio buttons",
        "direction": "Direction of the radio button layout"
      },
      "slot": {
        "default": "Slot for passing NmorphRadioButton"
      },
      "variables": {},
      "events": {
        "update:model-value": "Event triggered when the selected value changes"
      }
    },
    "form": {
      "basic-usage": {
        "subtitle": "Represents form values for all input elements.",
        "too-short": "Too short",
        "wrong-age": "Incorrect age",
        "you-cant-be-a-nobody": "You cannot be a nobody",
        "we-dont-have-kombucha": "We don't have Kombucha(",
        "ie-not-supported": "IE is not supported",
        "you-must-set-agreement": "You must accept the agreement",
        "value-must-greater-than-30": "Value must be greater than 30",
        "value-must-less-than-80": "Value must be less than 80",
        "pear-is-not-available": "Pear is unavailable",
        "coffee": "Coffee",
        "tea": "Tea",
        "pear": "Pear",
        "apple": "Apple",
        "orange": "Orange",
        "unknown": "Unknown",
        "username": "Username",
        "years-old": "Years old",
        "preferred-drink": "Preferred drink",
        "browsers": "Browsers",
        "agreement": "Agreement",
        "number-value": "Numeric value",
        "choose-date": "Choose a date",
        "food": "Food",
        "favorite-food": "Favorite food",
        "photo": "Photo",
        "send-form": "Send form",
        "enter-username": "Enter username",
        "is-valid": "Form is valid: ",
        "info": {
          "title": "Typing Information",
          "content": "For correct typing, you must import the type INmorphFromDataExpose."
        }
      },
      "validate-immediately": {
        "subtitle": "If set to *true*, the form will validate its fields immediately after rendering."
      },
      "api": {
        "value": "Form values for input elements",
        "validate-immediately": "Boolean value controlling validation on load"
      },
      "slot": {
        "default": "Slot for passing NmorphFormItem"
      },
      "variables": {},
      "exposes": {
        "form-data": "Form data including validation"
      },
      "explanation": `
        <div class="container">
          <p>
            <strong>Field metadata:</strong> <code>NmorphFormItem</code> passes its <code>id</code> and optional <code>name</code> to nested form controls automatically. Child components can still override these values via their own props.
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
      `
    },
    "form-item": {
      "api": {
        "id": "Unique field id used by the label and inherited by nested form controls",
        "name": "Optional field name inherited by nested form controls. Defaults to id",
        "height": "Sets the height of the form item container",
        "label": "Defines the label text associated with the form item, providing context to the user",
        "show-validation-icon": "Boolean value controlling the display of the validation icon for the form item",
        "static-error-box-space": "Defines static space for displaying the error field, ensuring consistency in space regardless of validation state",
        "validate": "Defines validation rules for the form item"
      },
      "slot": {
        "default": "Slot for customizing the content of the form item, typically includes input elements or other form controls"
      }
    }
  }
};
