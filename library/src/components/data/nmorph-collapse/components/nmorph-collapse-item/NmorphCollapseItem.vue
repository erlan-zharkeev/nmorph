<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from 'vue';
import { useModifiers, nmorphOutset, nmorphInset, disabled } from '@/utils';
import {
  INmorphCollapseItemProps,
  NmorphCollapseDataInjectionType,
  NmorphCollapseUpdateModelInjectionType,
} from '@/components';
import { NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { styled, css } from '@vue-styled-components/core';

interface INmorphProps extends INmorphCollapseItemProps {
  height?: keyof typeof NmorphComponentHeight;
  block?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'default',
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

const commonCSS = css`
  --transition-speed: 0.2s;

  margin-bottom: var(--indentation-03);

  .nmorph-collapse-item__title {
    display: flex;
    align-items: center;
    padding: var(--indentation-02);
    border-radius: var(--default-border-radius);
    ${nmorphOutset()};
  }

  .nmorph-collapse-item__content {
    box-sizing: content-box;
    overflow: hidden;
    border-radius: var(--default-border-radius);
    transition: height var(--transition-speed) ease-in-out;
    ${nmorphInset()};
  }

  .nmorph-collapse-item__inner-wrapper {
    padding: var(--indentation-03);
  }

  &.nmorph-collapse-item--disabled {
    ${disabled()};
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent :class="modifiers" @click.stop="clickHandler">
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
  </StyledComponent>
</template>
