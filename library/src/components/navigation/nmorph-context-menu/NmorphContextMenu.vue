<script setup lang="ts">
import { computed, markRaw, onBeforeUnmount, ref, toRaw, watch } from 'vue';
import type { CSSProperties } from 'vue';
import NmorphDropdown from '../nmorph-dropdown/NmorphDropdown.vue';
import { NmorphIcon } from '@/components';
import type { NmorphDomElementType } from '@/types';
import type {
  INmorphContextMenuEmit,
  INmorphContextMenuExpose,
  INmorphContextMenuProps,
  INmorphContextMenuSlots,
  INmorphNormalizedContextMenuOption,
  NmorphContextMenuAnchorType,
  NmorphContextMenuOpenEvent,
} from './types';

const LONG_PRESS_DELAY_IN_MS = 600;
const LONG_PRESS_MOVE_TOLERANCE_IN_PX = 8;

const props = withDefaults(defineProps<INmorphContextMenuProps>(), {
  modelValue: null,
  options: () => [],
  trigger: 'contextmenu',
  placement: 'bottom-start',
  width: 'max-content',
  minWidth: undefined,
  maxWidth: undefined,
  xOffset: 0,
  yOffset: 0,
  fillWidth: false,
  zIndex: undefined,
  closeOnEscape: true,
  trapFocus: false,
  disabled: false,
  closeOnScroll: true,
  role: 'menu',
  ariaLabel: '',
  hideShadow: false,
  mobileMode: 'dropdown',
});

const emit = defineEmits<INmorphContextMenuEmit>();
defineSlots<INmorphContextMenuSlots>();

const triggerDOMRef = ref<HTMLElement | null>(null);
const relativeElement = ref<NmorphDomElementType>(null);
const anchorType = ref<NmorphContextMenuAnchorType>('point');
const openState = ref(Boolean(props.modelValue));
const longPressTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const longPressPointerId = ref<number | null>(null);
const longPressStartPoint = ref<{ x: number; y: number } | null>(null);
const suppressNextClick = ref(false);
const suppressNextClickTimer = ref<ReturnType<typeof setTimeout> | null>(null);

const isOpen = computed(() => (typeof props.modelValue === 'boolean' ? props.modelValue : openState.value));
const hasOptions = computed(() => props.options.length > 0);
const isLongPressTrigger = computed(() => props.trigger === 'longpress');
const isContextMenuTrigger = computed(() => props.trigger === 'contextmenu' || props.trigger === 'both');

const normalizedOptions = computed<INmorphNormalizedContextMenuOption[]>(() =>
  props.options.map((option, index) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        key: `${option}-${index}`,
        type: 'item',
        label: option,
        value: option,
        disabled: false,
        closeOnClick: true,
        raw: option,
      };
    }

    return {
      key: `${String(option.value ?? option.label ?? index)}-${index}`,
      type: option.type ?? 'item',
      label: option.label,
      value: option.value ?? option.label ?? index,
      icon: option.icon ? markRaw(toRaw(option.icon)) : undefined,
      iconProps: option.iconProps,
      shortcut: option.shortcut,
      description: option.description,
      component: option.component ? markRaw(toRaw(option.component)) : undefined,
      componentProps: option.componentProps,
      disabled: Boolean(option.disabled),
      color: option.color,
      closeOnClick: option.closeOnClick ?? true,
      raw: option,
    };
  })
);

const dropdownContentClass = computed(() =>
  [
    'nmorph-context-menu__dropdown',
    props.mobileMode === 'bottom-sheet' && 'nmorph-context-menu__dropdown--bottom-sheet',
  ]
    .filter(Boolean)
    .join(' ')
);

watch(
  () => props.modelValue,
  (value) => {
    if (typeof value === 'boolean') openState.value = value;
  }
);

const createPointElement = (x: number, y: number) =>
  ({
    clientWidth: 0,
    getBoundingClientRect: () =>
      ({
        x,
        y,
        width: 0,
        height: 0,
        top: y,
        left: x,
        right: x,
        bottom: y,
        toJSON: () => ({}),
      }) as DOMRect,
  }) as HTMLElement;

const setOpen = (value: boolean) => {
  const wasOpen = isOpen.value;

  openState.value = value;
  emit('update:model-value', value);

  if (wasOpen && !value) emit('close');
};

const close = () => {
  setOpen(false);
};

const openAt = (x: number, y: number, event?: NmorphContextMenuOpenEvent) => {
  if (props.disabled) return;

  anchorType.value = 'point';
  relativeElement.value = createPointElement(x, y);
  setOpen(true);
  emit('open', event);
};

const openAtElement = (element: HTMLElement, event?: NmorphContextMenuOpenEvent) => {
  if (props.disabled) return;

  anchorType.value = 'element';
  relativeElement.value = element;
  setOpen(true);
  emit('open', event);
};

const contextMenuHandler = (event: MouseEvent) => {
  if (props.disabled) return;

  if (props.trigger === 'longpress') {
    event.preventDefault();
    return;
  }

  if (!isContextMenuTrigger.value) return;

  event.preventDefault();
  openAt(event.clientX, event.clientY, event);
};

const isEventInsideTrigger = (event: MouseEvent) => {
  const triggerElement = triggerDOMRef.value;

  if (!triggerElement) return false;

  if (event.target instanceof Node && triggerElement.contains(event.target)) return true;

  const triggerRect = triggerElement.getBoundingClientRect();

  return (
    event.clientX >= triggerRect.left &&
    event.clientX <= triggerRect.right &&
    event.clientY >= triggerRect.top &&
    event.clientY <= triggerRect.bottom
  );
};

const documentContextMenuHandler = (event: MouseEvent) => {
  if (!isOpen.value || props.disabled || !isContextMenuTrigger.value) return;
  if (!isEventInsideTrigger(event)) return;

  event.preventDefault();
  event.stopPropagation();
  openAt(event.clientX, event.clientY, event);
};

const clickHandler = (event: MouseEvent) => {
  if (suppressNextClick.value) {
    clearClickSuppression();
    event.preventDefault();
    return;
  }

  if (props.disabled || (props.trigger !== 'click' && props.trigger !== 'both') || event.button !== 0) return;

  const eventTarget = event.currentTarget instanceof HTMLElement ? event.currentTarget : triggerDOMRef.value;

  if (!eventTarget) return;

  openAtElement(eventTarget, event);
};

const keydownHandler = (event: KeyboardEvent) => {
  if (
    props.disabled ||
    props.trigger === 'manual' ||
    (event.key !== 'ContextMenu' && !(event.shiftKey && event.key === 'F10'))
  )
    return;

  const eventTarget = event.target instanceof HTMLElement ? event.target : triggerDOMRef.value;

  if (!eventTarget) return;

  event.preventDefault();
  openAtElement(eventTarget, event);
};

const outsideClickHandler = () => {
  emit('on-outside-click');
  close();
};

const escapeHandler = () => {
  emit('on-escape-keydown');
  close();
};

const optionClickHandler = (option: INmorphNormalizedContextMenuOption, index: number) => {
  if (option.disabled) return;

  emit('select', option.raw, index);
  if (option.closeOnClick) close();
};

const optionKeydownHandler = (event: KeyboardEvent, option: INmorphNormalizedContextMenuOption, index: number) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;

  event.preventDefault();
  optionClickHandler(option, index);
};

const clearLongPressTimer = () => {
  if (longPressTimer.value) clearTimeout(longPressTimer.value);

  longPressTimer.value = null;
  longPressPointerId.value = null;
  longPressStartPoint.value = null;
};

const clearClickSuppression = () => {
  if (suppressNextClickTimer.value) clearTimeout(suppressNextClickTimer.value);

  suppressNextClick.value = false;
  suppressNextClickTimer.value = null;
};

const suppressNextClickTemporarily = () => {
  clearClickSuppression();

  suppressNextClick.value = true;
  suppressNextClickTimer.value = setTimeout(clearClickSuppression, 700);
};

const pointerDownHandler = (event: PointerEvent) => {
  if (props.disabled || !isLongPressTrigger.value || (event.pointerType !== 'touch' && event.pointerType !== 'pen'))
    return;

  clearLongPressTimer();

  longPressPointerId.value = event.pointerId;
  longPressStartPoint.value = { x: event.clientX, y: event.clientY };
  longPressTimer.value = setTimeout(() => {
    suppressNextClickTemporarily();
    clearLongPressTimer();
    openAt(event.clientX, event.clientY, event);
  }, LONG_PRESS_DELAY_IN_MS);
};

const pointerMoveHandler = (event: PointerEvent) => {
  if (!longPressTimer.value || longPressPointerId.value !== event.pointerId || !longPressStartPoint.value) return;

  const xDistance = Math.abs(event.clientX - longPressStartPoint.value.x);
  const yDistance = Math.abs(event.clientY - longPressStartPoint.value.y);

  if (xDistance > LONG_PRESS_MOVE_TOLERANCE_IN_PX || yDistance > LONG_PRESS_MOVE_TOLERANCE_IN_PX) {
    clearLongPressTimer();
  }
};

const pointerEndHandler = (event: PointerEvent) => {
  if (longPressPointerId.value !== event.pointerId) return;

  clearLongPressTimer();
};

const getOptionStyle = (option: INmorphNormalizedContextMenuOption) =>
  ({
    '--nmorph-context-menu-item-color': option.color,
  }) as CSSProperties;

const scrollHandler = () => {
  if (props.closeOnScroll && anchorType.value === 'point') close();
};

watch(
  isOpen,
  (open) => {
    if (typeof window === 'undefined') return;
    if (open) {
      window.addEventListener('scroll', scrollHandler, { passive: true, capture: true });
      document.addEventListener('contextmenu', documentContextMenuHandler, true);
    } else {
      window.removeEventListener('scroll', scrollHandler, true);
      document.removeEventListener('contextmenu', documentContextMenuHandler, true);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') window.removeEventListener('scroll', scrollHandler, true);
  if (typeof document !== 'undefined') document.removeEventListener('contextmenu', documentContextMenuHandler, true);
  clearLongPressTimer();
  clearClickSuppression();
});

defineExpose<INmorphContextMenuExpose>({ close, openAt, openAtElement });
</script>

<template>
  <div
    ref="triggerDOMRef"
    class="nmorph-context-menu"
    @click="clickHandler"
    @contextmenu="contextMenuHandler"
    @keydown="keydownHandler"
    @pointerdown="pointerDownHandler"
    @pointermove="pointerMoveHandler"
    @pointerup="pointerEndHandler"
    @pointercancel="pointerEndHandler"
    @pointerleave="pointerEndHandler"
  >
    <slot />
    <NmorphDropdown
      v-if="relativeElement"
      :open="isOpen"
      :relative-element="relativeElement"
      :placement="props.placement"
      :width="props.width"
      :min-width="props.minWidth"
      :max-width="props.maxWidth"
      :x-offset="props.xOffset"
      :y-offset="props.yOffset"
      :fill-width="props.fillWidth"
      :z-index="props.zIndex"
      :close-on-escape="props.closeOnEscape"
      :trap-focus="props.trapFocus"
      :role="props.role"
      :aria-label="props.ariaLabel"
      :hide-shadow="props.hideShadow"
      :content-class="dropdownContentClass"
      @on-outside-click="outsideClickHandler"
      @on-escape-keydown="escapeHandler"
    >
      <div v-if="hasOptions" class="nmorph-context-menu__options">
        <template v-for="(option, index) in normalizedOptions" :key="option.key">
          <button
            v-if="option.type === 'item' && !option.component"
            type="button"
            class="nmorph-context-menu__item"
            role="menuitem"
            :disabled="option.disabled"
            :style="getOptionStyle(option)"
            @click="optionClickHandler(option, index)"
          >
            <slot name="item" :option="option" :active="false" :disabled="option.disabled">
              <NmorphIcon v-if="option.icon" class="nmorph-context-menu__item-icon">
                <component :is="option.icon" v-bind="option.iconProps" />
              </NmorphIcon>
              <span class="nmorph-context-menu__item-copy">
                <span class="nmorph-context-menu__item-label">{{ option.label }}</span>
                <span v-if="option.description" class="nmorph-context-menu__item-description">
                  {{ option.description }}
                </span>
              </span>
              <span v-if="option.shortcut" class="nmorph-context-menu__item-shortcut">{{ option.shortcut }}</span>
            </slot>
          </button>
          <div
            v-else-if="option.type === 'item'"
            class="nmorph-context-menu__item"
            :class="{ 'nmorph-context-menu__item--disabled': option.disabled }"
            role="menuitem"
            :tabindex="option.disabled ? -1 : 0"
            :aria-disabled="option.disabled"
            :style="getOptionStyle(option)"
            @click="optionClickHandler(option, index)"
            @keydown="optionKeydownHandler($event, option, index)"
          >
            <slot name="item" :option="option" :active="false" :disabled="option.disabled">
              <component :is="option.component" v-bind="option.componentProps" />
            </slot>
          </div>
          <div v-else-if="option.type === 'divider'" class="nmorph-context-menu__divider" role="separator" />
          <div v-else class="nmorph-context-menu__section" role="presentation">{{ option.label }}</div>
        </template>
      </div>
      <slot v-else name="menu" :close="close" />
    </NmorphDropdown>
  </div>
</template>

<style lang="scss">
.nmorph-context-menu {
  display: inline-block;
  max-width: 100%;
}

.nmorph-context-menu__dropdown {
  text-align: left;
}

.nmorph-context-menu__dropdown--bottom-sheet {
  position: fixed !important;
  inset: auto var(--indentation-03) var(--indentation-03) var(--indentation-03) !important;
  width: auto !important;
  max-width: none !important;
  border-radius: var(--default-border-radius) var(--default-border-radius) 0 0;
}

.nmorph-context-menu__options {
  display: grid;
  gap: 4px;
  padding: 4px;
}

.nmorph-context-menu__item {
  display: flex;
  gap: var(--indentation-02);
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 120px;
  padding: var(--indentation-02) var(--indentation-04);
  color: var(--nmorph-context-menu-item-color, var(--nmorph-text-color));
  font: inherit;
  line-height: var(--line-height-regular);
  text-align: left;
  background: transparent;
  border: 0;
  border-radius: var(--default-border-radius);
  cursor: pointer;
}

.nmorph-context-menu__item-icon,
.nmorph-context-menu__item-shortcut {
  flex: 0 0 auto;
}

.nmorph-context-menu__item-copy {
  display: grid;
  flex: 1 1 auto;
  min-width: 0;
}

.nmorph-context-menu__item-label {
  color: var(--nmorph-context-menu-item-color, var(--nmorph-text-color));
  text-align: left;
}

.nmorph-context-menu__item-description,
.nmorph-context-menu__item-shortcut {
  color: var(--nmorph-semi-contrast-text-color);
  font-size: var(--font-size-extra-small);
  line-height: var(--line-height-regular);
}

.nmorph-context-menu__divider {
  height: 1px;
  margin: 2px var(--indentation-02);
  background: color-mix(in srgb, var(--nmorph-text-color) 16%, transparent);
}

.nmorph-context-menu__section {
  padding: var(--indentation-02) var(--indentation-04) var(--indentation-01);
  color: var(--nmorph-semi-contrast-text-color);
  font-weight: 600;
  font-size: var(--font-size-extra-small);
  line-height: var(--line-height-regular);
  text-transform: uppercase;
}

.nmorph-context-menu__item:not(:disabled, .nmorph-context-menu__item--disabled):hover {
  background: color-mix(in srgb, var(--nmorph-context-menu-item-color, var(--nmorph-text-color)) 12%, transparent);
}

.nmorph-context-menu__item:disabled,
.nmorph-context-menu__item--disabled {
  cursor: default;
  opacity: 0.56;
  pointer-events: none;
}

.nmorph-context-menu__dropdown .nmorph-button--transparent .nmorph-button__content {
  justify-content: flex-start;
  text-align: left;
}

.nmorph-context-menu__dropdown .nmorph-button--transparent .nmorph-button__content span {
  text-align: left;
}

.nmorph-context-menu__dropdown
  .nmorph-button--transparent
  .nmorph-button__content:not(:disabled, [loading='true']):hover {
  background: color-mix(
    in srgb,
    var(
        --nmorph-button-hover-color,
        var(--nmorph-button-color, var(--transparent-button-color, var(--nmorph-text-color)))
      )
      12%,
    transparent
  );
}
</style>
