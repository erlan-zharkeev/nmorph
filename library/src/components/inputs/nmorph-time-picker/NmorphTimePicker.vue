<script setup lang="ts">
import { NmorphCommonInputProps, NmorphComponentHeight, NmorphDomElement } from '@/types/common';
import { getModifiers } from '@/utils';
import { Ref, computed, onMounted, ref, watch } from 'vue';
import { Hour, MinuteSeconds, TimeTuple } from './types';
import NmorphTimeRoller from './components/NmorphTimeRoller.vue';
import { NmorphDropdown, NmorphIcon } from '@/components';
import { formatTimestampToTime, timeArrayToTimestamp } from './utils';

interface IProps extends Omit<NmorphCommonInputProps, 'fill'> {
  modelValue?: number;
  open?: boolean;
  initWithoutValue?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: 0,
  open: false,
  disabled: false,
  height: 'default',
  initWithoutValue: false,
});

const emit = defineEmits<IEmit>();

interface IEmit {
  (e: 'inputDOMRef', val: Ref<NmorphDomElement>): void;
  (e: 'update:modelValue', val: number): void;
  (e: 'on-change-open-close', val: boolean): void;
}

const timepickerDOMRef = ref<NmorphDomElement>(null);
const inputDOMRef = ref<NmorphDomElement>(null);
const openDropdown = ref(props.open);
const timeTuple = ref<TimeTuple>([0, 0, 0]);

const emptyValue = ref(props.initWithoutValue);

onMounted(() => {
  emit('inputDOMRef', inputDOMRef);
});

const clickHandler = () => {
  openDropdown.value = !openDropdown.value;
};

const modifiers = computed(() =>
  getModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-time-picker': [`${props.disabled && 'disabled'}`, `${openDropdown.value && 'open'}`],
  })
);

const hours = Array.from({ length: 24 }, (_, index) => index);
const minutesSeconds = Array.from({ length: 60 }, (_, index) => index);

const updateValue = () => {
  emptyValue.value = false;
  emit('update:modelValue', timeArrayToTimestamp(timeTuple.value));
};

const hoursChangedHandler = (val: number) => {
  const hour = val as Hour;
  timeTuple.value = [hour, timeTuple.value[1], timeTuple.value[2]];
  updateValue();
};

const minutesChangedHandler = (val: number) => {
  const minutes = val as MinuteSeconds;
  timeTuple.value = [timeTuple.value[0], minutes, timeTuple.value[2]];
  updateValue();
};

const secondsChangedHandler = (val: number) => {
  const seconds = val as MinuteSeconds;
  timeTuple.value = [timeTuple.value[0], timeTuple.value[1], seconds];
  updateValue();
};

const onOutsideClickDropdownHandler = () => {
  openDropdown.value = false;
};

watch(openDropdown, (newValue) => {
  emit('on-change-open-close', newValue);
});

const fillTimeTuple = () => {
  if (emptyValue.value) return;
  const initValue = formatTimestampToTime(props.modelValue)
    .split(':')
    .map((timeEl) => Number(timeEl)) as TimeTuple;
  timeTuple.value = initValue;
};

fillTimeTuple();

const step = 20;
const cellHeight = computed(() => `${step}px`);
const selectedValue = computed(() => (emptyValue.value ? '——:——:——' : formatTimestampToTime(props.modelValue)));
</script>

<template>
  <div ref="timepickerDOMRef" :class="modifiers" @click="clickHandler">
    <div class="nmorph-time-picker__content">
      <div class="nmorph-time-picker__selected-time">
        <NmorphIcon name="time" class="nmorph-time-picker__time-icon" />
        <input ref="inputDOMRef" type="time" :value="timeTuple" step="1" />
        <span>{{ selectedValue }}</span>
      </div>
      <NmorphDropdown
        v-if="timepickerDOMRef"
        :open="openDropdown"
        :relative-element="timepickerDOMRef"
        @on-outside-click="onOutsideClickDropdownHandler"
      >
        <div class="nmorph-time-picker__dropdown">
          <NmorphTimeRoller
            :set-value-on-mount="!emptyValue"
            :values="hours"
            :selected-value="timeTuple[0]"
            :step-height="step"
            @value-changed="hoursChangedHandler"
          />
          <NmorphTimeRoller
            :set-value-on-mount="!emptyValue"
            :values="minutesSeconds"
            :selected-value="timeTuple[1]"
            :step-height="step"
            @value-changed="minutesChangedHandler"
          />
          <NmorphTimeRoller
            :set-value-on-mount="!emptyValue"
            :values="minutesSeconds"
            :selected-value="timeTuple[2]"
            :step-height="step"
            @value-changed="secondsChangedHandler"
          />
        </div>
      </NmorphDropdown>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-time-picker {
  width: 160px;
  cursor: pointer;

  .nmorph-time-picker__content {
    @include nmorph-outset;

    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    border-radius: var(--default-border-radius);
  }

  .nmorph-time-picker__selected-time {
    display: flex;
    align-items: center;
    margin-left: var(--default-indentation-input);
  }

  .nmorph-time-picker__time-icon {
    margin-right: 4px;
  }

  .nmorph-time-picker__dropdown {
    @include nmorph-outset;

    position: relative;
    display: flex;
    padding: var(--indentation-03);
  }

  .nmorph-time-picker__dropdown::after {
    $line: solid 1px var(--accent-color-01);

    width: 100%;
    height: v-bind(cellHeight);
    border-top: $line;
    border-bottom: $line;
    content: '';

    @include absolute-center;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    visibility: hidden;
  }
}

.nmorph-time-picker--open {
  .nmorph-time-picker__content {
    @include nmorph-inset;
  }
}
</style>
