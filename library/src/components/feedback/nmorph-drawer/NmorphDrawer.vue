<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { NmorphIcon, NmorphIconCross, NmorphOverlay } from '@/components';
import { createCssSizeVariables, useModifiers } from '@/utils';
import type { INmorphDrawerEmit, INmorphDrawerProps } from './types';

const props = withDefaults(defineProps<INmorphDrawerProps>(), {
  modelValue: false,
  title: '',
  placement: 'right',
  size: '360px',
  showClose: true,
  closeOnOverlay: true,
  closeOnEscape: true,
  zIndex: undefined,
  teleportTo: 'body',
  disabledTeleport: false,
  contentClass: '',
});

const emit = defineEmits<INmorphDrawerEmit>();
const slots = useSlots();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-drawer': [props.placement, props.modelValue && 'open'],
  })
);

const drawerStyle = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-drawer-size': props.size,
  })
);

const closeHandler = () => {
  emit('on-close');
  emit('update:model-value', false);
};

const overlayClickHandler = () => {
  if (!props.closeOnOverlay) return;
  closeHandler();
};

const hasHeader = computed(() => Boolean(slots.header || props.title || props.showClose));
</script>

<template>
  <NmorphOverlay
    :show="props.modelValue"
    :z-index="props.zIndex"
    :teleport-to="props.teleportTo"
    :disabled-teleport="props.disabledTeleport"
    :close-on-escape="props.closeOnEscape"
    trap-focus
    @on-outside-click="overlayClickHandler"
    @on-escape-keydown="closeHandler"
  >
    <aside
      :class="modifiers"
      :style="drawerStyle"
      role="dialog"
      aria-modal="true"
      :aria-label="props.title || undefined"
    >
      <div v-if="hasHeader" class="nmorph-drawer__header">
        <slot name="header">
          <div class="nmorph-drawer__title">{{ props.title }}</div>
          <button
            v-if="props.showClose"
            class="nmorph-drawer__close"
            type="button"
            :aria-label="props.title ? `Close ${props.title}` : 'Close drawer'"
            @click="closeHandler"
          >
            <NmorphIcon>
              <NmorphIconCross />
            </NmorphIcon>
          </button>
        </slot>
      </div>
      <div :class="['nmorph-drawer__content', props.contentClass]">
        <slot />
      </div>
      <div v-if="slots.footer" class="nmorph-drawer__footer">
        <slot name="footer" />
      </div>
    </aside>
  </NmorphOverlay>
</template>

<style lang="scss">
.nmorph-drawer {
  position: fixed;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  color: var(--nmorph-text-color);
  background: var(--nmorph-main-color);
  box-shadow: var(--nmorph-shadow-outset);
  transition: transform var(--transition-02) ease;

  &--left,
  &--right {
    top: 0;
    width: min(var(--nmorph-drawer-size), 100vw);
    height: 100vh;
  }

  &--top,
  &--bottom {
    left: 0;
    width: 100vw;
    height: min(var(--nmorph-drawer-size), 100vh);
  }

  &--left {
    left: 0;
    transform: translateX(-110%);
  }

  &--right {
    right: 0;
    transform: translateX(110%);
  }

  &--top {
    top: 0;
    transform: translateY(-110%);
  }

  &--bottom {
    bottom: 0;
    transform: translateY(110%);
  }

  &--open {
    transform: translate(0, 0);
  }

  .nmorph-drawer__header,
  .nmorph-drawer__footer {
    flex: 0 0 auto;
    box-sizing: border-box;
    padding: var(--indentation-04);
  }

  .nmorph-drawer__header {
    display: flex;
    gap: var(--indentation-03);
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: var(--font-size-large);
    line-height: var(--line-height-loose);
  }

  .nmorph-drawer__title {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-drawer__close {
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

  .nmorph-drawer__content {
    flex: 1 1 auto;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    padding: 0 var(--indentation-04) var(--indentation-04);
    overflow: hidden auto;
  }
}
</style>
