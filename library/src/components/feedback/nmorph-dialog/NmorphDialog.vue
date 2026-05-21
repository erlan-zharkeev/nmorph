<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphOverlay, NmorphIcon, NmorphIconCross } from '@/components';

interface INmorphProps {
  modelValue?: boolean;
  title?: string;
  width?: string;
  maxHeight?: string;
  openDelay?: number;
  closeDelay?: number;
  /**
   * @deprecated Use `closeOnOverlay` instead.
   */
  closeOnClickModal?: boolean;
  showClose?: boolean;
  zIndex?: number;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
}
const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: false,
  title: '',
  width: '330px',
  maxHeight: undefined,
  openDelay: 0,
  closeDelay: 0,
  closeOnClickModal: true,
  showClose: true,
  zIndex: undefined,
  closeOnOverlay: true,
  closeOnEscape: true,
});

interface INmorphEmit {
  (e: 'on-close'): void;
  (e: 'update:model-value', value: boolean): void;
}
const emit = defineEmits<INmorphEmit>();
const slots = useSlots();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-dialog': [],
  })
);

const dialogStyle = computed<CSSProperties>(() => ({
  '--nmorph-dialog-width': props.width,
  ...(props.maxHeight && { '--nmorph-dialog-max-height': props.maxHeight }),
}));
const hasHeader = computed(() => Boolean(slots.header || props.title || props.showClose));
const shouldCloseOnOverlay = computed(() => props.closeOnOverlay && props.closeOnClickModal);

const isVisible = ref(props.modelValue);

let openTimeout: ReturnType<typeof setTimeout> | null = null;
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      if (closeTimeout) clearTimeout(closeTimeout);
      openTimeout = setTimeout(() => {
        isVisible.value = true;
      }, props.openDelay);
    } else {
      if (openTimeout) clearTimeout(openTimeout);
      closeTimeout = setTimeout(() => {
        isVisible.value = false;
      }, props.closeDelay);
    }
  },
  { immediate: true }
);

const closeHandler = () => {
  emit('on-close');
  if (openTimeout) clearTimeout(openTimeout);
  const emitClose = () => {
    emit('update:model-value', false);
  };

  if (props.closeDelay <= 0) {
    emitClose();
  } else {
    closeTimeout = setTimeout(emitClose, props.closeDelay);
  }
};

const overlayClickHandler = () => {
  if (!shouldCloseOnOverlay.value) return;
  closeHandler();
};
</script>

<template>
  <NmorphOverlay
    :show="isVisible"
    :z-index="props.zIndex"
    :close-on-escape="props.closeOnEscape"
    trap-focus
    @on-outside-click="overlayClickHandler"
    @on-escape-keydown="closeHandler"
  >
    <div :class="modifiers" :style="dialogStyle" role="dialog" aria-modal="true" :aria-label="props.title || undefined">
      <div v-if="hasHeader" class="nmorph-dialog__header">
        <slot name="header">
          <div class="nmorph-dialog__title">{{ props.title }}</div>
          <button
            v-if="props.showClose"
            class="nmorph-dialog__close-icon"
            type="button"
            :aria-label="props.title ? `Close ${props.title}` : 'Close dialog'"
            @click="closeHandler"
          >
            <NmorphIcon>
              <NmorphIconCross />
            </NmorphIcon>
          </button>
        </slot>
      </div>
      <div class="nmorph-dialog__content">
        <slot />
      </div>
    </div>
  </NmorphOverlay>
</template>

<style lang="scss">
.nmorph-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: var(--width);
  max-width: var(--nmorph-dialog-max-width, calc(100vw - 32px));
  max-height: var(--nmorph-dialog-max-height, var(--nmorph-dialog-default-max-height));
  padding: var(--indentation-03);
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  transform: translate(-50%, -50%);

  --width: var(--nmorph-dialog-width);
  --nmorph-dialog-default-max-height: calc(100vh - 32px);

  @supports (height: 100dvh) {
    --nmorph-dialog-default-max-height: calc(100dvh - 32px);
  }

  .nmorph-dialog__header {
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: var(--indentation-02);
    font-weight: 600;
    font-size: var(--font-size-large);
    line-height: var(--line-height-loose);
  }

  .nmorph-dialog__close-icon {
    display: inline-flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    padding: 0;
    color: inherit;
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .nmorph-dialog__content {
    flex: 1 1 auto;
    box-sizing: border-box;
    min-height: 0;
    padding: var(--indentation-02);
    overflow: hidden auto;
  }
}
</style>
