<script setup lang="ts">
import { Ref, computed, inject, onMounted, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphCollapseItemProps, NmorphCollapseModel } from '../../types';
import { NmorphComponentHeight, NmorphDomElement } from '@/types/common';

interface IProps extends NmorphCollapseItemProps {
  height?: keyof typeof NmorphComponentHeight;
}
const props = withDefaults(defineProps<IProps>(), {
  height: 'default',
  title: '',
  disabled: false,
});

interface IEmit {
  (e: 'click-item', data: { id: string; isOpen: boolean }): void;
}
const emit = defineEmits<IEmit>();

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

const collapseData = inject<Ref<NmorphCollapseModel>>('collapse-data');
const updateModel = inject<(id: string, value: boolean) => void>('update-model');

const collapseItemDOMElContent = ref<NmorphDomElement>(null);

const contentHeight = ref(0);

const clickHandler = () => {
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
      <div ref="collapseItemDOMElContent" class="nmorph-collapse-item__inner-wrapper"><slot /></div>
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
    border-radius: var(--default-border-radius);
    @include nmorph-outset;
  }

  .nmorph-collapse-item__content {
    overflow: hidden;
    transition: height var(--transition-speed) ease-in-out;
    border-radius: var(--default-border-radius);
    box-sizing: content-box;
    @include nmorph-inset;
  }
}

.nmorph-collapse-item__inner-wrapper {
  padding: var(--indentation-03);
}

.nmorph-collapse-item--disabled {
  @include disabled;
}
</style>
