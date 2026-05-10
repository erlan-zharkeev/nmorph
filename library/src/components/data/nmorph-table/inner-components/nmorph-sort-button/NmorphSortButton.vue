<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphButton, NmorphIcon, NmorphIconTriangleDown } from '@/components';
import { NmorphSortOrderType } from '@/types';

interface INmorphProps {
  value: NmorphSortOrderType;
}
const props = withDefaults(defineProps<INmorphProps>(), {});
interface INmorphEmit {
  (e: 'sort', val: NmorphSortOrderType): void;
}
const emit = defineEmits<INmorphEmit>();
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
      <NmorphIcon class="nmorph-sort-button__icon-up" :width="iconSize" :height="iconSize">
        <NmorphIconTriangleDown />
      </NmorphIcon>
      <NmorphIcon class="nmorph-sort-button__icon-down" :width="iconSize" :height="iconSize">
        <NmorphIconTriangleDown />
      </NmorphIcon>
    </NmorphButton>
  </div>
</template>

<style lang="scss">
.nmorph-sort-button {
  display: flex;
  align-items: center;

  .nmorph-button__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .nmorph-sort-button__icon-up {
    margin-bottom: -1px;
    transform: rotate(180deg);
  }

  .nmorph-sort-button__icon-down {
    margin-top: -1px;
  }

  &.nmorph-sort-button--ascending {
    .nmorph-sort-button__icon-up {
      --color: var(--nmorph-accent-color);
    }
  }

  &.nmorph-sort-button--descending {
    .nmorph-sort-button__icon-down {
      --color: var(--nmorph-accent-color);
    }
  }
}
</style>
