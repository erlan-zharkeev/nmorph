<script setup lang="ts">
import { NmorphCommonInputProps, NmorphComponentHeight, NmorphDomElement } from '@/types/common';
import { getModifiers } from '@/utils';
import { Ref, computed, onMounted, ref } from 'vue';
import { Hour, MinuteSeconds, TimeTuple } from './types';
import NmorphRoller from './components/NmorphRoller.vue';
import { NmorphDropdown } from '@/components';
import { timePadNumber } from './utils';

interface IProps extends Omit<NmorphCommonInputProps, 'fill'> {
  modelValue?: TimeTuple;
  open?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: () => [23, 0, 0],
  open: false,
  disabled: false,
  height: 'default',
});

const emit = defineEmits<IEmit>();

interface IEmit {
  (e: 'inputDOMRef', val: Ref<NmorphDomElement>): void;
  (e: 'update:modelValue', val: TimeTuple): void;
}

const timepickerDOMRef = ref<NmorphDomElement>(null);
const inputDOMRef = ref<NmorphDomElement>(null);

const open = ref(props.open);

onMounted(() => {
  emit('inputDOMRef', inputDOMRef);
});

const clickHandler = () => {
  open.value = !open.value;
};

const modifiers = computed(() =>
  getModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-time-picker': [`${props.disabled && 'disabled'}`],
  })
);

const hours = Array.from({ length: 24 }, (_, index) => index);
const minutesSeconds = Array.from({ length: 60 }, (_, index) => index);

const hoursChangedHandler = (val: number) => {
  const currentValue = props.modelValue;
  const hour = val as Hour;
  emit('update:modelValue', [hour, currentValue[1], currentValue[2]]);
};

const minutesChangedHandler = (val: number) => {
  const currentValue = props.modelValue;
  const minutes = val as MinuteSeconds;
  emit('update:modelValue', [currentValue[0], minutes, currentValue[2]]);
};

const secondsChangedHandler = (val: number) => {
  const currentValue = props.modelValue;
  const seconds = val as MinuteSeconds;
  emit('update:modelValue', [currentValue[0], currentValue[1], seconds]);
};

const selectedTime = computed(() => timePadNumber(props.modelValue).join(':'));
</script>

<template>
  <div ref="timepickerDOMRef" :class="modifiers" @click="clickHandler">
    <div class="nmorph-time-picker__content">
      <div class="nmorph-time-picker__selected-time">
        <input ref="inputDOMRef" type="time" />
        <span>{{ selectedTime }}</span>
      </div>
      <NmorphDropdown v-if="timepickerDOMRef" :open="props.open" :relative-element="timepickerDOMRef">
        <div class="nmorph-time-picker__dropdown">
          <NmorphRoller :values="hours" @value-changed="hoursChangedHandler" />
          <NmorphRoller :values="minutesSeconds" @value-changed="minutesChangedHandler" />
          <NmorphRoller :values="minutesSeconds" @value-changed="secondsChangedHandler" />
        </div>
      </NmorphDropdown>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-time-picker {
  width: 160px;
  --time-picker-value-height: 20px;

  .nmorph-time-picker__content {
    @include nmorph-outset;
    border-radius: var(--default-border-radius);
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .nmorph-time-picker__selected-time {
    display: flex;
    align-items: center;
    margin-left: var(--default-indentation-input);
  }

  .nmorph-time-picker__dropdown {
    @include nmorph-outset;
    display: flex;
    padding: var(--indentation-03);
    position: relative;
  }

  .nmorph-time-picker__dropdown::after {
    content: '';
    @include absolute-center;
    height: var(--time-picker-value-height);
    border-top: 1px solid var(--accent-color-01);
    border-bottom: 1px solid var(--accent-color-01);
    width: 100%;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    width: 100%;
  }
}
</style>
