<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphButton, NmorphIcon } from '@/components';
import { NmorphDomElementType } from '@/types';
import { onMounted } from 'vue';

interface INmorphProps {
  right?: number;
  bottom?: number;
  visibilityHeight?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  right: 40,
  bottom: 40,
  visibilityHeight: 200,
});

interface INmorphEmit {
  (e: 'click'): void;
}
const emit = defineEmits<INmorphEmit>();

const offsetRight = computed(() => `${props.right}px`);
const offsetBottom = computed(() => `${props.bottom}px`);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-backtop': [`${showButton.value && 'show'}`],
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
  container.value = selfDOMEl.value.parentElement;
  container.value?.addEventListener('scroll', scrollHandler);
});

onUnmounted(() => {
  if (!container.value) return;
  container.value?.removeEventListener('scroll', scrollHandler);
});
</script>

<template>
  <div ref="selfDOMEl" :class="modifiers">
    <div @click.stop="scrollToTopHandler">
      <slot>
        <NmorphButton>
          <NmorphIcon name="chevron-down" class="nmorph-backtop__up-icon" />
        </NmorphButton>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-backtop {
  position: fixed;
  right: v-bind(offsetRight);
  bottom: v-bind(offsetBottom);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  .nmorph-backtop__up-icon {
    transform: rotate(180deg);
  }
}

.nmorph-backtop--show {
  opacity: 1;
}
</style>
// TODO md/ make shure that scroll container have set relative value and height setted
