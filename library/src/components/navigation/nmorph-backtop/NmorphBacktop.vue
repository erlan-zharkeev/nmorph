<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphButton, NmorphIcon, NmorphIconChevronDown } from '@/components';
import { NmorphDomElementType, NmorphElementDesignType } from '@/types';

interface INmorphProps {
  right?: number;
  bottom?: number;
  visibilityHeight?: number;
  design?: NmorphElementDesignType;
  zIndex?: number;
  teleportTo?: string;
  teleportDisabled?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  right: 40,
  bottom: 40,
  visibilityHeight: 200,
  design: 'nmorph',
  zIndex: 10,
  teleportTo: 'body',
  teleportDisabled: false,
});

interface INmorphEmit {
  (e: 'click'): void;
}
const emit = defineEmits<INmorphEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-backtop': [`${showButton.value && 'show'}`, props.design],
  })
);

const styles = computed(() => ({
  '--nmorph-backtop-right': `${props.right}px`,
  '--nmorph-backtop-bottom': `${props.bottom}px`,
  '--nmorph-backtop-z-index': props.zIndex,
}));

const container = ref<NmorphDomElementType>(null);
const placeholderDOMEl = ref<NmorphDomElementType>(null);
const selfDOMEl = ref<NmorphDomElementType>(null);
const showButton = ref(false);
const isMounted = ref(false);

const scrollHandler = (event: Event) => {
  if (!event) return;
  const target = event.target as HTMLElement;
  showButton.value = target.scrollTop > props.visibilityHeight;
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
  container.value = placeholderDOMEl.value?.parentElement ?? selfDOMEl.value?.parentElement?.parentElement ?? null;
  container.value?.addEventListener('scroll', scrollHandler);
  showButton.value = (container.value?.scrollTop ?? 0) > props.visibilityHeight;
  isMounted.value = true;
});

onUnmounted(() => {
  if (!container.value) return;
  container.value?.removeEventListener('scroll', scrollHandler);
});
</script>

<template>
  <div ref="placeholderDOMEl">
    <Teleport :to="props.teleportTo" :disabled="!isMounted || props.teleportDisabled">
      <div ref="selfDOMEl" :class="modifiers" :style="styles">
        <div @click.stop="scrollToTopHandler">
          <slot>
            <NmorphButton :style-type="props.design === 'nmorph' ? 'default' : 'transparent'">
              <NmorphIcon
                class="nmorph-backtop__up-icon"
                :color="props.design === 'nmorph' ? undefined : 'var(--nmorph-contrast-text-color)'"
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
  right: var(--nmorph-backtop-right);
  bottom: calc(var(--nmorph-backtop-bottom) + env(safe-area-inset-bottom, 0px));
  z-index: var(--nmorph-backtop-z-index);
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

  &.nmorph-backtop--common {
    .nmorph-button {
      background: var(--nmorph-overlay-color);
      border-radius: 4px;
    }
  }
}
</style>
