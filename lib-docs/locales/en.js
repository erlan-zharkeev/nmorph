export default {
  "guide": "Guide",
  "components": "Components",
  "about": "About",
  "search": "Search",
  "attributes": "Attributes",
  "slots": "Slots",
  "variables": "Variables",
  "exposes": 'Exposes',
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
        "load": "Native img load event",
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
        "load": "Native load event",
      }
    },
    "tag": {
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
      "transparent": {
        "subtitle": "If set to *true*, the component will be rendered without shadow."
      },
      "api": {
        "value": "Defines the value for the component.",
        "text": "Sets the text displayed inside the component.",
        "removable": "Indicates whether the component can be removed. Automatically works when wrapped in NmorphTagList.",
        "transparent": "Specifies whether the component is transparent.",
        "height": "Define component height"
      },
      "events": {
        "close": "Return tag value"
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
      "slot": {},
      "variables": {}
    }
  }
};
