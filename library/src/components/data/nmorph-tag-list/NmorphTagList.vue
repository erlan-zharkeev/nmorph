<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed, ref } from 'vue';

import { NmorphTagItem } from '@/components';
import type { INmorphTagListEmit, INmorphTagListProps } from './types';

const props = withDefaults(defineProps<INmorphTagListProps>(), {
  design: 'nmorph',
});

const emit = defineEmits<INmorphTagListEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-list': [],
  })
);

let tagList = ref(props.modelValue);
const resolvedTagList = computed(() =>
  tagList.value.map((tagData) => ({
    ...tagData,
    design: tagData.design ?? props.design,
  }))
);

const closeTagHandler = (value: string) => {
  tagList.value = tagList.value.filter((tagData) => tagData.value !== value);
  emit('close', value);
  emit('update:model-value', tagList.value);
};
</script>

<template>
  <div :class="modifiers">
    <NmorphTagItem v-for="tagData in resolvedTagList" :key="tagData.value" v-bind="tagData" @close="closeTagHandler" />
  </div>
</template>
