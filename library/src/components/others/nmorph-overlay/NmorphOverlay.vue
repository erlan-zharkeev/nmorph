<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useZIndex } from '@/hooks';

interface INmorphProps {
  show: boolean;
  transparent?: boolean;
  zIndex?: number;
  teleportTo?: string | HTMLElement;
  disabledTeleport?: boolean;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  transparent: false,
  zIndex: undefined,
  teleportTo: 'body',
  disabledTeleport: false,
  closeOnEscape: true,
  trapFocus: false,
  restoreFocus: true,
});

const zIndex = useZIndex(
  computed(() => props.show),
  () => props.zIndex
);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-overlay': [`${props.show && 'show'}`, `${props.transparent && 'transparent'}`],
  })
);
const renderInline = computed(() => props.disabledTeleport || !props.show || typeof document === 'undefined');

const clickHandler = () => {
  emit('on-outside-click');
};

interface INmorphEmit {
  (e: 'on-outside-click'): void;
  (e: 'on-escape-keydown'): void;
}

const emit = defineEmits<INmorphEmit>();

const contentRef = ref<HTMLElement | null>(null);
let previousActiveElement: HTMLElement | null = null;
const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const getFocusableElements = () => {
  if (!contentRef.value) return [];
  return Array.from(contentRef.value.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => element.getAttribute('aria-hidden') !== 'true'
  );
};

const focusContent = async () => {
  if (!props.trapFocus) return;
  await nextTick();
  const focusableElements = getFocusableElements();
  const target = focusableElements[0] || contentRef.value;
  target?.focus();
};

const keydownHandler = (event: KeyboardEvent) => {
  if (!props.show) return;

  if (event.key === 'Escape' && props.closeOnEscape) {
    event.preventDefault();
    emit('on-escape-keydown');
    return;
  }

  if (event.key !== 'Tab' || !props.trapFocus) return;

  const focusableElements = getFocusableElements();
  if (!focusableElements.length) {
    event.preventDefault();
    contentRef.value?.focus();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
};

const addKeydownListener = () => {
  if (typeof document === 'undefined') return;
  document.addEventListener('keydown', keydownHandler);
};

const removeKeydownListener = () => {
  if (typeof document === 'undefined') return;
  document.removeEventListener('keydown', keydownHandler);
};

watch(
  () => props.show,
  (show) => {
    if (typeof document === 'undefined') return;
    if (show) {
      previousActiveElement = document.activeElement as HTMLElement | null;
      addKeydownListener();
      focusContent();
    } else {
      removeKeydownListener();
      if (props.restoreFocus) previousActiveElement?.focus?.();
      previousActiveElement = null;
    }
  },
  { immediate: true, flush: 'post' }
);

onBeforeUnmount(removeKeydownListener);
</script>

<template>
  <div v-if="renderInline" :class="modifiers" :style="{ '--nmorph-overlay-z-index': zIndex }" @click.stop="clickHandler">
    <div ref="contentRef" class="nmorph-overlay__slot" :tabindex="props.trapFocus ? -1 : undefined" @click.stop>
      <slot />
    </div>
  </div>
  <Teleport v-else :to="props.teleportTo">
    <div :class="modifiers" :style="{ '--nmorph-overlay-z-index': zIndex }" @click.stop="clickHandler">
      <div ref="contentRef" class="nmorph-overlay__slot" :tabindex="props.trapFocus ? -1 : undefined" @click.stop>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.nmorph-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--nmorph-overlay-z-index);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--nmorph-overlay-color);
  opacity: 0;
  transition: ease-in-out var(--transition-02) opacity;
  pointer-events: none;

  &.nmorph-overlay--transparent {
    background: transparent;
  }

  &.nmorph-overlay--show {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
