<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphButton, NmorphIcon } from '@/components';
import { NmorphSortOrderType } from '@/types/common';

interface IProps {
  value: NmorphSortOrderType;
}
const props = withDefaults(defineProps<IProps>(), {});
interface IEmit {
  (e: 'sort', val: NmorphSortOrderType): void;
}
const emit = defineEmits<IEmit>();
interface IEmit {}

const modifiers = computed(() =>
  useModifiers({
    'nmorph-sort-button': [`${props.value}`],
  })
);

const toggleSort = () => {
  const value = props.value === 'ascending' ? 'descending' : 'ascending';
  emit('sort', value);
};
const iconSize = '10px';
</script>

<template>
  <div :class="modifiers">
    <NmorphButton height="thin" style-type="transparent" @click="toggleSort">
      <NmorphIcon name="triangle-down" class="nmorph-sort-button__icon-up" :width="iconSize" :height="iconSize" />
      <NmorphIcon name="triangle-down" class="nmorph-sort-button__icon-down" :width="iconSize" :height="iconSize" />
    </NmorphButton>
  </div>
</template>

<style lang="scss">
.nmorph-sort-button {
  display: flex;
  align-items: center;

  .nmorph-button__content {
    @include flex-full-center;
    flex-direction: column;
  }
  .nmorph-sort-button__icon-up {
    transform: rotate(180deg);
  }
  .nmorph-sort-button__icon-up,
  .nmorph-sort-button__icon-down {
    --color: var(--darker-color);
  }
  .nmorph-sort-button__icon-up {
    margin-bottom: -1px;
  }
  .nmorph-sort-button__icon-down {
    margin-top: -1px;
  }
}
.nmorph-sort-button--ascending {
  .nmorph-sort-button__icon-up {
    --color: var(--accent-color-01);
  }
}
.nmorph-sort-button--descending {
  .nmorph-sort-button__icon-down {
    --color: var(--accent-color-01);
  }
}
</style>
