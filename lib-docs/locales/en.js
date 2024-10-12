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
        "subtitle": "Demonstrates the basic functionality of the table component."
      },
      "row-hover": {
        "subtitle": "Enables a hover effect on table rows."
      },
      "bordered": {
        "subtitle": "Displays borders around table cells."
      },
      "sort": {
        "subtitle": "Allows sorting of table columns."
      },
      "design": {
        "subtitle": "Applies custom styles to the table."
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
    }
  }
};
