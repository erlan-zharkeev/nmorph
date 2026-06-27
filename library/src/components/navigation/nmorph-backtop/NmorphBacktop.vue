<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphButton, NmorphIcon, NmorphIconChevronDown } from '@/components';
import { NmorphDomElementType } from '@/types';
import type { INmorphBacktopEmit, INmorphBacktopProps, NmorphBacktopScrollContainer } from './types';

const props = withDefaults(defineProps<INmorphBacktopProps>(), {
  right: 40,
  bottom: 40,
  visibilityHeight: 200,
  design: 'nmorph',
  zIndex: 10,
  teleportTo: 'body',
  teleportDisabled: false,
});

const emit = defineEmits<INmorphBacktopEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-backtop': [showButton.value && 'show', props.design],
  })
);

const styles = computed(() => ({
  '--nmorph-private-backtop-right': `${props.right}px`,
  '--nmorph-private-backtop-bottom': `${props.bottom}px`,
  '--nmorph-private-backtop-z-index': props.zIndex,
}));

const isWindow = (value: NmorphBacktopScrollContainer): value is Window => value === window;

const getScrollTop = (target: NmorphBacktopScrollContainer) => {
  if (!isWindow(target)) return target.scrollTop;

  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

const findScrollableAncestor = (element: HTMLElement | null): NmorphBacktopScrollContainer => {
  let currentElement = element?.parentElement ?? null;

  while (currentElement) {
    const elementStyles = window.getComputedStyle(currentElement);
    const overflowY = elementStyles.overflowY || elementStyles.overflow;
    const canScroll = ['auto', 'scroll', 'overlay'].includes(overflowY);

    if (canScroll && currentElement.scrollHeight > currentElement.clientHeight) return currentElement;
    currentElement = currentElement.parentElement;
  }

  return window;
};

const container = ref<NmorphBacktopScrollContainer | null>(null);
const placeholderDOMEl = ref<NmorphDomElementType>(null);
const selfDOMEl = ref<NmorphDomElementType>(null);
const showButton = ref(false);
const isMounted = ref(false);

const updateVisibility = () => {
  if (!container.value) {
    showButton.value = false;
    return;
  }

  showButton.value = getScrollTop(container.value) > props.visibilityHeight;
};

const scrollToTopHandler = () => {
  emit('click');
  if (!container.value) return;
  container.value.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  container.value = findScrollableAncestor(placeholderDOMEl.value ?? selfDOMEl.value);
  container.value.addEventListener('scroll', updateVisibility);
  updateVisibility();
  isMounted.value = true;
});

onUnmounted(() => {
  if (!container.value) return;
  container.value.removeEventListener('scroll', updateVisibility);
});
</script>

<template>
  <div ref="placeholderDOMEl">
    <Teleport :to="props.teleportTo" :disabled="!isMounted || props.teleportDisabled">
      <div ref="selfDOMEl" :class="modifiers" :style="styles">
        <div @click.stop="scrollToTopHandler">
          <slot>
            <NmorphButton :design="props.design" :borderless="props.design === 'plain'">
              <NmorphIcon
                class="nmorph-backtop__up-icon"
                :color="props.design === 'nmorph' ? undefined : 'var(--nmorph-white-color)'"
              >
                <NmorphIconChevronDown />
              </NmorphIcon>
            </NmorphButton>
          </slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss">
.nmorph-backtop {
  position: fixed;
  right: var(--nmorph-private-backtop-right);
  bottom: calc(var(--nmorph-private-backtop-bottom) + env(safe-area-inset-bottom, 0px));
  z-index: var(--nmorph-private-backtop-z-index);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;

  .nmorph-backtop__up-icon {
    transform: rotate(180deg);
  }

  &.nmorph-backtop--show {
    opacity: 1;
    pointer-events: auto;
  }

  &.nmorph-backtop--plain {
    .nmorph-button {
      --nmorph-private-button-plain-color: var(--nmorph-white-color);
      --nmorph-private-icon-color: var(--nmorph-white-color);

      background: var(--nmorph-overlay-color);
      border-radius: 4px;
    }

    .nmorph-button.nmorph-button--plain .nmorph-button__content,
    .nmorph-button.nmorph-button--plain .nmorph-button__content:not(:disabled, [loading='true']):hover {
      color: var(--nmorph-white-color);
      border: 0;
    }

    .nmorph-button.nmorph-button--plain .nmorph-button__content span,
    .nmorph-button.nmorph-button--plain .nmorph-button__content:not(:disabled, [loading='true']):hover span,
    .nmorph-button.nmorph-button--plain .nmorph-button__content .nmorph-icon,
    .nmorph-button.nmorph-button--plain .nmorph-button__content:not(:disabled, [loading='true']):hover .nmorph-icon {
      color: var(--nmorph-white-color);

      --nmorph-private-icon-color: var(--nmorph-white-color);
    }
  }
}
</style>
