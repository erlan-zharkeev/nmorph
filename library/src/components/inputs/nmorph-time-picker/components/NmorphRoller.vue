<script setup lang="ts">
import { getModifiers } from '@/utils';
import { computed, ref } from 'vue';
import { NmorphScroll } from '@/components';

interface IProps {
  selectedValue?: number;
  values: number[];
}

const props = withDefaults(defineProps<IProps>(), {
  selectedValue: 0,
  values: () => [],
});

interface IEmit {
  (e: 'value-changed', val: number): void;
}
const emit = defineEmits<IEmit>();

const modifiers = computed(() =>
  getModifiers({
    'nmorph-roller': [],
  })
);

const transformedValues = computed(() => {
  const emptyValues = Array(3).fill('-');
  const valuesWithPadding = emptyValues
    .concat(props.values.map((number) => number.toString().padStart(2, '0')))
    .concat(emptyValues);
  return valuesWithPadding;
});

const coords = ref({ x: 0, y: 0 });
const step = 20;

const setValueToCenter = () => {
  const selectedValue = Math.round(coords.value.y / step);
  emit('value-changed', selectedValue);
  coords.value.y = Math.round(coords.value.y / step) * step;
};
</script>

<template>
  <div :class="modifiers">
    <NmorphScroll v-model="coords" @on-scroll-end="setValueToCenter">
      <div
        v-for="value in transformedValues"
        :key="value"
        class="nmorph-roller__value"
        :class="[
          { 'nmorph-roller__value--invisible': value === '-' },
          { 'nmorph-roller__value--selected-value': props.selectedValue === value },
        ]"
      >
        {{ value }}
      </div>
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.nmorph-roller {
  --hover-bg: var(--accent-color-01);
  --hover-color: var(--text-00);

  width: 100%;
  margin-left: 2px;

  .nmorph-scroll {
    --padding-right: 8px;
    height: 140px;
  }

  .nmorph-roller__value {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--default-border-radius);
    height: var(--time-picker-value-height);
  }

  .nmorph-roller__value:hover {
    cursor: pointer;
    background-color: var(--hover-bg);
    color: var(--hover-color);
  }

  .nmorph-roller__value--invisible {
    opacity: 0;
    cursor: default;
  }
}
</style>
