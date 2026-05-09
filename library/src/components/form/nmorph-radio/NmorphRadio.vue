<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue';
import { useModifiers } from '@/utils';
import {
  INmorphRadioOption,
  NmorphComponentHeight,
  NmorphDomElementType,
  NmorphRadioChangeRadioButtonValueHandlerInjectionType,
  NmorphRadioGroupSelectedValueInjectionType,
  NmorphRadioStyleType,
} from '@/types';

const groupSelectedValue = inject<NmorphRadioGroupSelectedValueInjectionType | undefined>(
  'radio-group-selected-value',
  undefined
);
const changeValue = inject<NmorphRadioChangeRadioButtonValueHandlerInjectionType | undefined>(
  'change-radio-button-value-handler',
  undefined
);
const groupHeight = inject<Ref<keyof typeof NmorphComponentHeight> | undefined>('radio-group-height', undefined);

interface INmorphProps extends Omit<INmorphRadioOption, 'value'> {
  value?: string;
  styleType?: keyof typeof NmorphRadioStyleType;
  checked?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  disabled: false,
  label: '',
  styleType: 'radio-style',
  checked: false,
  tabindex: 0,
  value: '',
});

const changeHandler = () => {
  if (changeValue && !props.disabled) changeValue(props.value);
};

const checked = computed(() => groupSelectedValue?.value === props.value || props.checked);
const height = computed(() => props.height || groupHeight?.value || 'thin');

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[height.value]],
    'nmorph-radio': [`${props.disabled && 'disabled'}`, `${checked.value && 'checked'}`, props.styleType],
  })
);

const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });
</script>

<template>
  <label :class="modifiers" @click.prevent="changeHandler">
    <div v-if="props.styleType === 'radio-style'" class="nmorph-radio__content">
      <div class="nmorph-radio__input-wrapper">
        <input
          ref="inputDOMRef"
          type="radio"
          :name="props.label"
          :value="props.value"
          :checked="checked"
          :tabindex="props.tabindex"
          class="nmorph-native-input"
        />
        <div class="nmorph-radio__fake" />
        <div v-if="checked" class="nmorph-radio__fake-checked" />
      </div>
      <span v-if="props.label" class="nmorph-radio__label">
        {{ props.label }}
      </span>
      <slot v-else name="label" />
    </div>
    <div v-if="props.styleType === 'button'" class="nmorph-radio__content">
      <input
        ref="inputDOMRef"
        type="radio"
        :disabled="props.disabled"
        :name="props.label"
        :value="props.value"
        :checked="checked"
        :tabindex="props.tabindex"
        class="nmorph-native-input"
      />
      <div v-if="props.label" class="nmorph-radio__fake">
        <span> {{ props.label }} </span>
      </div>
      <div v-else class="nmorph-radio__fake">
        <slot name="label" />
      </div>
    </div>
  </label>
</template>

<style lang="scss">
.nmorph-radio {
  --size: var(--height);

  display: inline-flex;
  align-items: center;
  cursor: pointer;

  .nmorph-radio__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    margin-top: 2px;
  }

  .nmorph-radio__input-wrapper {
    position: relative;
    width: var(--size);
    height: var(--size);
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  input:focus-visible {
    background: var(--nmorph-main-color);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-radio__fake {
    border-radius: var(--border-radius-circular);

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    background: var(--nmorph-main-color);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-radio__fake span,
  .nmorph-radio__label {
    font-weight: 400;
    font-size: var(--font-size-small);
    line-height: var(--line-height-regular);
  }

  .nmorph-radio__fake-checked {
    width: 50%;
    height: 50%;
    background: var(--nmorph-accent-color);
    border-radius: var(--border-radius-circular);

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .nmorph-radio__label {
    margin-left: var(--indentation-02);
  }

  &.nmorph-radio--button {
    .nmorph-radio__fake {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--size);
      padding: var(--indentation-03);
      white-space: nowrap;
      border-radius: var(--default-border-radius);

      background: var(--nmorph-main-color);
      box-shadow:
        var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
    }
  }

  &.nmorph-radio--checked {
    .nmorph-radio__fake {
      background: var(--nmorph-main-color);
      box-shadow:
        inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
    }
  }

  &.nmorph-radio--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
