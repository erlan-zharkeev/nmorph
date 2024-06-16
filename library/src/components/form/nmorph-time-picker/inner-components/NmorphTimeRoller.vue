<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed, ref } from 'vue';
import { NmorphScroll } from '@/components';

interface INmorphProps {
  selectedValue?: number;
  values: number[];
  stepHeight: number;
  setValueOnMount?: boolean;
  disabledRange?: [number, number] | null;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  selectedValue: 0,
  values: () => [],
  setValueOnMount: false,
  disabledRange: null,
});
interface INmorphEmit {
  (e: 'value-changed', val: number): void;
}
const emit = defineEmits<INmorphEmit>();
const modifiers = computed(() =>
  useModifiers({
    'nmorph-time-roller': [],
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
const setValueToCenter = () => {
  const selectedValue = Math.round(coords.value.y / props.stepHeight);
  emit('value-changed', selectedValue);
  coords.value.y = Math.round(coords.value.y / props.stepHeight) * props.stepHeight;
};

const isValueDisabled = (val: number) =>
  props.disabledRange && val >= props.disabledRange[0] && val <= props.disabledRange[1];

const findClosestNumber = (candidate: number) => {
  return (
    props.disabledRange?.reduce((prev, curr) =>
      Math.abs(curr - candidate) < Math.abs(prev - candidate) ? curr + 1 : prev - 1
    ) ?? candidate
  );
};

const timeElClick = (value: string | number) => {
  let newVal = Number(value);
  if (isValueDisabled(newVal)) {
    newVal = findClosestNumber(newVal);
  }
  emit('value-changed', newVal);
  coords.value.y = newVal * props.stepHeight;
};

if (props.setValueOnMount) timeElClick(props.selectedValue);
const cellHeight = computed(() => `${props.stepHeight}px`);
</script>

<template>
  <div :class="modifiers">
    <NmorphScroll v-model="coords" @on-scroll-end="setValueToCenter">
      <div
        v-for="timeVal in transformedValues"
        :key="timeVal"
        class="nmorph-time-roller__value"
        :class="[
          { 'nmorph-time-roller__value--invisible': timeVal === '-' },
          { 'nmorph-time-roller__value--selected-value': props.selectedValue === timeVal },
          { 'nmorph-time-roller__value--disabled-value': isValueDisabled(timeVal) },
        ]"
        @click="timeElClick(timeVal)"
      >
        {{ timeVal }}
      </div>
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.nmorph-time-roller {
  --hover-bg: var(--accent-color-00);
  --hover-color: var(--text-color-00);

  width: 100%;
  margin-left: 2px;

  .nmorph-scroll {
    --padding-right: 8px;

    height: 140px;
  }

  .nmorph-time-roller__value {
    display: flex;
    align-items: center;
    justify-content: center;
    height: v-bind(cellHeight);
    border-radius: var(--default-border-radius);
  }

  .nmorph-time-roller__value:hover {
    color: var(--hover-color);
    background: var(--hover-bg);
    cursor: pointer;
  }

  .nmorph-time-roller__value--invisible {
    cursor: default;
    opacity: 0;
  }

  .nmorph-time-roller__value.nmorph-time-roller__value--disabled-value {
    @include disabled;
  }

  .nmorph-time-roller__value--disabled-value:hover {
    background: transparent;
    color: var(--accent-color-00);
  }
}
</style>
