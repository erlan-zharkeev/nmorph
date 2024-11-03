export default {
  "guide": "Guide",
  "components": "Components",
  "about": "About",
  "search": "Search",
  "attributes": "Attributes",
  "slots": "Slots",
  "variables": "Variables",
  "exposes": "Exposes",
  "right-aside-title": "Contents",
  "name": "Name",
  "events": "Events",
  "description": "Description",
  "type": "Type",
  "default": "Default",
  "basic": "Basic",
  "data": "Data",
  "feedback": "Feedback",
  "form": "Form",
  "navigation": "Navigation",
  "other": "Other",
  "overview": {
    "basic-usage": "Basic usage",
    "one": "One",
    "two": "Two",
    "three": "Three",
    "four": "Four",
    "disabled": "Disabled",
    "disabled-thin": "Disabled",
    "thick": "Thick",
    "default": "Default",
    "thin": "Thin",
    "i-am-ripple": "I am ripple",
    "i-am-ripple-with-hover-bg": "I am ripple with hover bg",
    "i-am-not-ripple": "I am not ripple",
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
    "download-in-progress": "The download is in progress",
    "show": "Show",
    "edit": "Edit",
    "check": "Check",
    "without-underline": "Without underline",
    "underlined": "Underlined",
    "selected-page": "Selected page:",
    "loading": "Loading...",
    "i-am-slot-prefix": "i'm slot prefix",
    "add": "Add",
    "remove": "Remove",
    "animated": "Animated",
    "loading-state": "Loading state",
    "value": "value:",
    "sort-values": "Sort values",
    "custom-label": "Custom label",
    "custom-content-for": "custom content for",
    "tag-zero": "tag zero",
    "tag-one": "tag one",
    "tag-two": "tag two",
    "i-am-disabled": "I am disabled",
    "enter-text": "Enter text",
    "model-text": "Model-text:",
    "button": {
      "style-type": {
        "subtitle": "Use *default* or *transparent* to define basic style"
      },
      "loading": {
        "subtitle": "Use *boolean* to enable or disable loading icon"
      },
      "ripple": {
        "subtitle": "Use *boolean* to enable or disable ripple effect on click"
      },
      "height": {
        "subtitle": "Set height, available *thick*, *default*, *thin*"
      },
      "disabled": {
        "subtitle": "Use *boolean* to disable button"
      },
      "shape": {
        "info": {
          "title": "Info",
          "content": "When using round or square, the size is changed using the --height variable"
        },
        "subtitle": "Use shape to change button border-radius"
      },
      "api": {
        "type": "Native button type",
        "text": "Button text",
        "loading": "Enable/Disable loader inside button",
        "style-type": "Change button style",
        "accent-bg-on-hover": "Enable/Disable background color while hover",
        "ripple": "Enable/Disable waves on click",
        "fill": "Button fill container",
        "disabled": "Disable the button",
        "height": "Change button height",
        "shape": "Shape change",
        "icon": "Set icon from icon list"
      },
      "slot": {
        "default": "Customize button content",
        "append": "Append your custom content"
      },
      "variables": {
        "height": "Define button height"
      },
      "exposes": {
        "buttonDOMElement": "Original button DOM element"
      }
    },
    "icon": {
      "search-icon": "Search icon",
      "size": {
        "subtitle": "Set icon size"
      },
      "width-height": {
        "subtitle": "Set width/height"
      },
      "color": {
        "subtitle": "Set color, you can use custom colors or pass available variable"
      },
      "api": {
        "size": "Icon size",
        "width": "Icon width",
        "height": "Icon height",
        "color": "Icon color",
        "icon": "Icon list"
      },
      "slot": {
        "default": "Default icon content"
      },
      "variables": {
        "color": "Icon color"
      }
    },
    "link": {
      "type": {
        "subtitle": "Choose color type: *accent*, *success*, *error*, *warning*"
      },
      "underline": {
        "subtitle": "Underline of link"
      },
      "disabled": {
        "subtitle": "Disabled state of link"
      },
      "icon-name": {
        "subtitle": "Link with icon"
      },
      "api": {
        "type": "Color type",
        "href": "Native href attribute",
        "underline": "Show underline on hover",
        "icon-name": "Icon list",
        "target": "Native target attribute",
        "disabled": "Disable link"
      },
      "slot": {
        "default": "Customize link content",
        "prepend": "Prepend custom content"
      },
      "variables": {
        "link-color": "Link color"
      }
    },
    "scroll": {
      "height": {
        "subtitle": "Use *height* property to set the height of the container, without setting the height, the scroll will not be activated"
      },
      "max-height": {
        "subtitle": "The scroll is displayed only when the element height exceeds the max height."
      },
      "value": {
        "subtitle": "Bind and update model value to change scroll position"
      },
      "horizontal-scroll": {
        "subtitle": "If the width of the element exceeds the width of the scrollbar, a horizontal scrollbar appears"
      },
      "api": {
        "height": "Sets the scroll container's height, supporting both static and dynamic values",
        "max-height": "Specifies the maximum height of the scroll container, limiting its vertical size",
        "model-value": "Holds the current scroll position, used for two-way binding and scroll control",
        "scroll-y-prop": "Determines the vertical scroll behavior, such as auto or hidden",
        "scroll-x-prop": "Sets the horizontal scroll behavior, controlling the visibility and functionality of the horizontal scroll",
        "css-scroll-behavior": "Defines the scroll's animation behavior, such as smooth for a gradual scrolling effect",
        "scroll-end-delay": "Scroll end delay in ms",
        "update-only-on-scroll-end": "When set to true, updates the model-value only after scrolling has ended",
        "y-bar-width-in-px": "Y scrollbar width",
        "x-bar-width-in-px": "X scrollbar width",
        "y-gap-in-px": "Y scrollbar content indentation",
        "x-gap-in-px": "X scrollbar content indentation",
        "role": "role of view",
        "aria-label": "aria-label of view",
        "aria-orientation": "aria-orientation of view"
      },
      "slot": {
        "default": "Scroll content"
      },
      "variables": {
        "thumb-color": "Thumb color"
      },
      "exposes": {
        "scrollDOMContainer": "Container element",
        "moveTo": "fn to pass new coordinates"
      },
      "events": {
        "update:model-value": "Event for intercepting two-way binding",
        "on-scroll-end": "Event are triggered after the end of the scrolling animation",
        "on-scroll": "Scroll event"
      }
    },
    "avatar": {
      "size": {
        "subtitle": "Specifies the size of the avatar, accept only *number*."
      },
      "shape": {
        "subtitle": "Determines the shape of the avatar. Can be *circle* or *square*."
      },
      "fit": {
        "subtitle": "Defines how the image fits into the container."
      },
      "api": {
        "size": "Specifies the avatar's size.",
        "shape": "Defines the shape of the avatar.",
        "src": "URL of the avatar image.",
        "src-set": "List of image sources.",
        "alt": "Text description for the image.",
        "fit": "Specifies how the image fills the container."
      },
      "slot": {
        "error": "Slot for displaying load errors"
      },
      "events": {
        "error": "Native img error event",
        "load": "Native img load event"
      }
    },
    "badge": {
      "value": {
        "subtitle": "The displayed value on the badge, can be a *string* or *number*."
      },
      "max": {
        "subtitle": "Maximum value for the badge. If exceeded, it will display as *max+*."
      },
      "is-dot": {
        "subtitle": "Displays the badge as a small dot if set to *true*."
      },
      "hidden": {
        "subtitle": "Controls whether the badge is hidden."
      },
      "color": {
        "subtitle": "The background color of the badge."
      },
      "offset": {
        "subtitle": "Horizontal/Vertical offset of the badge relative to its parent element."
      },
      "api": {
        "value": "Displayed value on the badge.",
        "max": "Maximum value that can be displayed.",
        "is-dot": "Displays the badge as a dot.",
        "hidden": "Hides the badge.",
        "color": "Sets the background color of the badge.",
        "offset-y": "Vertical position offset for the badge.",
        "offset-x": "Horizontal position offset for the badge."
      },
      "slot": {
        "default": "Relative content for badge"
      },
      "variables": {
        "dot-size": "Width and height"
      }
    },
    "card": {
      "shadow-type": {
        "subtitle": "Specifies the type of shadow effect for the card. Accepts values like *always*, *hover*, or *never*."
      },
      "api": {
        "shadow-type": "Defines the shadow visibility on the card."
      },
      "slot": {
        "header": "Card header",
        "footer": "Card footer"
      },
      "variables": {
        "card-padding": "Indentation for all edges"
      }
    },
    "image": {
      "fit": {
        "subtitle": "Defines how the image fits within its container. Accepts values like *fill*, *contain*, *cover*, *none*, *scale-down*.",
        "info": {
          "title": "Info",
          "content": "To display fit property correctly, make sure that you have limited size the wrapper"
        }
      },
      "close-on-outside-click": {
        "subtitle": "Closes the image preview when clicking outside of it, if set to *true*."
      },
      "alt": {
        "subtitle": "Alternative text for the image when it cannot be displayed."
      },
      "loading-text": {
        "subtitle": "Text displayed while the image is loading."
      },
      "load-failed-text": {
        "subtitle": "Text displayed when the image fails to load."
      },
      "api": {
        "fit": "Specifies how the image should fit within its container.",
        "close-on-outside-click": "Closes the preview when clicking outside of it.",
        "alt": "Text description for the image.",
        "loading-text": "Text displayed during image loading.",
        "load-failed-text": "Text shown if the image load fails.",
        "frame-border": "Define border thickness",
        "image-padding": "Define image padding",
        "src": "URL of the image.",
        "src-set": "List of image sources."
      },
      "slot": {
        "loading": "Slot for custom content to display during image loading.",
        "error": "Slot for custom content to display when the image fails to load."
      },
      "variables": {
        "width": "Defines the width of the image.",
        "height": "Defines the height of the image.",
        "background-color": "Defines the background-color of the image"
      },
      "events": {
        "error": "Native error event",
        "load": "Native load event"
      }
    },
    "tag-list": {
      "api": {
        "model-value": "List of tag element objects"
      },
      "events": {
        "update:model-value": "Event for intercepting two-way binding",
        "close": "Return closed tag value"
      }
    },
    "tag-item": {
      "value": {
        "subtitle": "The value assigned to the component, typically *string* or *number*."
      },
      "text": {
        "subtitle": "Defines the text content displayed in the component."
      },
      "removable": {
        "subtitle": "Determines if the component can be removed by the user. Accepts only *boolean*.",
        "info": {
          "title": "Info",
          "content": "If you want the tag rendering to be handled automatically, you can wrap the component in NmorphTagList."
        }
      },
      "height": {
        "subtitle": "Specifies the height of the component."
      },
      "design": {
        "subtitle": "If set to *common*, the component will be rendered with border"
      },
      "api": {
        "value": "Defines the value for the component.",
        "text": "Sets the text displayed inside the component.",
        "removable": "Indicates whether the component can be removed. Automatically works when wrapped in NmorphTagList.",
        "design": "Specifies component style",
        "height": "Define component height"
      },
      "events": {
        "close": "Return closed tag value"
      }
    },
    "skeleton": {
      "animated": {
        "subtitle": "Enables animation for the skeleton component when set to *true*."
      },
      "loading": {
        "subtitle": "Controls whether the skeleton is displayed, typically based on a loading state."
      },
      "rows": {
        "subtitle": "Specifies the number of rows in the skeleton, usually for simulating text content."
      },
      "api": {
        "animated": "Toggles animation for the skeleton component.",
        "loading": "Determines whether the skeleton is shown based on the loading state.",
        "rows": "Defines the number of rows in the skeleton layout."
      },
      "slot": {
        "template": "Slot for custom skeleton structure when loading.",
        "default": "Default slot content when not loading."
      },
      "variables": {
        "loading-gradient": "Defines the gradient color used during skeleton loading animation."
      }
    },
    "skeleton-item": {
      "api": {
        "variant": "Defines the type of skeleton to render, like text or circular.",
        "design": "Sets the design of the skeleton item, such as color or borders.",
        "width": "Specifies the width of the skeleton item."
      }
    },
    "progress": {
      "type": {
        "subtitle": "Specifies the type of progress bar, e.g., *line* or *circle*."
      },
      "color": {
        "subtitle": "Sets the color of the progress bar."
      },
      "percentage": {
        "subtitle": "Defines the percentage of progress completed.",
        "info": {
          "title": "Info",
          "content": "Make sure to specify the width of the wrapper container for proper display."
        }
      },
      "value-inside": {
        "subtitle": "Displays the progress text inside the bar if set to *true*."
      },
      "value-right-side": {
        "subtitle": "Shows or hides the percentage text alongside the progress bar."
      },
      "indeterminate": {
        "subtitle": "Shows an indeterminate progress animation when set to *true*."
      },
      "circle-size": {
        "subtitle": "Specifies the size of the circular progress bar."
      },
      "api": {
        "type": "Specifies the type of progress indicator.",
        "color": "Defines the color of the progress bar.",
        "percentage": "Sets the progress percentage value.",
        "value-inside": "Displays progress text inside the bar.",
        "value-right-side": "Shows or hides percentage text.",
        "indeterminate": "Enables indeterminate progress animation.",
        "circle-size": "Defines the size of the circular progress bar."
      },
      "slot": {
        "inner-text": "Slot for custom content inside the progress bar.",
        "right-side": "Slot for custom content on the right side of the progress bar.",
        "circle-inner-part": "Slot for custom content inside the circular progress."
      },
      "variables": {
        "height": "Defines the height of the progress bar.",
        "width-transition": "Sets the transition animation for width changes.",
        "animation": "Controls the animation settings for the progress bar."
      }
    },
    "calendar": {
      "type": {
        "subtitle": "Defines the calendar type, such as *single* or *multiple* selection."
      },
      "range": {
        "subtitle": "Determines whether the calendar operates in range selection mode."
      },
      "api": {
        "mark-today": "Highlights today's date.",
        "initial-date": "Sets the initial date displayed in the calendar.",
        "model-value": "Represents the selected date(s) in the calendar.",
        "type": "Defines the calendar selection type.",
        "range": "Enables range selection mode in the calendar, allowing selection of a date range."
      },
      "slot": {
        "header": "Slot for customizing the calendar header.",
        "content": "Slot for customizing the calendar content."
      },
      "variables": {
        "table-data-cell-height": "Defines the height of each date cell in the calendar."
      }
    },
    "image-preview": {
      "model-value": {
        "subtitle": "Controls the visibility of the image preview."
      },
      "initial-index": {
        "subtitle": "Defines the initial image index when multiple images are present."
      },
      "src": {
        "subtitle": "The source URL of the image to be previewed."
      },
      "api": {
        "model-value": "Boolean that toggles the visibility of the image preview.",
        "alt": "Alternative text that describes the image when it cannot be loaded.",
        "initial-index": "Index of the first image displayed in a set of images.",
        "src": "URL of the image to be displayed in the preview.",
        "scale-step": "Increment step for scaling (zooming) the image.",
        "min-scale-level": "Defines the minimum zoom level allowed for the image.",
        "max-scale-level": "Defines the maximum zoom level allowed for the image."
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
        "subtitle": "Basic usage of the pagination component, allowing navigation between pages."
      },
      "api": {
        "total-elements-quantity": "Total number of items for pagination.",
        "model-value": "The current active page number.",
        "elements-quantity-on-page": "Number of elements displayed on each page.",
        "disabled": "Boolean that disables the pagination component.",
        "hide-on-single-page": "Hides the pagination component if there is only one page.",
        "max-visible-pages": "Defines how many pages are visible in the pagination control.",
        "fast-forward-step": "Determines how many pages are skipped when fast forwarding."
      },
      "slot": {},
      "variables": {},
      "events": {
        "update:model-value": "Emitted when the current page number changes."
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
          "content": "The 'bordered' property works only if the 'design' property is set to 'common'. Additionally, sorting currently works only with two values: 'ascending' and 'descending'.\nPlease note that table is still under active development and may contain some wrong behavior."
        }
      },
      "api": {
        "data": "Defines the data to be displayed in the table.",
        "row-hover": "Boolean that toggles the hover effect on table rows.",
        "bordered": "Boolean that enables or disables borders around table cells. Works only if the 'design' property is set to 'common'.",
        "sort": "Defines sorting behavior for table columns.",
        "design": "Allows customization of table styles."
      },
      "slot": {},
      "variables": {
        "border-color": "Sets the border color of the table.",
        "table-cell-height": "Defines the height of table cells."
      }
    },
    "table-column": {
      "api": {
        "prop": "Specifies the property name from the data source to be displayed in this column.",
        "label": "The header label for the column, displayed in the table's header.",
        "width": "Defines the width of the column in a css value",
        "alignment": "Sets the text alignment in the column. Accepts 'left', 'center', or 'right'."
      }
    },
    "table-cell": {
      "api": {
        "row": "Required property. Passes the row index from the scope, representing the current row being rendered."
      },
      "slot": {
        "default": "The default slot used to customize the content inside each cell of the column. Provides access to the row data and other relevant scope properties."
      }
    },
    "tooltip": {
      "text": {
        "subtitle": "The content to be displayed inside the tooltip.",
        "hover-me": "Hover me",
        "i-am-tooltip": "I am tooltip",
        "tooltip": "Tooltip",
        "button": "Button"
      },
      "position": {
        "subtitle": "Specifies the position of the tooltip relative to the target element. Accepts values such as 'top', 'bottom', 'left', 'right'."
      },
      "force-coordinate": {
        "subtitle": "Overrides the default positioning logic and allows specifying exact coordinates for the tooltip."
      },
      "api": {
        "text": "Defines the text content for the tooltip.",
        "position": "Sets the position of the tooltip relative to its target.",
        "force-show": "Boolean that forces the tooltip to be shown.",
        "force-coordinate": "Allows manual control of the tooltip's coordinates."
      },
      "slot": {},
      "variables": {
        "max-width": "Sets the maximum width of the tooltip content. It helps to prevent the tooltip from becoming too wide.",
        "width": "Sets the width of the tooltip content. Allows controlling the horizontal size of the tooltip.",
        "height": "Sets the height of the tooltip content. Allows controlling the vertical size of the tooltip."
      }
    },
    "alert": {
      "basic-usage": {
        "title": "Any title",
        "content": "Content for alert",
        "info": {
          "title": "Additional Information",
          "content": "For managing multiple alerts efficiently, use the 'NmorphNotificationProvider' component, which allows grouping and controlling alert notifications centrally."
        }
      },
      "use-provider": {
        "subtitle": "To use the provider, the hook needs to be imported from the library."
      },
      "api": {
        "id": "Unique identifier for the alert component.",
        "type": "Defines the type of alert (e.g., success, error, warning, info).",
        "closable": "Boolean that determines whether the alert can be closed by the user.",
        "title": "Title text displayed at the top of the alert.",
        "content": "Main message or content of the alert.",
        "fill": "Determines if the alert should occupy the full width of its container.",
        "max-width": "Maximum width of the alert component.",
        "show-icon": "Boolean that shows an icon based on the alert type.",
        "bordered": "Adds a border around the alert to make it stand out.",
        "html": "Allows HTML content in the alert body. Use carefully to avoid XSS vulnerabilities."
      },
      "slot": {
        "icon": "Slot to customize the icon displayed in the alert.",
        "title": "Slot to customize the title content of the alert.",
        "default": "Slot to customize the main content of the alert."
      },
      "variables": {},
      "events": {
        "close": "Emitted when the alert is closed by the user."
      }
    },
    "dialog": {
      "basic-usage": {
        "subtitle": "",
        "show-modal": "Show modal"
      },
      "api": {
        "model-value": "Boolean that controls the visibility of the dialog.",
        "title": "Defines the title text of the dialog.",
        "width": "Sets the width of the dialog box.",
        "open-delay": "The delay time in milliseconds before opening the dialog.",
        "close-delay": "The delay time in milliseconds before closing the dialog.",
        "close-on-click-modal": "Boolean that allows the dialog to close when clicking outside.",
        "show-close": "Boolean that displays the close button in the dialog.",
        "z-index": "Defines the z-index for the dialog to manage stacking context.",
        "close-on-overlay": "Boolean that specifies if the dialog should close when clicking on the overlay area."
      },
      "slot": {
        "header": "Slot to customize the content of the dialog header.",
        "default": "Slot to define the main content of the dialog."
      },
      "events": {
        "on-close": "Emitted when the dialog is closed by the user.",
        "update:model-value": "Emitted when the visibility of the dialog changes."
      },
      "variables": {
        "width": "Defines the width of the dialog component."
      }
    },
    "divider": {
      "direction": {
        "subtitle": "Specifies the direction of the divider. Accepts 'horizontal' or 'vertical' values."
      },
      "api": {
        "direction": "Defines the orientation of the divider, either 'horizontal' or 'vertical'."
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
        "show": "Controls the visibility of the component. Set to *true* to show it, *false* to hide.",
        "transparent": "Boolean that sets the component's background to be transparent if enabled."
      },
      "slot": {
        "default": "Default slot for customizing the content inside the component."
      },
      "events": {
        "on-outside-click": "Emitted when a user clicks outside of the component."
      },
      "variables": {}
    },
    "notification-provider": {
      "notifications": {
        "subtitle": ""
      },
      "placement": {
        "subtitle": "Defines the position of the notifications on the screen. Accepts values like 'top-right', 'bottom-left', etc."
      },
      "z-index": {
        "subtitle": "Sets the z-index for the notifications to control their stacking order."
      },
      "quantity": {
        "subtitle": "Limits the maximum number of notifications that can be displayed simultaneously."
      },
      "api": {
        "notifications": "Array containing the notifications to be displayed.",
        "placement": "Specifies where the notifications will appear on the screen.",
        "z-index": "Defines the stacking order of the notifications.",
        "quantity": "Maximum number of notifications allowed on the screen at one time.",
        "close-icon-position": "Determines the location of the close button"
      },
      "slot": {},
      "variables": {}
    },
    "tabs": {
      "api": {
        "model-value": "Controls the active state of the component, typically used to bind the selected value.",
        "stretch": "Boolean that determines if the component should stretch to fill the available space."
      },
      "slot": {
        "default": "Slot to customize the content inside each tab."
      },
      "variables": {},
      "events": {
        "update:model-value": "Emitted when the active tab changes.",
        "tab-change": "Emitted when a user changes tabs, indicating the new active tab."
      }
    },
    "tab-pane": {
      "api": {
        "label": "The text label for the tab, displayed in the tab navigation.",
        "name": "A unique identifier for the tab, used for managing the active tab.",
        "disabled": "Boolean that indicates whether the tab is disabled and cannot be selected."
      },
      "slot": {
        "label": "Slot to customize the label of the tab.",
        "default": "Slot to define the main content of the tab."
      }
    },
    "dropdown": {
      "basic-usage": {
        "subtitle": "Controls whether the dropdown is open. Set to *true* to open, *false* to close.",
        "first-menu": "First menu",
        "second-menu": "Second menu"
      },
      "api": {
        "open": "Boolean that controls the visibility of the dropdown.",
        "relative-element": "Defines the element relative to which the dropdown will be positioned.",
        "width": "Specifies the width of the dropdown.",
        "x-offset": "Horizontal offset in pixels for adjusting the dropdown's position.",
        "y-offset": "Vertical offset in pixels for adjusting the dropdown's position.",
        "fill-width": "Boolean that determines if the dropdown should occupy the full width of the container."
      },
      "slot": {
        "default": "Slot to customize the content inside the dropdown."
      },
      "variables": {},
      "events": {
        "on-outside-click": "Emitted when the user clicks outside of the dropdown, which can be used to close it."
      }
    },
    "backtop": {
      "basic-usage": {
        "info": {
          "title": "Info",
          "content": "Make sure that the scroll container height is defined."
        },
        "scroll-down": "Scroll down"
      },
      "api": {
        "right": "Specifies the distance from the right edge of the screen.",
        "bottom": "Specifies the distance from the bottom edge of the screen.",
        "visibility-height": "Defines the scroll height at which the Backtop button becomes visible. Accepts a number in pixels.",
        "design": "Common style or neuromorphic"
      },
      "slot": {
        "default": "Slot to customize the content of the Backtop button."
      },
      "events": {
        "click": "Emitted when the Backtop button is clicked."
      },
      "variables": {}
    },
    "breadcrumb": {
      "separator": {
        "subtitle": "Defines the character or symbol used to separate breadcrumb items."
      },
      "api": {
        "separator": "Specifies the separator symbol between breadcrumb items."
      }
    },
    "breadcrumb-item": {
      "api": {
        "to": "Specifies the target route for navigation. Accepts a string path or a route object.",
        "replace": "Boolean that determines if navigation should replace the current history entry instead of adding a new one."
      }
    },
    "text-input": {
      "height": {
        "subtitle": "Sets the height of the input field."
      },
      "disabled": {
        "subtitle": "Disables the input field if set to true."
      },
      "type-password": {
        "subtitle": "If set to true, the input field will mask the text as a password.",
        "toggle": "Toggle type"
      },
      "model-value": {
        "subtitle": "Represents the value of the input field, typically used for two-way data binding."
      },
      "clearable": {
        "subtitle": "If true, a clear button will appear to reset the input field."
      },
      "api": {
        "height": "Defines the height of the text input.",
        "disabled": "Boolean that disables the text input.",
        "placeholder": "The text that appears as a hint when the input is empty.",
        "type-password": "Boolean that turns the input into a password field.",
        "model-value": "Current value of the input field.",
        "clearable": "Boolean that adds a button to clear the input value."
      },
      "slot": {
        "prepend-icon": "Slot for adding an icon to the beginning of the input field."
      },
      "variables": {
        "prepend-icon-indent": "Defines the indentation for the prepend icon."
      },
      "events": {
        "update:model-value": "Emitted when the value of the input field changes.",
        "focus": "Emitted when the input field gains focus.",
        "blur": "Emitted when the input field loses focus.",
        "on-enter": "Emitted when the enter key is pressed."
      },
      "exposes": {
        "inputDOMRef": "Original input DOM element"
      }
    },
    "switch": {
      "height": {
        "subtitle": "Defines the height of the switch component."
      },
      "disabled": {
        "subtitle": "Disables the switch if set to true."
      },
      "model-value": {
        "subtitle": "Controls the on/off state of the switch."
      },
      "loading": {
        "subtitle": "Shows a loading state on the switch if set to true."
      },
      "active-value": {
        "subtitle": "Specifies the value when the switch is active."
      },
      "inactive-value": {
        "subtitle": "Specifies the value when the switch is inactive."
      },
      "api": {
        "height": "Specifies the height of the switch.",
        "disabled": "Boolean that disables the switch component.",
        "model-value": "Controls the switch state.",
        "loading": "Boolean that shows a loading spinner on the switch.",
        "active-value": "The value when the switch is on.",
        "inactive-value": "The value when the switch is off."
      },
      "slot": {
        "bg-on": "Slot for customizing the background when the switch is on.",
        "bg-off": "Slot for customizing the background when the switch is off.",
        "thumb-on": "Slot for customizing the thumb when the switch is on.",
        "thumb-off": "Slot for customizing the thumb when the switch is off."
      },
      "variables": {
        "height": "Defines the height of the switch.",
        "offset": "Specifies the offset for the thumb.",
        "thumb-height": "Defines the height of the switch thumb."
      },
      "events": {
        "update:model-value": "Emitted when the switch changes its state."
      },
      "exposes": {
        "inputDOMRef": "Original input DOM element"
      }
    },
    "checkbox": {
      "id": {
        "subtitle": "The unique identifier for the checkbox."
      },
      "disabled": {
        "subtitle": "Disables the checkbox if set to true."
      },
      "model-value": {
        "subtitle": "Represents the checked state of the checkbox.",
        "label": "Label"
      },
      "label": {
        "subtitle": "Specifies the label text for the checkbox."
      },
      "design": {
        "subtitle": "Defines the design style for the checkbox, such as standard or outlined."
      },
      "api": {
        "id": "Unique identifier for the checkbox.",
        "disabled": "Boolean that disables the checkbox.",
        "model-value": "Checked state of the checkbox.",
        "label": "The label displayed next to the checkbox.",
        "design": "Specifies the design style of the checkbox."
      },
      "slot": {
        "default": "Slot for customizing the content of the checkbox.",
        "label": "Slot for customizing the label of the checkbox."
      },
      "variables": {
        "size": "Defines the size of the checkbox."
      },
      "events": {
        "update:model-value": "Emitted when the checked state of the checkbox changes."
      },
      "exposes": {
        "inputDOMRef": "Original input DOM element"
      }
    },
    "checkbox-group": {
      "height": {
        "subtitle": "Specifies the height of the checkbox group container."
      },
      "fill": {
        "subtitle": "If set to true, the container will fill the available space."
      },
      "disabled": {
        "subtitle": "Disables all checkboxes within the group if set to true."
      },
      "model-value": {
        "subtitle": "Array of selected values in the checkbox group."
      },
      "options": {
        "subtitle": "Defines the options for the checkboxes within the group."
      },
      "design": {
        "subtitle": "Sets the design style for the checkbox group."
      },
      "direction": {
        "subtitle": "Specifies the direction (horizontal or vertical) for the checkbox group."
      },
      "api": {
        "height": "Height of the checkbox group container.",
        "fill": "Boolean that allows the container to fill the available space.",
        "disabled": "Disables all checkboxes within the group.",
        "model-value": "Array of selected values.",
        "options": "Options for the checkboxes.",
        "design": "Design style of the checkbox group.",
        "direction": "Direction of the checkbox group layout."
      },
      "slot": {
        "default": "Slot for customizing the content of the checkbox group."
      },
      "variables": {},
      "events": {
        "update:model-value": "Emitted when the selected values in the checkbox group change."
      }
    },
    "autocomplete": {
      "basic-usage": {
        "placeholder": "Type some..."
      },
      "height": {
        "subtitle": "Defines the height of the autocomplete input field."
      },
      "fill": {
        "subtitle": "If true, the autocomplete field will fill its container."
      },
      "disabled": {
        "subtitle": "Disables the autocomplete input if set to true."
      },
      "placeholder": {
        "subtitle": "Text displayed when the input field is empty."
      },
      "clearable": {
        "subtitle": "If true, a clear button will be shown to reset the input field."
      },
      "list": {
        "subtitle": "Specifies the list of options for autocomplete suggestions."
      },
      "action-callback": {
        "subtitle": "Function called when an option is selected from the list."
      },
      "api": {
        "height": "Height of the autocomplete input field.",
        "fill": "Boolean that allows the field to fill its container.",
        "disabled": "Disables the autocomplete input.",
        "model-value": "Current value of the input field.",
        "placeholder": "Placeholder text displayed when the input is empty.",
        "clearable": "Boolean that adds a button to clear the input value.",
        "list": "List of suggestions for the input.",
        "action-callback": "Callback function triggered on option selection."
      },
      "slot": {
        "loader": "Slot for adding a custom loader during data fetching."
      },
      "variables": {},
      "events": {
        "update:model-value": "Emitted when the value of the autocomplete field changes.",
        "select": "Emitted when a suggestion is selected."
      }
    },
    "file-upload": {
      "model-value": {},
      "disabled": {
        "subtitle": "Disables the file upload component if set to true."
      },
      "multiple": {
        "subtitle": "Allows multiple files to be uploaded if set to true."
      },
      "allowed-types": {
        "subtitle": "Specifies the allowed file types for upload."
      },
      "photo-with-preview": {
        "subtitle": "If true, uploaded photos will be displayed with a preview."
      },
      "fill": {
        "subtitle": "If true, the file upload button will fill the container."
      },
      "api": {
        "model-value": "Represents the uploaded files.",
        "disabled": "Boolean that disables the file upload component.",
        "multiple": "Boolean that allows multiple files to be selected.",
        "allowed-types": "Specifies the types of files that can be uploaded.",
        "photo-with-preview": "Shows preview of uploaded images.",
        "fill": "Allows the upload button to fill its container."
      },
      "slot": {
        "trigger": "Slot for customizing the trigger button for file upload."
      },
      "variables": {},
      "events": {
        "on-unsupported-file-type-error": "Emitted when a user tries to upload an unsupported file type.",
        "update:model-value": "Emitted when the file selection changes."
      },
      "exposes": {
        "inputDOMRef": "Original input DOM element"
      }
    },
    "number-input": {
      "basic-usage": {
        "subtitle": "Represents the current numeric value of the input field."
      },
      "height": {
        "subtitle": "Defines the height of the number input field."
      },
      "fill": {
        "subtitle": "If true, the number input will fill its container."
      },
      "disabled": {
        "subtitle": "Disables the number input if set to true."
      },
      "max": {
        "subtitle": "Specifies the maximum value for the input."
      },
      "min": {
        "subtitle": "Specifies the minimum value for the input."
      },
      "step": {
        "subtitle": "Defines the step size for incrementing or decrementing the value."
      },
      "action-btn-position-right": {
        "subtitle": "If true, the increment and decrement buttons are positioned to the right."
      },
      "api": {
        "height": "Height of the number input field.",
        "fill": "Boolean that allows the field to fill its container.",
        "disabled": "Boolean that disables the input field.",
        "model-value": "Current value of the number input.",
        "max": "Maximum allowable value.",
        "min": "Minimum allowable value.",
        "step": "Step size for value increment or decrement.",
        "action-btn-position-right": "Positions action buttons to the right if true."
      },
      "slot": {},
      "variables": {},
      "exposes": {
        "inputDOMRef": "Original input dom element"
      },
      "events": {
        "update:model-value": "Emitted when the value of the number input changes."
      }
    },
    "select": {
      "height": {
        "subtitle": "Sets the height of the select dropdown."
      },
      "fill": {
        "subtitle": "If true, the select component will fill the available container width."
      },
      "disabled": {
        "subtitle": "Disables the select component if set to true."
      },
      "no-element-placeholder": {
        "subtitle": "Text shown when there are no selectable options."
      },
      "value-required": {
        "subtitle": "Specifies if a value must be selected before proceeding."
      },
      "options": {
        "subtitle": "Defines the list of selectable options."
      },
      "options-map": {
        "subtitle": "Specifies an object to map options with labels and values."
      },
      "model-value": {
        "subtitle": "Represents the selected value of the select component.",
        "multiple": "Multiple values"
      },
      "loading": {
        "subtitle": "Displays a loading indicator if set to true."
      },
      "open": {
        "subtitle": "Controls whether the select dropdown is open."
      },
      "api": {
        "height": "Height of the select dropdown.",
        "fill": "Boolean to allow the dropdown to fill its container.",
        "disabled": "Disables the select dropdown.",
        "no-element-placeholder": "Placeholder text when no options are available.",
        "value-required": "Enforces value selection.",
        "options": "List of selectable options.",
        "options-map": "Object for mapping options.",
        "model-value": "The selected value of the dropdown.",
        "loading": "Shows a loading state.",
        "open": "Boolean to control dropdown visibility."
      },
      "slot": {
        "default": "Slot to customize the options within the select."
      },
      "variables": {
        "base-width": "Specifies the base width for the select component."
      },
      "events": {
        "update:model-value": "Emitted when the selected value changes."
      }
    },
    "select-option": {
      "api": {
        "label": "Defines the label of the option, which is displayed in the select dropdown.",
        "height": "Specifies the height of the select option.",
        "disabled": "Boolean that determines if the option is disabled and cannot be selected."
      },
      "slot": {
        "default": "Slot to customize the content displayed for this option."
      },
      "variables": {
        "hover-bg": "Sets the background color when the option is hovered.",
        "hover-color": "Defines the text color when the option is hovered."
      },
      "events": {
        "change-value": "Emitted when the option value changes."
      }
    },
    "slider": {
      "fill": {
        "subtitle": "If true, the slider track will fill the container."
      },
      "disabled": {
        "subtitle": "Disables the slider if set to true."
      },
      "model-value": {
        "subtitle": "Represents the current value of the slider."
      },
      "max": {
        "subtitle": "Specifies the maximum value for the slider."
      },
      "min": {
        "subtitle": "Specifies the minimum value for the slider."
      },
      "step": {
        "subtitle": "Defines the step size for the slider."
      },
      "show-tooltip": {
        "subtitle": "If true, shows a tooltip displaying the current value."
      },
      "api": {
        "fill": "Boolean that allows the slider to fill its container.",
        "disabled": "Disables the slider component.",
        "model-value": "Current value of the slider.",
        "max": "Maximum value for the slider.",
        "min": "Minimum value for the slider.",
        "step": "Step size for value increment or decrement.",
        "show-tooltip": "Boolean to control tooltip visibility."
      },
      "slot": {},
      "variables": {
        "slider-height": "Defines the height of the slider.",
        "value-fixed-container-height": "Sets the height of the container for displaying the value."
      },
      "events": {
        "update:model-value": "Emitted when the slider value changes."
      }
    },
    // "time-picker": {
    //   "disabled": {
    //     "subtitle": "Disables the time picker if set to true."
    //   },
    //   "model-value": {
    //     "subtitle": "Represents the selected time value."
    //   },
    //   "open": {
    //     "subtitle": "Controls whether the time picker dropdown is open."
    //   },
    //   "init-without-value": {
    //     "subtitle": "If true, the time picker will initialize without a default value."
    //   },
    //   "disabled-hours": {
    //     "subtitle": "Specifies which hours should be disabled for selection."
    //   },
    //   "disabled-minutes": {
    //     "subtitle": "Specifies which minutes should be disabled for selection."
    //   },
    //   "disabled-seconds": {
    //     "subtitle": "Specifies which seconds should be disabled for selection."
    //   },
    //   "api": {
    //     "disabled": "Disables the time picker.",
    //     "model-value": "The selected time value.",
    //     "open": "Boolean to control visibility of the dropdown.",
    //     "init-without-value": "Initializes the time picker without a value.",
    //     "disabled-hours": "Hours that are not selectable.",
    //     "disabled-minutes": "Minutes that are not selectable.",
    //     "disabled-seconds": "Seconds that are not selectable."
    //   },
    //   "slot": {},
    //   "variables": {},
    //   "events": {
    //     "update:model-value": "Emitted when the selected time changes.",
    //     "on-change-open-close": "Emitted when the time picker is opened or closed."
    //   },
    //   "exposes": {
    //     "inputDOMRef": "Original input DOM element"
    //   }
    // },
    "radio": {
      "basic-usage": {
        "info": {
          "title": "Radio Group Usage",
          "content": "Typically used within a radio group to allow users to select one option from a set. Once a radio button is selected, it cannot be unchecked by clicking on it again—only by selecting another radio button in the group to change the checked state. For proper display, when using the 'style-type' as 'button', a label should be provided."
        }
      },
      "api": {
        "disabled": "Boolean that disables the radio button.",
        "label": "Label text displayed next to the radio button.",
        "value": "The value assigned to the radio button.",
        "style-type": "Specifies the visual style of the radio button.",
        "checked": "Mark radio button as checked"
      },
      "slot": {
        "label": "Slot to customize the label of the radio button."
      },
      "variables": {
        "size": "Specifies the size of the radio button."
      },
      "exposes": {
        "inputDOMRef": "Original input DOM element"
      }
    },
    "radio-group": {
      "height": {
        "subtitle": "Defines the height of the radio group container."
      },
      "fill": {
        "subtitle": "If true, the radio group will fill the available container space."
      },
      "disabled": {
        "subtitle": "Disables all radio buttons within the group if set to true."
      },
      "model-value": {
        "subtitle": "Represents the selected value in the radio group."
      },
      "options": {
        "subtitle": "Defines the list of options available for selection."
      },
      "style-type": {
        "subtitle": "Specifies the visual style of the radio buttons in the group."
      },
      "direction": {
        "subtitle": "Sets the direction of the radio buttons, either horizontal or vertical."
      },
      "api": {
        "height": "Height of the radio group container.",
        "fill": "Boolean that allows the group to fill the container.",
        "disabled": "Disables all radio buttons within the group.",
        "model-value": "The selected value of the radio group.",
        "options": "List of options for selection.",
        "style-type": "Visual style of the radio buttons.",
        "direction": "Direction of the radio buttons layout."
      },
      "slot": {
        "default": "Slot to customize the radio buttons in the group."
      },
      "variables": {},
      "events": {
        "update:model-value": "Emitted when the selected value changes."
      }
    },
    "form": {
      "basic-usage": {
        "subtitle": "Represents the form values for all input elements.",
        "too-short": "Too short",
        'wrong-age': "Wrong age",
        "wrong-sex": "Wrong",
        "you-cant-be-a-nobody": "You cant be a maintainer",
        "we-dont-have-kombucha": "We don't have Kombucha(",
        "ie-not-supported": "IE not supported",
        "you-must-set-agreement": "You must set agreement",
        "value-must-greater-than-30": "Value must be greater than 30",
        "value-must-less-than-80": "Value must be less than 80",
        "pear-is-not-available": "Pear is not available",
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
        "some-number-value": "Some number value",
        "choose-date": "Choose date",
        "food": "Food",
        "favorite-food": "Favorite food",
        "photo": "Photo",
        "send-form": "Send form"
      },
      "validate-immediately": {
        "subtitle": "If true, the form will validate its fields immediately after rendering."
      },
      "api": {
        "value": "The form values for input elements.",
        "validate-immediately": "Boolean that controls whether validation occurs on load."
      },
      "slot": {
        "default": "Slot for customizing the content of the form."
      },
      "variables": {},
      "events": {
        "form-validator": "Emitted when the form is validated."
      }
    },
    "form-item": {
      "api": {
        "id": "Specifies the unique identifier for the form item.",
        "height": "Sets the height of the form item container.",
        "label": "Defines the label text associated with the form item, providing context to the user.",
        "show-validation-icon": "Boolean that controls whether a validation icon is displayed for this form item.",
        "static-error-box-space": "Defines a static space for displaying an error box, ensuring consistent spacing regardless of validation state.",
        "validate": "Defines the validation rules for the form item."
      },
      "slot": {
        "default": "Slot to customize the content of the form item, typically input elements or other form controls."
      }
    }
  }
};
