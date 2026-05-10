<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import {
  INmorphCollapseItemProps,
  NmorphCollapseDataInjectionType,
  NmorphCollapseUpdateModelInjectionType,
} from '@/components';
import { NmorphComponentHeight, NmorphDomElementType } from '@/types';

interface INmorphProps extends INmorphCollapseItemProps {
  height?: keyof typeof NmorphComponentHeight;
  block?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'basic',
  title: '',
  disabled: false,
  block: true,
});

interface INmorphEmit {
  (e: 'click-item', data: { id: string; isOpen: boolean }): void;
}
const emit = defineEmits<INmorphEmit>();

const isOpen = ref(false);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-collapse-item': [`${props.disabled && 'disabled'}`, `${isOpen.value && 'is-open'}`],
  })
);

const titleModifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
  })
);

const collapseData = inject<NmorphCollapseDataInjectionType>('collapse-data');
const updateModel = inject<NmorphCollapseUpdateModelInjectionType>('update-model');

const collapseItemDOMElContent = ref<NmorphDomElementType>(null);

const contentHeight = ref(0);

const clickHandler = () => {
  if (props.block) return;
  isOpen.value = !isOpen.value;
  if (!updateModel) return;
  updateModel(props.name, isOpen.value);
  emit('click-item', { id: props.name, isOpen: isOpen.value });
};

onMounted(() => {
  if (Array.isArray(collapseData?.value)) {
    isOpen.value = collapseData.value.includes(props.name);
  } else {
    isOpen.value = collapseData?.value === props.name;
  }
});

watch(
  () => collapseData?.value,
  (newValue) => {
    if (Array.isArray(newValue)) {
      isOpen.value = newValue.includes(props.name);
    } else {
      isOpen.value = newValue === props.name;
    }
  },
  { deep: true }
);

watch(isOpen, () => {
  contentHeight.value =
    isOpen.value && collapseItemDOMElContent.value ? collapseItemDOMElContent.value?.clientHeight : 0;
});
</script>

<template>
  <div :class="modifiers" @click.stop="clickHandler">
    <div class="nmorph-collapse-item__title" :class="titleModifiers">
      <slot name="title">
        {{ props.title }}
      </slot>
    </div>
    <div class="nmorph-collapse-item__content" :style="{ height: `${contentHeight}px` }">
      <div ref="collapseItemDOMElContent" class="nmorph-collapse-item__inner-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-collapse-item {
  --transition-speed: 0.2s;

  margin-bottom: var(--indentation-03);

  .nmorph-collapse-item__title {
    display: flex;
    align-items: center;
    padding: var(--indentation-02);
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-collapse-item__content {
    box-sizing: content-box;
    overflow: hidden;
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
    transition: height var(--transition-speed) ease-in-out;
  }

  .nmorph-collapse-item__inner-wrapper {
    padding: var(--indentation-03);
  }

  &.nmorph-collapse-item--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
