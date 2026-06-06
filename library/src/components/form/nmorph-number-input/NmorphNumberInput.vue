<script setup lang="ts">
import { NmorphComponentThickness, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref, watch } from 'vue';
import { NmorphButton, NmorphIcon, NmorphIconMinusThin, NmorphIconPlusThin } from '@/components';
import { useFormItemInput, useFormItemModel } from '../nmorph-form/use-form-item-input';
import type { INmorphNumberInputEmit, INmorphNumberInputProps } from './types';

const props = withDefaults(defineProps<INmorphNumberInputProps>(), {
  thickness: 'basic',
  modelValue: 0,
  max: Infinity,
  min: -Infinity,
  step: 1,
  disabled: false,
  actionBtnPositionRight: false,
});

const { id, name, autocomplete, tabindex } = useFormItemInput(props);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentThickness[props.thickness]],
    'nmorph-number-input': [props.disabled && 'disabled', props.actionBtnPositionRight && 'action-btn-position-right'],
  })
);

const iconSizeMap = {
  thick: {
    default: '12px',
    right: '8px',
  },
  basic: {
    default: '10px',
    right: '7px',
  },
  thin: {
    default: '8px',
    right: '5px',
  },
};
const actionBtnIconSize = computed(() => {
  const positionKey = props.actionBtnPositionRight ? 'right' : 'default';
  return iconSizeMap[props.thickness][positionKey];
});

const emit = defineEmits<INmorphNumberInputEmit>();
const { modelValue, updateModelValue } = useFormItemModel<number>(
  props,
  (value) => emit('update:model-value', value),
  0
);
const initialValue = ref(modelValue.value);

const increaseHandler = () => {
  initialValue.value += props.step;
};

const decreaseHandler = () => {
  initialValue.value -= props.step;
};
const minBtnDisabled = computed(() => initialValue.value <= props.min);
const maxBtnDisabled = computed(() => initialValue.value >= props.max);

const rightActionBtnHeight = computed(() => 'calc(var(--nmorph-private-control-height) / 2)');

const inputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;

  let result = Number(target.value);

  initialValue.value = result;
};

watch(initialValue, (updatedValue) => {
  if (updatedValue > props.max) {
    initialValue.value = props.max;
    inputDOMRef.value?.blur();
  }

  if (initialValue.value < props.min) {
    initialValue.value = props.min;
    inputDOMRef.value?.blur();
  }

  updateModelValue(updatedValue);
});

watch(modelValue, (updatedValue) => {
  initialValue.value = updatedValue;
});

const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });
</script>

<template>
  <div :class="modifiers" :style="{ '--nmorph-private-number-input-right-action-height': rightActionBtnHeight }">
    <div class="nmorph-number-input__content">
      <div class="nmorph-number-input__input-content">
        <div v-if="!actionBtnPositionRight" class="nmorph-number-input__decrease">
          <NmorphButton design="plain" :disabled="minBtnDisabled" :thickness="props.thickness" @click="decreaseHandler">
            <NmorphIcon :width="actionBtnIconSize" :height="actionBtnIconSize">
              <NmorphIconMinusThin />
            </NmorphIcon>
          </NmorphButton>
        </div>
        <input
          :id="id"
          ref="inputDOMRef"
          :name="name"
          :autocomplete="autocomplete"
          :tabindex="tabindex"
          class="nmorph-native-input"
          :value="initialValue"
          type="number"
          :min="props.min"
          :max="props.max"
          @input="inputHandler"
        />
        <div v-if="!actionBtnPositionRight" class="nmorph-number-input__increase">
          <NmorphButton design="plain" :disabled="maxBtnDisabled" :thickness="props.thickness" @click="increaseHandler">
            <NmorphIcon class="nmorph-number-input__plus-icon" :width="actionBtnIconSize" :height="actionBtnIconSize">
              <NmorphIconPlusThin />
            </NmorphIcon>
          </NmorphButton>
        </div>
        <div v-else class="nmorph-number-input__action-btns">
          <div class="nmorph-number-input__increase">
            <NmorphButton
              design="plain"
              :disabled="maxBtnDisabled"
              :thickness="props.thickness"
              @click="increaseHandler"
            >
              <NmorphIcon class="nmorph-number-input__plus-icon" :width="actionBtnIconSize" :height="actionBtnIconSize">
                <NmorphIconPlusThin />
              </NmorphIcon>
            </NmorphButton>
          </div>
          <div class="nmorph-number-input__decrease">
            <NmorphButton
              design="plain"
              :disabled="minBtnDisabled"
              :thickness="props.thickness"
              @click="decreaseHandler"
            >
              <NmorphIcon :width="actionBtnIconSize" :height="actionBtnIconSize">
                <NmorphIconMinusThin />
              </NmorphIcon>
            </NmorphButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-number-input {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;

  .nmorph-number-input__content {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .nmorph-number-input__input-content {
    display: flex;
    width: 100%;
    height: var(--nmorph-private-control-height);
    height: 100%;
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-number-input__decrease {
    .nmorph-button__content {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .nmorph-number-input__increase {
    .nmorph-button__content {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .nmorph-button.nmorph-button--plain .nmorph-button__content {
    background: transparent;
    border: none;
    outline: none;
    box-shadow: none;
  }

  .nmorph-button.nmorph-button--plain .nmorph-button__content:not(:disabled, [loading='true']):hover,
  .nmorph-button.nmorph-button--plain .nmorph-button__content:focus,
  .nmorph-button.nmorph-button--plain .nmorph-button__content:focus-visible {
    background: transparent;
    border: none;
    outline: none;
    box-shadow: none;
  }

  input {
    width: auto;
    width: 100%;
    padding: var(--nmorph-private-control-text-offset-y) var(--default-indentation-input) 0;
    line-height: calc(var(--nmorph-private-control-height) - var(--nmorph-private-control-text-offset-y));
    text-align: center;
    background: var(--nmorph-main-color);
    border: none;
    border-top: 1px solid var(--nmorph-main-color);
    border-bottom: 1px solid var(--nmorph-main-color);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
    transition: ease-in-out var(--transition-01) background;
    transition: background 0s;
    appearance: textfield;
  }

  input:focus {
    background: var(--nmorph-accent-color);
    outline: none;
  }

  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    margin: 0;
    appearance: none;
  }

  .nmorph-number-input__action-btns {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    width: var(--nmorph-private-control-height);
    min-width: var(--nmorph-private-control-height);
    overflow: hidden;
    border-top-right-radius: var(--default-border-radius);
    border-bottom-right-radius: var(--default-border-radius);
  }

  .nmorph-number-input__plus-icon {
    transform: translateY(1px);
  }

  &.nmorph-number-input--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .nmorph-number-input__input-content {
      pointer-events: none;
    }
  }

  &.nmorph-number-input--action-btn-position-right {
    input {
      border-top-left-radius: var(--default-border-radius);
      border-bottom-left-radius: var(--default-border-radius);
    }

    .nmorph-number-input__decrease,
    .nmorph-number-input__increase {
      display: flex;
      flex: 1 1 0;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 0;
    }

    .nmorph-number-input__increase {
      .nmorph-button__content {
        border-radius: 0;
        border-top-right-radius: var(--default-border-radius);
      }
    }

    .nmorph-number-input__decrease {
      .nmorph-button__content {
        border-radius: 0;
        border-bottom-right-radius: var(--default-border-radius);
      }
    }

    .nmorph-button {
      --nmorph-private-control-height: var(--nmorph-private-number-input-right-action-height);

      display: flex;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .nmorph-button__content {
      width: 100%;
      height: 100%;
      min-height: 0;
      padding: 0;
    }

    .nmorph-number-input__plus-icon {
      transform: translateY(2px);
    }
  }
}
</style>
