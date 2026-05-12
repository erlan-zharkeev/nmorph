<script setup lang="ts">
import { computed, markRaw, onBeforeUnmount, ref, toRaw, watch } from 'vue';
import type { CSSProperties, Component } from 'vue';
import NmorphDropdown from '../nmorph-dropdown/NmorphDropdown.vue';
import type { NmorphDomElementType, NmorphPlacementType } from '@/types';
import type { NmorphContextMenuOption } from './types';

type NmorphContextMenuTrigger = 'contextmenu' | 'click' | 'both';
type NmorphContextMenuAnchorType = 'point' | 'element';

interface INmorphNormalizedContextMenuOption {
  key: string;
  label?: string | number;
  value: unknown;
  component?: Component;
  componentProps?: Record<string, unknown>;
  disabled: boolean;
  color?: string;
  closeOnClick: boolean;
  raw: NmorphContextMenuOption;
}

interface INmorphProps {
  modelValue?: boolean | null;
  options?: NmorphContextMenuOption[];
  trigger?: NmorphContextMenuTrigger;
  placement?: NmorphPlacementType;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  xOffset?: number;
  yOffset?: number;
  fillWidth?: boolean;
  zIndex?: number;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  disabled?: boolean;
  closeOnScroll?: boolean;
  role?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
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
});

interface INmorphEmit {
  (e: 'update:model-value', value: boolean): void;
  (e: 'open', event: MouseEvent | KeyboardEvent): void;
  (e: 'close'): void;
  (e: 'select', option: NmorphContextMenuOption, index: number): void;
  (e: 'on-outside-click'): void;
  (e: 'on-escape-keydown'): void;
}

const emit = defineEmits<INmorphEmit>();

const triggerDOMRef = ref<HTMLElement | null>(null);
const relativeElement = ref<NmorphDomElementType>(null);
const anchorType = ref<NmorphContextMenuAnchorType>('point');
const openState = ref(Boolean(props.modelValue));

const isOpen = computed(() => (typeof props.modelValue === 'boolean' ? props.modelValue : openState.value));
const hasOptions = computed(() => props.options.length > 0);

const normalizedOptions = computed<INmorphNormalizedContextMenuOption[]>(() =>
  props.options.map((option, index) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        key: `${option}-${index}`,
        label: option,
        value: option,
        disabled: false,
        closeOnClick: true,
        raw: option,
      };
    }

    return {
      key: `${String(option.value ?? option.label ?? index)}-${index}`,
      label: option.label,
      value: option.value ?? option.label ?? index,
      component: option.component ? markRaw(toRaw(option.component)) : undefined,
      componentProps: option.componentProps,
      disabled: Boolean(option.disabled),
      color: option.color,
      closeOnClick: option.closeOnClick ?? true,
      raw: option,
    };
  })
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

const openAt = (x: number, y: number, event: MouseEvent | KeyboardEvent) => {
  anchorType.value = 'point';
  relativeElement.value = createPointElement(x, y);
  setOpen(true);
  emit('open', event);
};

const openAtElement = (element: HTMLElement, event: MouseEvent | KeyboardEvent) => {
  anchorType.value = 'element';
  relativeElement.value = element;
  setOpen(true);
  emit('open', event);
};

const contextMenuHandler = (event: MouseEvent) => {
  if (props.disabled || (props.trigger !== 'contextmenu' && props.trigger !== 'both')) return;

  event.preventDefault();
  openAt(event.clientX, event.clientY, event);
};

const clickHandler = (event: MouseEvent) => {
  if (props.disabled || (props.trigger !== 'click' && props.trigger !== 'both') || event.button !== 0) return;

  const eventTarget = event.currentTarget instanceof HTMLElement ? event.currentTarget : triggerDOMRef.value;

  if (!eventTarget) return;

  openAtElement(eventTarget, event);
};

const keydownHandler = (event: KeyboardEvent) => {
  if (props.disabled || (event.key !== 'ContextMenu' && !(event.shiftKey && event.key === 'F10'))) return;

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
    if (open) window.addEventListener('scroll', scrollHandler, { passive: true, capture: true });
    else window.removeEventListener('scroll', scrollHandler, true);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') window.removeEventListener('scroll', scrollHandler, true);
});

defineExpose({ close });
</script>

<template>
  <div
    ref="triggerDOMRef"
    class="nmorph-context-menu"
    @click="clickHandler"
    @contextmenu="contextMenuHandler"
    @keydown="keydownHandler"
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
      content-class="nmorph-context-menu__dropdown"
      @on-outside-click="outsideClickHandler"
      @on-escape-keydown="escapeHandler"
    >
      <div v-if="hasOptions" class="nmorph-context-menu__options">
        <template v-for="(option, index) in normalizedOptions" :key="option.key">
          <button
            v-if="!option.component"
            type="button"
            class="nmorph-context-menu__item"
            role="menuitem"
            :disabled="option.disabled"
            :style="getOptionStyle(option)"
            @click="optionClickHandler(option, index)"
          >
            <span class="nmorph-context-menu__item-label">{{ option.label }}</span>
          </button>
          <div
            v-else
            class="nmorph-context-menu__item"
            :class="{ 'nmorph-context-menu__item--disabled': option.disabled }"
            role="menuitem"
            :tabindex="option.disabled ? -1 : 0"
            :aria-disabled="option.disabled"
            :style="getOptionStyle(option)"
            @click="optionClickHandler(option, index)"
            @keydown="optionKeydownHandler($event, option, index)"
          >
            <component :is="option.component" v-bind="option.componentProps" />
          </div>
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

.nmorph-context-menu__item-label {
  color: var(--nmorph-context-menu-item-color, var(--nmorph-text-color));
  text-align: left;
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
