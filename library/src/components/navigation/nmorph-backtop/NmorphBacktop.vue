<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphButton, NmorphIcon, NmorphIconChevronDown } from '@/components';
import { NmorphDomElementType, NmorphElementDesignType } from '@/types';
import { onMounted } from 'vue';

interface INmorphProps {
  right?: number;
  bottom?: number;
  visibilityHeight?: number;
  design?: NmorphElementDesignType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  right: 40,
  bottom: 40,
  visibilityHeight: 200,
  design: 'nmorph',
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

const container = ref<NmorphDomElementType>(null);
const selfDOMEl = ref<NmorphDomElementType>(null);
const showButton = ref(false);

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
  if (!selfDOMEl.value) return;
  container.value = selfDOMEl.value.parentElement?.parentElement;
  container.value?.addEventListener('scroll', scrollHandler);
});

onUnmounted(() => {
  if (!container.value) return;
  container.value?.removeEventListener('scroll', scrollHandler);
});
</script>

<template>
  <div :style="{ '--nmorph-backtop-right': `${props.right}px`, '--nmorph-backtop-bottom': `${props.bottom}px` }">
    <div ref="selfDOMEl" :class="modifiers">
      <div @click.stop="scrollToTopHandler">
        <slot>
          <NmorphButton :style-type="props.design === 'nmorph' ? 'default' : 'transparent'">
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
  </div>
</template>

<style lang="scss">
.nmorph-backtop {
  position: fixed;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  .nmorph-backtop__up-icon {
    transform: rotate(180deg);
  }

  &.nmorph-backtop--show {
    opacity: 1;
  }

  &.nmorph-backtop--common {
    .nmorph-button {
      background: var(--nmorph-overlay-color);
      border-radius: 4px;
    }
  }
}

.nmorph-backtop {
  right: var(--nmorph-backtop-right);
  bottom: var(--nmorph-backtop-bottom);
}
</style>
