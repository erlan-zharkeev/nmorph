<script setup lang="ts" generic="TTagItem extends INmorphTagItemProps = INmorphTagItemProps">
import { useModifiers } from '@/utils';
import { computed, shallowRef, watch } from 'vue';

import { NmorphTagItem } from '@/components';
import type {
  INmorphTagItemProps,
  INmorphTagListEmit,
  INmorphTagListProps,
  INmorphTagListSlots,
  NmorphTagListSlotItem,
} from './types';

const props = withDefaults(defineProps<INmorphTagListProps<TTagItem>>(), {
  design: 'nmorph',
});

const emit = defineEmits<INmorphTagListEmit<TTagItem>>();
defineSlots<INmorphTagListSlots<TTagItem>>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-list': [props.design],
  })
);

const tagList = shallowRef<TTagItem[]>(props.modelValue);

const getResolvedTagItem = (tagData: TTagItem): NmorphTagListSlotItem<TTagItem> => ({
  ...tagData,
  design: tagData.design ?? props.design,
  color: tagData.color ?? props.color,
});

const resolvedTagList = computed(() =>
  tagList.value.map((tagData) => {
    const item = getResolvedTagItem(tagData);

    return {
      item,
      tagItemProps: {
        value: tagData.value,
        text: tagData.text,
        removable: tagData.removable,
        height: tagData.height,
        design: item.design,
        color: item.color,
      },
    };
  })
);

watch(
  () => props.modelValue,
  (modelValue) => {
    tagList.value = modelValue;
  }
);

const closeTagHandler = (value: string) => {
  tagList.value = tagList.value.filter((tagData) => tagData.value !== value);
  emit('close', value);
  emit('update:model-value', tagList.value);
};

const clickTagHandler = (value: string) => {
  emit('click', value);
  emit('update:selected-value', value);
  emit('update:selectedValue', value);
};
</script>

<template>
  <div :class="modifiers">
    <template v-for="tagData in resolvedTagList" :key="tagData.item.value">
      <NmorphTagItem v-if="$slots.item" v-bind="tagData.tagItemProps" @click="clickTagHandler" @close="closeTagHandler">
        <slot name="item" :item="tagData.item" />
      </NmorphTagItem>
      <NmorphTagItem v-else v-bind="tagData.tagItemProps" @click="clickTagHandler" @close="closeTagHandler" />
    </template>
  </div>
</template>

<style lang="scss">
.nmorph-list--common {
  .nmorph-tag-item--common {
    border: none;
  }
}
</style>
