<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed, ref } from 'vue';
import { INmorphTagItemProps } from './types';
import { NmorphTagItem } from '@/components';

interface INmorphProps {
  modelValue: INmorphTagItemProps[];
}

const props = withDefaults(defineProps<INmorphProps>(), {});

interface INmorphEmit {
  (e: 'close', val: string): void;
  (e: 'update:model-value', val: INmorphTagItemProps[]): void;
}

const emit = defineEmits<INmorphEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-list': [],
  })
);

let tagList = ref(props.modelValue);

const closeTagHandler = (value: string) => {
  tagList.value = tagList.value.filter((tagData) => tagData.value !== value);
  emit('close', value);
  emit('update:model-value', tagList.value);
};
</script>

<template>
  <div :class="modifiers">
    <NmorphTagItem v-for="tagData in tagList" :key="tagData.value" v-bind="tagData" @close="closeTagHandler" />
  </div>
</template>
