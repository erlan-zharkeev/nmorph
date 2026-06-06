<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue';
import { useModifiers } from '@/utils';
import {
  NmorphDomElementType,
  NmorphRadioChangeRadioButtonValueHandlerInjectionType,
  NmorphRadioGroupSelectedValueInjectionType,
  NmorphSelectionControlThickness,
  NmorphSelectionControlThicknessType,
} from '@/types';
import type { INmorphRadioProps } from './types';

const groupSelectedValue = inject<NmorphRadioGroupSelectedValueInjectionType | undefined>(
  'radio-group-selected-value',
  undefined
);
const changeValue = inject<NmorphRadioChangeRadioButtonValueHandlerInjectionType | undefined>(
  'change-radio-button-value-handler',
  undefined
);
const groupThickness = inject<Ref<NmorphSelectionControlThicknessType> | undefined>('radio-group-thickness', undefined);

const props = withDefaults(defineProps<INmorphRadioProps>(), {
  disabled: false,
  label: '',
  design: 'nmorph',
  checked: false,
  tabindex: 0,
  value: '',
});

const changeHandler = () => {
  if (changeValue && !props.disabled) changeValue(props.value);
};

const checked = computed(() => groupSelectedValue?.value === props.value || props.checked);
const resolvedDesign = computed(() => props.design || 'nmorph');
const requestedThickness = computed(() => props.thickness || groupThickness?.value || 'basic');
const thickness = computed(() => {
  if (resolvedDesign.value !== 'plain' && requestedThickness.value === 'extra-thin') return 'basic';
  return requestedThickness.value;
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphSelectionControlThickness[thickness.value]],
    'nmorph-radio': [props.disabled && 'disabled', checked.value && 'checked', resolvedDesign.value],
  })
);

const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });
</script>

<template>
  <label :class="modifiers" @click.prevent="changeHandler">
    <div v-if="props.design === 'plain'" class="nmorph-radio__content">
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
    <div v-if="props.design === 'nmorph'" class="nmorph-radio__content">
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
        <slot name="label">
          <slot />
        </slot>
      </div>
    </div>
  </label>
</template>

<style lang="scss">
.nmorph-radio {
  --nmorph-private-selection-control-size: var(--nmorph-private-control-height);
  --nmorph-private-selection-control-font-size: var(--nmorph-private-control-font-size);
  --nmorph-private-selection-control-line-height: var(--nmorph-private-control-line-height);
  --nmorph-private-selection-control-font-weight: var(--nmorph-private-control-font-weight);
  --nmorph-private-selection-control-inline-padding: var(--indentation-03);

  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &.nmorph {
    height: auto;
    min-height: var(--nmorph-private-selection-control-size);
  }

  .nmorph-radio__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: var(--nmorph-private-selection-control-size);
  }

  .nmorph-radio__input-wrapper {
    position: relative;
    width: var(--nmorph-private-selection-control-size);
    height: var(--nmorph-private-selection-control-size);
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--nmorph-main-color);
    border-radius: var(--border-radius-circular);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-radio__fake span,
  .nmorph-radio__label {
    display: inline-flex;
    align-items: center;
    font-weight: var(--nmorph-private-selection-control-font-weight);
    font-size: var(--nmorph-private-selection-control-font-size);
    line-height: var(--nmorph-private-selection-control-line-height);
    transform: translateY(var(--nmorph-private-control-text-offset-y));
  }

  .nmorph-radio__fake-checked {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    background: var(--nmorph-accent-color);
    border-radius: var(--border-radius-circular);
    transform: translate(-50%, -50%);
  }

  .nmorph-radio__label {
    margin-left: var(--indentation-02);
  }

  &.nmorph-radio--nmorph {
    .nmorph-radio__fake {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      height: var(--nmorph-private-selection-control-size);
      padding: 0 var(--nmorph-private-selection-control-inline-padding);
      white-space: nowrap;
      background: var(--nmorph-main-color);
      border-radius: var(--default-border-radius);
      box-shadow:
        var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
    }
  }

  &.nmorph--extra-thin-component {
    --nmorph-private-selection-control-inline-padding: var(--indentation-02);
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

  &.nmorph-radio--plain {
    .nmorph-radio__fake {
      border: var(--nmorph-plain-border);
      box-shadow: none;
    }
  }

  &.nmorph-radio--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
