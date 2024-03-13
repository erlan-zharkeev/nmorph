<script setup lang="ts">
import { CommonInputProps, ControlComponentHeight } from './../../../common-component.enums';
import { createModifiers } from './../../../../utils';
import { computed, ref } from 'vue';

interface IProps extends CommonInputProps {
  modelValue?: number;
  max?: number;
  min?: number;
  step?: number;
  vertical?: boolean;
  showValue?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  height: ControlComponentHeight['thick'],
  modelValue: 0,
  max: Infinity,
  min: -Infinity,
  step: 1,
  disabled: false,
  fill: true,
  vertical: false,
  showValue: true,
});

const modifiers = computed(() =>
  createModifiers('nmorph-slider-input', [
    props.height,
    props.disabled ? 'disabled' : '',
    props.fill ? 'fill' : '',
    props.vertical ? 'vertical' : '',
  ])
);

const inputValue = ref(props.modelValue);

export interface IEmit {
  (e: 'update:modelValue', val: string): void;
}

const emit = defineEmits<IEmit>();

const inputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let result = Number(target.value);
  inputValue.value = result;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-slider-input__content">
      <div class="nmorph-slider-input__input-wrapper">
        <div class="nmorph-slider-input__input-container">
          <div class="nmorph-slider-input__thumb" />
        </div>
      </div>
      <div v-if="props.showValue" class="nmorph-slider-input__value">{{ props.modelValue }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-slider-input {
  --height: #{$thick-input-height};
  --thumb-width: 20%;
  --value-fixed-container-width: 24px;

  cursor: pointer;

  .nmorph-slider-input__content {
    display: flex;
    align-items: center;
  }

  .nmorph-slider-input__input-wrapper {
    width: 100%;
    height: var(--height);
    border-radius: var(--default-border-radius);
    padding: 0 $nmorph-wrapper-padding;
    overflow: hidden;
    display: flex;
    align-items: center;
    @include nmorph-inset;
  }

  .nmorph-slider-input__input-container {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }

  .nmorph-slider-input__thumb {
    position: absolute;
    border-radius: var(--default-border-radius);
    width: var(--thumb-width);
    height: 22px;
    border: 0;
    @include nmorph-outset;
  }

  .nmorph-slider-input__value {
    margin-left: 16px;
    display: flex;
    justify-content: center;
    width: var(--value-fixed-container-width);
    @include body-1-strong(var(--text-01));
  }
}

.nmorph-slider-input--fill {
  width: 100%;
  .nmorph-slider-input__content {
    width: 100%;
  }
}

.nmorph-slider-input--disabled {
  @include disabled;

  .nmorph-slider-input__input-content {
    pointer-events: none;
  }
}

.nmorph-slider-input--thin {
  --height: #{$thin-input-height};
}
</style>
